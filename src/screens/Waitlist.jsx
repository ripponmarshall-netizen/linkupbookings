import React from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { findClient, findService, fmtJ } from '../data/seed.js';

const WAITLIST = [
  {
    id: 'w1', clientId: 'c3', service: 's1', priority: 1,
    wants: 'Sat 30 May · Gel Mani', addedDays: 1,
    flexible: 'morning', notify: 'whatsapp',
    note: 'Wedding Friday next week — needs to be done before',
    matched: { slot: 'Sat 30 May · 11:00am', confidence: 'high' },
  },
  {
    id: 'w2', clientId: 'c5', service: 's2', priority: 2,
    wants: 'Thu/Fri this week · Acrylic', addedDays: 2,
    flexible: 'any', notify: 'whatsapp',
    note: '',
    matched: { slot: 'Thu 28 May · 3:00pm', confidence: 'medium' },
  },
  {
    id: 'w3', clientId: 'c6', service: 's3', priority: 3,
    wants: 'Any weekend · Pedicure', addedDays: 3,
    flexible: 'weekend', notify: 'sms',
    note: 'New mom — needs notice for sitter',
    matched: null,
  },
  {
    id: 'w4', clientId: 'c1', service: 's2', priority: 4,
    wants: 'Next 2 weeks · Acrylic full set', addedDays: 5,
    flexible: 'any', notify: 'whatsapp',
    note: 'Coming back from Miami trip',
    matched: null,
  },
  {
    id: 'w5', clientId: 'c2', service: 's4', priority: 5,
    wants: 'This week · Add-on nail art', addedDays: 7,
    flexible: 'any', notify: 'whatsapp',
    note: '',
    matched: null,
  },
];

export default function WaitlistScreen() {
  const [autoFill, setAutoFill] = React.useState(true);
  const [tab, setTab] = React.useState('queue');
  const matchedCount = WAITLIST.filter(w => w.matched).length;

  return (
    <DashboardShell
      title="Waitlist"
      sub={`${WAITLIST.length} people waiting · ${matchedCount} ready to offer`}
      action={
        <button className="btn btn-primary btn-sm">
          {Icon.plus({ width: 13, height: 13 })} Add to waitlist
        </button>
      }
    >
      {/* tabs */}
      <div className="tab-bar" style={{ gap: 4, alignItems: 'stretch' }}>
        {[
          ['queue', `Queue · ${WAITLIST.length}`],
          ['rules', 'Auto-fill rules'],
        ].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            style={{
              padding: '14px 14px 12px', fontSize: 13, fontWeight: 500,
              color: tab === k ? 'var(--ink)' : 'var(--muted)',
              borderBottom: tab === k ? '2px solid var(--forest)' : '2px solid transparent',
              marginBottom: -1,
            }}>{l}</button>
        ))}
      </div>

      {tab === 'queue'
        ? <WaitlistQueue autoFill={autoFill} setAutoFill={setAutoFill} />
        : <WaitlistRules />}
    </DashboardShell>
  );
}

function WaitlistQueue({ autoFill, setAutoFill }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', background: 'var(--paper)' }}>
      {/* Auto-fill banner */}
      <div style={{
        background: 'var(--ink)', color: '#fbf6ec',
        borderRadius: 14, padding: 22, marginBottom: 22, position: 'relative', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1.4fr auto', gap: 24, alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: 200, width: 220, height: 220,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,102,61,0.28), transparent 60%)',
        }} />
        <div style={{ position: 'relative' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.1em', marginBottom: 8 }}>
            ✨ AUTO-FILL · ON
          </div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 400, lineHeight: 1.1, marginBottom: 8 }}>
            When someone cancels, mi <span style={{ fontStyle: 'italic', color: 'var(--ochre)' }}>offer it</span> within 60 seconds.
          </div>
          <div style={{ fontSize: 13, color: '#c8bda4', lineHeight: 1.55 }}>
            Auto-text the next waitlister whose preferences match. First to confirm gets it. No more empty slots from last-minute cancels.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setAutoFill(!autoFill)}
            style={{
              width: 56, height: 32, borderRadius: 16,
              background: autoFill ? 'var(--terracotta)' : 'rgba(251,246,236,0.12)',
              position: 'relative',
            }}>
            <div style={{
              position: 'absolute', top: 3, left: autoFill ? 27 : 3,
              width: 26, height: 26, borderRadius: '50%', background: '#fbf6ec',
              transition: 'left 160ms',
            }} />
          </button>
          <div className="mono" style={{ fontSize: 10, color: '#a89c87', letterSpacing: '0.08em' }}>
            {autoFill ? 'TURN OFF' : 'TURN ON'}
          </div>
        </div>
      </div>

      {/* matched callout */}
      {WAITLIST.filter(w => w.matched).length > 0 && (
        <>
          <div className="label" style={{ marginBottom: 10 }}>
            Ready to offer · {WAITLIST.filter(w => w.matched).length}
          </div>
          {WAITLIST.filter(w => w.matched).map(w => <WaitlistRow key={w.id} w={w} />)}
        </>
      )}

      {/* full queue */}
      <div className="label" style={{ marginTop: 22, marginBottom: 10 }}>
        Waiting · {WAITLIST.filter(w => !w.matched).length}
      </div>
      {WAITLIST.filter(w => !w.matched).map(w => <WaitlistRow key={w.id} w={w} />)}
    </div>
  );
}

