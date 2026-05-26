// Owner dashboard — sidebar + main area + calendar view

function Sidebar({ active, onNav, isPro, onUpgrade, onShareLink }) {
  const nav = [
    { key: 'calendar', label: 'Calendar', icon: Icon.cal },
    { key: 'inbox',    label: 'Messages', icon: Icon.msg, badge: 3 },
    { key: 'clients',  label: 'Clients',  icon: Icon.users },
    { key: 'money',    label: 'Takings',  icon: Icon.cash },
    { key: 'reminders', label: 'Reminders', icon: Icon.bell, pro: true },
    { key: 'analytics', label: 'Analytics', icon: Icon.chart, pro: true },
    { key: 'services', label: 'Services', icon: Icon.sparkle },
    { key: 'settings', label: 'Settings', icon: Icon.settings },
  ];
  return (
    <div style={{
      width: 240, background: 'var(--paper-2)',
      borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column',
      padding: '20px 16px', flexShrink: 0,
    }}>
      {/* business switcher */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: 10, marginBottom: 18,
        background: 'var(--card)', borderRadius: 10, border: '1px solid var(--line)',
        cursor: 'pointer',
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 18,
        }}>g</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.1 }}>Glow Nail Studio</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Half-Way-Tree</div>
        </div>
        {Icon.chevDown({ width: 12, height: 12, style: { color: 'var(--muted)' } })}
      </div>

      {/* primary action */}
      <button className="btn btn-primary" style={{ marginBottom: 18, width: '100%' }} onClick={() => onNav('add')}>
        {Icon.plus({ width: 14, height: 14 })} New appointment
      </button>

      {/* nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {nav.map(n => (
          <button
            key={n.key}
            onClick={() => onNav(n.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 8,
              background: active === n.key ? 'var(--card)' : 'transparent',
              color: active === n.key ? 'var(--ink)' : 'var(--ink-2)',
              fontSize: 13.5, fontWeight: active === n.key ? 500 : 400,
              border: active === n.key ? '1px solid var(--line)' : '1px solid transparent',
              textAlign: 'left',
            }}
          >
            <span style={{ color: active === n.key ? 'var(--forest)' : 'var(--muted)' }}>
              {n.icon({ width: 16, height: 16 })}
            </span>
            <span style={{ flex: 1 }}>{n.label}</span>
            {n.badge && (
              <span style={{
                background: 'var(--terracotta)', color: '#fbf6ec',
                fontSize: 10, padding: '1px 7px', borderRadius: 999,
                fontFamily: 'var(--mono)', fontWeight: 500,
              }}>{n.badge}</span>
            )}
            {n.pro && !isPro && (
              <span className="chip chip-terracotta" style={{ fontSize: 9, padding: '1px 6px' }}>PRO</span>
            )}
          </button>
        ))}
      </div>

      {/* share link button — pro feature */}
      <button
        onClick={isPro ? onShareLink : onUpgrade}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 12px', borderRadius: 10,
          background: 'var(--card)', border: '1px solid var(--line)',
          fontSize: 12.5, color: 'var(--ink-2)',
          marginBottom: 12, textAlign: 'left',
        }}
      >
        <span style={{ color: 'var(--forest)' }}>{Icon.link({ width: 14, height: 14 })}</span>
        <span style={{ flex: 1 }}>{isPro ? 'Share booking link' : 'Get a booking link'}</span>
        {!isPro && Icon.lock({ width: 12, height: 12, style: { color: 'var(--muted)' } })}
      </button>

      {/* trial banner */}
      {!isPro && (
        <div style={{
          background: 'var(--ink)', color: '#fbf6ec',
          padding: 14, borderRadius: 12, position: 'relative', overflow: 'hidden',
        }}>
          <div className="mono" style={{ fontSize: 9, color: '#c89b3d', letterSpacing: '0.1em', marginBottom: 4 }}>
            TRIAL · 11 DAYS LEFT
          </div>
          <div className="serif" style={{ fontSize: 18, lineHeight: 1.1, marginBottom: 10, fontStyle: 'italic' }}>
            Keep the link & deposits.
          </div>
          <button
            onClick={onUpgrade}
            style={{
              background: 'var(--terracotta)', color: '#fbf6ec',
              padding: '6px 12px', borderRadius: 6, fontSize: 12,
              fontWeight: 500, width: '100%',
            }}
          >
            Upgrade — J$400/mo
          </button>
        </div>
      )}

      {/* account */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)',
      }}>
        <Avatar name="Tanya Williams" size={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.1 }}>Tanya W.</div>
          <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>Owner</div>
        </div>
      </div>
    </div>
  );
}

