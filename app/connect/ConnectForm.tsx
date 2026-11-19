'use client'

import { useEffect, useRef, useState, type DragEvent, type ReactNode } from 'react'
import {
  FORM_ENDPOINT, MAX_FILE_MB, enquiryTypes, programmeOptions, yearOptions, type Opening,
} from '@/content/connect'
import { LAB_EMAIL } from '@/content/site'

type TypeId = (typeof enquiryTypes)[number]['id']

const EMPTY = {
  // shared
  name: '', email: '', phone: '',
  // internship
  institution: '', programme: '', branch: '', year: '',
  position: '', startDate: '', duration: '', mode: 'On campus', statement: '', links: '',
  // other enquiries
  organisation: '', role: '', subject: '', message: '',
}
type Data = typeof EMPTY
type Errors = Partial<Record<keyof Data, string>>

const STEPS = ['About you', 'Project and dates', 'CV and submit']

/** Reads a File as base64 (no data: prefix). */
const toBase64 = (f: File) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(String(r.result).split(',')[1] ?? '')
    r.onerror = rej
    r.readAsDataURL(f)
  })

export default function ConnectForm({ openings }: { openings: Opening[] }) {
  const [type, setType] = useState<TypeId>('internship')
  const [step, setStep] = useState(0)
  const [d, setD] = useState<Data>(EMPTY)
  const [file, setFile] = useState<File | null>(null)
  const [fileErr, setFileErr] = useState('')
  const [drag, setDrag] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mailed' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  // Let other parts of the page pre-select a type, e.g. /connect?type=workshop#apply
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('type')
    if (t && enquiryTypes.some((e) => e.id === t)) setType(t as TypeId)
  }, [])

  const isIntern = type === 'internship'
  const typeLabel = enquiryTypes.find((e) => e.id === type)!.label
  const positionTitle = openings.find((o) => o.id === d.position)?.title ?? d.position

  const set = (k: keyof Data) => (e: { target: { value: string } }) => {
    setD((x) => ({ ...x, [k]: e.target.value }))
    setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const need = (e: Errors, k: keyof Data, msg: string) => { if (!String(d[k]).trim()) e[k] = msg }

  const validate = (s: number) => {
    const e: Errors = {}
    if (!isIntern) {
      need(e, 'name', 'Enter your name.')
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Enter an email address we can reply to.'
      need(e, 'subject', 'Add a short subject.')
      if (d.message.trim().length < 20) e.message = 'Tell us a little more (20+ characters).'
    } else if (s === 0) {
      need(e, 'name', 'Enter your full name.')
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Enter an email address we can reply to.'
      need(e, 'institution', 'Enter your college or university.')
      need(e, 'programme', 'Choose your programme.')
      need(e, 'branch', 'Enter your branch or department.')
      need(e, 'year', 'Choose your current year.')
    } else if (s === 1) {
      need(e, 'position', 'Choose a project.')
      need(e, 'startDate', 'Choose your earliest start date.')
      need(e, 'duration', 'Choose how long you can stay.')
      if (d.statement.trim().length < 40) e.statement = 'Write at least a couple of sentences (40+ characters).'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const pickFile = (f?: File | null) => {
    if (!f) return
    if (isIntern && !/\.(pdf|docx?)$/i.test(f.name)) return setFileErr('Upload your CV as a PDF or Word file.')
    if (f.size > MAX_FILE_MB * 1024 * 1024) return setFileErr(`That file is over ${MAX_FILE_MB} MB. Upload a smaller version.`)
    setFileErr('')
    setFile(f)
  }
  const onDrop = (e: DragEvent) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files?.[0]) }

  const switchType = (t: TypeId) => { setType(t); setStep(0); setErrors({}); setFile(null); setFileErr('') }

  // Everything that gets saved — one flat object, one row in the Sheet.
  const payload = () =>
    isIntern
      ? {
          formType: 'Internship', name: d.name, email: d.email, phone: d.phone,
          institution: d.institution, programme: d.programme, branch: d.branch, year: d.year,
          project: positionTitle, startDate: d.startDate, duration: d.duration, mode: d.mode,
          links: d.links, statement: d.statement,
        }
      : {
          formType: typeLabel, name: d.name, email: d.email, phone: d.phone,
          organisation: d.organisation, role: d.role, subject: d.subject, message: d.message,
        }

  const submit = async () => {
    if (!isIntern && !validate(0)) return
    if (isIntern && !file) return setFileErr('Attach your CV to submit.')
    const data = payload()

    if (!FORM_ENDPOINT) {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n') + (file ? `\n\n(Please attach: ${file.name})` : '')
      const subj = isIntern ? `Internship application: ${d.name} (${positionTitle})` : `${typeLabel}: ${d.subject}`
      window.location.href = `mailto:${LAB_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
      setState('mailed')
      return
    }

    setState('sending')
    try {
      const attachment = file ? { name: file.name, type: file.type, data: await toBase64(file) } : null
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script doesn't send CORS headers; the request still arrives.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString(), page: window.location.href, attachment }),
      })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  const reset = () => { setD(EMPTY); setFile(null); setStep(0); setState('idle') }

  /* ── DONE ── */
  if (state === 'sent' || state === 'mailed') {
    return (
      <div className="af af--done">
        <FormStyles />
        <svg className="af__check" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="36" /><path d="M24 41 l11 11 l22 -24" /></svg>
        <h3 className="h2" style={{ fontSize: '1.9rem', marginTop: 18 }}>{state === 'sent' ? 'Sent' : 'Almost done'}</h3>
        <p className="muted" style={{ marginTop: 10, maxWidth: '46ch' }}>
          {state === 'sent'
            ? `Thanks, ${d.name.split(' ')[0]}. We've received your ${isIntern ? `application for "${positionTitle}"` : 'message'} and will reply to ${d.email}.`
            : `Your email app should have opened with everything filled in.${file ? ` Attach ${file.name} and` : ''} press send. If nothing opened, email ${LAB_EMAIL} directly.`}
        </p>
        <button className="btn btn--outline" style={{ marginTop: 22 }} onClick={reset}>Send another</button>
      </div>
    )
  }

  const renderDrop = (hint: string) => (
    <>
      <div
        className={`drop${drag ? ' drop--over' : ''}${file ? ' drop--has' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        role="button" tabIndex={0} aria-label="Upload a file"
      >
        <input ref={inputRef} type="file" accept={isIntern ? '.pdf,.doc,.docx' : undefined} hidden onChange={(e) => pickFile(e.target.files?.[0])} />
        <span className="drop__icon">{file ? '📄' : '⇪'}</span>
        <span className="h3" style={{ fontSize: '1.05rem' }}>{file ? file.name : 'Drop a file here, or click to choose'}</span>
        <span className="muted" style={{ fontSize: '.88rem' }}>
          {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB. Click to replace.` : hint}
        </span>
      </div>
      {fileErr && <p className="field__error" style={{ marginTop: 8 }}>{fileErr}</p>}
    </>
  )

  return (
    <div className="af">
      <FormStyles />

      {/* ── TYPE PICKER ── */}
      <p style={{ fontWeight: 600, marginBottom: 10 }}>What would you like to contact us about?</p>
      <div className="tp" role="radiogroup" aria-label="Enquiry type">
        {enquiryTypes.map((t) => (
          <button key={t.id} type="button" role="radio" aria-checked={type === t.id} className="tp__opt" onClick={() => switchType(t.id)}>
            <span className="tp__label">{t.label}</span>
            <span className="tp__desc">{t.desc}</span>
          </button>
        ))}
      </div>

      {isIntern ? (
        <>
          <ol className="af__steps" aria-label="Application steps">
            {STEPS.map((s, i) => (
              <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''}>
                <span className="af__dot">{i < step ? '✓' : i + 1}</span>
                <span className="af__lab">{s}</span>
              </li>
            ))}
          </ol>
          <div className="af__bar"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>

          <div className="af__panel" key={`i${step}`}>
            {step === 0 && (
              <div className="af__grid">
                <Field label="Full name" err={errors.name}><input value={d.name} onChange={set('name')} autoComplete="name" /></Field>
                <Field label="Email" err={errors.email}><input type="email" value={d.email} onChange={set('email')} autoComplete="email" /></Field>
                <Field label="Phone (optional)"><input type="tel" value={d.phone} onChange={set('phone')} autoComplete="tel" /></Field>
                <Field label="College or university" err={errors.institution}><input value={d.institution} onChange={set('institution')} /></Field>
                <Field label="Programme" err={errors.programme}>
                  <select value={d.programme} onChange={set('programme')}>
                    <option value="">Choose</option>
                    {programmeOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Current year" err={errors.year}>
                  <select value={d.year} onChange={set('year')}>
                    <option value="">Choose</option>
                    {yearOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Branch or department" err={errors.branch} hint="e.g. Electrical Engineering, Biotechnology" wide>
                  <input value={d.branch} onChange={set('branch')} />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div>
                <p style={{ fontWeight: 500, fontSize: '.9rem', marginBottom: 10 }}>Which project interests you?</p>
                <div className="af__opps" role="radiogroup" aria-label="Project">
                  {openings.map((o) => (
                    <button type="button" key={o.id} role="radio" aria-checked={d.position === o.id} disabled={!o.open} className="opp"
                      onClick={() => { setD((x) => ({ ...x, position: o.id })); setErrors((x) => ({ ...x, position: undefined })) }}>
                      <span className="opp__radio" aria-hidden="true" />
                      <span>
                        <span className="opp__title">{o.title}{!o.open && ' (closed)'}</span>
                        <span className="opp__sum">{o.summary}</span>
                        {o.skills.length > 0 && <span className="opp__skills">{o.skills.map((s) => <span key={s} className="tag">{s}</span>)}</span>}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.position && <p className="field__error" style={{ marginTop: 6 }}>{errors.position}</p>}
                <div className="af__grid" style={{ marginTop: 22 }}>
                  <Field label="Earliest start date" err={errors.startDate}><input type="date" value={d.startDate} onChange={set('startDate')} /></Field>
                  <Field label="Duration" err={errors.duration}>
                    <select value={d.duration} onChange={set('duration')}>
                      <option value="">Choose</option>
                      {['4 weeks', '6–8 weeks', '3 months', '6 months', 'Longer'].map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </Field>
                  <div className="field">
                    <span style={{ fontSize: '.9rem', fontWeight: 500 }}>Mode</span>
                    <div className="seg" role="radiogroup" aria-label="Mode" style={{ alignSelf: 'start' }}>
                      {['On campus', 'Remote', 'Either'].map((m) => (
                        <button type="button" key={m} role="radio" aria-checked={d.mode === m} aria-pressed={d.mode === m} onClick={() => setD((x) => ({ ...x, mode: m }))}>{m}</button>
                      ))}
                    </div>
                  </div>
                  <Field label="GitHub, LinkedIn or portfolio (optional)"><input value={d.links} onChange={set('links')} placeholder="https://" /></Field>
                  <Field label="Why this project, and what have you built before?" err={errors.statement} hint={`${d.statement.length} characters`} wide>
                    <textarea rows={5} value={d.statement} onChange={set('statement')} />
                  </Field>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                {renderDrop(`Your CV as PDF or Word, up to ${MAX_FILE_MB} MB`)}
                <div className="af__review">
                  <p style={{ fontWeight: 600, marginBottom: 8 }}>Check your details</p>
                  <dl>
                    <dt>Name</dt><dd>{d.name}</dd>
                    <dt>Email</dt><dd>{d.email}</dd>
                    <dt>Studying</dt><dd>{d.programme}, {d.branch}, {d.year}</dd>
                    <dt>Institution</dt><dd>{d.institution}</dd>
                    <dt>Project</dt><dd>{positionTitle}</dd>
                    <dt>Start</dt><dd>{d.startDate}, {d.duration}, {d.mode.toLowerCase()}</dd>
                  </dl>
                </div>
              </div>
            )}
          </div>

          {state === 'error' && <p className="field__error" style={{ marginTop: 10 }}>It didn&apos;t send. Check your connection and press Submit again, or email {LAB_EMAIL}.</p>}
          <div className="af__nav">
            {step > 0 ? <button type="button" className="btn btn--outline" onClick={() => setStep((s) => s - 1)}>Back</button> : <span />}
            {step < 2 ? (
              <button type="button" className="btn btn--indigo" onClick={() => validate(step) && setStep((s) => s + 1)}>Continue</button>
            ) : (
              <button type="button" className="btn btn--amber" onClick={submit} disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Submit application'}
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="af__panel" key={type} style={{ marginTop: 26 }}>
            <div className="af__grid">
              <Field label="Name" err={errors.name}><input value={d.name} onChange={set('name')} autoComplete="name" /></Field>
              <Field label="Email" err={errors.email}><input type="email" value={d.email} onChange={set('email')} autoComplete="email" /></Field>
              <Field label="Organisation (optional)"><input value={d.organisation} onChange={set('organisation')} placeholder={type === 'phd-masters' ? 'Current college or employer' : 'Hospital, university or company'} /></Field>
              <Field label="Role (optional)"><input value={d.role} onChange={set('role')} placeholder={type === 'phd-masters' ? 'e.g. Final-year B.Tech student' : 'e.g. Consultant oncologist'} /></Field>
              <Field label="Phone (optional)"><input type="tel" value={d.phone} onChange={set('phone')} autoComplete="tel" /></Field>
              <Field label="Subject" err={errors.subject}><input value={d.subject} onChange={set('subject')} /></Field>
              <Field label="Message" err={errors.message} wide>
                <textarea rows={6} value={d.message} onChange={set('message')} placeholder={
                  type === 'workshop' ? 'Audience, expected numbers, preferred dates and topics' :
                  type === 'collaboration' ? 'What you would like to work on together' :
                  type === 'phd-masters' ? 'Your background and the research you are interested in' : ''} />
              </Field>
            </div>
            <div style={{ marginTop: 18 }}>
              <p style={{ fontSize: '.9rem', fontWeight: 500, marginBottom: 8 }}>Attachment (optional)</p>
              {renderDrop(type === 'phd-masters' ? `Your CV, up to ${MAX_FILE_MB} MB` : `A proposal or brochure, up to ${MAX_FILE_MB} MB`)}
            </div>
          </div>
          {state === 'error' && <p className="field__error" style={{ marginTop: 10 }}>It didn&apos;t send. Check your connection and press Send again, or email {LAB_EMAIL}.</p>}
          <div className="af__nav">
            <span />
            <button type="button" className="btn btn--amber" onClick={submit} disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function Field({ label, hint, err, wide, children }: { label: string; hint?: string; err?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className="field" style={wide ? { gridColumn: '1 / -1' } : undefined}>
      <label>
        {label}
        <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column' }}>{children}</div>
      </label>
      {err ? <span className="field__error">{err}</span> : hint ? <span className="field__hint">{hint}</span> : null}
    </div>
  )
}

function FormStyles() {
  return (
    <style>{`
      .af { padding: clamp(22px, 2.6vw, 38px); border-radius: 22px; background: var(--card); border: 1px solid var(--line); box-shadow: 0 30px 60px rgba(22,19,61,.08); }
      .af--done { text-align: center; display: flex; flex-direction: column; align-items: center; padding: 56px 34px; }
      .af__check { width: 84px; height: 84px; }
      .af__check circle { fill: none; stroke: var(--indigo-soft); stroke-width: 4; }
      .af__check path { fill: none; stroke: var(--indigo); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw .6s .2s ease forwards; }
      .tp { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-bottom: 28px; }
      .tp__opt { text-align: left; font: inherit; color: inherit; padding: 12px 14px; border-radius: 14px; border: 1.5px solid var(--line); background: #fff; cursor: pointer; transition: all .2s; }
      .tp__opt:hover { border-color: var(--lavender); transform: translateY(-1px); }
      .tp__opt[aria-checked="true"] { border-color: var(--indigo); background: var(--indigo); color: #fff; }
      .tp__label { display: block; font-weight: 600; font-size: .95rem; }
      .tp__desc { display: block; font-size: .8rem; color: var(--muted); margin-top: 2px; line-height: 1.35; }
      .tp__opt[aria-checked="true"] .tp__desc { color: #d9d7f5; }
      .af__steps { display: grid; grid-template-columns: repeat(3, 1fr); list-style: none; padding: 0; margin: 0 0 14px; gap: 8px; }
      .af__steps li { display: flex; align-items: center; gap: 10px; font-size: .88rem; color: var(--muted); }
      .af__dot { width: 30px; height: 30px; flex: none; border-radius: 50%; display: grid; place-items: center; border: 1.5px solid var(--line); font-weight: 600; font-size: .82rem; transition: all .3s; }
      .af__steps li.on { color: var(--text); font-weight: 500; }
      .af__steps li.on .af__dot { background: var(--indigo); border-color: var(--indigo); color: #fff; }
      .af__steps li.done .af__dot { background: var(--indigo-soft); border-color: var(--indigo-soft); color: var(--indigo); }
      .af__bar { height: 4px; border-radius: 4px; background: var(--paper); overflow: hidden; margin-bottom: 28px; }
      .af__bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--indigo), var(--amber)); transition: width .5s cubic-bezier(.2,.7,.2,1); }
      .af__panel { animation: afIn .35s ease; }
      @keyframes afIn { from { opacity: 0; transform: translateX(14px); } }
      .af__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
      .field label > div input, .field label > div select, .field label > div textarea { font-weight: 400; }
      .af__opps { display: grid; gap: 10px; }
      .opp { display: grid; grid-template-columns: 22px 1fr; gap: 14px; text-align: left; font: inherit; color: inherit; padding: 16px 18px; border-radius: 14px; border: 1.5px solid var(--line); background: #fff; cursor: pointer; transition: border-color .2s, background .2s; }
      .opp:hover { border-color: var(--lavender); }
      .opp[aria-checked="true"] { border-color: var(--indigo); background: #faf9ff; }
      .opp:disabled { opacity: .5; cursor: not-allowed; }
      .opp__radio { width: 20px; height: 20px; margin-top: 2px; border-radius: 50%; border: 2px solid var(--line); transition: all .2s; }
      .opp[aria-checked="true"] .opp__radio { border-color: var(--indigo); box-shadow: inset 0 0 0 4px #fff; background: var(--indigo); }
      .opp__title { display: block; font-weight: 600; }
      .opp__sum { display: block; font-size: .9rem; color: var(--muted); margin-top: 2px; }
      .opp__skills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .drop { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 34px 20px; border-radius: 16px; border: 2px dashed var(--line); background: var(--paper); cursor: pointer; transition: all .25s; }
      .drop:hover, .drop--over { border-color: var(--indigo); background: var(--indigo-soft); }
      .drop--over { transform: scale(1.01); }
      .drop--has { border-style: solid; border-color: var(--indigo); background: #faf9ff; }
      .drop__icon { font-size: 28px; width: 58px; height: 58px; border-radius: 50%; display: grid; place-items: center; background: #fff; border: 1px solid var(--line); color: var(--indigo); }
      .drop--over .drop__icon { animation: bob .8s ease infinite alternate; }
      @keyframes bob { to { transform: translateY(-6px); } }
      .af__review { margin-top: 22px; padding: 18px 20px; border-radius: 14px; background: var(--paper); font-size: .92rem; }
      .af__review dl { display: grid; grid-template-columns: 110px 1fr; gap: 6px 12px; margin: 0; }
      .af__review dt { color: var(--muted); }
      .af__review dd { margin: 0; }
      .af__nav { display: flex; justify-content: space-between; margin-top: 30px; padding-top: 22px; border-top: 1px solid var(--line); }
      @media (max-width: 600px) {
        .af__grid { grid-template-columns: 1fr; }
        .af__lab { display: none; }
        .af__steps li.on .af__lab { display: inline; }
      }
    `}</style>
  )
}
