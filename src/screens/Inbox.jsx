import { useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { findClient } from '../data/seed.js';

const THREADS = [
  { id: 't1', clientId: 'c3', last: "Saturday morning? Need to look fresh", unread: true, t: '11:42 AM', suggestion: 'book', messages: [
    { from: 'them', t: '11:38 AM', body: "Hey Tanya! 💚" },
    { from: 'them', t: '11:38 AM', body: "What yuh availability look like this weekend?" },
    { from: 'them', t: '11:42 AM', body: "Saturday morning? Need to look fresh for my cousin's wedding" },
  ]},
  { id: 't2', clientId: 'c1', last: "Confirmed! See yuh tomorrow 💅", unread: false, t: 'Yesterday', messages: [
    { from: 'us', t: 'Yesterday 4:20 PM', body: "Hey Tanisha 👋 Yuh booked for Gel Manicure tomorrow at 9:30am. See yuh then!" },
    { from: 'them', t: 'Yesterday 4:32 PM', body: "Confirmed! See yuh tomorrow 💅" },
  ]},
  { id: 't3', clientId: 'c4', last: "Can mi bring my sister?", unread: true, t: 'Yesterday', suggestion: 'addon', messages: [
    { from: 'them', t: 'Yesterday 8:14 PM', body: "Hey 👋 quick question" },
    { from: 'them', t: 'Yesterday 8:14 PM', body: "Can mi bring my sister Friday? She want pedi same time as me" },
  ]},
  { id: 't4', clientId: 'c5', last: "Deposit paid ✓ J$2,000", unread: false, t: 'Sun', messages: [
    { from: 'them', t: 'Sun 2:11 PM', body: "Deposit paid ✓ J$2,000" },
  ]},
  { id: 't5', clientId: 'c6', last: "Wuda yuh be open Tuesday next week?", unread: true, t: 'Sun', suggestion: 'book', messages: [
    { from: 'them', t: 'Sun 9:02 AM', body: "Hey hun 💚" },
    { from: 'them', t: 'Sun 9:02 AM', body: "Wuda yuh be open Tuesday next week?" },
  ]},
];

const AI_SUGGESTIONS = {
  book:  { intent: 'Wants to book', reply: "Hey {name}! Yuh lucky day — got a slot Sat 9am open right now. Want me to lock it in? Just say yes and it's yours 🤙", slots: ['Sat 9:00am', 'Sat 11:00am', 'Sat 2:00pm'] },
  addon: { intent: 'Asking about add-on', reply: "Hey {name}! Yes, yuh sister can come 💅 Same slot works if she want a Pedicure — J$4,500. Want mi to add her on?" },
};

export default function InboxScreen() {
  const [selectedId, setSelectedId] = useState('t1');
  const [draft, setDraft] = useState('');
  const [showThread, setShowThread] = useState(false);

  const selected = THREADS.find(t => t.id === selectedId);
  const unreadCount = THREADS.filter(t => t.unread).length;
  const suggestion = selected?.suggestion ? AI_SUGGESTIONS[selected.suggestion] : null;

  const handleSelect = (id) => {
    setSelectedId(id);
    setShowThread(true);
    const ai = THREADS.find(t => t.id === id)?.suggestion;
    setDraft(ai ? AI_SUGGESTIONS[ai].reply.replace('{name}', findClient(THREADS.find(t => t.id === id).clientId).name?.split(' ')[0] || '') : '');
  };

  const action = (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <span className="chip chip-forest" style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--forest)' }} />
        +1 876 555 0100 · live
      </span>
      <button className="btn btn-secondary btn-sm hide-mobile">{Icon.settings({ width: 13, height: 13 })}</button>
    </div>
  );

  return (
    <DashboardShell title="Messages" sub={`${unreadCount} unread · WhatsApp Business`} action={action}>
      <div style={{ display: 'flex', height: '100%', minHeight: 0 }}>
        {/* Thread list */}
        <div style={{
          width: showThread ? 'auto' : '100%',
          flex: showThread ? '0 0 300px' : '1',
          borderRight: showThread ? '1px solid var(--line)' : 'none',
          display: 'flex', flexDirection: 'column',
          background: 'var(--card-warm)', overflow: 'hidden',
        }}>
          {/* Filter */}
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['All','Unread','Asking to book'].map((f, i) => (
              <button key={f} className="chip" style={{
                background: i === 0 ? 'var(--ink)' : 'var(--card)',
                color: i === 0 ? '#fbf6ec' : 'var(--ink-2)',
                border: i === 0 ? '1px solid var(--ink)' : '1px solid var(--line)',
                cursor: 'pointer', fontSize: 11.5,
              }}>{f}{i === 1 && <span className="mono" style={{ fontSize: 9, marginLeft: 4, opacity: 0.7 }}>{unreadCount}</span>}</button>
            ))}
          </div>

          {/* Threads */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {THREADS.map(t => {
              const c = findClient(t.clientId);
              const isSelected = t.id === selectedId;
              return (
                <button key={t.id} onClick={() => handleSelect(t.id)} style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '14px 16px',
                  background: isSelected ? 'var(--paper-2)' : 'transparent',
                  borderBottom: '1px solid var(--line)',
                  borderLeft: isSelected ? '3px solid var(--forest)' : '3px solid transparent',
                }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar name={c.name} size={38} />
                    {t.unread && <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: 'var(--terracotta)', border: '2px solid var(--card-warm)' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <span style={{ fontSize: 13.5, fontWeight: t.unread ? 600 : 500 }}>{c.name}</span>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{t.t}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: t.unread ? 'var(--ink-2)' : 'var(--muted)', fontWeight: t.unread ? 500 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.last}
                    </div>
                    {t.suggestion && (
                      <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--forest-soft)', color: 'var(--forest)', borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 500 }}>
                        ✨ {t.suggestion === 'book' ? 'WANTS TO BOOK' : 'ADD-ON OFFER'}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation */}
        {showThread && selected && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: '#f0ece5' }}>
            {/* Thread header */}
            <div style={{ padding: '12px 16px', background: 'var(--card)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="show-mobile" onClick={() => setShowThread(false)} style={{ color: 'var(--forest)', padding: 4 }}>
                {Icon.arrowLeft({ width: 18, height: 18 })}
              </button>
              <Avatar name={findClient(selected.clientId).name} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{findClient(selected.clientId).name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>via WhatsApp Business</div>
              </div>
              <button className="btn btn-secondary btn-sm">{Icon.cal({ width: 13, height: 13 })} Book</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {selected.messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.from === 'us' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '72%', padding: '9px 12px', borderRadius: m.from === 'us' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: m.from === 'us' ? '#005c4b' : '#fff',
                    color: m.from === 'us' ? '#e9edef' : '#1a201d',
                    fontSize: 13.5, lineHeight: 1.5, boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                  }}>
                    {m.body}
                    <div style={{ fontSize: 10, color: m.from === 'us' ? '#aebac1' : 'var(--muted)', marginTop: 3, textAlign: 'right' }}>
                      {m.t}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI suggestion */}
            {suggestion && (
              <div style={{ padding: '10px 14px', background: 'var(--card)', borderTop: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <div className="mono" style={{ fontSize: 9.5, color: 'var(--terracotta)', letterSpacing: '0.08em' }}>✨ AI SUGGESTION · {suggestion.intent.toUpperCase()}</div>
                </div>
                <div style={{ background: 'var(--paper-2)', borderRadius: 8, padding: '10px 12px', fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)', marginBottom: 8, fontStyle: 'italic', borderLeft: '3px solid var(--terracotta)' }}>
                  {suggestion.reply.replace('{name}', findClient(selected.clientId).name?.split(' ')[0])}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => setDraft(suggestion.reply.replace('{name}', findClient(selected.clientId).name?.split(' ')[0]))} className="btn btn-primary btn-sm">Use this reply</button>
                  <button className="btn btn-secondary btn-sm">{Icon.cal({ width: 12, height: 12 })} Offer a slot</button>
                </div>
              </div>
            )}

            {/* Compose */}
            <div style={{ padding: '10px 14px', background: 'var(--card)', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Reply…"
                rows={2}
                style={{
                  flex: 1, resize: 'none', padding: '10px 12px',
                  background: 'var(--paper-2)', border: '1px solid var(--line)',
                  borderRadius: 10, fontSize: 13.5, lineHeight: 1.5,
                }}
              />
              <button className="btn btn-primary" style={{ padding: '10px 16px', borderRadius: 10 }}>
                {Icon.whatsapp({ width: 16, height: 16 })}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