function TopBar({ title, sub, action, onSearch }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px', borderBottom: '1px solid var(--line)',
      background: 'var(--paper)',
    }}>
      <div>
        <h1 className="serif" style={{ margin: 0, fontSize: 32, lineHeight: 1, letterSpacing: '-0.01em', fontWeight: 400 }}>
          {title}
        </h1>
        {sub && <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--card)', border: '1px solid var(--line)',
          padding: '7px 10px', borderRadius: 8, width: 220,
        }}>
          <span style={{ color: 'var(--muted)' }}>{Icon.search({ width: 13, height: 13 })}</span>
          <input className="mono" placeholder="Search clients, appts..."
            style={{ border: 'none', background: 'transparent', flex: 1, width: '100%', fontSize: 12, padding: 0 }} />
          <span className="mono" style={{ fontSize: 10, color: 'var(--muted-2)' }}>⌘K</span>
        </div>
        <button className="btn btn-secondary btn-sm" style={{ padding: '7px 9px' }}>
          {Icon.bell({ width: 14, height: 14 })}
        </button>
        {action}
      </div>
    </div>
  );
}

// ──────────────── calendar week view ────────────────

function CalendarHeader({ view, onView, onAdd, onBlockOff }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', borderBottom: '1px solid var(--line)',
      background: 'var(--card-warm)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button className="btn btn-secondary btn-sm">Today</button>
        <div style={{ display: 'flex', gap: 2 }}>
          <button className="btn btn-ghost btn-sm" style={{ padding: 6 }}>{Icon.chev({ width: 14, height: 14, style: { transform: 'scaleX(-1)' } })}</button>
          <button className="btn btn-ghost btn-sm" style={{ padding: 6 }}>{Icon.chev({ width: 14, height: 14 })}</button>
        </div>
        <div className="serif" style={{ fontSize: 22 }}>{MONTH} <span style={{ color: 'var(--muted)' }}>· week 22</span></div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{
          display: 'flex', background: 'var(--paper-2)', borderRadius: 8,
          padding: 2, border: '1px solid var(--line)',
        }}>
          {['day', 'week', 'month'].map(v => (
            <button key={v}
              onClick={() => onView(v)}
              style={{
                padding: '5px 12px', borderRadius: 6,
                background: view === v ? 'var(--card)' : 'transparent',
                color: view === v ? 'var(--ink)' : 'var(--muted)',
                fontSize: 12, fontWeight: 500,
                textTransform: 'capitalize',
                boxShadow: view === v ? '0 1px 2px rgba(40,30,10,0.06)' : 'none',
              }}
            >{v}</button>
          ))}
        </div>
        <button className="btn btn-secondary btn-sm" onClick={onBlockOff}>
          {Icon.lock({ width: 12, height: 12 })} Block off
        </button>
        <button className="btn btn-primary btn-sm" onClick={onAdd}>
          {Icon.plus({ width: 13, height: 13 })} New
        </button>
      </div>
    </div>
  );
}

