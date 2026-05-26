// Extra modals: NoShow, Recurring, Receipt, BulkMessage, CommandPalette, DayEndSend

// ────────────── No-show / late-cancel ──────────────
function NoShowModal({ appt, onClose }) {
  const a = appt || { clientId: 'c4', serviceId: 's5', deposit: 0, start: 13.5 };
  const c = findClient(a.clientId);
  const s = findService(a.serviceId);

  const [type, setType] = React.useState('noshow'); // noshow | late
  const [feeOn, setFeeOn] = React.useState(true);
  const [feeAmt, setFeeAmt] = React.useState(Math.round(s.price * 0.5));
  const [notify, setNotify] = React.useState(true);
  const strikes = 2; // synthetic

  const message = type === 'noshow'
    ? `Hi ${c.name.split(' ')[0]} — we missed yuh today at ${fmtTime(a.start)}. Mi gah charge the J$${feeAmt.toLocaleString()} hold fee per policy. Want to rebook? 💚`
    : `Hi ${c.name.split(' ')[0]} — saw the late cancel for ${fmtTime(a.start)}. Per policy that's a J$${feeAmt.toLocaleString()} fee. Mi can move yuh to Thu 3pm if that work?`;

  return (
    <ModalShell onClose={onClose} width={560}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Missed appointment</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>{Icon.x({ width: 16, height: 16 })}</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={c.name} size={40} />
          <div style={{ flex: 1 }}>
            <h2 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 400, lineHeight: 1.05 }}>
              {c.name} didn't show.
            </h2>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', marginTop: 4 }}>
              {s.name.toUpperCase()} · TUE 26 MAY · {fmtTime(a.start).toUpperCase()}
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
              color: '#fbf6ec', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, flexShrink: 0,
            }}>{strikes + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
                {strikes >= 2 ? 'Third strike — consider deposit-only for next booking' : 'Second strike in 90 days'}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5 }}>
                Apr 19 · No-show (Pedicure) · fee waived<br/>
                {strikes >= 2 && <>Mar 12 · Late cancel ({"<"} 2hr) · J$500 charged</>}
              </div>
            </div>
          </div>
        )}

        <label className="label" style={{ marginBottom: 8 }}>What happened?</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
          {[
            { k: 'noshow', l: 'No-show', sub: 'Didn\'t turn up, no warning' },
            { k: 'late', l: 'Late cancel', sub: 'Cancelled in last 2 hours' },
          ].map(o => (
            <button key={o.k} onClick={() => setType(o.k)}
              style={{
                padding: 14, borderRadius: 10, textAlign: 'left',
                background: type === o.k ? 'var(--terracotta-soft)' : 'var(--card)',
                border: `1px solid ${type === o.k ? 'var(--terracotta)' : 'var(--line)'}`,
                color: type === o.k ? '#8d3f1e' : 'var(--ink)',
              }}>
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
              <div style={{ fontSize: 13, fontWeight: 500 }}>Charge {a.deposit > 0 ? 'forfeit deposit + fee' : 'no-show fee'}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                {a.deposit > 0
                  ? `Deposit J$${a.deposit.toLocaleString()} kept · top-up via WhatsApp link`
                  : '50% of service price · sent as WhatsApp pay link'}
              </div>
            </div>
            <button onClick={() => setFeeOn(!feeOn)}
              style={{
                width: 38, height: 22, borderRadius: 11,
                background: feeOn ? 'var(--terracotta)' : 'var(--line-2)',
                position: 'relative',
              }}>
              <div style={{
                position: 'absolute', top: 2, left: feeOn ? 18 : 2,
                width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
              }} />
            </button>
          </div>
          {feeOn && (
            <div style={{ display: 'flex', gap: 6 }}>
              {[Math.round(s.price * 0.25), Math.round(s.price * 0.5), s.price].map(amt => (
                <button key={amt} onClick={() => setFeeAmt(amt)} className="chip" style={{
                  background: feeAmt === amt ? 'var(--ink)' : 'var(--card)',
                  color: feeAmt === amt ? '#fbf6ec' : 'var(--ink)',
                  border: feeAmt === amt ? '1px solid var(--ink)' : '1px solid var(--line)',
                  cursor: 'pointer', flex: 1, justifyContent: 'center',
                }}>{fmtJ(amt)}</button>
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
              <div style={{ fontSize: 13, fontWeight: 500 }}>Send message to {c.name.split(' ')[0]}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Soft tone, with reschedule offer</div>
            </div>
            <button onClick={() => setNotify(!notify)}
              style={{
                width: 38, height: 22, borderRadius: 11,
                background: notify ? 'var(--forest)' : 'var(--line-2)',
                position: 'relative',
              }}>
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
            }}>{message}</div>
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

// ────────────── Recurring booking ──────────────
function RecurringModal({ appt, onClose }) {
  const a = appt || { clientId: 'c3', serviceId: 's1', start: 9.5 };
  const c = findClient(a.clientId);
  const s = findService(a.serviceId);

  const [pattern, setPattern] = React.useState('biweekly');
  const [endType, setEndType] = React.useState('count');
  const [count, setCount] = React.useState(12);

  const patterns = [
    { k: 'weekly', l: 'Every week', sub: 'Same day & time' },
    { k: 'biweekly', l: 'Every 2 weeks', sub: 'Most common' },
    { k: 'monthly', l: 'Every month', sub: 'Same date' },
    { k: 'custom', l: 'Custom…', sub: 'Pick days' },
  ];

  // Next 6 occurrences preview
  const occurrences = Array.from({ length: 6 }).map((_, i) => {
    const step = pattern === 'weekly' ? 7 : pattern === 'biweekly' ? 14 : pattern === 'monthly' ? 30 : 14;
    const d = new Date(today);
    d.setDate(d.getDate() + step * (i + 1));
    return d;
  });

  return (
    <ModalShell onClose={onClose} width={620}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Make it recurring</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>{Icon.x({ width: 16, height: 16 })}</button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          {c.name.split(' ')[0]}, <span style={{ fontStyle: 'italic' }}>every fortnight</span>?
        </h2>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6 }}>
          {s.name} · {fmtTime(a.start)} · pre-blocked on yuh calendar
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', padding: 0, flex: 1, minHeight: 0 }}>
        <div style={{ padding: 24, borderRight: '1px solid var(--line)', overflowY: 'auto' }}>
          <label className="label" style={{ marginBottom: 8 }}>How often?</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
            {patterns.map(p => (
              <button key={p.k} onClick={() => setPattern(p.k)}
                style={{
                  padding: 12, borderRadius: 10, textAlign: 'left',
                  background: pattern === p.k ? 'var(--card)' : 'transparent',
                  border: `1px solid ${pattern === p.k ? 'var(--forest)' : 'var(--line)'}`,
                }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.l}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{p.sub}</div>
              </button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>End</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {[
              { k: 'count', l: 'After N bookings' },
              { k: 'date', l: 'On a specific date' },
              { k: 'never', l: 'Never · until cancelled' },
            ].map(o => (
              <label key={o.k} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10,
                background: endType === o.k ? 'var(--card)' : 'transparent',
                border: `1px solid ${endType === o.k ? 'var(--forest)' : 'var(--line)'}`,
                cursor: 'pointer',
              }}>
                <input type="radio" checked={endType === o.k} onChange={() => setEndType(o.k)} />
                <span style={{ fontSize: 13, flex: 1 }}>{o.l}</span>
                {endType === 'count' && o.k === 'count' && (
                  <input type="number" value={count} onChange={e => setCount(parseInt(e.target.value) || 1)}
                    className="input" style={{ width: 70, padding: '4px 8px', fontSize: 12 }} />
                )}
              </label>
            ))}
          </div>

          <div style={{
            padding: 12, background: 'var(--forest-soft)', borderRadius: 10,
            fontSize: 12, color: 'var(--forest)', lineHeight: 1.5,
            borderLeft: '3px solid var(--forest)',
          }}>
            <strong>One tap, then forget.</strong> Reminder goes 2 days before each. {c.name.split(' ')[0]} can skip any one without cancelling the series.
          </div>
        </div>

        <div style={{ padding: 24, background: 'var(--paper-2)', overflowY: 'auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>Next {occurrences.length} bookings</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {occurrences.map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', background: 'var(--card)', borderRadius: 8,
                border: '1px solid var(--line)',
              }}>
                <span style={{ color: 'var(--forest)', fontSize: 14 }}>↻</span>
                <div style={{ flex: 1 }}>
                  <div className="mono" style={{ fontSize: 11.5, fontWeight: 500 }}>
                    {d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>{fmtTime(a.start)} · {s.name}</div>
                </div>
                <button style={{ color: 'var(--muted-2)' }}>{Icon.x({ width: 12, height: 12 })}</button>
              </div>
            ))}
            <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted)', padding: 8 }}>
              + {count - occurrences.length} more
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: '14px 24px', borderTop: '1px solid var(--line)',
        background: 'var(--paper-2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
          BLOCKS {count} SLOTS · WORTH {fmtJ(s.price * count)}
        </span>
        <button className="btn btn-primary btn-sm" onClick={onClose}>
          ↻ Lock the series in
        </button>
      </div>
    </ModalShell>
  );
}

// ────────────── Receipt / proof of service ──────────────
function ReceiptModal({ appt, onClose }) {
  const a = appt || { clientId: 'c3', serviceId: 's3', deposit: 1500, start: 11 };
  const c = findClient(a.clientId);
  const s = findService(a.serviceId);
  const tip = 500;
  const tax = Math.round(s.price * 0.15);
  const total = s.price + tip;

  return (
    <ModalShell onClose={onClose} width={460}>
      <div style={{
        padding: '20px 24px 12px',
        background: 'var(--ink)', color: '#fbf6ec',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, color: '#a89c87' }}>
          {Icon.x({ width: 16, height: 16 })}
        </button>
        <div className="mono" style={{ fontSize: 10, color: '#c89b3d', letterSpacing: '0.1em', marginBottom: 6 }}>
          RECEIPT · PAID
        </div>
        <h2 className="serif" style={{ fontSize: 22, margin: 0, fontWeight: 400 }}>
          Glow Nail Studio
        </h2>
        <div style={{ fontSize: 11.5, color: '#a89c87', marginTop: 4 }}>
          22 Constant Spring Rd · Half-Way-Tree · 876 555 0100
        </div>
      </div>

      {/* tear-line */}
      <div style={{ position: 'relative', height: 14, background: 'var(--ink)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 6px 14px, var(--paper) 6px, transparent 7px) repeat-x',
          backgroundSize: '14px 14px',
        }} />
      </div>

      <div style={{ padding: 22, background: 'var(--paper)' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: 16, paddingBottom: 14, borderBottom: '1px dashed var(--line-2)',
        }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</div>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2 }}>
              TUE 26 MAY 2026 · {fmtTime(a.start).toUpperCase()}
            </div>
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', textAlign: 'right' }}>
            #2026-0317<br/>
            <span style={{ color: 'var(--forest)' }}>✓ CASH</span>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13 }}>
            <span>{s.name}</span>
            <span className="mono">{fmtJ(s.price)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12, color: 'var(--muted)' }}>
            <span>Deposit (paid {DAYS[0]})</span>
            <span className="mono">− {fmtJ(a.deposit)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12, color: 'var(--muted)' }}>
            <span>Tip</span>
            <span className="mono">+ {fmtJ(tip)}</span>
          </div>
          <div style={{ height: 1, background: 'var(--line-2)', margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12, color: 'var(--muted)' }}>
            <span>incl. GCT 15%</span>
            <span className="mono">{fmtJ(tax)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 16, fontWeight: 600 }}>
            <span>Paid</span>
            <span className="mono serif" style={{ fontSize: 24 }}>{fmtJ(total)}</span>
          </div>
        </div>

        {/* stamped paid badge */}
        <div style={{
          marginTop: 10, padding: 10, textAlign: 'center',
          border: '2px solid var(--forest)', color: 'var(--forest)',
          borderRadius: 6, transform: 'rotate(-2deg)', maxWidth: 160, marginLeft: 'auto', marginRight: 'auto',
          fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic', letterSpacing: '0.04em',
        }}>
          ✓ paid in full
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted)', marginTop: 18, lineHeight: 1.6 }}>
          Thanks {c.name.split(' ')[0]} 💚<br/>
          Book again: <span className="mono" style={{ color: 'var(--terracotta)' }}>book.linkupbookings.com/glow</span>
        </div>
      </div>

      <div style={{
        padding: 16, borderTop: '1px solid var(--line)',
        display: 'flex', gap: 8, background: 'var(--paper-2)',
      }}>
        <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
          {Icon.copy({ width: 13, height: 13 })} Save PDF
        </button>
        <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
          {Icon.whatsapp({ width: 13, height: 13 })} Send via WhatsApp
        </button>
      </div>
    </ModalShell>
  );
}

