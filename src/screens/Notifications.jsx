import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon } from '../components/shared.jsx';

const NOTIFS = [
  { id: 'n1', t: '11:42 AM', icon: '💬', kind: 'message', who: 'Aaliyah Cooper', body: 'asked about Saturday morning availability', unread: true, color: 'var(--terracotta)' },
  { id: 'n2', t: '11:30 AM', icon: '💚', kind: 'booking', who: 'Keisha Robinson', body: 'booked Gel Mani for Thu 28 May · 3pm via your link', unread: true, color: 'var(--forest)' },
  { id: 'n3', t: '11:14 AM', icon: '✓', kind: 'payment', who: 'Tanisha Bennett', body: 'card payment cleared · J$8,000 in NCB Lynk', unread: true, color: 'var(--forest)' },
  { id: 'n4', t: '10:48 AM', icon: '↻', kind: 'system', who: 'Recurring series', body: 'next 4 bookings created for Marsha H. · Wed at 11am', unread: false, color: 'var(--ochre)' },
  { id: 'n5', t: '10:30 AM', icon: '✨', kind: 'ai', who: 'AI noticed', body: "3 regulars haven't booked in 60+ days — send a win-back blast?", unread: false, color: 'var(--terracotta)' },
  { id: 'n6', t: '9:55 AM', icon: '🎂', kind: 'moment', who: 'Daniella Brown', body: 'has a birthday on June 14 · 19 days away', unread: false, color: 'var(--plum)' },
  { id: 'n7', t: 'Yesterday 5:00 PM', icon: '📨', kind: 'system', who: 'Day-end summary', body: 'sent to your WhatsApp · J$14,800 closed', unread: false, color: 'var(--muted)' },
  { id: 'n8', t: 'Yesterday 4:32 PM', icon: '✓', kind: 'booking', who: 'Tanisha Bennett', body: 'confirmed her Tue 9:30am appointment', unread: false, color: 'var(--forest)' },
  { id: 'n9', t: 'Yesterday 1:00 PM', icon: '×', kind: 'noshow', who: 'Shanique Powell', body: "didn't show · 2nd time this quarter", unread: false, color: 'var(--terracotta)' },
  { id: 'n10', t: 'Yesterday 11:14 AM', icon: '👤', kind: 'system', who: 'New review', body: '★★★★★ from Aaliyah — "Best in HWT, mi nuh trust nobody else"', unread: false, color: 'var(--ochre)' },
];

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState('all');
  const [items, setItems] = React.useState(NOTIFS);
  const unread = items.filter(n => n.unread).length;

  const filters = [
    { k: 'all', l: 'All', n: items.length },
    { k: 'unread', l: 'Unread', n: unread },
    { k: 'booking', l: 'Bookings', n: items.filter(n => ['booking','noshow'].includes(n.kind)).length },
    { k: 'payment', l: 'Payments', n: items.filter(n => n.kind === 'payment').length },
    { k: 'message', l: 'Messages', n: items.filter(n => n.kind === 'message').length },
    { k: 'ai', l: '✨ AI', n: items.filter(n => n.kind === 'ai').length },
  ];

  const shown = items.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return n.unread;
    if (filter === 'booking') return ['booking', 'noshow'].includes(n.kind);
    return n.kind === filter;
  });

  const today = shown.filter(n => !n.t.startsWith('Yesterday'));
  const yest = shown.filter(n => n.t.startsWith('Yesterday'));

  return (
    <DashboardShell
      title="Activity"
      sub={`${unread} unread · everything in one place`}
      action={
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/settings')}>{Icon.settings({ width: 13, height: 13 })} Notif settings</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setItems(list => list.map(n => ({ ...n, unread: false })))} disabled={unread === 0}>Mark all read</button>
        </div>
      }
    >
      <div style={{
        padding: '14px 32px', borderBottom: '1px solid var(--line)',
        background: 'var(--card-warm)', display: 'flex', gap: 6, overflowX: 'auto',
      }} className="no-scroll">
        {filters.map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} className="chip" style={{
            background: filter === f.k ? 'var(--ink)' : 'var(--card)',
            color: filter === f.k ? '#fbf6ec' : 'var(--ink-2)',
            border: `1px solid ${filter === f.k ? 'var(--ink)' : 'var(--line)'}`,
            cursor: 'pointer', flexShrink: 0,
          }}>
            {f.l} <span className="mono" style={{ fontSize: 9.5, opacity: 0.7 }}>{f.n}</span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', background: 'var(--paper)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {today.length > 0 && (
            <>
              <div className="label" style={{ marginBottom: 12 }}>Today</div>
              {today.map(n => <NotifRow key={n.id} n={n} onOpen={() => setItems(list => list.map(item => item.id === n.id ? { ...item, unread: false } : item))} />)}
            </>
          )}
          {yest.length > 0 && (
            <>
              <div className="label" style={{ marginTop: 24, marginBottom: 12 }}>Yesterday</div>
              {yest.map(n => <NotifRow key={n.id} n={n} onOpen={() => setItems(list => list.map(item => item.id === n.id ? { ...item, unread: false } : item))} />)}
            </>
          )}
          {shown.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
              <div style={{ fontSize: 48, opacity: 0.3, marginBottom: 12 }}>🌱</div>
              <div className="serif" style={{ fontSize: 22 }}>No activity in this filter.</div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

function NotifRow({ n, onOpen }) {
  return (
    <button type="button" onClick={onOpen} style={{
      width: '100%', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 14,
      padding: '14px 16px', marginBottom: 6,
      background: n.unread ? 'var(--card)' : 'transparent',
      border: n.unread ? '1px solid var(--line)' : '1px solid transparent',
      borderLeft: n.unread ? `3px solid ${n.color}` : '3px solid transparent',
      borderRadius: 10,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: n.unread ? n.color + '15' : 'var(--paper-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, flexShrink: 0,
      }}>{n.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.45 }}>
          <strong style={{ fontWeight: n.unread ? 600 : 500 }}>{n.who}</strong> {n.body}
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '0.06em', marginTop: 4 }}>
          {n.t.toUpperCase()} · {n.kind.toUpperCase()}
        </div>
      </div>
      {n.unread && (
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, marginTop: 4 }} />
      )}
    </button>
  );
}
