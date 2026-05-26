// Mobile owner view — the primary owner experience on phone
// Plus: morning brief (ka-ching moment), new booking notification

function MobileOwner() {
  const [tab, setTab] = React.useState('today');
  return (
    <div style={{
      minHeight: '100vh', background: '#1a1612',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.5,
        background: 'radial-gradient(circle at 30% 40%, #1c2a1f 0, transparent 60%), radial-gradient(circle at 70% 70%, #3a2a1c 0, transparent 60%)',
      }} />
      <div className="mono" style={{
        position: 'absolute', top: 30, left: 30,
        fontSize: 11, color: '#a89c87', letterSpacing: '0.12em',
      }}>app.linkupbookings.com · owner view</div>

      <div style={{ display: 'flex', gap: 40, position: 'relative', alignItems: 'flex-start' }}>
        {/* First phone: morning brief — the ka-ching moment */}
        <PhoneWithLabel label="6:42 AM · the wake-up" sub="Daily brief lands before your first coffee.">
          <MorningBrief />
        </PhoneWithLabel>

        {/* Second phone: today tab + bottom nav */}
        <PhoneWithLabel label="The today tab" sub="What you check between clients.">
          <MobileTodayTab tab={tab} setTab={setTab} />
        </PhoneWithLabel>

        {/* Third phone: new booking just arrived */}
        <PhoneWithLabel label="Live · a booking lands" sub="Confetti not included. Yet." accent>
          <NewBookingArrived />
        </PhoneWithLabel>
      </div>
    </div>
  );
}

function PhoneWithLabel({ label, sub, children, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        textAlign: 'center', marginBottom: 18, color: '#fbf6ec', maxWidth: 280,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          letterSpacing: '0.12em', color: accent ? 'var(--terracotta)' : '#a89c87',
          marginBottom: 4,
        }}>{label.toUpperCase()}</div>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: '#dccfb6' }}>{sub}</div>
      </div>
      <IOSDevice width={360} height={720}>
        <div style={{ background: 'var(--paper)', minHeight: '100%', paddingTop: 50 }}>
          {children}
        </div>
      </IOSDevice>
    </div>
  );
}

