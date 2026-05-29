import { useEffect, useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { fmtJ } from '../data/seed.js';

const COLOR_CHOICES = ['#c4663d', '#0c4a2d', '#6a3a4a', '#c89b3d', '#4d6a48'];

const blankService = () => ({
  id: 's' + Date.now(),
  name: 'New Service',
  duration: 60,
  price: 3500,
  color: COLOR_CHOICES[0],
  category: 'Nail',
  description: '',
});

export default function ServicesScreen() {
  const { services, addService, updateService, removeService } = useApp();
  const [selectedId, setSelectedId] = useState(services[0]?.id ?? null);
  const [showEdit, setShowEdit] = useState(false);
  const selected = services.find(s => s.id === selectedId) ?? services[0];

  useEffect(() => {
    if (!selectedId && services[0]) setSelectedId(services[0].id);
    if (selectedId && services.length && !services.some(s => s.id === selectedId)) {
      setSelectedId(services[0].id);
    }
  }, [selectedId, services]);

  const handleAdd = () => {
    const service = blankService();
    addService(service);
    setSelectedId(service.id);
    setShowEdit(true);
  };

  const handleRemove = () => {
    if (!selected || services.length === 1) return;
    removeService(selected.id);
    setSelectedId(services.find(s => s.id !== selected.id)?.id ?? null);
    setShowEdit(false);
  };

  const action = (
    <button className="btn btn-primary btn-sm" onClick={handleAdd}>
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
            {services.map((s) => (
              <button key={s.id} onClick={() => { setSelectedId(s.id); setShowEdit(true); }} style={{
                width: '100%', textAlign: 'left',
                display: 'flex', gap: 14, alignItems: 'center',
                padding: '16px 20px', borderBottom: '1px solid var(--line)',
                background: selected?.id === s.id ? 'var(--paper-2)' : 'transparent',
                borderLeft: selected?.id === s.id ? '3px solid var(--forest)' : '3px solid transparent',
              }}>
                <div style={{ color: 'var(--muted-2)', cursor: 'grab' }}>⠿</div>
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

        {showEdit && selected && (
          <ServiceEditor
            key={selected.id}
            service={selected}
            canDelete={services.length > 1}
            onBack={() => setShowEdit(false)}
            onSave={(patch) => updateService(selected.id, patch)}
            onDelete={handleRemove}
          />
        )}
      </div>
    </DashboardShell>
  );
}

function ServiceEditor({ service, canDelete, onBack, onSave, onDelete }) {
  const [form, setForm] = useState({
    name: service.name,
    category: service.category ?? 'Nail',
    duration: service.duration,
    price: service.price,
    color: service.color,
    description: service.description ?? '',
  });
  const [saved, setSaved] = useState(false);

  const setField = (field, value) => {
    setSaved(false);
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      ...form,
      name: form.name.trim() || 'Untitled service',
      duration: Math.max(15, Number(form.duration) || 60),
      price: Math.max(0, Number(form.price) || 0),
    });
    setSaved(true);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--card-warm)', minWidth: 0 }}>
      <div className="show-mobile" style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest)', fontSize: 13.5 }}>
          {Icon.arrowLeft({ width: 16, height: 16 })} All services
        </button>
      </div>

      <div style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, background: form.color }} />
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{form.name || 'Untitled service'}</h2>
          {saved && <span className="chip chip-forest" style={{ marginLeft: 'auto' }}>Saved</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div>
            <div className="label" style={{ marginBottom: 6 }}>Service name</div>
            <input className="input" value={form.name} onChange={e => setField('name', e.target.value)} />
          </div>
          <div>
            <div className="label" style={{ marginBottom: 6 }}>Category</div>
            <select className="select" value={form.category} onChange={e => setField('category', e.target.value)}>
              <option>Nail</option><option>Hair</option><option>Skin</option><option>Other</option>
            </select>
          </div>
          <div>
            <div className="label" style={{ marginBottom: 6 }}>Duration (minutes)</div>
            <input className="input" type="number" min="15" step="15" value={form.duration} onChange={e => setField('duration', e.target.value)} />
          </div>
          <div>
            <div className="label" style={{ marginBottom: 6 }}>Price (J$)</div>
            <input className="input" type="number" min="0" step="500" value={form.price} onChange={e => setField('price', e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div className="label" style={{ marginBottom: 6 }}>Client-facing colour</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {COLOR_CHOICES.map(color => (
              <button
                key={color}
                type="button"
                aria-label={`Choose ${color}`}
                onClick={() => setField('color', color)}
                style={{
                  width: 32, height: 32, borderRadius: 9, background: color,
                  border: form.color === color ? '3px solid var(--ink)' : '3px solid var(--card)',
                  boxShadow: '0 0 0 1px var(--line)',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div className="label" style={{ marginBottom: 6 }}>Description (shown to clients)</div>
          <textarea className="textarea" rows={3} value={form.description} onChange={e => setField('description', e.target.value)} placeholder="Describe this service…" style={{ resize: 'none' }} />
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 16, marginBottom: 18 }}>
          <div className="label" style={{ marginBottom: 12 }}>This month</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Bookings', value: '9' },
              { label: 'Revenue', value: fmtJ((Number(form.price) || 0) * 9) },
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
          <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>Save changes</button>
          <button
            className="btn btn-secondary"
            disabled={!canDelete}
            title={canDelete ? 'Delete service' : 'Keep at least one service'}
            onClick={onDelete}
            style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)', opacity: canDelete ? 1 : 0.5 }}
          >
            {Icon.trash({ width: 14, height: 14 })}
          </button>
        </div>
      </div>
    </div>
  );
}