function WaitlistRow({ w }) {
  const c = findClient(w.clientId);
  const s = findService(w.service);
  const matched = !!w.matched;

  return (
    <div className="waitlist-row" style={{
      display: 'grid', gridTemplateColumns: 'auto auto 1fr auto auto', gap: 16,
      padding: 16, marginBottom: 8,
      background: matched ? 'var(--card)' : 'var(--card-warm)',
      border: `1px solid ${matched ? 'var(--forest)' : 'var(--line)'}`,
      borderLeft: matched ? '3px solid var(--forest)' : '3px solid var(--line-2)',
      borderRadius: 10, alignItems: 'center',
    }}>
      <div className="mono" style={{
        fontSize: 14, fontWeight: 600,
        width: 28, height: 28, borderRadius: '50%',
        background: matched ? 'var(--forest)' : 'var(--paper-2)',
        color: matched ? '#fbf6ec' : 'var(--muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{w.priority}</div>
      <Avatar name={c.name} size={36} />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</span>
          <span className="chip" style={{ fontSize: 10, padding: '1px 8px' }}>{w.flexible}</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>
          Wants: <span style={{ color: 'var(--ink-2)' }}>{w.wants}</span> · added {w.addedDays}d ago
        </div>
        {w.note && (
          <div style={{ fontSize: 11.5, color: 'var(--ink-2)', marginTop: 4, fontStyle: 'italic' }}>"{w.note}"</div>
        )}
        {matched && (
          <div style={{
            marginTop: 8, padding: '6px 10px',
            background: 'var(--forest-soft)', borderRadius: 6,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11.5, color: 'var(--forest)',
          }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.06em' }}>
              ✨ MATCH · {w.matched.confidence.toUpperCase()}
            </span>
            <span style={{ fontWeight: 500 }}>{w.matched.slot}</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
          {w.notify === 'whatsapp' ? 'WHATSAPP' : 'SMS'}
        </span>
        <span style={{ fontSize: 11.5, fontWeight: 500 }}>{fmtJ(s.price)}</span>
      </div>
      {matched ? (
        <button className="btn btn-primary btn-sm">
          {Icon.whatsapp({ width: 12, height: 12 })} Offer slot
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="btn btn-secondary btn-sm" style={{ padding: '6px 10px' }}>
            {Icon.whatsapp({ width: 12, height: 12 })}
          </button>
          <button style={{ color: 'var(--muted-2)', padding: 6 }}>{Icon.x({ width: 14, height: 14 })}</button>
        </div>
      )}
    </div>
  );
}

function WaitlistRules() {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', background: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, maxWidth: 1100 }}>
        <div>
          <div className="label" style={{ marginBottom: 12 }}>When a slot opens up</div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 4 }}>
            {[
              ['Notify first match in queue', true, 'Top priority gets offered first'],
              ['Auto-confirm if booked within 30 min', false, 'Otherwise offer next in queue'],
              ['Allow chain offers', true, 'If first declines, ping second, third…'],
              ['Match by service preference', true, 'Only ping people who want this service'],
              ['Respect flexibility window', true, '"Weekends only" never gets a weekday'],
            ].map(([l, on, sub], i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderBottom: i < 4 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{l}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>
                </div>
                <div style={{
                  width: 38, height: 22, borderRadius: 11,
                  background: on ? 'var(--forest)' : 'var(--line-2)',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: 2, left: on ? 18 : 2,
                    width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div className="label" style={{ marginBottom: 12, marginTop: 24 }}>Auto-offer template</div>
          <div style={{
            background: '#0d141a', borderRadius: 12, padding: 16,
            color: '#e9edef', fontSize: 13, lineHeight: 1.55,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13 }}>g</div>
              <span style={{ fontSize: 11.5, fontWeight: 500 }}>Glow Nail Studio</span>
            </div>
            <div style={{
              background: '#005c4b', padding: '10px 12px', borderRadius: 8,
            }}>
              Hi {'{first_name}'}! A slot just opened up that matches what yuh wanted: <strong>{'{slot}'}</strong>. Want it? Tap to confirm 👇<br/>
              <span style={{ color: 'var(--ochre)' }}>lup.bk/glow/confirm/abc123</span><br/>
              <span style={{ fontSize: 10.5, color: '#aebac1' }}>Offer expires in 20 min — next in queue gets it after.</span>
            </div>
          </div>
        </div>

        <div>
          <div className="label" style={{ marginBottom: 12 }}>Last 30 days</div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 4 }}>
            {[
              ['Slots filled via waitlist', '11'],
              ['Avg fill time', '4 min'],
              ['Decline rate', '18%'],
              ['Revenue saved', fmtJ(38500)],
            ].map(([k, v], i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: i < 3 ? '1px solid var(--line)' : 'none',
              }}>
                <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{k}</span>
                <span className="serif" style={{ fontSize: 18, fontWeight: 400 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 18, padding: 16,
            background: 'var(--terracotta-soft)', borderRadius: 10,
            borderLeft: '3px solid var(--terracotta)',
            fontSize: 12.5, color: '#8d3f1e', lineHeight: 1.5,
          }}>
            <strong>💚 Real talk:</strong> Waitlist filled an empty Wed at 11am last week — that's J$3,500 yuh would've lost.
          </div>
        </div>
      </div>
    </div>
  );
}