// ──────────────── Morning brief ────────────────
function MorningBrief() {
  return (
    <div>
      {/* greeting */}
      <div style={{ padding: '8px 22px 22px' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>
          TUE · 26 MAY · GOOD MORNING
        </div>
        <h1 className="serif" style={{ fontSize: 32, margin: 0, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.01em' }}>
          Morning Tanya.<br/>
          <span style={{ fontStyle: 'italic', color: 'var(--forest)' }}>3 booked, 1 walk-in slot.</span>
        </h1>
      </div>

      {/* what arrived overnight */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: 'var(--ink)', color: '#fbf6ec',
          borderRadius: 14, padding: '14px 16px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30, width: 100, height: 100,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,155,61,0.4), transparent 70%)',
          }} />
          <div className="mono" style={{ fontSize: 9.5, color: '#c89b3d', letterSpacing: '0.12em', marginBottom: 6 }}>
            WHILE YUH WAS SLEEPING
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
            <div className="serif" style={{ fontSize: 36, lineHeight: 1, fontWeight: 400 }}>+2</div>
            <div style={{ fontSize: 12, color: '#dccfb6' }}>bookings · J$2,375 deposits collected</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { c: 'Aaliyah Cooper', s: 'Pedicure · Sat 11am', t: '11:42 PM' },
              { c: 'Daniella Brown', s: 'Acrylic Full Set · Fri 3pm', t: '2:14 AM' },
            ].map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px',
                background: 'rgba(251,246,236,0.06)', borderRadius: 8,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terracotta)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{b.c}</div>
                  <div style={{ fontSize: 10.5, color: '#a89c87' }}>{b.s}</div>
                </div>
                <div className="mono" style={{ fontSize: 9, color: '#a89c87' }}>{b.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* the day at a glance */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="label" style={{ marginBottom: 8 }}>The day at a glance</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { l: "Today's pace", v: 'J$16,500', sub: '↑ 8% vs last Tue', c: 'var(--forest)' },
            { l: 'First in', v: '9:30am', sub: 'Tanisha B.', c: 'var(--terracotta)' },
            { l: 'Last out', v: '5:00pm', sub: 'home by 5:30', c: 'var(--plum)' },
            { l: 'Reminders sent', v: '3/3', sub: 'auto · last 24h', c: 'var(--moss)' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'var(--card)', padding: 12, borderRadius: 10,
              border: '1px solid var(--line)',
            }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.l}</div>
              <div className="serif" style={{ fontSize: 20, lineHeight: 1, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* heads up */}
      <div style={{ padding: '0 16px 80px' }}>
        <div className="label" style={{ marginBottom: 8 }}>Heads up</div>
        <div style={{
          background: 'var(--terracotta-soft)', borderRadius: 10, padding: 12,
          display: 'flex', alignItems: 'flex-start', gap: 10,
          borderLeft: '3px solid var(--terracotta)',
        }}>
          <span style={{ color: 'var(--terracotta)', marginTop: 2 }}>{Icon.cal({ width: 14, height: 14 })}</span>
          <div style={{ flex: 1, fontSize: 12, color: '#8d3f1e', lineHeight: 1.4 }}>
            <strong>Daniella's birthday is in 18 days.</strong> She booked her usual acrylic for Friday — want to send a happy-birthday discount code?
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────── Today tab (the daily driver) ────────────────
function MobileTodayTab({ tab, setTab }) {
  return (
    <div style={{ paddingBottom: 80 }}>
      {/* glanceable header */}
      <div style={{ padding: '6px 22px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>TUE · 26 MAY</div>
            <h1 className="serif" style={{ fontSize: 28, margin: '2px 0 0', fontWeight: 400, lineHeight: 1 }}>Today</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="serif" style={{ fontSize: 22, fontWeight: 400, color: 'var(--forest)', lineHeight: 1 }}>J$16.5k</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>EXPECTED</div>
          </div>
        </div>
      </div>

      {/* up next — hero */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: 'var(--ink)', color: '#fbf6ec',
          borderRadius: 16, padding: 18, position: 'relative', overflow: 'hidden',
        }}>
          <div className="mono" style={{ fontSize: 9.5, color: '#c89b3d', letterSpacing: '0.1em', marginBottom: 8 }}>
            UP NEXT · IN 22 MIN
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Avatar name="Aaliyah Cooper" size={42} />
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1.05, fontWeight: 400 }}>Aaliyah Cooper</div>
              <div style={{ fontSize: 11, color: '#a89c87', marginTop: 2 }}>Pedicure · 11:00 – 12:15</div>
            </div>
          </div>
          <div style={{
            background: 'rgba(200,155,61,0.12)', borderLeft: '2px solid var(--ochre)',
            padding: '8px 10px', borderRadius: 4,
            fontSize: 11.5, lineHeight: 1.4, marginBottom: 12,
            fontStyle: 'italic',
          }}>
            "Loves chrome finish. Books every 3 weeks like clockwork."
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ flex: 1, background: 'rgba(251,246,236,0.95)', color: 'var(--ink)', padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              {Icon.whatsapp({ width: 12, height: 12 })} Message
            </button>
            <button style={{ flex: 1, background: 'rgba(251,246,236,0.1)', color: '#fbf6ec', padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 500, border: '1px solid rgba(251,246,236,0.15)' }}>
              On their way?
            </button>
          </div>
        </div>
      </div>

      {/* rest of day timeline */}
      <div style={{ padding: '8px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div className="label">Rest of today</div>
          <button className="mono" style={{ fontSize: 10, color: 'var(--forest)', letterSpacing: '0.06em' }}>+ BLOCK OFF</button>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {[
          { t: '1:00pm', c: 'Marsha Henry', s: 'Acrylic Full Set', d: 120, color: 'var(--forest)', dep: 'J$2,000' },
          { t: '—', c: 'Open slot', s: '3:00 – 4:30 · 90 min', d: 90, color: null, open: true },
          { t: '4:30pm', c: 'Keisha R.', s: 'Gel Manicure', d: 60, color: 'var(--terracotta)', dep: 'J$1,000' },
        ].map((a, i) => a.open ? (
          <button key={i} style={{
            width: '100%', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 12,
            padding: 12, marginBottom: 8,
            background: 'transparent', border: '1px dashed var(--line-2)',
            borderRadius: 12,
          }}>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', width: 50 }}>OPEN</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>{a.s}</div>
              <div style={{ fontSize: 11, color: 'var(--terracotta)', marginTop: 2 }}>Tap to fill — text last-month clients</div>
            </div>
            <span style={{ color: 'var(--terracotta)' }}>{Icon.sparkle({ width: 14, height: 14 })}</span>
          </button>
        ) : (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: 12, marginBottom: 8,
            background: 'var(--card)', border: '1px solid var(--line)',
            borderLeft: `3px solid ${a.color}`, borderRadius: 12,
          }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 50 }}>{a.t}</div>
            <Avatar name={a.c} size={28} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{a.c}</div>
              <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>{a.s}</div>
            </div>
            {a.dep && <span className="chip chip-forest" style={{ fontSize: 9.5, padding: '1px 6px' }}>✓ {a.dep}</span>}
          </div>
        ))}
      </div>

      {/* bottom nav */}
      <MobileBottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

function MobileBottomNav({ tab, setTab }) {
  const tabs = [
    { k: 'today', l: 'Today', i: Icon.clock },
    { k: 'cal',   l: 'Calendar', i: Icon.cal },
    { k: 'add',   l: '', i: Icon.plus, primary: true },
    { k: 'clients', l: 'Clients', i: Icon.users },
    { k: 'more', l: 'More', i: Icon.settings },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(251,246,236,0.85)', backdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--line)',
      padding: '8px 16px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
    }}>
      {tabs.map(t => (
        t.primary ? (
          <button key={t.k} style={{
            width: 50, height: 50, borderRadius: '50%',
            background: 'var(--forest)', color: '#fbf6ec',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(12,74,45,0.35)',
            marginTop: -18,
          }}>{t.i({ width: 22, height: 22 })}</button>
        ) : (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: tab === t.k ? 'var(--ink)' : 'var(--muted)',
            padding: '4px 8px',
          }}>
            {t.i({ width: 18, height: 18 })}
            <span style={{ fontSize: 9.5, fontWeight: 500 }}>{t.l}</span>
          </button>
        )
      ))}
    </div>
  );
}

