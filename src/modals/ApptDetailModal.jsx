import ModalShell from '../components/ModalShell.jsx';
import { Icon } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { fmtTime, fmtJ, DAYS, DAY_DATES } from '../data/seed.js';

export default function ApptDetailModal({ appt, onClose }) {
  const { clients, services, removeAppt } = useApp();
  const c = clients.find(client => client.id === appt.clientId) || {};
  const s = services.find(service => service.id === appt.serviceId) || {};

  const handleDelete = () => {
    removeAppt(appt.id);
    onClose();
  };

  return (
    <ModalShell onClose={onClose} width={420}>
      <div style={{
        padding: '20px 24px', position: 'relative',
        borderBottom: '1px solid var(--line)',
      }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, color: 'var(--muted)' }}
        >
          {Icon.x({ width: 16, height: 16 })}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '0.08em' }}>
            {s.name?.toUpperCase()}
          </span>
          <span className={`chip chip-${appt.status === 'confirmed' ? 'forest' : 'ochre'}`} style={{ fontSize: 10 }}>
            {appt.status}
          </span>
        </div>
        <div className="serif" style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.1, marginBottom: 8 }}>
          {c.name}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
          {DAYS[appt.dayIdx]?.toUpperCase()} · {DAY_DATES[appt.dayIdx]} MAY · {fmtTime(appt.start).toUpperCase()} – {fmtTime(appt.end).toUpperCase()}
        </div>
      </div>

      <div style={{ padding: '18px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div style={{ padding: 12, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10 }}>
            <div className="label" style={{ marginBottom: 4 }}>Price</div>
            <div className="serif" style={{ fontSize: 20 }}>{fmtJ(s.price)}</div>
          </div>
          <div style={{ padding: 12, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10 }}>
            <div className="label" style={{ marginBottom: 4 }}>Deposit</div>
            <div className="serif" style={{
              fontSize: 20,
              color: appt.deposit > 0 ? 'var(--forest)' : 'var(--muted-2)',
            }}>
              {appt.deposit > 0 ? fmtJ(appt.deposit) : '—'}
            </div>
          </div>
        </div>

        {c.notes && (
          <div style={{
            padding: 12, background: 'var(--paper-2)', borderRadius: 10,
            borderLeft: '3px solid var(--ochre)', marginBottom: 14,
            fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)',
          }}>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>
              CLIENT NOTE
            </div>
            {c.notes}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
            {Icon.whatsapp({ width: 13, height: 13 })} Message
          </button>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
            {Icon.pencil({ width: 13, height: 13 })} Edit
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleDelete} style={{ padding: '6px 10px' }}>
            {Icon.trash({ width: 13, height: 13, style: { color: 'var(--terracotta)' } })}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
