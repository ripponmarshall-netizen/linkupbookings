import { useState } from 'react';
import ModalShell from '../components/ModalShell.jsx';
import { Icon } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function UpgradeModal({ onClose }) {
  const { togglePro } = useApp();
  const [billing, setBilling] = useState('monthly');

  function handleStartPro() {
    togglePro();
    onClose();
  }

  return (
    <ModalShell onClose={onClose} width={620}>
      {/* dark inner wrapper — fills the modal-box which uses flex column */}
      <div style={{
        background: 'var(--ink)', color: '#fbf6ec',
        position: 'relative', flex: 1,
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        {/* close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, color: '#a89c87', zIndex: 5 }}
        >
          {Icon.x({ width: 18, height: 18 })}
        </button>

        {/* decorative ornaments */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,102,61,0.25), transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -80,
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,155,61,0.18), transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ padding: '40px 40px 32px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(196,102,61,0.18)', color: 'var(--terracotta)',
            fontSize: 11, fontFamily: 'var(--mono)', letterSpacing: '0.08em', marginBottom: 22,
          }}>
            {Icon.sparkle({ width: 11, height: 11 })} UPGRADE
          </div>

          <h2 className="serif" style={{
            fontSize: 56, margin: '0 0 12px', lineHeight: 0.98,
            fontWeight: 400, letterSpacing: '-0.015em',
          }}>
            Stop chasing.<br />
            <span style={{ fontStyle: 'italic', color: 'var(--ochre)' }}>Start booking.</span>
          </h2>

          <p style={{ color: '#c8bda4', fontSize: 14, lineHeight: 1.55, margin: '0 0 28px', maxWidth: 440 }}>
            Unlock a public booking link, deposits, reminders and analytics —
            everything to stop running your business from your DMs.
          </p>

          {/* billing toggle */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
            {[
              { k: 'monthly', l: 'Monthly', p: 'J$400/mo',   sub: '' },
              { k: 'yearly',  l: 'Yearly',  p: 'J$4,000/yr', sub: 'save J$800' },
            ].map(opt => (
              <button
                key={opt.k}
                onClick={() => setBilling(opt.k)}
                style={{
                  flex: 1, padding: '14px 16px', borderRadius: 12,
                  background: billing === opt.k ? 'rgba(251,246,236,0.95)' : 'rgba(251,246,236,0.05)',
                  border: billing === opt.k ? '1px solid rgba(251,246,236,0.95)' : '1px solid rgba(251,246,236,0.12)',
                  color: billing === opt.k ? 'var(--ink)' : '#fbf6ec',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{opt.l}</span>
                  {opt.sub && (
                    <span className="mono" style={{
                      fontSize: 9.5,
                      color: billing === opt.k ? 'var(--terracotta)' : 'var(--ochre)',
                      letterSpacing: '0.06em',
                    }}>
                      {opt.sub.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="serif" style={{ fontSize: 22, fontWeight: 400 }}>{opt.p}</div>
              </button>
            ))}
          </div>

          {/* features */}
          <div style={{
            background: 'rgba(251,246,236,0.04)', borderRadius: 12,
            padding: '14px 18px', marginBottom: 24,
            border: '1px solid rgba(251,246,236,0.06)',
          }}>
            {[
              ['Public booking link & embed',    'book.linkupbookings.com/yourname'],
              ['Auto SMS + WhatsApp reminders',  'Cut no-shows by ~70%'],
              ['Collect deposits at booking',    'Refundable up to 24 hr'],
              ['Client notes & history',         'Allergies, preferences, birthdays'],
              ['Analytics & insights',           'Revenue, busiest hours, top clients'],
              ['Waitlist & intake forms',        'Plus reviews and ratings'],
            ].map(([f, sub], i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 0',
                  borderBottom: i < 5 ? '1px solid rgba(251,246,236,0.06)' : 'none',
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--terracotta)', color: '#fbf6ec',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {Icon.check({ width: 11, height: 11 })}
                </div>
                <div style={{ flex: 1, fontSize: 13 }}>{f}</div>
                <div className="mono" style={{ fontSize: 10, color: '#a89c87', letterSpacing: '0.04em' }}>{sub}</div>
              </div>
            ))}
          </div>

          <button className="btn btn-terracotta btn-lg" style={{ width: '100%' }} onClick={handleStartPro}>
            Start 14-day free trial · then {billing === 'monthly' ? 'J$400/mo' : 'J$4,000/yr'}
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#a89c87', marginTop: 10 }}>
            No card needed until day 15 · cancel any time
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