// ──────────────── New booking arrived ────────────────
function NewBookingArrived() {
  return (
    <div style={{ position: 'relative' }}>
      {/* lock screen-ish — toast at top */}
      <div style={{
        position: 'absolute', top: 56, left: 12, right: 12, zIndex: 10,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
        borderRadius: 16, padding: '12px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        display: 'flex', alignItems: 'flex-start', gap: 10,
        animation: 'slideIn 600ms ease',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16,
          flexShrink: 0,
        }}>L</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#000' }}>LinkUpBookings</span>
            <span style={{ fontSize: 10, color: '#666' }}>now</span>
          </div>
          <div style={{ fontSize: 13, color: '#000', lineHeight: 1.3 }}>
            <strong>One drop in 💚</strong> Daniella booked Acrylic Full Set · Fri 3pm. Deposit J$2,000 paid.
          </div>
        </div>
      </div>

      {/* the underlying detail screen — already updated */}
      <div style={{ opacity: 0.55, filter: 'blur(0.5px)', pointerEvents: 'none' }}>
        <div style={{ padding: '4px 22px 18px' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>NEW · JUST IN</div>
          <h1 className="serif" style={{ fontSize: 26, margin: '4px 0 0', fontWeight: 400, lineHeight: 1.05 }}>
            Booking from <span style={{ fontStyle: 'italic' }}>Daniella Brown</span>
          </h1>
        </div>
      </div>

      <div style={{ padding: '0 16px 16px', marginTop: 80 }}>
        <div style={{
          background: 'var(--card)', borderRadius: 16, padding: 18,
          border: '1px solid var(--line)',
          borderLeft: '4px solid var(--terracotta)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <Avatar name="Daniella Brown" size={42} />
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.05 }}>Daniella Brown</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>2nd visit · birthday June 14</div>
            </div>
            <span className="chip chip-terracotta" style={{ fontSize: 10 }}>NEW</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
            {[
              ['Service', 'Acrylic Full Set'],
              ['When', 'Fri 29 May · 3:00pm'],
              ['Price', 'J$8,000'],
              ['Paid', 'J$2,000 deposit'],
            ].map(([k, v], i) => (
              <div key={i} style={{ background: 'var(--card)', padding: '10px 12px' }}>
                <div style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 12, padding: 10, background: 'var(--paper-2)',
            borderRadius: 8, fontSize: 11.5, lineHeight: 1.4,
            color: 'var(--ink-2)',
          }}>
            <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em' }}>HER NOTE: </span>
            "Birthday weekend! Soft pink with chrome accent please."
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button className="btn btn-primary" style={{ flex: 1, padding: '10px 0' }}>
            {Icon.whatsapp({ width: 14, height: 14 })} Say thanks
          </button>
          <button className="btn btn-secondary" style={{ flex: 1, padding: '10px 0' }}>
            {Icon.cal({ width: 14, height: 14 })} View in calendar
          </button>
        </div>
        <div style={{
          padding: '10px 12px', background: 'var(--forest-soft)', borderRadius: 8,
          fontSize: 11.5, color: 'var(--forest)', textAlign: 'center', lineHeight: 1.4,
        }}>
          Auto-reminder set for <strong>Thu 28 May, 3pm</strong> · 24 hrs ahead
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

window.MobileOwner = MobileOwner;
