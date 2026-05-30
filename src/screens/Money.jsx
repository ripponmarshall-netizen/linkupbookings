import { useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { fmtJ, fmtTime } from '../data/seed.js';
import MarkPaidModal from '../modals/MarkPaidModal.jsx';
import { clampProgress, findNextUnpaidAppointment } from '../utils/payments.js';

const TODAY_IDX = 1;

export default function MoneyScreen() {
  const { appts, clients, services } = useApp();
  const [tab, setTab] = useState('today');
  const [paymentAppt, setPaymentAppt] = useState(null);
  const nextUnpaid = findNextUnpaidAppointment(appts, TODAY_IDX);

  const action = (
    <div style={{ display: 'flex', gap: 6 }}>
      <button className="btn btn-secondary btn-sm hide-mobile">Export CSV</button>
      <button className="btn btn-secondary btn-sm hide-mobile">For accountant</button>
      <button className="btn btn-primary btn-sm" disabled={!nextUnpaid} onClick={() => setPaymentAppt(nextUnpaid)}>
        {Icon.cash({ width: 13, height: 13 })} Mark paid
      </button>
    </div>
  );

  return (
    <>
      <DashboardShell title="Takings" sub="Cash, card, deposits — reconciled" action={action}>
        {/* Tab switcher */}
        <div className="tab-bar" style={{ flexWrap: 'wrap' }}>
          <div className="seg-toggle">
            {[['today','Today'],['week','This week'],['month','May']].map(([k,l]) => (
              <button
                key={k}
                className={`seg-toggle-item ${tab === k ? 'active' : ''}`}
                style={{ textTransform: 'none' }}
                onClick={() => setTab(k)}
              >{l}</button>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>TUE · 26 MAY · UPDATED 11:42 AM</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {tab === 'today' && <TodayCloseOut appts={appts} clients={clients} services={services} onMarkPaid={setPaymentAppt} />}
          {tab === 'week'  && <WeekTakings appts={appts} services={services} />}
          {tab === 'month' && <MonthTakings />}
        </div>
      </DashboardShell>

      {paymentAppt && <MarkPaidModal appt={paymentAppt} onClose={() => setPaymentAppt(null)} />}
    </>
  );
}

function TodayCloseOut({ appts, clients, services, onMarkPaid }) {
  const findClient = (id) => clients.find(c => c.id === id) || {};
  const findService = (id) => services.find(s => s.id === id) || {};
  const todaysAppts = appts.filter(a => a.dayIdx === TODAY_IDX);
  const paid   = todaysAppts.filter(a => a.paid);
  const unpaid = todaysAppts.filter(a => !a.paid);

  const totalRevenue  = paid.reduce((s, a) => s + findService(a.serviceId).price, 0);
  const totalDeposits = todaysAppts.reduce((s, a) => s + (a.deposit || 0), 0);
  const totalTips     = paid.reduce((s, a) => s + (a.tip || 0), 0);
  const expected      = todaysAppts.reduce((s, a) => s + findService(a.serviceId).price, 0);
  const collected     = totalRevenue + totalTips;
  const pct           = clampProgress(collected, expected);

  return (
    <div style={{ padding: '24px', background: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Hero card */}
        <div style={{
          background: 'var(--ink)', color: '#fbf6ec',
          borderRadius: 16, padding: '24px 28px', position: 'relative', overflow: 'hidden',
          gridColumn: 'span 2',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,155,61,0.22), transparent 60%)' }} />
          <div className="mono" style={{ fontSize: 10, color: '#c89b3d', letterSpacing: '0.1em', marginBottom: 10 }}>TODAY'S TAKINGS · RUNNING</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
            <div className="serif" style={{ fontSize: 56, lineHeight: 0.95 }}>{fmtJ(collected)}</div>
            <div style={{ fontSize: 13, color: '#a89c87' }}>of {fmtJ(expected)} expected</div>
          </div>
          <div style={{ height: 4, background: 'rgba(251,246,236,0.1)', borderRadius: 2, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ width: `${pct * 100}%`, height: '100%', background: 'linear-gradient(to right, var(--ochre), var(--terracotta))' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { l: 'Cash',       v: paid.filter(a => a.paidMethod === 'cash').reduce((s, a) => s + findService(a.serviceId).price - a.deposit, 0) },
              { l: 'Digital',    v: paid.filter(a => a.paidMethod !== 'cash').reduce((s, a) => s + findService(a.serviceId).price - a.deposit, 0) },
              { l: 'Deposits',   v: totalDeposits },
              { l: 'Tips',       v: totalTips },
            ].map(({ l, v }) => (
              <div key={l}>
                <div className="mono" style={{ fontSize: 9.5, color: '#a89c87', letterSpacing: '0.08em', marginBottom: 4 }}>{l.toUpperCase()}</div>
                <div className="serif" style={{ fontSize: 22 }}>{fmtJ(v)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment rows */}
      <div className="label" style={{ marginBottom: 12 }}>Today's appointments</div>
      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
        {todaysAppts.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', fontSize: 13.5 }}>No appointments today.</div>
        ) : todaysAppts.map((a, idx) => {
          const c = findClient(a.clientId);
          const s = findService(a.serviceId);
          return (
            <div key={a.id} style={{
              display: 'flex', gap: 14, alignItems: 'center',
              padding: '14px 20px',
              borderBottom: idx < todaysAppts.length - 1 ? '1px solid var(--line)' : 'none',
              background: a.paid ? 'rgba(12,74,45,0.03)' : 'transparent',
            }}>
              <Avatar name={c.name} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>{s.name} · {fmtTime(a.start)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="serif" style={{ fontSize: 20 }}>{fmtJ(s.price)}</div>
                {a.deposit > 0 && <div style={{ fontSize: 11, color: 'var(--muted)' }}>{fmtJ(a.deposit)} dep</div>}
              </div>
              {a.paid ? (
                <span className="chip chip-forest" style={{ fontSize: 11 }}>{Icon.check({ width: 10, height: 10 })} Paid · {a.paidMethod}</span>
              ) : (
                <button onClick={() => onMarkPaid(a)} className="btn btn-secondary btn-sm">Mark paid</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekTakings({ appts, services }) {
  const findService = (id) => services.find(s => s.id === id) || {};
  const DAYS_LABEL = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const byDay = DAYS_LABEL.map((d, i) => {
    const dayAppts = appts.filter(a => a.dayIdx === i);
    const rev = dayAppts.reduce((s, a) => s + findService(a.serviceId).price, 0);
    return { d, rev, count: dayAppts.length };
  });
  const maxRev = Math.max(...byDay.map(x => x.rev), 1);
  const total = byDay.reduce((s, x) => s + x.rev, 0);

  return (
    <div style={{ padding: '24px', background: 'var(--paper)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="label" style={{ marginBottom: 4 }}>Week revenue</div>
          <div className="serif" style={{ fontSize: 44 }}>{fmtJ(total)}</div>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--forest)' }}>↑ 12% vs last week</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140, marginBottom: 10 }}>
        {byDay.map(({ d, rev, count }) => (
          <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: '100%', background: 'var(--forest)', borderRadius: '4px 4px 0 0',
              height: maxRev > 0 ? `${(rev / maxRev) * 120}px` : 4,
              opacity: count === 0 ? 0.15 : 1, minHeight: 4,
            }} />
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.04em' }}>{d.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthTakings() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const values = [62000, 78000, 91000, 85000, 112000, 0];
  const max = Math.max(...values, 1);

  return (
    <div style={{ padding: '24px', background: 'var(--paper)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="label" style={{ marginBottom: 4 }}>May 2026</div>
          <div className="serif" style={{ fontSize: 44 }}>J$112,000</div>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--forest)' }}>↑ 32% vs April</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160, marginBottom: 12 }}>
        {months.map((m, i) => (
          <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%', borderRadius: '4px 4px 0 0', minHeight: 4,
              height: `${(values[i] / max) * 140}px`,
              background: m === 'May' ? 'var(--terracotta)' : 'var(--forest)',
              opacity: values[i] === 0 ? 0.1 : 1,
            }} />
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.04em' }}>{m.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
