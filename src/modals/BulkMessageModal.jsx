import { useState, useEffect, useRef } from 'react';
import ModalShell from '../components/ModalShell.jsx';
import { Icon } from '../components/shared.jsx';
import { fmtJ } from '../data/seed.js';
import { useToast } from '../components/Toast.jsx';
import { insertToken } from '../utils/actions.js';

const PRESETS = [
  { k: 'lapsed',    l: 'Win back lapsed clients',    sub: "8 haven't booked in 60 days", n: 8,  body: 'Hey {first_name}! Mi miss yuh 💚 Been a min — want to come back in? 20% off yuh next gel set this week.' },
  { k: 'birthdays', l: 'Happy birthday wishes',      sub: '3 with birthdays this week',  n: 3,  body: 'Happy birthday {first_name} 🎉 Treat yuhself — 25% off any service for the whole week. Mi link in bio xx' },
  { k: 'fillweek',  l: 'Fill quiet weekday slots',   sub: 'Thu/Fri opens',               n: 12, body: 'Hey {first_name}! 12 slots open Thu & Fri this week — 15% off if yuh grab one. Link: lup.bk/glow' },
  { k: 'announce',  l: 'New service announcement',   sub: 'All 47 clients',              n: 47, body: 'Big news 💅 Now offering Russian almonds! Book yuh slot for grand opening week — first 10 get 30% off.' },
  { k: 'thankyou',  l: 'Loyalty thank-you',          sub: '11 VIPs / regulars',          n: 11, body: "Tanisha 💚 mi seh \"thank yuh\" for being so loyal! Free nail art on yuh next visit. See yuh soon ✨" },
  { k: 'custom',    l: 'Start from blank',            sub: 'Write yuh own',               n: 0,  body: '' },
];

