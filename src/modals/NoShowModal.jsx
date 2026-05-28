import { useState } from 'react';
import ModalShell from '../components/ModalShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { findClient, findService, fmtTime, fmtJ } from '../data/seed.js';

export default function NoShowModal({ appt, onClose }) {
  const a = appt || { clientId: 'c4', serviceId: 's5', deposit: 0, start: '13:30' };
  const c = findClient(a.clientId);
  const s = findService(a.serviceId);

  const [type, setType] = useState('noshow'); // noshow | late
  const [feeOn, setFeeOn] = useState(true);
  const [feeAmt, setFeeAmt] = useState(Math.round((s.price || 1200) * 0.5));
  const [notify, setNotify] = useState(true);
  const strikes = 2; // synthetic

  const message = type === 'noshow'
    ? `Hi ${c.name?.split(' ')[0]} — we missed yuh today at ${fmtTime(a.start)}. Mi gah charge the J$${feeAmt.toLocaleString()} hold fee per policy. Want to rebook? 💚`
    : `Hi ${c.name?.split(' ')[0]} — saw the late cancel for ${fmtTime(a.start)}. Per policy that's a J$${feeAmt.toLocaleString()} fee. Mi can move yuh to Thu 3pm if that work?`;

  return (
    <ModalShell onClose={onClose} width={560}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Missed appointment</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>
            {Icon.x({ width: 16, height: 16 })}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={c.name || ''} size={40} />
          <div style={{ flex: 1 }}>
            <h2 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 400, lineHeight: 1.05 }}>
              {c.name} didn't show.
            </h2>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', marginTop: 4 }}>
              {s.name?.toUpperCase()} · TUE 26 MAY · {fmtTime(a.start).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 24, overflowY: 'auto' }}>
        {/* strike warning */}
        {strikes >= 1 && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: 14, marginBottom: 18,
            background: strikes >= 2 ? 'rgba(196,102,61,0.08)' : 'var(--paper-2)',
            border: `1px solid ${strikes >= 2 ? 'var(--terracotta)' : 'var(--line)'}`,
            borderRadius: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: strikes >= 2 ? 'var(--terracotta)' : 'var(--ochre)',
              color: '#fbf6ec',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, flexShrink: 0,
            }}>
              {strikes + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
                {strikes >= 2
                  ? 'Third strike — consider deposit-only for next booking'
                  : 'Second strike in 90 days'}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5 }}>
                Apr 19 · No-show (Pedicure) · fee waived<br />
                {strikes >= 2 && <>Mar 12 · Late cancel ({'<'} 2hr) · J$500 charged</>}
              </div>
            </div>
          </div>
        )}

        <label className="label" style={{ marginBottom: 8 }}>What happened?</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
          {[
            { k: 'noshow', l: 'No-show',     sub: "Didn't turn up, no warning" },
            { k: 'late',   l: 'Late cancel', sub: 'Cancelled in last 2 hours'  },
          ].map(o => (
            <button
              key={o.k}
              onClick={() => setType(o.k)}
              style={{
                padding: 14, borderRadius: 10, textAlign: 'left',
                background: type === o.k ? 'var(--terracotta-soft)' : 'var(--card)',
                border: `1px solid ${type === o.k ? 'var(--terracotta)' : 'var(--line)'}`,
                color: type === o.k ? '#8d3f1e' : 'var(--ink)',
              }}
            >
              <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 2 }}>{o.l}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>{o.sub}</div>
            </button>
          ))}
        </div>

        {/* fee */}
        <div style={{
          padding: 14, background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 10, marginBottom: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: feeOn ? 10 : 0 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>
                Charge {a.deposit > 0 ? 'forfeit deposit + fee' : 'no-show fee'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                {a.deposit > 0
                  ? `Deposit J$${a.deposit.toLocaleString()} kept · top-up via WhatsApp link`
                  : '50% of service price · sent as WhatsApp pay link'}
              </div>
            </div>
            <button
              onClick={() => setFeeOn(!feeOn)}
              style={{
                width: 38, height: 22, borderRadius: 11,
                background: feeOn ? 'var(--terracotta)' : 'var(--line-2)',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: 2, left: feeOn ? 18 : 2,
                width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
              }} />
            </button>
          </div>
          {feeOn && (
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                Math.round((s.price || 1200) * 0.25),
                Math.round((s.price || 1200) * 0.5),
                s.price || 1200,
              ].map(amt => (
                <button
                  key={amt}
                  onClick={() => setFeeAmt(amt)}
                  className="chip"
                  style={{
                    background: feeAmt === amt ? 'var(--ink)' : 'var(--card)',
                    color: feeAmt === amt ? '#fbf6ec' : 'var(--ink)',
                    border: feeAmt === amt ? '1px solid var(--ink)' : '1px solid var(--line)',
                    cursor: 'pointer', flex: 1, justifyContent: 'center',
                  }}
                >
                  {fmtJ(amt)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* notify */}
        <div style={{
          padding: 14, background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 10, marginBottom: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: notify ? 10 : 0 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>
                Send message to {c.name?.split(' ')[0]}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                Soft tone, with reschedule offer
              </div>
            </div>
            <button
              onClick={() => setNotify(!notify)}
              style={{
                width: 38, height: 22, borderRadius: 11,
                background: notify ? 'var(--forest)' : 'var(--line-2)',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: 2, left: notify ? 18 : 2,
                width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
              }} />
            </button>
          </div>
          {notify && (
            <div style={{
              padding: '10px 12px', background: 'var(--paper-2)',
              borderRadius: 8, fontSize: 12.5, lineHeight: 1.5,
              color: 'var(--ink-2)', borderLeft: '3px solid var(--forest)',
            }}>
              {message}
            </div>
          )}
        </div>
      </div>

      <div style={{
        padding: '14px 24px', borderTop: '1px solid var(--line)',
        background: 'var(--paper-2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>
          {Icon.check({ width: 13, height: 13 })} Mark {type === 'noshow' ? 'no-show' : 'late cancel'}{feeOn ? ` · charge ${fmtJ(feeAmt)}` : ''}
        </button>
      </div>
    </ModalShell>
  );
}
