import { useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { findClient } from '../data/seed.js';
import { useToast } from '../components/Toast.jsx';
import { waLink, openLink } from '../utils/actions.js';
import EmptyState from '../components/EmptyState.jsx';

const INITIAL_THREADS = [
  { id: 't1', clientId: 'c3', unread: 2, time: '2m', preview: "Yes please! 3pm works 💕", messages: [
    { from: 'them', text: "Hi! Do you have any space this week for a fill?", time: '10:32am' },
    { from: 'me', text: "Hey Aaliyah! Yes — Thursday 3pm just opened up. Want it?", time: '10:45am' },
    { from: 'them', text: "Yes please! 3pm works 💕", time: '10:47am' },
  ] },
  { id: 't2', clientId: 'c1', unread: 0, time: '1h', preview: "Perfect, thank you!", messages: [
    { from: 'them', text: "Morning! Just confirming my appointment for tomorrow", time: '9:15am' },
    { from: 'me', text: "Yes, confirmed for 9am! See you then 😊", time: '9:20am' },
    { from: 'them', text: "Perfect, thank you!", time: '9:22am' },
  ] },
  { id: 't3', clientId: 'c5', unread: 0, time: '3h', preview: "Sounds good!", messages: [
    { from: 'them', text: "Can I move my Friday appointment?", time: '7:00am' },
    { from: 'me', text: "Of course! What time works better?", time: '7:30am' },
    { from: 'them', text: "Sounds good!", time: '8:00am' },
  ] },
  { id: 't4', clientId: 'c2', unread: 1, time: '5h', preview: "Thank you so much! 🙏", messages: [
    { from: 'them', text: "Do you do nail art for kids?", time: '5:00am' },
    { from: 'me', text: "Yes! I have special designs for little ones 💅", time: '5:30am' },
    { from: 'them', text: "Thank you so much! 🙏", time: '6:00am' },
  ] },
];

const AI_SUGGESTIONS = {
  t1: { reply: "Perfect! I've booked you in for Thursday 3pm. See you then! 💕", tone: 'Friendly confirmation' },
  t4: { reply: "We have kids' nail art from J$1,500! Would you like to book a slot?", tone: 'Helpful + upsell' },
};

function nowLabel() {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${h}:${m}${ampm}`;
}

export default function InboxScreen() {
  const { toast } = useToast();
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [selectedId, setSelectedId] = useState('t1');
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');
  const [dismissedAI, setDismissedAI] = useState({});

  const selectThread = (id) => {
    setSelectedId(id);
    setThreads(ts => ts.map(t => t.id === id ? { ...t, unread: 0 } : t));
  };

  const selected = threads.find(t => t.id === selectedId);
  const ai = AI_SUGGESTIONS[selectedId];
  const q = search.trim().toLowerCase();
  const visible = q
    ? threads.filter(t => findClient(t.clientId).name?.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q))
    : threads;

  function send() {
    const text = draft.trim();
    if (!text || !selected) return;
    const msg = { from: 'me', text, time: nowLabel() };
    setThreads(ts => ts.map(t => t.id === selectedId
      ? { ...t, messages: [...t.messages, msg], preview: text, time: 'now' }
      : t));
    setDraft('');
  }

  return (
    <DashboardShell title="Inbox" sub="Messages from your clients">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Thread list */}
        <div className="split-pane-rail" style={{ width: 300, borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', background: 'var(--card-warm)' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 8, padding: '8px 12px' }}>
              {Icon.search({ width: 14, height: 14, style: { color: 'var(--muted)' } })}
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages…" aria-label="Search messages" style={{ border: 'none', background: 'transparent', flex: 1, fontSize: 13 }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {visible.length === 0 && (
              <EmptyState compact title="No matches" sub="No conversations match your search." />
            )}
            {visible.map(t => {
              const c = findClient(t.clientId);
              return (
                <button
                  key={t.id}
                  onClick={() => selectThread(t.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '12px 16px',
                    borderBottom: '1px solid var(--line)',
                    background: selectedId === t.id ? 'var(--paper-2)' : 'transparent',
                    display: 'flex', gap: 10, alignItems: 'center',
                  }}
                >
                  <Avatar name={c.name} size={40} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600 }}>{c.name}</span>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{t.time}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.preview}</span>
                      {t.unread > 0 && (
                        <span style={{ background: 'var(--forest)', color: '#fbf6ec', fontSize: 10, fontWeight: 600, borderRadius: 999, minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>{t.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--paper)' }}>
          {selected ? (
            <>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card-warm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={findClient(selected.clientId).name} size={36} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{findClient(selected.clientId).name}</div>
                    <div style={{ fontSize: 11, color: 'var(--moss)' }}>● online</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button aria-label="Call client" style={{ color: 'var(--muted)' }} onClick={() => openLink(`tel:${findClient(selected.clientId).phone || ''}`)}>{Icon.phone({ width: 18, height: 18 })}</button>
                  <button aria-label="Open in WhatsApp" style={{ color: 'var(--muted)' }} onClick={() => openLink(waLink(findClient(selected.clientId).phone))}>{Icon.whatsapp({ width: 18, height: 18 })}</button>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selected.messages.map((m, i) => (
                  <div key={i} style={{
                    alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
                    maxWidth: '70%', padding: '10px 14px', borderRadius: 14,
                    background: m.from === 'me' ? 'var(--forest)' : 'var(--card)',
                    color: m.from === 'me' ? '#fbf6ec' : 'var(--ink)',
                    border: m.from === 'me' ? 'none' : '1px solid var(--line)',
                    fontSize: 13.5, lineHeight: 1.4,
                  }}>
                    {m.text}
                    <div style={{ fontSize: 9.5, marginTop: 4, opacity: 0.6 }}>{m.time}</div>
                  </div>
                ))}
              </div>

              {ai && !dismissedAI[selectedId] && (
                <div style={{ padding: '0 20px 12px' }}>
                  <div style={{ background: 'var(--card)', border: '1px solid var(--ochre)', borderRadius: 12, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      {Icon.sparkle({ width: 12, height: 12, style: { color: 'var(--ochre)' } })}
                      <span className="mono" style={{ fontSize: 10, color: 'var(--ochre)', letterSpacing: '0.08em' }}>AI SUGGESTION · {ai.tone}</span>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>{ai.reply}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => setDraft(ai.reply)} className="btn btn-primary btn-sm">Use this reply</button>
                      <button onClick={() => setDismissedAI(d => ({ ...d, [selectedId]: true }))} className="btn btn-ghost btn-sm">Dismiss</button>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', background: 'var(--card-warm)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Type a message…"
                  aria-label="Message"
                  style={{ flex: 1, border: '1px solid var(--line)', borderRadius: 999, padding: '10px 16px', background: 'var(--card)', fontSize: 13.5 }}
                />
                <button
                  onClick={send}
                  disabled={!draft.trim()}
                  aria-label="Send message"
                  style={{
                    width: 40, height: 40, borderRadius: '50%', background: 'var(--forest)',
                    color: '#fbf6ec', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    opacity: draft.trim() ? 1 : 0.5,
                  }}
                >
                  {Icon.send({ width: 18, height: 18 })}
                </button>
              </div>
            </>
          ) : (
            <EmptyState title="No conversation selected" sub="Pick a thread to start messaging." />
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
