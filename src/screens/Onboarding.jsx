import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Logo } from '../components/shared.jsx';

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const steps = ['Welcome', 'Your business', 'Services', 'Hours', 'Your link'];

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* progress bar */}
      <div style={{
        padding: '20px 56px', borderBottom: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--paper-2)', flexWrap: 'wrap', gap: 12,
      }}>
        <Logo size={16} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: i <= step ? 'var(--forest)' : 'var(--paper-3)',
                color: i <= step ? '#fbf6ec' : 'var(--muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontFamily: 'var(--mono)',
              }}>
                {i < step ? Icon.check({ width: 11, height: 11 }) : i + 1}
              </div>
              <span style={{ fontSize: 12, color: i === step ? 'var(--ink)' : 'var(--muted)', fontWeight: i === step ? 500 : 400 }} className="hide-mobile">{s}</span>
              {i < steps.length - 1 && <div style={{ width: 24, height: 1, background: i < step ? 'var(--forest)' : 'var(--line)', marginLeft: 6 }} className="hide-mobile" />}
            </div>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/calendar')}>Skip for now</button>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ maxWidth: step === 0 || step === 4 ? 760 : 560, width: '100%' }}>
          {step === 0 && <OBWelcome onNext={() => setStep(1)} />}
          {step === 1 && <OBBusiness onNext={() => setStep(2)} />}
          {step === 2 && <OBServices onNext={() => setStep(3)} />}
          {step === 3 && <OBHours onNext={() => setStep(4)} />}
          {step === 4 && <OBLink onDone={() => navigate('/calendar')} />}
        </div>
      </div>

      {step > 0 && step < 4 && (
        <div style={{
          padding: '20px 56px', borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--card-warm)',
        }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>
            {Icon.chev({ width: 12, height: 12, style: { transform: 'scaleX(-1)' } })} Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{step}/4</span>
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
              Continue {Icon.arrow({ width: 13, height: 13 })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function OBWelcome({ onNext }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 84, height: 84, borderRadius: 24,
        background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)',
        margin: '0 auto 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fbf6ec', fontFamily: 'var(--serif)', fontSize: 48, fontStyle: 'italic',
        boxShadow: '0 12px 32px rgba(196,102,61,0.32)',
      }}>L</div>
      <h1 className="serif" style={{ fontSize: 'clamp(44px, 8vw, 64px)', margin: '0 0 16px', lineHeight: 1, fontWeight: 400, letterSpacing: '-0.015em' }}>
        Welcome in.
      </h1>
      <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.55 }}>
        Four quick questions so wi can set up yuh booking page. Bout 90 seconds. Yuh trial starts after the last one — no card needed.
      </p>
      <button className="btn btn-primary btn-lg" onClick={onNext}>
        Let's go {Icon.arrow({ width: 14, height: 14 })}
      </button>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 28, marginTop: 48, flexWrap: 'wrap',
        fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        <span>· 14 days free</span><span>· cancel anytime</span><span>· J$400/mo after</span>
      </div>
    </div>
  );
}

