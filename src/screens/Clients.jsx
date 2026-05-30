import { useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { fmtJ, fmtTime } from '../data/seed.js';
import AddApptModal from '../modals/AddApptModal.jsx';

export default function ClientsScreen() {
  const { clients, appts, services, isPro, addClient } = useApp();
  const [selected, setSelected] = useState(clients[0]);
  const [filter, setFilter] = useState('All');
  const [showDetail, setShowDetail] = useState(false);

  const filters = ['All', 'VIP', 'Regular', 'New'];
  const filtered = clients.filter(c => filter === 'All' || c.tags.includes(filter));

  const vipCount = clients.filter(c => c.tags.includes('VIP')).length;

  const handleSelect = (c) => {
    setSelected(c);
    setShowDetail(true);
  };

  const handleAddClient = () => {
    const next = {
      id: 'c' + Date.now(),
      name: 'New Client',
      phone: '+1 876 555 0199',
      email: '',
      visits: 0,
      lifetime: 0,
      last: 'never',
      tags: ['New'],
      notes: '',
    };
    addClient(next);
    setSelected(next);
    setShowDetail(true);
  };

  const action = (
    <button className="btn btn-primary btn-sm" onClick={handleAddClient}>
      {Icon.plus({ width: 13, height: 13 })} Add client
    </button>
  );

  return (
    <DashboardShell
      title="Clients"
      sub={`${clients.length} contacts · ${vipCount} VIPs`}
      action={action}
    >
      <div style={{ display: 'flex', height: '100%', minHeight: 0 }}>
        {/* List panel */}
        <div className={`clients-list-pane${showDetail ? ' detail-open' : ''}`} style={{
          width: showDetail ? 'auto' : '100%',
          minWidth: showDetail ? 0 : 'auto',
          flex: showDetail ? '0 0 320px' : '1',
          borderRight: showDetail ? '1px solid var(--line)' : 'none',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Filters */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} className="chip" style={{
                background: filter === f ? 'var(--ink)' : 'transparent',
                color: filter === f ? '#fbf6ec' : 'var(--ink-2)',
                border: filter === f ? '1px solid var(--ink)' : '1px solid var(--line)',
                cursor: 'pointer',
              }}>{f}</button>
            ))}
          </div>

          {/* Client rows */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map(c => (
              <button key={c.id} onClick={() => handleSelect(c)} style={{
                width: '100%', textAlign: 'left',
                display: 'flex', gap: 12, alignItems: 'center',
                padding: '14px 16px',
                background: selected?.id === c.id ? 'var(--paper-2)' : 'transparent',
                borderBottom: '1px solid var(--line)',
                borderLeft: selected?.id === c.id ? '3px solid var(--forest)' : '3px solid transparent',
              }}>
                <Avatar name={c.name} size={38} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</span>
                    {c.tags.includes('VIP') && <span style={{ color: 'var(--ochre)' }}>{Icon.star({ width: 11, height: 11 })}</span>}
                  </div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2 }}>
                    {c.visits} VISITS · LAST {c.last.toUpperCase()}
                  </div>
                </div>
                {c.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {c.tags.map(t => (
                      <span key={t} className={`chip chip-${t === 'VIP' ? 'ochre' : t === 'Regular' ? 'forest' : 'terracotta'}`}
                        style={{ fontSize: 10, padding: '1px 8px' }}>{t}</span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {showDetail && selected && (
          <div className="clients-detail-pane" style={{ flex: 1, overflowY: 'auto', background: 'var(--card-warm)', minWidth: 0 }}>
            <ClientDetail
              key={selected.id}
              client={selected}
              appts={appts}
              services={services}
              isPro={isPro}
              onBack={() => setShowDetail(false)}
            />
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

function ClientDetail({ client, appts, services, isPro, onBack }) {
  const { updateClient } = useApp();
  const [tab, setTab] = useState('overview');
  const [notes, setNotes] = useState(client.notes || '');
  const [booking, setBooking] = useState(false);
  const history = appts.filter(a => a.clientId === client.id);

  const saveNotes = () => {
    if (notes !== (client.notes || '')) updateClient(client.id, { notes });
  };

  return (
    <div>
      {/* Mobile back button */}
      <div className="show-mobile" style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest)', fontSize: 13.5 }}>
          {Icon.arrowLeft({ width: 16, height: 16 })} All clients
        </button>
      </div>

      {/* Header */}
      <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <Avatar name={client.name} size={60} />
          <div style={{ flex: 1 }}>
            <h1 className="serif" style={{ margin: 0, fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em' }}>{client.name}</h1>
            <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {Icon.phone({ width: 12, height: 12 })} {client.phone}
              </span>
              {client.email && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {Icon.link({ width: 12, height: 12 })} {client.email}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {client.tags.map(t => (
                <span key={t} className={`chip chip-${t === 'VIP' ? 'ochre' : t === 'Regular' ? 'forest' : 'terracotta'}`}
                  style={{ fontSize: 11 }}>{t}</span>
              ))}
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setBooking(true)}>{Icon.plus({ width: 12, height: 12 })} Book</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 18 }}>
          {[
            { label: 'Total visits', value: client.visits },
            { label: 'Lifetime value', value: fmtJ(client.lifetime) },
            { label: 'Last visit', value: client.last },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
              <div className="serif" style={{ fontSize: 20 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', background: 'var(--card-warm)', padding: '0 28px' }}>
        {['overview', 'appointments', 'notes'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '12px 12px 10px', fontSize: 13, fontWeight: 500,
            color: tab === t ? 'var(--ink)' : 'var(--muted)',
            borderBottom: tab === t ? '2px solid var(--forest)' : '2px solid transparent',
            marginBottom: -1, textTransform: 'capitalize',
          }}>{t}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: '20px 28px' }}>
        {tab === 'overview' && (
          <div>
            <div className="label" style={{ marginBottom: 10 }}>Notes</div>
            <div style={{
              background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10, padding: 16,
              fontSize: 13, lineHeight: 1.6, color: client.notes ? 'var(--ink-2)' : 'var(--muted-2)',
              fontStyle: client.notes ? 'normal' : 'italic',
            }}>
              {client.notes || 'No notes yet. Tap to add.'}
            </div>
          </div>
        )}

        {tab === 'appointments' && (
          <div>
            <div className="label" style={{ marginBottom: 10 }}>{history.length} appointments</div>
            {history.map(a => {
              const s = services.find(service => service.id === a.serviceId) || {};
              return (
                <div key={a.id} style={{
                  display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--line)', alignItems: 'center',
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][a.dayIdx]} · {fmtTime(a.start)}</div>
                  </div>
                  <span className={`chip chip-${a.status === 'confirmed' ? 'forest' : 'ochre'}`} style={{ fontSize: 10 }}>
                    {a.status}
                  </span>
                  {a.deposit > 0 && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{fmtJ(a.deposit)} dep</span>}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'notes' && (
          <div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              onBlur={saveNotes}
              placeholder="Add notes about this client…"
              style={{
                width: '100%', minHeight: 140, padding: '12px 14px',
                background: 'var(--card)', border: '1px solid var(--line)',
                borderRadius: 10, fontSize: 13, lineHeight: 1.6, resize: 'vertical',
              }}
            />
            {!isPro && (
              <div style={{
                marginTop: 12, padding: '12px 14px',
                background: 'var(--terracotta-soft)', borderRadius: 10,
                borderLeft: '3px solid var(--terracotta)',
                fontSize: 12.5, color: '#8d3f1e', lineHeight: 1.5,
              }}>
                Free plan: 3 note lines max. Upgrade for unlimited notes, photos, and intake forms.
              </div>
            )}
          </div>
        )}
      </div>

      {booking && <AddApptModal initialClient={client} onClose={() => setBooking(false)} />}
    </div>
  );
}
