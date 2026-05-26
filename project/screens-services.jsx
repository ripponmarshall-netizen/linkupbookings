// Services management — finally a real page for the sidebar nav item
function ServicesScreen({ isPro, onNav, onUpgrade, onShareLink }) {
  const [selected, setSelected] = React.useState(SERVICES[0].id);
  const sel = SERVICES.find(s => s.id === selected);

  return (
    <DashboardShell
      active="services"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Services"
      sub="What yuh offer, what it cost."
      action={<button className="btn btn-primary btn-sm">{Icon.plus({ width: 13, height: 13 })} New service</button>}
    >
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* list */}
        <div style={{
          width: 360, borderRight: '1px solid var(--line)',
          background: 'var(--card-warm)', display: 'flex', flexDirection: 'column', flexShrink: 0,
        }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
            <div className="label">5 active · 1 add-on</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.1em', padding: '8px 8px 6px' }}>
              SERVICES
            </div>
            {SERVICES.map((s, i) => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8, marginBottom: 2,
                  background: selected === s.id ? 'var(--card)' : 'transparent',
                  border: selected === s.id ? '1px solid var(--line)' : '1px solid transparent',
                }}>
                <span style={{ color: 'var(--muted)', cursor: 'grab', fontFamily: 'var(--mono)', fontSize: 12 }}>≡</span>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
                    {s.duration}MIN · {fmtJ(s.price)}
                  </div>
                </div>
                {s.id === 's4' && <span className="chip" style={{ fontSize: 9, padding: '1px 5px' }}>ADD-ON</span>}
              </button>
            ))}

            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.1em', padding: '14px 8px 6px' }}>
              CATEGORIES
            </div>
            {['Nails', 'Pedi', 'Add-ons'].map(c => (
              <div key={c} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', fontSize: 12.5, color: 'var(--ink-2)',
              }}>
                <span style={{ color: 'var(--muted)' }}>📁</span>
                <span style={{ flex: 1 }}>{c}</span>
                <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>
                  {c === 'Nails' ? 2 : c === 'Pedi' ? 1 : 2}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* edit panel */}
        {sel && <ServiceEditPanel service={sel} />}
      </div>
    </DashboardShell>
  );
}

function ServiceEditPanel({ service }) {
  return (
    <div style={{ flex: 1, display: 'flex', minWidth: 0 }}>
      {/* form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 32, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: service.color + '18',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: service.color }} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="serif" style={{ margin: 0, fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em' }}>
              {service.name}
            </h2>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '0.06em', marginTop: 2 }}>
              {service.duration} MIN · {fmtJ(service.price)} · BOOKED 18× IN MAY
            </div>
          </div>
          <button className="btn btn-secondary btn-sm">{Icon.trash({ width: 13, height: 13, style: { color: 'var(--terracotta)' } })}</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label className="label">Name</label>
            <input className="input" defaultValue={service.name} />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="select" defaultValue="Nails"><option>Nails</option><option>Pedi</option><option>Add-ons</option></select>
          </div>
          <div>
            <label className="label">Duration (minutes)</label>
            <input className="input" defaultValue={service.duration} />
          </div>
          <div>
            <label className="label">Price (J$)</label>
            <input className="input" defaultValue={service.price.toLocaleString()} />
          </div>
        </div>

        <label className="label">Description</label>
        <textarea className="textarea" rows="3"
          defaultValue="Soak-off gel polish with a precise shape and finish. Lasts 2-3 weeks. Includes basic cuticle work."
          style={{ marginBottom: 18, resize: 'none' }}
        />

        <Card padding={4}>
          <div style={{ padding: '0 18px' }}>
            <Row label="Online booking" sub="Show this service on yuh booking page">
              <Toggle on={true} onChange={() => {}} />
            </Row>
            <Row label="Deposit" sub="Override the default 25%">
              <div style={{ display: 'flex', gap: 6 }}>
                {[0, 10, 25, 50].map(n => (
                  <button key={n} className="chip" style={{
                    background: n === 25 ? 'var(--ink)' : 'var(--card)',
                    color: n === 25 ? '#fbf6ec' : 'var(--ink)',
                    border: n === 25 ? '1px solid var(--ink)' : '1px solid var(--line)',
                    cursor: 'pointer',
                  }}>{n === 0 ? 'None' : `${n}%`}</button>
                ))}
                <input className="input" placeholder="flat J$" style={{ width: 80, fontSize: 12 }} />
              </div>
            </Row>
            <Row label="Color tag" sub="Shows on the calendar">
              <div style={{ display: 'flex', gap: 6 }}>
                {['#c4663d', '#0c4a2d', '#6a3a4a', '#c89b3d', '#4d6a48'].map(c => (
                  <button key={c} style={{
                    width: 28, height: 28, borderRadius: 6, background: c,
                    border: c === service.color ? '2px solid var(--ink)' : '1px solid var(--line)',
                  }} />
                ))}
              </div>
            </Row>
            <Row label="Allow add-ons" sub="Clients can stack Nail Art onto this booking" last>
              <Toggle on={true} onChange={() => {}} />
            </Row>
          </div>
        </Card>

        <div className="label" style={{ marginTop: 18 }}>Intake form</div>
        <Card padding={20}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Do you have any allergies?', 'Optional · text'],
              ['Preferred nail shape', 'Optional · choice'],
              ['Anything else?', 'Optional · long text'],
            ].map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                <span style={{ color: 'var(--muted)', cursor: 'grab' }}>≡</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{q[0]}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>{q[1].toUpperCase()}</div>
                </div>
                <button style={{ color: 'var(--muted)' }}>{Icon.pencil({ width: 12, height: 12 })}</button>
                <button style={{ color: 'var(--muted)' }}>{Icon.x({ width: 12, height: 12 })}</button>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start', marginTop: 4 }}>
              {Icon.plus({ width: 12, height: 12 })} Add question
            </button>
          </div>
        </Card>
      </div>

      {/* preview */}
      <div style={{ width: 320, borderLeft: '1px solid var(--line)', padding: 24, background: 'var(--card-warm)', flexShrink: 0 }}>
        <div className="label" style={{ marginBottom: 10 }}>How clients see it</div>
        <div style={{
          background: 'var(--card)', borderRadius: 12,
          border: '1px solid var(--line)', padding: 14,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: service.color + '18',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: service.color }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{service.name}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
              {service.duration} MIN · {fmtJ(service.price)}
            </div>
          </div>
          {Icon.chev({ width: 14, height: 14, style: { color: 'var(--muted-2)' } })}
        </div>

        <div className="label" style={{ marginTop: 22, marginBottom: 10 }}>This month</div>
        <div style={{ background: 'var(--card)', borderRadius: 12, border: '1px solid var(--line)', padding: 4 }}>
          {[
            ['Bookings', '18'],
            ['Revenue', fmtJ(63000)],
            ['Avg. tip', fmtJ(450)],
            ['Repeat rate', '67%'],
          ].map(([k, v], i, arr) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 14px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{k}</span>
              <span className="mono" style={{ fontSize: 12.5, fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.ServicesScreen = ServicesScreen;
