// Reminders & messages editor — template editor with live phone preview
function RemindersScreen({ isPro, onNav, onUpgrade, onShareLink }) {
  const [tab, setTab] = React.useState('24h');
  const [draft, setDraft] = React.useState({
    '24h': {
      title: '24-hour reminder',
      sent: 'Sent automatically 24 hours before the appointment',
      body: "Hey {first_name} 👋\n\nJus' a heads up — yuh booked for {service} at Glow tomorrow ({time}). Looking forward to seeing yuh!\n\nNeed to move it? Tap here: {reschedule_link}\n\n— Tanya",
      enabled: true, channel: 'whatsapp',
    },
    '2h': {
      title: '2-hour reminder',
      sent: 'Sent 2 hours before, in case yuh client forget',
      body: "Hey {first_name}! See yuh at 11:00am for yuh {service} 💅 Address: 23 Constant Spring Rd. Parking out back.",
      enabled: true, channel: 'sms',
    },
    'thanks': {
      title: 'Thank-you + review',
      sent: 'Sent 3 hours after the appointment ends',
      body: "Thanks for di love today {first_name}! 🌿 If yuh have 30 seconds, would yuh leave us a quick review? It really helps the studio:\n\n{review_link}",
      enabled: true, channel: 'whatsapp',
    },
    'birthday': {
      title: 'Birthday treat',
      sent: 'Sent the morning of their birthday',
      body: "Happy birthday {first_name}! 🎂 Treat yuhself — 15% off any service this week. Just show this when yuh come.",
      enabled: false, channel: 'whatsapp',
    },
    'winback': {
      title: 'We miss yuh',
      sent: "Sent if a client hasn't booked in 60 days",
      body: "Hey {first_name}, it's been a minute! Booking page is here whenever yuh ready: {booking_link}. Hope yuh good. 💚",
      enabled: false, channel: 'sms',
    },
  });

  const current = draft[tab];

  return (
    <DashboardShell
      active="reminders"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Reminders & messages"
      sub="Auto-sent so yuh don't haffi remember"
      action={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="chip chip-forest" style={{ fontSize: 11 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--forest)' }} />
            327 sent this month · 4 no-shows avoided
          </span>
        </div>
      }
    >
      <div style={{ display: 'flex', flex: 1, minHeight: 0, background: 'var(--paper)' }}>
        {/* template list */}
        <div style={{
          width: 280, borderRight: '1px solid var(--line)',
          padding: '20px 16px', flexShrink: 0,
        }}>
          <div className="label" style={{ marginBottom: 10, padding: '0 6px' }}>Templates</div>
          {Object.entries(draft).map(([k, t]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{
                width: '100%', textAlign: 'left',
                padding: 12, borderRadius: 10, marginBottom: 4,
                background: tab === k ? 'var(--card)' : 'transparent',
                border: tab === k ? '1px solid var(--line)' : '1px solid transparent',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: t.enabled ? 'var(--forest)' : 'var(--line-2)',
                }} />
                <span style={{ fontSize: 13, fontWeight: tab === k ? 500 : 400 }}>{t.title}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', paddingLeft: 16, lineHeight: 1.3 }}>
                {t.sent.replace(/^Sent /, '').replace(/^Sent$/, '')}
              </div>
            </button>
          ))}

          <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: 12, justifyContent: 'flex-start' }}>
            {Icon.plus({ width: 13, height: 13 })} Custom message
          </button>
        </div>

        {/* editor */}
        <div style={{ flex: 1, padding: 32, overflowY: 'auto', minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, maxWidth: 1100 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div>
                  <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400 }}>{current.title}</h2>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{current.sent}</div>
                </div>
                <button
                  onClick={() => setDraft({ ...draft, [tab]: { ...current, enabled: !current.enabled } })}
                  className="chip"
                  style={{
                    background: current.enabled ? 'var(--forest)' : 'var(--paper-2)',
                    color: current.enabled ? '#fbf6ec' : 'var(--muted)',
                    border: current.enabled ? '1px solid var(--forest)' : '1px solid var(--line)',
                  }}>
                  {current.enabled ? '✓ ON' : 'OFF'}
                </button>
              </div>

              {/* channel */}
              <div style={{ marginBottom: 18 }}>
                <label className="label">Send via</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[
                    { k: 'whatsapp', l: 'WhatsApp', i: Icon.whatsapp, c: '#25d366' },
                    { k: 'sms',      l: 'SMS',      i: Icon.msg,      c: 'var(--forest)' },
                    { k: 'both',     l: 'Both',     i: Icon.bell,     c: 'var(--terracotta)' },
                  ].map(c => (
                    <button key={c.k}
                      onClick={() => setDraft({ ...draft, [tab]: { ...current, channel: c.k } })}
                      style={{
                        padding: '10px 14px', borderRadius: 10, flex: 1,
                        background: current.channel === c.k ? 'var(--card)' : 'transparent',
                        border: current.channel === c.k ? `1px solid ${c.c}` : '1px solid var(--line)',
                        color: current.channel === c.k ? c.c : 'var(--ink)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        fontSize: 13, fontWeight: 500,
                      }}>
                      {c.i({ width: 14, height: 14 })} {c.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* message */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label className="label" style={{ margin: 0 }}>Message</label>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{current.body.length} CHARS</span>
                </div>
                <textarea
                  value={current.body}
                  onChange={e => setDraft({ ...draft, [tab]: { ...current, body: e.target.value } })}
                  rows="8"
                  style={{
                    width: '100%', padding: 14,
                    background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12,
                    fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.55, color: 'var(--ink)',
                    resize: 'vertical', outline: 'none',
                  }}
                />
              </div>

              {/* tokens */}
              <div style={{ marginBottom: 22 }}>
                <div className="label" style={{ marginBottom: 8 }}>Drop in</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['{first_name}', '{service}', '{time}', '{date}', '{reschedule_link}', '{review_link}', '{booking_link}', '{deposit}'].map(t => (
                    <button key={t} className="chip" style={{
                      fontFamily: 'var(--mono)', fontSize: 11,
                      background: 'var(--card)',
                      cursor: 'pointer',
                    }}>{t}</button>
                  ))}
                </div>
              </div>

              {/* impact */}
              <div style={{
                background: 'var(--forest-soft)', borderRadius: 12,
                padding: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
                border: '1px solid #cad6c9',
              }}>
                <div>
                  <div className="mono" style={{ fontSize: 9.5, color: 'var(--forest)', letterSpacing: '0.08em', marginBottom: 4 }}>SENT</div>
                  <div className="serif" style={{ fontSize: 22, color: 'var(--forest)', lineHeight: 1 }}>184</div>
                  <div style={{ fontSize: 10, color: 'var(--forest)', opacity: 0.75 }}>last 30 days</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 9.5, color: 'var(--forest)', letterSpacing: '0.08em', marginBottom: 4 }}>READ</div>
                  <div className="serif" style={{ fontSize: 22, color: 'var(--forest)', lineHeight: 1 }}>96%</div>
                  <div style={{ fontSize: 10, color: 'var(--forest)', opacity: 0.75 }}>WhatsApp blue ticks</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 9.5, color: 'var(--forest)', letterSpacing: '0.08em', marginBottom: 4 }}>NO-SHOWS</div>
                  <div className="serif" style={{ fontSize: 22, color: 'var(--forest)', lineHeight: 1 }}>-71%</div>
                  <div style={{ fontSize: 10, color: 'var(--forest)', opacity: 0.75 }}>vs. no reminder</div>
                </div>
              </div>
            </div>

            {/* preview phone */}
            <div>
              <div className="label" style={{ marginBottom: 12 }}>Preview — what Aaliyah sees</div>
              <PhonePreview body={current.body} channel={current.channel} />
              <div style={{ marginTop: 14, fontSize: 11, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.5 }}>
                Tokens like <span className="mono" style={{ color: 'var(--ink)' }}>{'{first_name}'}</span> get replaced live.
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function PhonePreview({ body, channel }) {
  // simple token replace
  const filled = body
    .replace(/{first_name}/g, 'Aaliyah')
    .replace(/{service}/g, 'Pedicure')
    .replace(/{time}/g, '11:00am')
    .replace(/{date}/g, 'Sat 30 May')
    .replace(/{reschedule_link}/g, 'lup.bk/r/A9K2')
    .replace(/{review_link}/g, 'lup.bk/r/A9K2')
    .replace(/{booking_link}/g, 'book.linkupbookings.com/glow')
    .replace(/{deposit}/g, 'J$1,500');

  const wa = channel === 'whatsapp' || channel === 'both';

  return (
    <div style={{
      background: '#0a0a08',
      borderRadius: 28, padding: 12,
      boxShadow: 'var(--shadow-lg)',
    }}>
      <div style={{
        background: wa ? '#0d141a' : '#000',
        borderRadius: 22,
        padding: '14px 14px 14px',
        minHeight: 380,
        backgroundImage: wa ? 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect width=%22200%22 height=%22200%22 fill=%22%230d141a%22/></svg>")' : 'none',
      }}>
        {/* status */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: 11,
          color: wa ? '#aebac1' : '#888', marginBottom: 16,
        }}>
          <span>9:41</span>
          <span>5G ▮▮▮</span>
        </div>

        {wa ? (
          <>
            {/* WA header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18,
              paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ color: '#aebac1' }}>{Icon.chev({ width: 14, height: 14, style: { transform: 'scaleX(-1)' } })}</div>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18,
              }}>g</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#e9edef', fontWeight: 500 }}>Glow Nail Studio</div>
                <div style={{ fontSize: 10.5, color: '#8696a0' }}>business · last seen now</div>
              </div>
            </div>

            {/* message bubble */}
            <div style={{
              background: '#005c4b', color: '#e9edef',
              padding: '8px 10px 6px',
              borderRadius: 8, borderTopRightRadius: 2,
              maxWidth: '88%', marginLeft: 'auto',
              fontSize: 13.5, lineHeight: 1.45,
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}>
              {filled}
              <div style={{ fontSize: 10, color: '#aebac1', textAlign: 'right', marginTop: 4 }}>
                9:00 AM ✓✓
              </div>
            </div>

            <div style={{ marginTop: 8, fontSize: 9.5, color: '#5a6a72', textAlign: 'center', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>
              SENT VIA LINKUPBOOKINGS
            </div>
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', color: '#888', fontSize: 11, marginBottom: 20 }}>
              Today 9:00 AM
            </div>
            <div style={{
              background: '#28282a', color: '#e9edef',
              padding: '10px 14px', borderRadius: 18,
              maxWidth: '88%', fontSize: 13.5, lineHeight: 1.45,
              whiteSpace: 'pre-wrap', wordWrap: 'break-word',
            }}>{filled}</div>
            <div style={{ marginTop: 6, fontSize: 10, color: '#666', paddingLeft: 4 }}>
              GLOW · +1 876 555 0100
            </div>
          </>
        )}
      </div>
    </div>
  );
}

window.RemindersScreen = RemindersScreen;