export default function BulkMessageModal({ onClose }) {
  const { toast } = useToast();
  const [preset, setPreset] = useState('lapsed');
  const [channel, setChannel] = useState('whatsapp');
  const [schedule, setSchedule] = useState('Send now');
  const cur = PRESETS.find(p => p.k === preset);
  const [body, setBody] = useState(cur.body);
  const taRef = useRef(null);

  // Switching preset loads that preset's copy into the editable body.
  useEffect(() => { setBody(cur.body); }, [preset]);

  function addToken(token) {
    const el = taRef.current;
    const start = el ? el.selectionStart : body.length;
    const end = el ? el.selectionEnd : body.length;
    setBody(insertToken(body, token, start, end));
    requestAnimationFrame(() => {
      if (el) { el.focus(); const pos = start + token.length; el.setSelectionRange(pos, pos); }
    });
  }

  function send() {
    toast(schedule === 'Send now'
      ? `Sending to ${cur.n} clients…`
      : `Scheduled for ${cur.n} clients · ${schedule}`, { tone: 'success' });
    onClose();
  }

  return (
    <ModalShell onClose={onClose} width={840}>
      <div style={{ padding: '20px 28px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Bulk message</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>
            {Icon.x({ width: 16, height: 16 })}
          </button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          Talk to the <span style={{ fontStyle: 'italic' }}>whole list</span>.
        </h2>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6 }}>
          Pick a moment, tweak the words, send. Free on Pro · no per-message fees.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1.4fr 1fr', flex: 1, minHeight: 0 }}>
        {/* preset list */}
        <div style={{ borderRight: '1px solid var(--line)', background: 'var(--paper-2)', overflowY: 'auto' }}>
          <div className="label" style={{ padding: '16px 18px 8px' }}>Moments</div>
          {PRESETS.map(p => (
            <button
              key={p.k}
              onClick={() => setPreset(p.k)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '12px 18px',
                background: preset === p.k ? 'var(--card)' : 'transparent',
                borderLeft: preset === p.k ? '3px solid var(--terracotta)' : '3px solid transparent',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: preset === p.k ? 600 : 500, marginBottom: 2 }}>{p.l}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{p.sub}</div>
            </button>
          ))}
        </div>

        {/* composer */}
        <div style={{ padding: 24, borderRight: '1px solid var(--line)', overflowY: 'auto' }}>
          <label className="label" style={{ marginBottom: 8 }}>Send via</label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {[
              { k: 'whatsapp', l: 'WhatsApp', i: Icon.whatsapp },
              { k: 'sms',      l: 'SMS',      i: Icon.msg      },
              { k: 'both',     l: 'Both',     i: Icon.plus     },
            ].map(ch => (
              <button
                key={ch.k}
                onClick={() => setChannel(ch.k)}
                className="chip"
                style={{
                  background: channel === ch.k ? 'var(--ink)' : 'var(--card)',
                  color: channel === ch.k ? '#fbf6ec' : 'var(--ink-2)',
                  border: `1px solid ${channel === ch.k ? 'var(--ink)' : 'var(--line)'}`,
                  cursor: 'pointer', padding: '6px 12px',
                }}
              >
                {ch.i({ width: 11, height: 11 })} {ch.l}
              </button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>Message</label>
          <textarea
            ref={taRef}
            value={body}
            onChange={e => setBody(e.target.value)}
            rows="6"
            placeholder="Hey {first_name}…"
            aria-label="Bulk message"
            style={{
              width: '100%', padding: 14,
              background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10,
              fontFamily: 'var(--sans)', fontSize: 13.5, lineHeight: 1.55, resize: 'vertical', outline: 'none',
            }}
          />

          <div className="label" style={{ marginTop: 14, marginBottom: 8 }}>Variables</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['{first_name}', '{service}', '{last_visit}', '{booking_link}', '{date}'].map(v => (
              <button key={v} onClick={() => addToken(v)} className="chip mono" style={{ fontSize: 10.5, padding: '4px 10px', cursor: 'pointer' }}>{v}</button>
            ))}
          </div>

          <div className="label" style={{ marginTop: 18, marginBottom: 8 }}>Schedule</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Send now', 'Tomorrow 9am', 'Friday 5pm', 'Custom…'].map((s) => (
              <button
                key={s}
                onClick={() => setSchedule(s)}
                className="chip"
                style={{
                  background: schedule === s ? 'var(--forest-soft)' : 'var(--card)',
                  color: schedule === s ? 'var(--forest)' : 'var(--ink-2)',
                  border: `1px solid ${schedule === s ? '#cad6c9' : 'var(--line)'}`,
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* preview + outcome */}
        <div style={{ padding: 24, background: 'var(--paper-2)', overflowY: 'auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>WhatsApp preview</div>
          <div style={{ background: '#0d141a', borderRadius: 14, padding: 14, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13,
              }}>g</div>
              <span style={{ fontSize: 11.5, color: '#e9edef', fontWeight: 500 }}>Glow Nail Studio</span>
            </div>
            <div style={{
              background: '#005c4b', color: '#e9edef',
              padding: '8px 12px', borderRadius: 8, fontSize: 12.5, lineHeight: 1.45,
            }}>
              {(body || 'Yuh message…').replace('{first_name}', 'Aaliyah')}
              <div style={{ fontSize: 9.5, color: '#aebac1', textAlign: 'right', marginTop: 4 }}>11:42 AM ✓✓</div>
            </div>
          </div>

          <div className="label" style={{ marginBottom: 8 }}>Outcome</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              ['Reaches',       `${cur.n} ppl`,                                                                  'var(--ink)'       ],
              ['Cost',          'J$0 (WhatsApp Biz)',                                                            'var(--forest)'    ],
              ['Est. bookings', cur.n > 0 ? `${Math.max(1, Math.round(cur.n * 0.15))}–${Math.max(2, Math.round(cur.n * 0.3))}` : '—', 'var(--terracotta)'],
              ['Est. revenue',  cur.n > 0 ? fmtJ(Math.round(cur.n * 0.2 * 4500)) : '—',                        'var(--ochre)'     ],
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
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
          {cur.n} RECIPIENTS · OPT-OUT FOOTER AUTO-ATTACHED
        </span>
        <button className="btn btn-terracotta btn-sm" onClick={send}>
          {Icon.whatsapp({ width: 13, height: 13 })} {schedule === 'Send now' ? 'Send to' : 'Schedule for'} {cur.n} clients
        </button>
      </div>
    </ModalShell>
  );
}
