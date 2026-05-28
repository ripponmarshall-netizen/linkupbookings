import { useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { fmtJ } from '../data/seed.js';

export default function ServicesScreen() {
  const { services } = useApp();
  const [selected, setSelected] = useState(services[0]);
  const [showEdit, setShowEdit] = useState(false);

  const action = (
    <button className="btn btn-primary btn-sm">
      {Icon.plus({ width: 13, height: 13 })} Add service
    </button>
  );

  return (
    <DashboardShell title="Services" sub={`${services.length} services listed`} action={action}>
      <div style={{ display: 'flex', height: '100%', minHeight: 0 }}>
        {/* List */}
        <div style={{
          width: showEdit ? 'auto' : '100%',
          flex: showEdit ? '0 0 300px' : '1',
          borderRight: showEdit ? '1px solid var(--line)' : 'none',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {services.map((s, i) => (
              <button key={s.id} onClick={() => { setSelected(s); setShowEdit(true); }} style={{
                width: '100%', textAlign: 'left',
                display: 'flex', gap: 14, alignItems: 'center',
                padding: '16px 20px', borderBottom: '1px solid var(--line)',
                background: selected?.id === s.id ? 'var(--paper-2)' : 'transparent',
                borderLeft: selected?.id === s.id ? '3px solid var(--forest)' : '3px solid transparent',
              }}>
                {/* Drag handle */}
                <div style={{ color: 'var(--muted-2)', cursor: 'grab' }}>⠿</div>
                {/* Color dot */}
                <div style={{ width: 14, height: 14, borderRadius: 4, background: s.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2 }}>
                    {s.duration} MIN · {fmtJ(s.price)}
                  </div>
                </div>
                {Icon.chev({ width: 14, height: 14, style: { color: 'var(--muted)' } })}
              </button>
            ))}
          </div>
        </div>

        {/* Edit panel */}
        {showEdit && selected && (
          <div style={{ flex: 1, overflowY: 'auto', background: 'var(--card-warm)', minWidth: 0 }}>
            {/* Mobile back */}
            <div className="show-mobile" style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
              <button onClick={() => setShowEdit(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest)', fontSize: 13.5 }}>
                {Icon.arrowLeft({ width: 16, height: 16 })} All services
              </button>
            </div>

            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: selected.color }} />
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{selected.name}</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                <div>
                  <div className="label" style={{ marginBottom: 6 }}>Service name</div>
                  <input className="input" defaultValue={selected.name} key={selected.id} />
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 6 }}>Category</div>
                  <select className="select" defaultValue="Nail">
                    <option>Nail</option><option>Hair</option><option>Skin</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 6 }}>Duration (minutes)</div>
                  <input className="input" type="number" defaultValue={selected.duration} key={selected.id + 'd'} />
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 6 }}>Price (J$)</div>
                  <input className="input" type="number" defaultValue={selected.price} key={selected.id + 'p'} />
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div className="label" style={{ marginBottom: 6 }}>Description (shown to clients)</div>
                <textarea className="textarea" rows={3} placeholder="Describe this service…" style={{ resize: 'none' }} />
              </div>

              {/* Performance stats */}
              <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 16, marginBottom: 18 }}>
                <div className="label" style={{ marginBottom: 12 }}>This month</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[
                    { label: 'Bookings', value: '9' },
                    { label: 'Revenue', value: fmtJ(selected.price * 9) },
                    { label: 'Avg tip', value: 'J$450' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>{label}</div>
                      <div className="serif" style={{ fontSize: 22 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-primary" style={{ flex: 1 }}>Save changes</button>
                <button className="btn btn-secondary" style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
                  {Icon.trash({ width: 14, height: 14 })}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
