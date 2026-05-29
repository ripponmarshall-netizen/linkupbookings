import { useState } from 'react';
import ModalShell from '../components/ModalShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { DAYS, DAY_DATES, fmtJ } from '../data/seed.js';

export default function AddApptModal({ onClose }) {
  const { addAppt, clients, services } = useApp();
  const [step, setStep] = useState(1);
  const [client, setClient] = useState(null);
  const [service, setService] = useState(services[0]);
  const [dayIdx, setDayIdx] = useState(1);
  const [time, setTime] = useState('11:00am');
  const [requireDeposit, setRequireDeposit] = useState(true);

  function handleConfirm() {
    // Map display time to a decimal hour (9.5 = 9:30am) to match seed data
    const timeMap = {
      '9:00am': 9, '10:00am': 10, '11:00am': 11,
      '12:00pm': 12, '1:30pm': 13.5, '3:00pm': 15,
      '4:30pm': 16.5, '6:00pm': 18,
    };
    if (!client || !service) return;
    const start = timeMap[time] ?? 11;
    const end = start + service.duration / 60;

    addAppt({
      id: 'a' + Date.now(),
      dayIdx,
      start,
      end,
      clientId: client.id,
      serviceId: service.id,
      status: 'confirmed',
      deposit: requireDeposit ? Math.round(service.price * 0.25) : 0,
      paid: false,
      recurring: false,
    });
    onClose();
  }

  return (
    <ModalShell onClose={onClose} width={540}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">New appointment</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>
            {Icon.x({ width: 16, height: 16 })}
          </button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          {step === 1 ? 'Who?' : step === 2 ? 'What service?' : 'When?'}
        </h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {step === 1 && (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--card)', border: '1px solid var(--line)',
                padding: '10px 12px', borderRadius: 8,
              }}>
                {Icon.search({ width: 14, height: 14, style: { color: 'var(--muted)' } })}
                <input
                  className="mono"
                  placeholder="Search clients or add new..."
                  style={{ border: 'none', background: 'transparent', flex: 1, padding: 0, fontSize: 13 }}
                />
                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: 11.5 }}>
                  {Icon.plus({ width: 12, height: 12 })} New
                </button>
              </div>
            </div>
            <div className="label" style={{ marginBottom: 8 }}>Recent</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {clients.slice(0, 5).map(c => (
                <button
                  key={c.id}
                  onClick={() => { setClient(c); setStep(2); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: 10, borderRadius: 10, textAlign: 'left',
                    background: client?.id === c.id ? 'var(--paper-2)' : 'transparent',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--paper-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = client?.id === c.id ? 'var(--paper-2)' : 'transparent'}
                >
                  <Avatar name={c.name} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{c.phone}</div>
                  </div>
                  <span className="chip" style={{ fontSize: 10 }}>{c.visits} visits</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {services.map(s => (
              <button
                key={s.id}
                onClick={() => { setService(s); setStep(3); }}
                style={{
                  padding: 14, textAlign: 'left',
                  background: service?.id === s.id ? s.color + '12' : 'var(--card)',
                  border: service?.id === s.id ? `1px solid ${s.color}` : '1px solid var(--line)',
                  borderRadius: 10,
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: 3, background: s.color, marginBottom: 8 }} />
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 4 }}>
                  {s.duration} MIN · {fmtJ(s.price)}
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Date</label>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }} className="no-scroll">
                {DAYS.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setDayIdx(i)}
                    className="chip"
                    style={{
                      background: dayIdx === i ? 'var(--ink)' : 'var(--card)',
                      color: dayIdx === i ? '#fbf6ec' : 'var(--ink)',
                      border: dayIdx === i ? '1px solid var(--ink)' : '1px solid var(--line)',
                      minWidth: 56, padding: '8px 10px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
                    }}
                  >
                    <span style={{ fontSize: 9.5, opacity: 0.7 }}>{d.toUpperCase()}</span>
                    <span style={{ fontSize: 15, fontFamily: 'var(--serif)' }}>{DAY_DATES[i]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Time</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {['9:00am', '10:00am', '11:00am', '12:00pm', '1:30pm', '3:00pm', '4:30pm', '6:00pm'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className="chip"
                    style={{
                      background: time === t ? 'var(--forest)' : 'var(--card)',
                      color: time === t ? '#fbf6ec' : 'var(--ink)',
                      border: time === t ? '1px solid var(--forest)' : '1px solid var(--line)',
                      justifyContent: 'center', padding: '8px 0', fontSize: 12,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              padding: 14, background: 'var(--card)', border: '1px solid var(--line)',
              borderRadius: 10, marginBottom: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Require deposit</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                    25% · {fmtJ(Math.round((service?.price ?? 0) * 0.25))} via WhatsApp link
                  </div>
                </div>
                <button
                  onClick={() => setRequireDeposit(!requireDeposit)}
                  style={{
                    width: 38, height: 22, borderRadius: 11,
                    background: requireDeposit ? 'var(--forest)' : 'var(--line-2)',
                    position: 'relative', transition: 'background 120ms',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 2, left: requireDeposit ? 18 : 2,
                    width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    transition: 'left 120ms',
                  }} />
                </button>
              </div>
            </div>

            <div>
              <label className="label">Note for this booking</label>
              <textarea className="textarea" rows="2" placeholder="Optional…" style={{ resize: 'none' }} />
            </div>
          </>
        )}
      </div>

      <div style={{
        padding: '14px 24px', borderTop: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--paper-2)',
      }}>
        {step > 1 ? (
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>
            {Icon.chev({ width: 12, height: 12, style: { transform: 'scaleX(-1)' } })} Back
          </button>
        ) : <div />}

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginRight: 6 }}>STEP {step}/3</div>
          {step < 3 ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !client}
            >
              Continue {Icon.chev({ width: 12, height: 12 })}
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={handleConfirm}>
              {Icon.check({ width: 13, height: 13 })} Confirm & send invite
            </button>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
