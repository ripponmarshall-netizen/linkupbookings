// Day-end summary screen — generated WhatsApp card, shareable

function DayEndScreen({ isPro, onNav, onUpgrade, onShareLink }) {
  const [share, setShare] = React.useState('me'); // me | accountant | family
  const [tone, setTone] = React.useState('warm'); // warm | strict | quick
  return (
    <DashboardShell
      active="dayend"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Day-end summary"
      sub="Tue · 26 May 2026 · auto-generated at 6pm"
      action={
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-secondary btn-sm">Yesterday</button>
          <button className="btn btn-secondary btn-sm">Pick date</button>
        </div>
      }
    >
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', background: 'var(--paper)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, maxWidth: 1180, margin: '0 auto' }}>
          {/* breakdown */}
          <div>
            <div style={{
              background: 'var(--ink)', color: '#fbf6ec',
              borderRadius: 16, padding: '28px 28px 22px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -60, right: -60, width: 220, height: 220,
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,155,61,0.25), transparent 60%)',
              }} />
              <div className="mono" style={{ fontSize: 10, color: '#c89b3d', letterSpacing: '0.1em', marginBottom: 12 }}>
                TODAY · CLOSED OUT
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
                <div className="serif" style={{ fontSize: 84, lineHeight: 0.92, fontWeight: 400 }}>J$16,500</div>
                <div style={{ color: '#a89c87' }}>
                  <div style={{ fontSize: 13 }}>↑ 8% vs last Tue</div>
                  <div className="mono" style={{ fontSize: 10, marginTop: 2 }}>3 SERVICES · 1 TIP · 1 NO-SHOW</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                {[
                  ['Cash', 'J$8,500', 'var(--ochre)'],
                  ['NCB Lynk', 'J$6,000', 'var(--ochre)'],
                  ['Tips', 'J$500', 'var(--ochre)'],
                  ['No-show fee', 'J$1,500', 'var(--terracotta)'],
                ].map(([l, v, c], i) => (
                  <div key={i}>
                    <div className="mono" style={{ fontSize: 9.5, color: '#a89c87', letterSpacing: '0.08em', marginBottom: 4 }}>{l.toUpperCase()}</div>
                    <div className="serif" style={{ fontSize: 22, color: c, fontWeight: 400 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* events of the day */}
            <div className="label" style={{ marginTop: 28, marginBottom: 12 }}>What happened today</div>
            <div style={{
              background: 'var(--card)', border: '1px solid var(--line)',
              borderRadius: 12, padding: 4,
            }}>
              {[
                { t: '9:30am', e: '✓', l: 'Tanisha B. · Gel Manicure · paid J$3,500 + J$500 tip', c: 'var(--forest)' },
                { t: '11:00am', e: '✓', l: 'Aaliyah C. · Pedicure · paid J$4,500 cash', c: 'var(--forest)' },
                { t: '1:00pm', e: '×', l: 'Marsha H. no-show — Acrylic · J$1,500 fee charged', c: 'var(--terracotta)' },
                { t: '1:30pm', e: '∙', l: 'Walked in Daniella B. into the slot · paid J$8,000 Lynk', c: 'var(--ochre)' },
                { t: '3:00pm', e: '∙', l: 'Filled empty Thu 3pm via waitlist · Keisha booked', c: 'var(--ochre)' },
                { t: '4:42pm', e: '🎂', l: 'Daniella B. birthday next month · auto-reminder set', c: 'var(--plum)' },
              ].map((row, i, arr) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '12px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 56 }}>{row.t}</div>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: row.c === 'var(--forest)' ? 'var(--forest-soft)'
                              : row.c === 'var(--terracotta)' ? 'var(--terracotta-soft)'
                              : 'var(--paper-2)',
                    color: row.c, fontWeight: 600, fontSize: 13,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{row.e}</div>
                  <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)' }}>{row.l}</div>
                </div>
              ))}
            </div>

            {/* tomorrow */}
            <div className="label" style={{ marginTop: 28, marginBottom: 12 }}>Heads-up · Wed 27 May</div>
            <div style={{
              background: 'var(--forest-soft)', border: '1px solid #cad6c9',
              borderLeft: '3px solid var(--forest)',
              borderRadius: 10, padding: 16, color: 'var(--forest)',
            }}>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, marginBottom: 10 }}>
                <strong>4 appointments · J$18,500 booked.</strong> First in at 9:00am — Tanisha for a Gel Mani.
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.55, opacity: 0.85 }}>
                Block: school run 3:30–4:30pm. One open slot at 11am — already on 2 waitlists.
              </div>
            </div>
          </div>

          {/* shareable card preview */}
          <div>
            <div className="label" style={{ marginBottom: 12 }}>Share this summary</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {[
                { k: 'me', l: 'To myself' },
                { k: 'accountant', l: 'Accountant' },
                { k: 'family', l: 'Family' },
              ].map(o => (
                <button key={o.k} onClick={() => setShare(o.k)} className="chip" style={{
                  background: share === o.k ? 'var(--ink)' : 'var(--card)',
                  color: share === o.k ? '#fbf6ec' : 'var(--ink-2)',
                  border: `1px solid ${share === o.k ? 'var(--ink)' : 'var(--line)'}`,
                  cursor: 'pointer', flex: 1, justifyContent: 'center',
                }}>{o.l}</button>
              ))}
            </div>

            {/* preview card — image-ready */}
            <div style={{
              background: '#0d141a', borderRadius: 16, padding: 16,
            }}>
              <div style={{
                background: 'var(--paper)', color: 'var(--ink)',
                borderRadius: 12, padding: '20px 18px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -10, right: -10, width: 120, height: 120,
                  borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,102,61,0.18), transparent 60%)',
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13 }}>g</div>
                  <span className="serif" style={{ fontSize: 14, fontStyle: 'italic' }}>Glow · day close</span>
                  <span className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', marginLeft: 'auto', letterSpacing: '0.06em' }}>26 MAY</span>
                </div>

                <div className="serif" style={{ fontSize: 42, fontWeight: 400, lineHeight: 0.98, marginBottom: 4 }}>
                  J$16,500
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginBottom: 14 }}>
                  ↑ 8% better than last Tuesday
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
                  {[
                    ['Done', '3'], ['No-show', '1'], ['Tomorrow', '4'],
                  ].map(([l, v], i) => (
                    <div key={i} style={{
                      padding: '8px 10px', background: 'var(--card)', borderRadius: 8,
                      border: '1px solid var(--line)',
                    }}>
                      <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.06em' }}>{l.toUpperCase()}</div>
                      <div className="serif" style={{ fontSize: 18 }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{
                  fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.5,
                  fontStyle: 'italic', borderTop: '1px dashed var(--line)', paddingTop: 10,
                }}>
                  {share === 'accountant' && '"Auto-tagged for GCT. CSV in inbox."'}
                  {share === 'me' && '"Solid day. Take a glass of wine 🍷"'}
                  {share === 'family' && '"All good at the salon today 💚"'}
                </div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--muted-2)', textAlign: 'right', marginTop: 8, letterSpacing: '0.06em' }}>
                  via LINKUPBOOKINGS
                </div>
              </div>
            </div>

            {/* tone */}
            <div className="label" style={{ marginTop: 18, marginBottom: 8 }}>Tone</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
              {[
                { k: 'warm', l: 'Warm' },
                { k: 'strict', l: 'Just numbers' },
                { k: 'quick', l: '1-liner' },
              ].map(o => (
                <button key={o.k} onClick={() => setTone(o.k)} className="chip" style={{
                  background: tone === o.k ? 'var(--terracotta-soft)' : 'var(--card)',
                  color: tone === o.k ? '#8d3f1e' : 'var(--ink-2)',
                  border: `1px solid ${tone === o.k ? '#e6cdba' : 'var(--line)'}`,
                  cursor: 'pointer', flex: 1, justifyContent: 'center',
                }}>{o.l}</button>
              ))}
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginBottom: 8 }}>
              {Icon.whatsapp({ width: 14, height: 14 })} Send to myself on WhatsApp
            </button>
            <button className="btn btn-secondary" style={{ width: '100%' }}>
              {Icon.copy({ width: 14, height: 14 })} Save as image
            </button>

            <div style={{
              marginTop: 18, padding: 14,
              background: 'var(--paper-2)', borderRadius: 10,
              fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5,
            }}>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '0.08em', marginBottom: 4 }}>SCHEDULED</div>
              Auto-sends every weekday at 6:30pm to your WhatsApp · <a href="#" style={{ color: 'var(--forest)' }}>change</a>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

window.DayEndScreen = DayEndScreen;
