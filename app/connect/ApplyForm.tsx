'use client'

import { useRef, useState, type DragEvent } from 'react'
import { APPLICATION_ENDPOINT, MAX_CV_MB, type Opening } from '@/content/connect'
import { LAB_EMAIL } from '@/content/site'

type Data = {
  name: string
  email: string
  phone: string
  institution: string
  programme: string
  year: string
  position: string
  startDate: string
  duration: string
  mode: string
  statement: string
  links: string
}

const EMPTY: Data = {
  name: '', email: '', phone: '', institution: '', programme: '', year: '',
  position: '', startDate: '', duration: '', mode: 'On campus', statement: '', links: '',
}

const STEPS = ['About you', 'Project and dates', 'CV and submit']

export default function ApplyForm({ openings }: { openings: Opening[] }) {
  const [step, setStep] = useState(0)
  const [d, setD] = useState<Data>(EMPTY)
  const [file, setFile] = useState<File | null>(null)
  const [fileErr, setFileErr] = useState('')
  const [drag, setDrag] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mailed' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof Data) => (e: { target: { value: string } }) => {
    setD((x) => ({ ...x, [k]: e.target.value }))
    setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const validate = (s: number) => {
    const e: Partial<Record<keyof Data, string>> = {}
    if (s === 0) {
      if (!d.name.trim()) e.name = 'Enter your full name.'
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Enter an email address we can reply to.'
      if (!d.institution.trim()) e.institution = 'Enter your college or university.'
    }
    if (s === 1) {
      if (!d.position) e.position = 'Choose a project.'
      if (!d.startDate) e.startDate = 'Choose your earliest start date.'
      if (!d.duration) e.duration = 'Choose how long you can stay.'
      if (d.statement.trim().length < 40) e.statement = 'Write at least a couple of sentences (40+ characters).'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const pickFile = (f?: File | null) => {
    if (!f) return
    const okType = /\.(pdf|docx?)$/i.test(f.name)
    if (!okType) return setFileErr('Upload your CV as a PDF or Word file.')
    if (f.size > MAX_CV_MB * 1024 * 1024) return setFileErr(`That file is over ${MAX_CV_MB} MB. Upload a smaller version.`)
    setFileErr('')
    setFile(f)
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDrag(false)
    pickFile(e.dataTransfer.files?.[0])
  }

  const next = () => validate(step) && setStep((s) => Math.min(2, s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))

  const positionTitle = openings.find((o) => o.id === d.position)?.title ?? d.position

  const submit = async () => {
    if (!file) return setFileErr('Attach your CV to submit.')
    if (!APPLICATION_ENDPOINT) {
      // No backend configured yet: hand over to the applicant's email app.
      const body = [
        `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone}`,
        `Institution: ${d.institution}`, `Programme: ${d.programme} ${d.year}`,
        `Project: ${positionTitle}`, `Start date: ${d.startDate}`, `Duration: ${d.duration}`, `Mode: ${d.mode}`,
        `Links: ${d.links}`, '', 'Why this project:', d.statement, '',
        `(Please attach your CV: ${file.name})`,
      ].join('\n')
      window.location.href = `mailto:${LAB_EMAIL}?subject=${encodeURIComponent(`Internship application: ${d.name} (${positionTitle})`)}&body=${encodeURIComponent(body)}`
      setState('mailed')
      return
    }
    setState('sending')
    try {
      const base64 = await new Promise<string>((res, rej) => {
        const r = new FileReader()
        r.onload = () => res(String(r.result).split(',')[1] ?? '')
        r.onerror = rej
        r.readAsDataURL(file)
      })
      await fetch(APPLICATION_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...d, position: positionTitle, submittedAt: new Date().toISOString(), cv: { name: file.name, type: file.type, data: base64 } }),
      })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent' || state === 'mailed') {
    return (
      <div className="af af--done">
        <FormStyles />
        <svg className="af__check" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="36" /><path d="M24 41 l11 11 l22 -24" /></svg>
        <h3 className="h2" style={{ fontSize: '1.9rem', marginTop: 18 }}>
          {state === 'sent' ? 'Application sent' : 'Almost done'}
        </h3>
        <p className="muted" style={{ marginTop: 10, maxWidth: '46ch' }}>
          {state === 'sent'
            ? `Thanks, ${d.name.split(' ')[0]}. We've received your application and CV for "${positionTitle}". We'll reply to ${d.email}.`
            : `Your email app should have opened with everything filled in. Attach ${file?.name} and press send. If nothing opened, email ${LAB_EMAIL} directly.`}
        </p>
        <button className="btn btn--outline" style={{ marginTop: 22 }} onClick={() => { setD(EMPTY); setFile(null); setStep(0); setState('idle') }}>
          Start another application
        </button>
      </div>
    )
  }

  return (
    <div className="af">
      <FormStyles />
      <ol className="af__steps" aria-label="Application steps">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''}>
            <span className="af__dot">{i < step ? '✓' : i + 1}</span>
            <span className="af__lab">{s}</span>
          </li>
        ))}
      </ol>
      <div className="af__bar"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>

      <div className="af__panel" key={step}>
        {step === 0 && (
          <div className="af__grid">
            <Field label="Full name" err={errors.name}><input value={d.name} onChange={set('name')} autoComplete="name" /></Field>
            <Field label="Email" err={errors.email}><input type="email" value={d.email} onChange={set('email')} autoComplete="email" /></Field>
            <Field label="Phone (optional)"><input type="tel" value={d.phone} onChange={set('phone')} autoComplete="tel" /></Field>
            <Field label="College or university" err={errors.institution}><input value={d.institution} onChange={set('institution')} /></Field>
            <Field label="Programme (optional)" hint="e.g. B.Tech Electrical, M.Sc Biotechnology"><input value={d.programme} onChange={set('programme')} /></Field>
            <Field label="Current year (optional)">
              <select value={d.year} onChange={set('year')}>
                <option value="">Choose</option>
                {['1st year', '2nd year', '3rd year', '4th year', '5th year', 'Postgraduate', 'Graduated'].map((y) => <option key={y}>{y}</option>)}
              </select>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div>
            <p style={{ fontWeight: 500, fontSize: '.9rem', marginBottom: 10 }}>Which project interests you?</p>
            <div className="af__opps" role="radiogroup" aria-label="Project">
              {openings.map((o) => (
                <button
                  type="button"
                  key={o.id}
                  role="radio"
                  aria-checked={d.position === o.id}
                  disabled={!o.open}
                  className="opp"
                  onClick={() => { setD((x) => ({ ...x, position: o.id })); setErrors((x) => ({ ...x, position: undefined })) }}
                >
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
            </div>
            <div style={{ marginTop: 18 }}>
              <Field label="Why this project, and what have you built before?" err={errors.statement} hint={`${d.statement.length} characters`}>
                <textarea rows={5} value={d.statement} onChange={set('statement')} />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div
              className={`drop${drag ? ' drop--over' : ''}${file ? ' drop--has' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload your CV"
            >
              <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" hidden onChange={(e) => pickFile(e.target.files?.[0])} />
              {file ? (
                <>
                  <span className="drop__icon">📄</span>
                  <span className="h3" style={{ fontSize: '1.05rem' }}>{file.name}</span>
                  <span className="muted" style={{ fontSize: '.88rem' }}>{(file.size / 1024 / 1024).toFixed(2)} MB. Click to replace.</span>
                </>
              ) : (
                <>
                  <span className="drop__icon">⇪</span>
                  <span className="h3" style={{ fontSize: '1.05rem' }}>Drop your CV here, or click to choose</span>
                  <span className="muted" style={{ fontSize: '.88rem' }}>PDF or Word, up to {MAX_CV_MB} MB</span>
                </>
              )}
            </div>
            {fileErr && <p className="field__error" style={{ marginTop: 8 }}>{fileErr}</p>}

            <div className="af__review">
              <p style={{ fontWeight: 600, marginBottom: 8 }}>Check your details</p>
              <dl>
                <dt>Name</dt><dd>{d.name}</dd>
                <dt>Email</dt><dd>{d.email}</dd>
                <dt>Institution</dt><dd>{d.institution}</dd>
                <dt>Project</dt><dd>{positionTitle}</dd>
                <dt>Start</dt><dd>{d.startDate}, {d.duration}, {d.mode.toLowerCase()}</dd>
              </dl>
            </div>
            {state === 'error' && <p className="field__error" style={{ marginTop: 10 }}>The application didn&apos;t send. Check your connection and press Submit again, or email {LAB_EMAIL}.</p>}
          </div>
        )}
      </div>

      <div className="af__nav">
        {step > 0 ? <button type="button" className="btn btn--outline" onClick={back}>Back</button> : <span />}
        {step < 2 ? (
          <button type="button" className="btn btn--indigo" onClick={next}>Continue</button>
        ) : (
          <button type="button" className="btn btn--amber" onClick={submit} disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Submit application'}
          </button>
        )}
      </div>
    </div>
  )
}

function Field({ label, hint, err, children }: { label: string; hint?: string; err?: string; children: React.ReactNode }) {
  return (
    <div className="field">
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
      .af { padding: 34px; border-radius: 22px; background: var(--card); border: 1px solid var(--line); box-shadow: 0 30px 60px rgba(22,19,61,.08); }
      .af--done { text-align: center; display: flex; flex-direction: column; align-items: center; padding: 56px 34px; }
      .af__check { width: 84px; height: 84px; }
      .af__check circle { fill: none; stroke: var(--indigo-soft); stroke-width: 4; }
      .af__check path { fill: none; stroke: var(--indigo); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw .6s .2s ease forwards; }
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
      .drop { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 40px 20px; border-radius: 16px; border: 2px dashed var(--line); background: var(--paper); cursor: pointer; transition: all .25s; }
      .drop:hover, .drop--over { border-color: var(--indigo); background: var(--indigo-soft); }
      .drop--over { transform: scale(1.01); }
      .drop--has { border-style: solid; border-color: var(--indigo); background: #faf9ff; }
      .drop__icon { font-size: 30px; width: 60px; height: 60px; border-radius: 50%; display: grid; place-items: center; background: #fff; border: 1px solid var(--line); color: var(--indigo); }
      .drop--over .drop__icon { animation: bob .8s ease infinite alternate; }
      @keyframes bob { to { transform: translateY(-6px); } }
      .af__review { margin-top: 22px; padding: 18px 20px; border-radius: 14px; background: var(--paper); font-size: .92rem; }
      .af__review dl { display: grid; grid-template-columns: 110px 1fr; gap: 6px 12px; margin: 0; }
      .af__review dt { color: var(--muted); }
      .af__review dd { margin: 0; }
      .af__nav { display: flex; justify-content: space-between; margin-top: 30px; padding-top: 22px; border-top: 1px solid var(--line); }
      @media (max-width: 600px) {
        .af { padding: 22px; }
        .af__grid { grid-template-columns: 1fr; }
        .af__lab { display: none; }
        .af__steps li.on .af__lab { display: inline; }
      }
    `}</style>
  )
}