function OBBusiness({ onNext }) {
  return (
    <div>
      <h2 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 40px)', margin: '0 0 8px', fontWeight: 400, lineHeight: 1.05 }}>
        What's the <span style={{ fontStyle: 'italic' }}>business</span>?
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 32px' }}>
        Don't overthink it — yuh can change anything later.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        <div>
          <label className="label">Business name</label>
          <input className="input" defaultValue="Glow Nail Studio" />
        </div>
        <div>
          <label className="label">Yuh name</label>
          <input className="input" defaultValue="Tanya Williams" />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label">What di business do?</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Nails 💅', 'Hair / Barber', 'Tutoring', 'Massage / Spa', 'Photography', 'Auto detail', 'Fitness / PT', 'Something else'].map((c, i) => (
              <button key={i} className="chip" style={{
                background: i === 0 ? 'var(--ink)' : 'var(--card)',
                color: i === 0 ? '#fbf6ec' : 'var(--ink)',
                border: i === 0 ? '1px solid var(--ink)' : '1px solid var(--line)',
                padding: '8px 14px', fontSize: 13, cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="label">Parish</label>
          <select className="select" defaultValue="St. Andrew">
            <option>Kingston</option>
            <option>St. Andrew</option>
            <option>St. Catherine</option>
            <option>St. James</option>
            <option>Manchester</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="label">Address (shown to clients)</label>
          <input className="input" defaultValue="23 Constant Spring Rd, Half-Way-Tree" />
        </div>
      </div>
    </div>
  );
}

function OBServices() {
  const [list, setList] = useState([
    { n: 'Gel Manicure', d: 60, p: 3500 },
    { n: 'Acrylic Full Set', d: 120, p: 8000 },
    { n: 'Pedicure', d: 75, p: 4500 },
  ]);
  return (
    <div>
      <h2 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 40px)', margin: '0 0 8px', fontWeight: 400, lineHeight: 1.05 }}>
        What do yuh <span style={{ fontStyle: 'italic' }}>offer</span>?
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 24px' }}>
        We pre-filled a few — edit, or add yuh own. Yuh can always change prices.
      </p>
      <div style={{ marginBottom: 14 }}>
        {list.map((s, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr 90px 110px 32px', gap: 10,
            alignItems: 'center', padding: 10, marginBottom: 6,
            background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10,
          }}>
            <input className="input" defaultValue={s.n} style={{ background: 'transparent', border: 'none', padding: 4 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input className="input" defaultValue={s.d} style={{ padding: 4, textAlign: 'right', background: 'transparent', border: 'none' }} />
              <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>MIN</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>J$</span>
              <input className="input" defaultValue={s.p.toLocaleString()} style={{ padding: 4, background: 'transparent', border: 'none' }} />
            </div>
            <button style={{ color: 'var(--muted)' }} onClick={() => setList(list.filter((_, j) => j !== i))}>
              {Icon.x({ width: 14, height: 14 })}
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setList([...list, { n: '', d: 60, p: 0 }])}>
        {Icon.plus({ width: 13, height: 13 })} Add a service
      </button>
    </div>
  );
}

function OBHours() {
  const [hours, setHours] = useState({
    Mon: ['9:00am', '5:00pm', true],
    Tue: ['9:00am', '5:00pm', true],
    Wed: ['9:00am', '5:00pm', true],
    Thu: ['9:00am', '7:00pm', true],
    Fri: ['9:00am', '7:00pm', true],
    Sat: ['10:00am', '4:00pm', true],
    Sun: ['', '', false],
  });
  return (
    <div>
      <h2 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 40px)', margin: '0 0 8px', fontWeight: 400, lineHeight: 1.05 }}>
        When yuh <span style={{ fontStyle: 'italic' }}>working</span>?
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 24px' }}>
        Clients only see slots inside these hours. Take yuh lunch break — block it later on the calendar.
      </p>
      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
        {Object.entries(hours).map(([d, [from, to, on]], i, arr) => (
          <div key={d} style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 120px 120px', gap: 14,
            alignItems: 'center', padding: '14px 18px',
            borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
            opacity: on ? 1 : 0.5,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setHours({ ...hours, [d]: [from, to, !on] })} style={{
                width: 34, height: 20, borderRadius: 10,
                background: on ? 'var(--forest)' : 'var(--line-2)', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 2, left: on ? 16 : 2,
                  width: 16, height: 16, borderRadius: '50%', background: '#fbf6ec',
                  transition: 'left 120ms',
                }} />
              </button>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{d}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {on ? `${from} – ${to}` : 'Closed'}
            </div>
            <input className="input" defaultValue={from} disabled={!on} style={{ fontSize: 12 }} />
            <input className="input" defaultValue={to} disabled={!on} style={{ fontSize: 12 }} />
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 14, padding: 12, background: 'var(--terracotta-soft)',
        borderRadius: 10, fontSize: 12, color: '#8d3f1e',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ color: 'var(--terracotta)' }}>{Icon.sparkle({ width: 14, height: 14 })}</span>
        <span><strong>Tip:</strong> add 15 min buffer between bookings later in Settings — no more rushing.</span>
      </div>
    </div>
  );
}

function OBLink({ onDone }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="chip chip-forest" style={{ marginBottom: 20, fontSize: 11 }}>
        ✓ Yuh booking page is live
      </div>
      <h1 className="serif" style={{ fontSize: 'clamp(36px, 6vw, 56px)', margin: '0 0 18px', lineHeight: 1.02, fontWeight: 400 }}>
        Bless. Yuh <span style={{ fontStyle: 'italic' }}>open for business</span>.
      </h1>
      <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 460, margin: '0 auto 30px', lineHeight: 1.55 }}>
        This is yuh personal booking page. Drop it in yuh IG bio, WhatsApp status, anywhere clients can tap.
      </p>

      <div style={{
        maxWidth: 520, margin: '0 auto 24px',
        background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14,
        padding: 6, display: 'flex', alignItems: 'center', gap: 4,
        boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ padding: '14px 18px', flex: 1, textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 15 }}>
          <span style={{ color: 'var(--muted)' }}>book.linkupbookings.com/</span>
          <span style={{ fontWeight: 600, color: 'var(--ink)' }}>glow</span>
        </div>
        <button className="btn btn-primary" style={{ padding: '12px 18px' }}>
          {Icon.copy({ width: 14, height: 14 })} Copy
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
        {[
          { l: 'WhatsApp status', i: Icon.whatsapp, c: '#25d366' },
          { l: 'Add to IG bio', i: Icon.globe, c: 'var(--terracotta)' },
          { l: 'Print QR code', i: Icon.sparkle, c: 'var(--ochre)' },
        ].map((s, i) => (
          <button key={i} className="btn btn-secondary" style={{ padding: '10px 14px' }}>
            <span style={{ color: s.c }}>{s.i({ width: 14, height: 14 })}</span>
            <span>{s.l}</span>
          </button>
        ))}
      </div>

      <button className="btn btn-primary btn-lg" style={{ minWidth: 220 }} onClick={onDone}>
        Take me to my dashboard {Icon.arrow({ width: 14, height: 14 })}
      </button>
    </div>
  );
}
