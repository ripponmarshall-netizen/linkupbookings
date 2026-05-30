import { useState, useEffect } from 'react';
import ModalShell from '../components/ModalShell.jsx';
import { Icon } from '../components/shared.jsx';
import { useToast } from '../components/Toast.jsx';

const buildMessage = (discount) =>
  `Hey {first_name}! Mi have an open slot Thu 29th at 3pm — ${discount}% off if yuh grab it 💚 Book here: lup.bk/glow`;

export default function FillSlotModal({ onClose }) {
  const { toast } = useToast();
  const [segment, setSegment] = useState('regulars');
  const [discount, setDiscount] = useState(15);
  const [channel, setChannel] = useState('whatsapp');
  const [message, setMessage] = useState(() => buildMessage(15));
  const [edited, setEdited] = useState(false);

  // Keep the message in sync with the discount until the user edits it by hand.
  useEffect(() => {
    if (!edited) setMessage(buildMessage(discount));
  }, [discount, edited]);

  const segments = [
    { k: 'regulars', l: 'Regulars',  n: 12, sub: 'visited 2x+ in 90 days'  },
    { k: 'vip',      l: 'VIP only',  n: 4,  sub: 'top 10% spenders'        },
    { k: 'lapsed',   l: 'Lapsed',    n: 8,  sub: "haven't booked in 60d"   },
    { k: 'all',      l: 'Everyone',  n: 47, sub: 'all clients'              },
  ];
  const segmentCount = segments.find(s => s.k === segment).n;

  function handleSend() {
    toast(`Offer sent to ${segmentCount} ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'} clients`, { tone: 'success' });
    onClose();
  }

  return (
    <ModalShell onClose={onClose} width={780}>
      <div style={{ padding: '20px 28px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Fill an empty slot</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>
            {Icon.x({ width: 16, height: 16 })}
          </button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          Thu 3pm · <span style={{ fontStyle: 'italic' }}>let's not let it go to waste.</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', flex: 1, minHeight: 0 }}>
        {/* form */}
        <div style={{ padding: 24, overflowY: 'auto', borderRight: '1px solid var(--line)' }}>
          <label className="label" style={{ marginBottom: 8 }}>Send to</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 18 }}>
            {segments.map(s => (
              <button
                key={s.k}
                onClick={() => setSegment(s.k)}
                style={{
                  padding: 12, borderRadius: 10, textAlign: 'left',
                  background: segment === s.k ? 'var(--card)' : 'transparent',
                  border: segment === s.k ? '1px solid var(--forest)' : '1px solid var(--line)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.l}</span>
                  <span className="mono" style={{ fontSize: 11, color: segment === s.k ? 'var(--forest)' : 'var(--muted)' }}>
                    {s.n} ppl
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>{s.sub}</div>
              </button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>Sweeten the deal</label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {[0, 10, 15, 20, 25].map(d => (
              <button
                key={d}
                onClick={() => setDiscount(d)}
                className="chip"
                style={{
                  background: discount === d ? 'var(--terracotta)' : 'var(--card)',
                  color: discount === d ? '#fbf6ec' : 'var(--ink)',
                  border: discount === d ? '1px solid var(--terracotta)' : '1px solid var(--line)',
                  cursor: 'pointer', padding: '6px 12px',
                }}
              >
                {d === 0 ? 'No discount' : `${d}% off`}
              </button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>Send via</label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {[
              { k: 'whatsapp', l: 'WhatsApp', i: Icon.whatsapp },
              { k: 'sms',      l: 'SMS',      i: Icon.msg      },
            ].map(ch => (
              <button
                key={ch.k}
                onClick={() => setChannel(ch.k)}
                className="chip"
                style={{
                  background: channel === ch.k ? 'var(--ink)' : 'var(--card)',
                  color: channel === ch.k ? '#fbf6ec' : 'var(--ink-2)',
                  border: channel === ch.k ? '1px solid var(--ink)' : '1px solid var(--line)',
                  cursor: 'pointer', padding: '6px 12px',
                }}
              >
                {ch.i({ width: 11, height: 11 })} {ch.l}
              </button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>Message</label>
          <textarea
            value={message}
            onChange={e => { setMessage(e.target.value); setEdited(true); }}
            rows="4"
            style={{
              width: '100%', padding: 12,
              background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10,
              fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.55, resize: 'vertical', outline: 'none',
            }}
          />
        </div>

        {/* preview */}
        <div style={{ padding: 24, background: 'var(--paper-2)', overflowY: 'auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>Preview</div>
          <div style={{ background: '#0d141a', borderRadius: 16, padding: 16, marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14,
              }}>g</div>
              <span style={{ fontSize: 12, color: '#e9edef', fontWeight: 500 }}>Glow Nail Studio</span>
            </div>
            <div style={{
              background: '#005c4b', color: '#e9edef',
              padding: '8px 12px', borderRadius: 8, fontSize: 13, lineHeight: 1.45,
            }}>
              {message.replace('{first_name}', 'Aaliyah')}
              <div style={{ fontSize: 9.5, color: '#aebac1', textAlign: 'right', marginTop: 4 }}>3:00 PM ✓</div>
            </div>
          </div>

          <div className="label" style={{ marginBottom: 10 }}>Realistic outcome</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Will receive',    segmentCount + ' people',              'var(--ink)'    ],
              ['Expected reads',  Math.round(segmentCount * 0.96) + ' (96%)', 'var(--ink-2)' ],
              ['Likely bookings', '1–2',                                'var(--forest)' ],
              ['Cost',           'J$0',                                 'var(--ink-2)'  ],
            ].map(([k, v, c], i) => (
              <div
                key={i}
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 12px', background: 'var(--card)', borderRadius: 8,
                  border: '1px solid var(--line)',
                }}
              >
                <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{k}</span>
                <span className="mono" style={{ fontSize: 11.5, fontWeight: 500, color: c }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        padding: '14px 28px', borderTop: '1px solid var(--line)',
        background: 'var(--paper-2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-terracotta btn-sm" onClick={handleSend}>
          {Icon.sparkle({ width: 13, height: 13 })} Send to {segmentCount} clients
        </button>
      </div>
    </ModalShell>
  );
}