// ────────────── Bulk message composer ──────────────
function BulkMessageModal({ onClose }) {
  const presets = [
    { k: 'lapsed', l: 'Win back lapsed clients', sub: '8 haven\'t booked in 60 days', n: 8, body: 'Hey {first_name}! Mi miss yuh 💚 Been a min — want to come back in? 20% off yuh next gel set this week.' },
    { k: 'birthdays', l: 'Happy birthday wishes', sub: '3 with birthdays this week', n: 3, body: 'Happy birthday {first_name} 🎉 Treat yuhself — 25% off any service for the whole week. Mi link in bio xx' },
    { k: 'fillweek', l: 'Fill quiet weekday slots', sub: 'Thu/Fri opens', n: 12, body: 'Hey {first_name}! 12 slots open Thu & Fri this week — 15% off if yuh grab one. Link: lup.bk/glow' },
    { k: 'announce', l: 'New service announcement', sub: 'All 47 clients', n: 47, body: 'Big news 💅 Now offering Russian almonds! Book yuh slot for grand opening week — first 10 get 30% off.' },
    { k: 'thankyou', l: 'Loyalty thank-you', sub: '11 VIPs / regulars', n: 11, body: 'Tanisha 💚 mi seh "thank yuh" for being so loyal! Free nail art on yuh next visit. See yuh soon ✨' },
    { k: 'custom', l: 'Start from blank', sub: 'Write yuh own', n: 0, body: '' },
  ];

  const [preset, setPreset] = React.useState('lapsed');
  const [channel, setChannel] = React.useState('whatsapp');
  const cur = presets.find(p => p.k === preset);

  return (
    <ModalShell onClose={onClose} width={840}>
      <div style={{ padding: '20px 28px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Bulk message</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>{Icon.x({ width: 16, height: 16 })}</button>
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
          {presets.map(p => (
            <button key={p.k} onClick={() => setPreset(p.k)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '12px 18px',
                background: preset === p.k ? 'var(--card)' : 'transparent',
                borderLeft: preset === p.k ? '3px solid var(--terracotta)' : '3px solid transparent',
                borderBottom: '1px solid var(--line)',
              }}>
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
              { k: 'sms', l: 'SMS', i: Icon.msg },
              { k: 'both', l: 'Both', i: Icon.plus },
            ].map(c => (
              <button key={c.k} onClick={() => setChannel(c.k)} className="chip" style={{
                background: channel === c.k ? 'var(--ink)' : 'var(--card)',
                color: channel === c.k ? '#fbf6ec' : 'var(--ink-2)',
                border: `1px solid ${channel === c.k ? 'var(--ink)' : 'var(--line)'}`,
                cursor: 'pointer', padding: '6px 12px',
              }}>{c.i({ width: 11, height: 11 })} {c.l}</button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>Message</label>
          <textarea
            key={preset}
            defaultValue={cur.body}
            rows="6"
            placeholder="Hey {first_name}…"
            style={{
              width: '100%', padding: 14,
              background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10,
              fontFamily: 'var(--sans)', fontSize: 13.5, lineHeight: 1.55, resize: 'vertical', outline: 'none',
            }}
          />

          <div className="label" style={{ marginTop: 14, marginBottom: 8 }}>Variables</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['{first_name}', '{service}', '{last_visit}', '{booking_link}', '{date}'].map(v => (
              <button key={v} className="chip mono" style={{ fontSize: 10.5, padding: '4px 10px' }}>{v}</button>
            ))}
          </div>

          <div className="label" style={{ marginTop: 18, marginBottom: 8 }}>Schedule</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Send now', 'Tomorrow 9am', 'Friday 5pm', 'Custom…'].map((s, i) => (
              <button key={i} className="chip" style={{
                background: i === 0 ? 'var(--forest-soft)' : 'var(--card)',
                color: i === 0 ? 'var(--forest)' : 'var(--ink-2)',
                border: `1px solid ${i === 0 ? '#cad6c9' : 'var(--line)'}`,
                cursor: 'pointer',
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* preview + outcome */}
        <div style={{ padding: 24, background: 'var(--paper-2)', overflowY: 'auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>WhatsApp preview</div>
          <div style={{ background: '#0d141a', borderRadius: 14, padding: 14, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13 }}>g</div>
              <span style={{ fontSize: 11.5, color: '#e9edef', fontWeight: 500 }}>Glow Nail Studio</span>
            </div>
            <div style={{
              background: '#005c4b', color: '#e9edef',
              padding: '8px 12px', borderRadius: 8, fontSize: 12.5, lineHeight: 1.45,
            }}>
              {(cur.body || 'Yuh message…').replace('{first_name}', 'Aaliyah')}
              <div style={{ fontSize: 9.5, color: '#aebac1', textAlign: 'right', marginTop: 4 }}>11:42 AM ✓✓</div>
            </div>
          </div>

          <div className="label" style={{ marginBottom: 8 }}>Outcome</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              ['Reaches', `${cur.n} ppl`, 'var(--ink)'],
              ['Cost', 'J$0 (WhatsApp Biz)', 'var(--forest)'],
              ['Est. bookings', cur.n > 0 ? `${Math.max(1, Math.round(cur.n * 0.15))}–${Math.max(2, Math.round(cur.n * 0.3))}` : '—', 'var(--terracotta)'],
              ['Est. revenue', cur.n > 0 ? `${fmtJ(Math.round(cur.n * 0.2 * 4500))}` : '—', 'var(--ochre)'],
            ].map(([k, v, c], i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 12px', background: 'var(--card)', borderRadius: 8,
                border: '1px solid var(--line)',
              }}>
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
        <button className="btn btn-terracotta btn-sm" onClick={onClose}>
          {Icon.whatsapp({ width: 13, height: 13 })} Send to {cur.n} clients
        </button>
      </div>
    </ModalShell>
  );
}

// ────────────── Command palette (⌘K) ──────────────
function CommandPalette({ onClose, onNav }) {
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => { inputRef.current?.focus(); }, []);
  React.useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  const sections = [
    {
      l: 'Suggestions',
      items: [
        { l: 'Book Aaliyah again', sub: 'Last: Acrylic chrome · 3 days ago', i: Icon.sparkle, color: 'var(--terracotta)', go: () => onNav('add') },
        { l: 'Block Fri 14:00–17:00', sub: 'School pickup pattern', i: Icon.lock, color: 'var(--ochre)', go: () => onNav('blockoff') },
        { l: 'Send Marsha a birthday note', sub: 'Birthday is June 14', i: Icon.bell, color: 'var(--plum)', go: () => onNav('inbox') },
      ],
    },
    {
      l: 'Actions',
      items: [
        { l: 'New appointment', sub: 'Add a booking', i: Icon.plus, kbd: 'N', go: () => onNav('add') },
        { l: 'Block off time', sub: 'Lunch, school run, holiday', i: Icon.lock, kbd: 'B', go: () => onNav('blockoff') },
        { l: 'Walk-in payment', sub: 'Take payment now', i: Icon.cash, kbd: 'P', go: () => onNav('markpaid') },
        { l: 'Share booking link', sub: 'Copy / WhatsApp / QR', i: Icon.link, kbd: 'S', go: () => onNav('share') },
        { l: 'Bulk message', sub: 'Text a segment', i: Icon.msg, kbd: 'M', go: () => onNav('bulk') },
      ],
    },
    {
      l: 'Go to',
      items: [
        { l: 'Calendar', i: Icon.cal, go: () => onNav('calendar') },
        { l: 'Inbox', i: Icon.msg, go: () => onNav('inbox') },
        { l: 'Clients', i: Icon.users, go: () => onNav('clients') },
        { l: 'Takings', i: Icon.cash, go: () => onNav('money') },
        { l: 'Waitlist', i: Icon.clock, go: () => onNav('waitlist') },
        { l: 'Notifications', i: Icon.bell, go: () => onNav('notifs') },
      ],
    },
    {
      l: 'Clients',
      items: CLIENTS.slice(0, 5).map(c => ({
        l: c.name, sub: `${c.visits} visits · ${c.last}`,
        avatar: c.name,
        go: () => onNav('clients'),
      })),
    },
  ];

  const filtered = sections.map(s => ({
    ...s,
    items: s.items.filter(i => !q || i.l.toLowerCase().includes(q.toLowerCase())),
  })).filter(s => s.items.length);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 600,
        background: 'rgba(20,15,8,0.55)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '12vh',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{
        width: 620, maxWidth: '94%', maxHeight: '70vh',
        background: 'var(--paper)', borderRadius: 16,
        boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        border: '1px solid var(--line)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 18px', borderBottom: '1px solid var(--line)',
          background: 'var(--card-warm)',
        }}>
          <span style={{ color: 'var(--muted)' }}>{Icon.search({ width: 16, height: 16 })}</span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search clients, jump anywhere, run actions…"
            style={{
              flex: 1, border: 'none', background: 'transparent', fontSize: 15,
              fontFamily: 'var(--sans)', padding: 0,
            }}
          />
          <span className="mono" style={{ fontSize: 10, color: 'var(--muted-2)', padding: '2px 6px', background: 'var(--paper-2)', borderRadius: 4, border: '1px solid var(--line)' }}>ESC</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
          {filtered.map((s, si) => (
            <div key={si} style={{ marginBottom: 4 }}>
              <div className="label" style={{ padding: '8px 12px 6px', fontSize: 10 }}>{s.l}</div>
              {s.items.map((it, i) => (
                <button key={i} onClick={() => { it.go?.(); onClose(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    width: '100%', textAlign: 'left',
                    padding: '8px 12px', borderRadius: 8,
                    background: si === 0 && i === 0 ? 'var(--paper-2)' : 'transparent',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--paper-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = (si === 0 && i === 0) ? 'var(--paper-2)' : 'transparent'}
                >
                  {it.avatar ? <Avatar name={it.avatar} size={26} /> : (
                    <div style={{
                      width: 26, height: 26, borderRadius: 6,
                      background: 'var(--card)', border: '1px solid var(--line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: it.color || 'var(--muted)', flexShrink: 0,
                    }}>{it.i({ width: 13, height: 13 })}</div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.2 }}>{it.l}</div>
                    {it.sub && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{it.sub}</div>}
                  </div>
                  {it.kbd && (
                    <span className="mono" style={{ fontSize: 10, color: 'var(--muted-2)', padding: '2px 6px', background: 'var(--card)', borderRadius: 4, border: '1px solid var(--line)' }}>⌘{it.kbd}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          padding: '8px 14px', borderTop: '1px solid var(--line)',
          background: 'var(--paper-2)', display: 'flex', justifyContent: 'space-between',
          fontSize: 10.5, color: 'var(--muted)',
        }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <span><span className="mono">↑↓</span> navigate</span>
            <span><span className="mono">↵</span> open</span>
            <span><span className="mono">⌘K</span> close</span>
          </div>
          <span>Powered by ✨ AI suggestions</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NoShowModal, RecurringModal, ReceiptModal, BulkMessageModal, CommandPalette });
