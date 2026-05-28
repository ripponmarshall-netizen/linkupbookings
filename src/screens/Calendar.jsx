import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { findClient, findService, fmtTime, fmtJ, DAYS, DAY_DATES, MONTH } from '../data/seed.js';
import AddApptModal from '../modals/AddApptModal.jsx';
import BlockOffModal from '../modals/BlockOffModal.jsx';
import FillSlotModal from '../modals/FillSlotModal.jsx';
import MarkPaidModal from '../modals/MarkPaidModal.jsx';
import ApptDetailModal from '../modals/ApptDetailModal.jsx';
import UpgradeModal from '../modals/UpgradeModal.jsx';
import ShareLinkModal from '../modals/ShareLinkModal.jsx';

const TODAY_IDX = 1; // Tue
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const H = 64; // pixels per hour

export default function CalendarScreen() {
  const { appts, blocks } = useApp();
  const [view, setView] = useState('week');
  const [dayIdx, setDayIdx] = useState(TODAY_IDX);
  const [modal, setModal] = useState(null);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const openAppt = (a) => { setSelectedAppt(a); setModal('appt'); };

  const action = (
    <div style={{ display: 'flex', gap: 8 }}>
      <button className="btn btn-secondary btn-sm hide-mobile" onClick={() => setModal('markpaid')}>
        {Icon.cash({ width: 13, height: 13 })} Walk-in
      </button>
      <button className="btn btn-secondary btn-sm hide-mobile" onClick={() => setModal('blockoff')}>
        {Icon.lock({ width: 12, height: 12 })} Block off
      </button>
      <button className="btn btn-primary btn-sm" onClick={() => setModal('add')}>
        {Icon.plus({ width: 13, height: 13 })} <span className="hide-mobile">New</span>
      </button>
    </div>
  );

  return (
    <>
      <DashboardShell
        title="Calendar"
        sub={`Tue · 26 May 2026`}
        action={action}
        rightPanel={<TodayPanel appts={appts} onAppt={openAppt} onFillSlot={() => setModal('fillslot')} />}
      >
        {/* View toggle (desktop) */}
        <div className="hide-mobile" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 24px', borderBottom: '1px solid var(--line)',
          background: 'var(--card-warm)',
        }}>
          <div className="serif" style={{ fontSize: 20 }}>{MONTH} <span style={{ color: 'var(--muted)' }}>· week 22</span></div>
          <div style={{ display: 'flex', background: 'var(--paper-2)', borderRadius: 8, padding: 2, border: '1px solid var(--line)' }}>
            {['day', 'week'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                background: view === v ? 'var(--card)' : 'transparent',
                color: view === v ? 'var(--ink)' : 'var(--muted)',
                textTransform: 'capitalize',
              }}>{v}</button>
            ))}
          </div>
        </div>

        {/* Mobile day strip */}
        <div className="cal-header-mobile show-mobile" style={{
          overflowX: 'auto', display: 'none', padding: '12px 0 0',
          borderBottom: '1px solid var(--line)', background: 'var(--card-warm)',
        }}>
          <div style={{ display: 'flex', paddingBottom: 12 }}>
            {DAYS.map((d, i) => (
              <button key={i} onClick={() => setDayIdx(i)} style={{
                minWidth: 52, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4, padding: '0 8px',
              }}>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d}</span>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: dayIdx === i ? 'var(--terracotta)' : i === TODAY_IDX ? 'var(--forest-soft)' : 'transparent',
                  color: dayIdx === i ? '#fff' : i === TODAY_IDX ? 'var(--forest)' : 'var(--ink)',
                  fontFamily: 'var(--serif)', fontSize: 18,
                }}>{DAY_DATES[i]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Week grid (desktop) */}
        <div className="cal-week-grid" style={{ flex: 1, overflow: 'auto' }}>
          {/* Day header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '52px repeat(7, 1fr)',
            borderBottom: '1px solid var(--line)', background: 'var(--card-warm)',
            position: 'sticky', top: 0, zIndex: 2,
          }}>
            <div />
            {DAYS.map((d, i) => (
              <div key={i} style={{
                padding: '10px 10px 8px', borderLeft: '1px solid var(--line)',
                background: i === TODAY_IDX ? 'var(--card)' : 'transparent',
              }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d}</div>
                <div className="serif" style={{
                  fontSize: 20, lineHeight: 1, marginTop: 2,
                  color: i === TODAY_IDX ? 'var(--terracotta)' : 'var(--ink)',
                  fontStyle: i === TODAY_IDX ? 'italic' : 'normal',
                }}>{DAY_DATES[i]}</div>
              </div>
            ))}
          </div>

          {/* Grid body */}
          <div style={{ display: 'grid', gridTemplateColumns: '52px repeat(7, 1fr)', position: 'relative' }}>
            {/* Hour gutter */}
            <div>
              {HOURS.map(h => (
                <div key={h} style={{ height: H, position: 'relative' }}>
                  <span className="mono" style={{ position: 'absolute', top: -7, right: 6, fontSize: 10, color: 'var(--muted)' }}>
                    {fmtTime(h)}
                  </span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {DAYS.map((d, di) => (
              <DayColumn key={di} di={di} appts={appts} blocks={blocks} onAppt={openAppt} />
            ))}
          </div>
        </div>

        {/* Mobile single-day view */}
        <div className="cal-day-view" style={{ flex: 1, overflow: 'auto', display: 'none', flexDirection: 'column' }}>
          <div style={{ display: 'flex', padding: '0 16px', gap: 4, position: 'relative' }}>
            <div style={{ width: 44, flexShrink: 0 }} />
            <div style={{ flex: 1, position: 'relative' }}>
              {HOURS.map(h => (
                <div key={h} style={{ height: H, borderBottom: '1px dashed var(--line)', position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
                  <span className="mono" style={{ position: 'absolute', left: -44, top: -7, fontSize: 10, color: 'var(--muted)', width: 40, textAlign: 'right' }}>
                    {fmtTime(h)}
                  </span>
                </div>
              ))}
              {/* blocks */}
              {blocks.filter(b => b.dayIdx === dayIdx).map(b => (
                <div key={b.id} style={{
                  position: 'absolute', left: 0, right: 0,
                  top: (b.start - HOURS[0]) * H, height: (b.end - b.start) * H,
                  background: 'repeating-linear-gradient(135deg, rgba(122,112,98,0.10) 0 8px, rgba(122,112,98,0.16) 8px 16px)',
                  borderTop: '1px dashed var(--muted-2)', borderBottom: '1px dashed var(--muted-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', background: 'rgba(251,246,236,0.85)', padding: '2px 6px', borderRadius: 3 }}>
                    {b.reason}
                  </span>
                </div>
              ))}
              {/* appts */}
              {appts.filter(a => a.dayIdx === dayIdx).map(a => {
                const svc = findService(a.serviceId);
                const cli = findClient(a.clientId);
                return (
                  <button key={a.id} onClick={() => openAppt(a)} style={{
                    position: 'absolute', left: 4, right: 4,
                    top: (a.start - HOURS[0]) * H + 2, height: (a.end - a.start) * H - 4,
                    background: svc.color + '18', borderLeft: `3px solid ${svc.color}`,
                    borderRadius: 8, padding: '6px 10px', textAlign: 'left', overflow: 'hidden',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: svc.color }}>{cli.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-2)' }}>{svc.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{fmtTime(a.start)} – {fmtTime(a.end)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => setModal('add')} style={{
            position: 'fixed', bottom: 76, right: 16, borderRadius: '50%',
            width: 48, height: 48, padding: 0,
          }}>
            {Icon.plus({ width: 20, height: 20 })}
          </button>
        </div>
      </DashboardShell>

      {modal === 'add'      && <AddApptModal    onClose={() => setModal(null)} />}
      {modal === 'blockoff' && <BlockOffModal   onClose={() => setModal(null)} />}
      {modal === 'fillslot' && <FillSlotModal   onClose={() => setModal(null)} />}
      {modal === 'markpaid' && <MarkPaidModal   onClose={() => setModal(null)} />}
      {modal === 'upgrade'  && <UpgradeModal    onClose={() => setModal(null)} />}
      {modal === 'share'    && <ShareLinkModal  onClose={() => setModal(null)} />}
      {modal === 'appt' && selectedAppt && <ApptDetailModal appt={selectedAppt} onClose={() => { setModal(null); setSelectedAppt(null); }} />}
    </>
  );
}

function DayColumn({ di, appts, blocks, onAppt }) {
  const isToday = di === TODAY_IDX;
  const dayAppts  = appts.filter(a => a.dayIdx === di);
  const dayBlocks = blocks.filter(b => b.dayIdx === di);

  return (
    <div style={{
      borderLeft: '1px solid var(--line)',
      position: 'relative',
      background: isToday ? 'rgba(255,255,255,0.55)' : 'transparent',
    }}>
      {HOURS.map((h, hi) => (
        <div key={h} style={{
          height: H, borderBottom: hi === HOURS.length - 1 ? 'none' : '1px dashed var(--line)',
        }} />
      ))}

      {/* now line */}
      {isToday && (
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: (11.25 - HOURS[0]) * H, borderTop: '2px solid var(--terracotta)', zIndex: 1,
        }}>
          <div style={{ position: 'absolute', left: -4, top: -5, width: 8, height: 8, borderRadius: '50%', background: 'var(--terracotta)' }} />
        </div>
      )}

      {/* blocks */}
      {dayBlocks.map(b => (
        <div key={b.id} style={{
          position: 'absolute', left: 0, right: 0,
          top: (b.start - HOURS[0]) * H, height: (b.end - b.start) * H,
          background: 'repeating-linear-gradient(135deg, rgba(122,112,98,0.10) 0 8px, rgba(122,112,98,0.16) 8px 16px)',
          borderTop: '1px dashed var(--muted-2)', borderBottom: '1px dashed var(--muted-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
        }}>
          <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', background: 'rgba(251,246,236,0.85)', padding: '2px 6px', borderRadius: 3, textTransform: 'uppercase' }}>
            {b.recurring && '↻ '}{b.reason}
          </span>
        </div>
      ))}

      {/* appts */}
      {dayAppts.map(a => {
        const svc = findService(a.serviceId);
        const cli = findClient(a.clientId);
        const top = (a.start - HOURS[0]) * H;
        const height = (a.end - a.start) * H;
        return (
          <button key={a.id} onClick={() => onAppt(a)} style={{
            position: 'absolute', top: top + 2, left: 3, right: 3, height: height - 4,
            background: a.status === 'pending' ? 'var(--paper-2)' : svc.color + '18',
            border: a.status === 'pending' ? `1px dashed ${svc.color}66` : `none`,
            borderLeft: `3px solid ${svc.color}`,
            borderRadius: 6, padding: '4px 6px', textAlign: 'left', overflow: 'hidden',
            cursor: 'pointer', zIndex: 2, transition: 'transform 80ms',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: svc.color, lineHeight: 1.2 }}>
              {a.recurring && <span style={{ opacity: 0.7 }}>↻ </span>}
              {cli.name?.split(' ')[0]} {cli.name?.split(' ')[1]?.[0]}.
            </div>
            {height > 40 && <div style={{ fontSize: 10, color: 'var(--ink-2)', marginTop: 1 }}>{svc.name}</div>}
            {height >= H && (
              <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>
                {fmtTime(a.start)} – {fmtTime(a.end)}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function TodayPanel({ appts, onAppt, onFillSlot }) {
  const todays = appts.filter(a => a.dayIdx === TODAY_IDX).sort((a, b) => a.start - b.start);
  const upcoming = todays.find(a => a.start > 11);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Up next */}
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid var(--line)' }}>
        <div className="label" style={{ marginBottom: 8 }}>Up next</div>
        {upcoming ? (() => {
          const c = findClient(upcoming.clientId);
          const s = findService(upcoming.serviceId);
          return (
            <>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1.05, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 10 }}>{s.name} · {fmtTime(upcoming.start)}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>{Icon.whatsapp({ width: 12, height: 12 })} Message</button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>{Icon.phone({ width: 12, height: 12 })} Call</button>
              </div>
              {c.notes && (
                <div style={{ marginTop: 10, background: 'var(--paper-2)', borderRadius: 8, padding: '8px 10px', fontSize: 11.5, lineHeight: 1.45, color: 'var(--ink-2)', borderLeft: '3px solid var(--ochre)' }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 3 }}>NOTE</div>
                  {c.notes}
                </div>
              )}
            </>
          );
        })() : <div style={{ fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic' }}>Nothing upcoming.</div>}
      </div>

      {/* Today's list */}
      <div style={{ padding: '14px 20px', flex: 1, overflow: 'auto' }}>
        <div className="label" style={{ marginBottom: 10 }}>Today · {todays.length} appts</div>
        {todays.map(a => {
          const c = findClient(a.clientId);
          const s = findService(a.serviceId);
          return (
            <button key={a.id} onClick={() => onAppt(a)} style={{
              width: '100%', textAlign: 'left', display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '10px 0', borderBottom: '1px solid var(--line)',
            }}>
              <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', width: 36, paddingTop: 2 }}>{fmtTime(a.start)}</span>
              <Avatar name={c.name} size={30} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.name}</div>
              </div>
              {a.deposit > 0 && (
                <span className="chip chip-forest" style={{ fontSize: 10, padding: '1px 6px' }}>✓ {fmtJ(a.deposit)}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Takings */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--line)' }}>
        <div className="label" style={{ marginBottom: 6 }}>Today's takings</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="serif" style={{ fontSize: 28 }}>J$16,500</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--forest)' }}>↑ 8%</div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>vs. last Tue</div>
      </div>

      {/* Fill slot card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ background: 'var(--ink)', color: '#fbf6ec', borderRadius: 12, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,102,61,0.32), transparent 65%)' }} />
          <div className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.1em', marginBottom: 6 }}>✨ OPPORTUNITY</div>
          <div style={{ fontSize: 12, lineHeight: 1.45, marginBottom: 10 }}>
            <strong>Thu 3pm is empty.</strong> Text 12 regulars a 15% same-week offer?
          </div>
          <button onClick={onFillSlot} style={{ background: 'var(--terracotta)', color: '#fbf6ec', padding: '6px 12px', borderRadius: 6, fontSize: 11.5, fontWeight: 500, width: '100%' }}>
            Send the blast
          </button>
        </div>
      </div>
    </div>
  );
}