function WeekGrid({ onAppt, emptyData }) {
  const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const HEIGHT = 60;
  const TODAY_IDX = 1; // Tue

  const appts = emptyData ? [] : APPTS;
  const blocks = emptyData ? [] : BLOCKS;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: '1px solid var(--line)', background: 'var(--card-warm)', position: 'sticky', top: 0, zIndex: 2 }}>
        <div />
        {DAYS.map((d, i) => (
          <div key={i} style={{
            padding: '12px 12px 10px', textAlign: 'left',
            borderLeft: '1px solid var(--line)',
            background: i === TODAY_IDX ? 'var(--card)' : 'transparent',
          }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d}</div>
            <div className="serif" style={{
              fontSize: 22, lineHeight: 1, marginTop: 2,
              color: i === TODAY_IDX ? 'var(--terracotta)' : 'var(--ink)',
              fontStyle: i === TODAY_IDX ? 'italic' : 'normal',
            }}>{DAY_DATES[i]}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', position: 'relative' }}>
        {/* hour gutter */}
        <div>
          {HOURS.map(h => (
            <div key={h} style={{ height: HEIGHT, position: 'relative' }}>
              <div className="mono" style={{
                position: 'absolute', top: -7, right: 8,
                fontSize: 10, color: 'var(--muted)',
              }}>{fmtTime(h)}</div>
            </div>
          ))}
        </div>
        {/* day columns */}
        {DAYS.map((d, di) => (
          <div key={di} style={{
            borderLeft: '1px solid var(--line)',
            position: 'relative',
            background: di === TODAY_IDX ? 'rgba(255,255,255,0.6)' : 'transparent',
          }}>
            {HOURS.map((h, hi) => (
              <div key={h} style={{
                height: HEIGHT,
                borderBottom: hi === HOURS.length - 1 ? 'none' : '1px dashed var(--line)',
              }} />
            ))}
            {/* "now" line on today */}
            {di === TODAY_IDX && (
              <div style={{
                position: 'absolute', left: 0, right: 0,
                top: (11.25 - HOURS[0]) * HEIGHT,
                height: 0, borderTop: '2px solid var(--terracotta)',
                zIndex: 1,
              }}>
                <div style={{
                  position: 'absolute', left: -4, top: -5,
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--terracotta)',
                }} />
              </div>
            )}
            {/* block-off slots */}
            {blocks.filter(b => b.dayIdx === di).map(b => {
              const top = (b.start - HOURS[0]) * HEIGHT;
              const h = (b.end - b.start) * HEIGHT;
              return (
                <div key={b.id} style={{
                  position: 'absolute', top: top, left: 0, right: 0,
                  height: h,
                  background: 'repeating-linear-gradient(135deg, rgba(122,112,98,0.10) 0 8px, rgba(122,112,98,0.16) 8px 16px)',
                  borderTop: '1px dashed var(--muted-2)',
                  borderBottom: '1px dashed var(--muted-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 9.5,
                    color: 'var(--muted)', letterSpacing: '0.06em',
                    textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4,
                    background: 'rgba(251,246,236,0.85)', padding: '2px 6px', borderRadius: 3,
                  }}>
                    {b.recurring && <span>↻</span>}
                    {b.reason}
                  </div>
                </div>
              );
            })}
            {appts.filter(a => a.dayIdx === di).map(a => {
              const svc = findService(a.serviceId);
              const cli = findClient(a.clientId);
              const top = (a.start - HOURS[0]) * HEIGHT;
              const h = (a.end - a.start) * HEIGHT;
              return (
                <button
                  key={a.id}
                  onClick={() => onAppt(a)}
                  style={{
                    position: 'absolute', top: top + 2, left: 4, right: 4,
                    height: h - 4,
                    background: a.status === 'pending' ? 'var(--paper-2)' : svc.color + '15',
                    borderLeft: `3px solid ${svc.color}`,
                    borderTop: a.status === 'pending' ? '1px dashed var(--line-2)' : 'none',
                    borderRight: a.status === 'pending' ? '1px dashed var(--line-2)' : 'none',
                    borderBottom: a.status === 'pending' ? '1px dashed var(--line-2)' : 'none',
                    borderRadius: 6, padding: '5px 8px',
                    textAlign: 'left', overflow: 'hidden',
                    cursor: 'pointer', transition: 'transform 80ms',
                    zIndex: 2,
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <div style={{ fontSize: 11.5, fontWeight: 500, color: svc.color, lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {a.recurring && <span style={{ fontSize: 11, opacity: 0.7 }}>↻</span>}
                    {cli.name.split(' ')[0]} {cli.name.split(' ')[1]?.[0]}.
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-2)', marginTop: 1 }}>{svc.name}</div>
                  {h >= 60 && (
                    <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', marginTop: 4 }}>
                      {fmtTime(a.start)} – {fmtTime(a.end)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function TodayPanel({ onAppt, onFillSlot }) {
  const todays = APPTS.filter(a => a.dayIdx === 1).sort((a, b) => a.start - b.start);
  const upcoming = todays.find(a => a.start > 11);

  return (
    <div style={{
      width: 320, borderLeft: '1px solid var(--line)',
      background: 'var(--card-warm)', display: 'flex', flexDirection: 'column',
      flexShrink: 0, overflow: 'auto',
    }}>
      <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid var(--line)' }}>
        <div className="label" style={{ marginBottom: 6 }}>Up next</div>
        {upcoming && (() => {
          const c = findClient(upcoming.clientId);
          const s = findService(upcoming.serviceId);
          return (
            <div style={{ marginTop: 8 }}>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1.05, marginBottom: 4 }}>
                {c.name}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginBottom: 12 }}>
                {s.name} · {fmtTime(upcoming.start)}
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                  {Icon.whatsapp({ width: 12, height: 12 })} Message
                </button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                  {Icon.phone({ width: 12, height: 12 })} Call
                </button>
              </div>
              <div style={{
                background: 'var(--paper-2)', borderRadius: 8, padding: '10px 12px',
                fontSize: 12, lineHeight: 1.45, color: 'var(--ink-2)',
                borderLeft: '3px solid var(--ochre)',
              }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>NOTE</div>
                {c.notes || 'No notes yet.'}
              </div>
            </div>
          );
        })()}
      </div>

      <div style={{ padding: '16px 22px' }}>
        <div className="label" style={{ marginBottom: 12 }}>Today · {todays.length} appts</div>
        {todays.map(a => {
          const c = findClient(a.clientId);
          const s = findService(a.serviceId);
          return (
            <button key={a.id}
              onClick={() => onAppt(a)}
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '12px 0', borderBottom: '1px solid var(--line)',
              }}
            >
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 44, paddingTop: 2 }}>
                {fmtTime(a.start)}
              </div>
              <Avatar name={c.name} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{s.name}</div>
              </div>
              {a.deposit > 0 && (
                <span className="chip chip-forest" style={{ fontSize: 10, padding: '1px 6px' }}>
                  ✓ {fmtJ(a.deposit)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* daily takings */}
      <div style={{ padding: '16px 22px', borderTop: '1px solid var(--line)' }}>
        <div className="label" style={{ marginBottom: 8 }}>Today's takings</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="serif" style={{ fontSize: 30, fontWeight: 400 }}>J$16,500</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--forest)' }}>↑ 8%</div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>vs. last Tue</div>
      </div>

      {/* Fill empty slot — the killer feature */}
      <div style={{ padding: '0 22px 22px', marginTop: 'auto' }}>
        <div style={{
          background: 'var(--ink)', color: '#fbf6ec',
          borderRadius: 12, padding: '14px 16px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -20, width: 80, height: 80,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,102,61,0.32), transparent 65%)',
          }} />
          <div className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.1em', marginBottom: 6 }}>
            ✨ OPPORTUNITY
          </div>
          <div style={{ fontSize: 12.5, lineHeight: 1.45, marginBottom: 10 }}>
            <strong>Thu 3pm is empty.</strong> Want to text 12 regulars a 15% same-week offer?
          </div>
          <button style={{
            background: 'var(--terracotta)', color: '#fbf6ec',
            padding: '6px 12px', borderRadius: 6, fontSize: 11.5, fontWeight: 500, width: '100%',
          }} onClick={onFillSlot}>Send the blast</button>
        </div>
      </div>
    </div>
  );
}

function DashboardShell({ active, isPro, onNav, onUpgrade, onShareLink, onAppt, onAddAppt, children, title, sub, action }) {
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--paper)' }}>
      <Sidebar active={active} onNav={onNav} isPro={isPro} onUpgrade={onUpgrade} onShareLink={onShareLink} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title={title} sub={sub} action={action} />
        {children}
      </div>
    </div>
  );
}

function CalendarScreen({ isPro, onNav, onUpgrade, onShareLink, onAppt, onAddAppt, onBlockOff, onFillSlot, onMarkPaid, emptyData }) {
  const [view, setView] = React.useState('week');
  return (
    <DashboardShell
      active="calendar"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Calendar"
      sub={emptyData ? 'Yuh first day. Let\'s get a booking in there.' : 'Tue · 26 May 2026'}
      action={!emptyData && <button className="btn btn-secondary btn-sm" onClick={onMarkPaid}>{Icon.cash({ width: 13, height: 13 })} Walk-in payment</button>}
    >
      <div style={{ display: 'flex', flex: 1, minHeight: 0, position: 'relative' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <CalendarHeader view={view} onView={setView} onAdd={onAddAppt} onBlockOff={onBlockOff} />
          <WeekGrid onAppt={onAppt} emptyData={emptyData} />
        </div>
        {emptyData ? <EmptyDayPanel onAddAppt={onAddAppt} onShareLink={onShareLink} /> : <TodayPanel onAppt={onAppt} onFillSlot={onFillSlot} />}
        {emptyData && <EmptyOverlay onAddAppt={onAddAppt} onShareLink={onShareLink} />}
      </div>
    </DashboardShell>
  );
}

function EmptyOverlay({ onAddAppt, onShareLink }) {
  // floating soft suggestion above the week grid, positioned over the empty calendar
  return (
    <div style={{
      position: 'absolute', top: 90, left: '38%', transform: 'translateX(-50%)',
      background: 'var(--card)', border: '1px solid var(--line)',
      borderRadius: 14, padding: 18, boxShadow: 'var(--shadow-md)',
      maxWidth: 320, pointerEvents: 'auto', zIndex: 3,
    }}>
      <div className="mono" style={{ fontSize: 9.5, color: 'var(--terracotta)', letterSpacing: '0.1em', marginBottom: 6 }}>✨ GETTING STARTED</div>
      <div className="serif" style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.1, marginBottom: 8 }}>
        Yuh diary <span style={{ fontStyle: 'italic' }}>empty</span>. Bless.
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 14px' }}>
        Drop in a regular yuh already book with paper, or share yuh link and wait for the first one.
      </p>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn btn-primary btn-sm" onClick={onAddAppt}>{Icon.plus({ width: 12, height: 12 })} First appointment</button>
        <button className="btn btn-secondary btn-sm" onClick={onShareLink}>{Icon.link({ width: 12, height: 12 })} Share link</button>
      </div>
    </div>
  );
}

function EmptyDayPanel({ onAddAppt, onShareLink }) {
  return (
    <div style={{
      width: 320, borderLeft: '1px solid var(--line)',
      background: 'var(--card-warm)', display: 'flex', flexDirection: 'column',
      flexShrink: 0, padding: 22,
    }}>
      <div className="label" style={{ marginBottom: 14 }}>Yuh first week</div>

      {/* setup checklist */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 4, marginBottom: 16 }}>
        {[
          ['Set yuh hours', true],
          ['Add yuh services', true],
          ['Upload a logo', false],
          ['Share yuh booking link', false],
          ['Get yuh first booking', false],
        ].map(([l, done], i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px',
            borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
          }}>
            <span style={{
              width: 16, height: 16, borderRadius: '50%',
              background: done ? 'var(--forest)' : 'transparent',
              border: done ? 'none' : '1.5px solid var(--line-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fbf6ec',
            }}>{done && Icon.check({ width: 10, height: 10 })}</span>
            <span style={{
              fontSize: 12.5, flex: 1,
              color: done ? 'var(--muted)' : 'var(--ink)',
              textDecoration: done ? 'line-through' : 'none',
            }}>{l}</span>
          </div>
        ))}
      </div>

      <div className="label" style={{ marginBottom: 8 }}>Try this</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="btn btn-primary" onClick={onAddAppt} style={{ justifyContent: 'flex-start' }}>
          {Icon.plus({ width: 13, height: 13 })} Add yuh first appointment
        </button>
        <button className="btn btn-secondary" onClick={onShareLink} style={{ justifyContent: 'flex-start' }}>
          {Icon.link({ width: 13, height: 13 })} Copy yuh booking link
        </button>
      </div>

      <div style={{
        marginTop: 'auto', padding: 14, background: 'var(--terracotta-soft)',
        borderRadius: 10, fontSize: 12, lineHeight: 1.5, color: '#8d3f1e',
        borderLeft: '3px solid var(--terracotta)',
      }}>
        👋 Watch this 60-second walkthrough on getting yuh first 10 clients online.
      </div>
    </div>
  );
}

Object.assign(window, { CalendarScreen, DashboardShell, Sidebar, TopBar });
