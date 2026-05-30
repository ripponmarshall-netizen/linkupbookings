import { useState } from 'react';
import ModalShell from '../components/ModalShell.jsx';
import { Icon } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { DAYS, DAY_DATES } from '../data/seed.js';
import { validateTimeRange } from '../utils/scheduling.js';

export default function BlockOffModal({ onClose }) {
  const { addBlock } = useApp();
  const [selectedDay, setSelectedDay] = useState(2);
  const [fromTime, setFromTime] = useState('1:00pm');
  const [toTime, setToTime] = useState('2:00pm');
  const [reason, setReason] = useState('Lunch break');
  const [recurring, setRecurring] = useState(false);
  const [clientNote, setClientNote] = useState('');
  const [error, setError] = useState('');

  const reasons = [
    { l: 'Lunch break',    i: '💫', color: 'var(--ochre)'      },
    { l: 'School run',     i: '🚸', color: 'var(--terracotta)' },
    { l: 'Doctor / personal', i: '⚕', color: 'var(--plum)'   },
    { l: 'Holiday',        i: '✨', color: 'var(--forest)'     },
    { l: 'Just blocked',   i: '—',  color: 'var(--muted)'     },
  ];

  function handleBlock() {
    const range = validateTimeRange(fromTime, toTime);
    if (range.error) {
      setError(range.error);
      return;
    }

    addBlock({
      id: 'b' + Date.now(),
      dayIdx: selectedDay,
      start: range.start,
      end: range.end,
      reason,
      recurring,
      note: clientNote.trim(),
    });
    onClose();
  }

  return (
    <ModalShell onClose={onClose} width={540}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Block off time</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>
            {Icon.x({ width: 16, height: 16 })}
          </button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          When yuh <span style={{ fontStyle: 'italic' }}>cyaan</span> work?
        </h2>
      </div>

      <div style={{ padding: 24, overflowY: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <label className="label">Date</label>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }} className="no-scroll">
            {DAYS.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className="chip"
                style={{
                  background: selectedDay === i ? 'var(--ink)' : 'var(--card)',
                  color: selectedDay === i ? '#fbf6ec' : 'var(--ink)',
                  border: selectedDay === i ? '1px solid var(--ink)' : '1px solid var(--line)',
                  minWidth: 56, padding: '8px 10px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 9.5, opacity: 0.7 }}>{d.toUpperCase()}</span>
                <span style={{ fontSize: 15, fontFamily: 'var(--serif)' }}>{DAY_DATES[i]}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label className="label">From</label>
            <input
              className="input"
              value={fromTime}
              onChange={e => { setFromTime(e.target.value); setError(''); }}
            />
          </div>
          <div>
            <label className="label">To</label>
            <input
              className="input"
              value={toTime}
              onChange={e => { setToTime(e.target.value); setError(''); }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="label">Reason (for yuh records)</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {reasons.map(r => (
              <button
                key={r.l}
                onClick={() => setReason(r.l)}
                className="chip"
                style={{
                  background: reason === r.l ? r.color + '20' : 'var(--card)',
                  color: reason === r.l ? r.color : 'var(--ink)',
                  border: reason === r.l ? `1px solid ${r.color}` : '1px solid var(--line)',
                  cursor: 'pointer', padding: '6px 12px',
                }}
              >
                {r.i} {r.l}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div role="alert" style={{ color: 'var(--terracotta)', fontSize: 12.5, marginBottom: 14 }}>
            {error}
          </div>
        )}

        <div style={{
          padding: 14, background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 10, marginBottom: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Repeat every week</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                Block {DAYS[selectedDay]}s {fromTime}–{toTime} until cancelled
              </div>
            </div>
            <button
              onClick={() => setRecurring(!recurring)}
              style={{
                width: 38, height: 22, borderRadius: 11,
                background: recurring ? 'var(--forest)' : 'var(--line-2)',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: 2, left: recurring ? 18 : 2,
                width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
                transition: 'left 120ms',
              }} />
            </button>
          </div>
        </div>

        <label className="label" htmlFor="block-client-note">Note shown to clients (optional)</label>
        <input
          id="block-client-note"
          className="input"
          value={clientNote}
          onChange={e => setClientNote(e.target.value)}
          placeholder="e.g. 'back at 2pm' — leave blank to just hide the slot"
        />
      </div>

      <div style={{
        padding: '14px 24px', borderTop: '1px solid var(--line)',
        background: 'var(--paper-2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
          WILL HIDE 4 SLOTS FROM YUH BOOKING PAGE
        </span>
        <button className="btn btn-primary btn-sm" onClick={handleBlock}>
          {Icon.lock({ width: 13, height: 13 })} Block it off
        </button>
      </div>
    </ModalShell>
  );
}
