// WhatsApp-style inbox — the killer feature for solo Jamaican pros

const THREADS = [
  {
    id: 't1', clientId: 'c3', last: "Saturday morning? Need to look fresh", unread: true, t: '11:42 AM',
    suggestion: 'book',
    messages: [
      { from: 'them', t: '11:38 AM', body: "Hey Tanya! 💚" },
      { from: 'them', t: '11:38 AM', body: "What yuh availability look like this weekend?" },
      { from: 'them', t: '11:42 AM', body: "Saturday morning? Need to look fresh for my cousin's wedding" },
    ],
  },
  {
    id: 't2', clientId: 'c1', last: "Confirmed! See yuh tomorrow 💅", unread: false, t: 'Yesterday',
    messages: [
      { from: 'us', t: 'Yesterday 4:20 PM', body: "Hey Tanisha 👋 Jus' a heads up — yuh booked for Gel Manicure tomorrow at 9:30am. See yuh then!" },
      { from: 'them', t: 'Yesterday 4:32 PM', body: "Confirmed! See yuh tomorrow 💅" },
    ],
  },
  {
    id: 't3', clientId: 'c4', last: "Can mi bring my sister?", unread: true, t: 'Yesterday',
    suggestion: 'addon',
    messages: [
      { from: 'them', t: 'Yesterday 8:14 PM', body: "Hey 👋 quick question" },
      { from: 'them', t: 'Yesterday 8:14 PM', body: "Can mi bring my sister Friday? She want pedi same time as me" },
    ],
  },
  {
    id: 't4', clientId: 'c5', last: "Deposit paid ✓ J$2,000", unread: false, t: 'Sun',
    messages: [
      { from: 'them', t: 'Sun 2:11 PM', body: "Deposit paid ✓ J$2,000" },
    ],
  },
  {
    id: 't5', clientId: 'c6', last: "Wuda yuh be open Tuesday next week?", unread: true, t: 'Sun',
    suggestion: 'book',
    messages: [
      { from: 'them', t: 'Sun 9:02 AM', body: "Hey hun 💚" },
      { from: 'them', t: 'Sun 9:02 AM', body: "Wuda yuh be open Tuesday next week?" },
    ],
  },
  {
    id: 't6', clientId: 'c2', last: "Yuh page so cute btw 😍", unread: false, t: 'Sat',
    messages: [
      { from: 'them', t: 'Sat 11:14 PM', body: "Yuh page so cute btw 😍" },
    ],
  },
];

function InboxScreen({ isPro, onNav, onUpgrade, onShareLink }) {
  const [selectedId, setSelectedId] = React.useState('t1');
  const selected = THREADS.find(t => t.id === selectedId);
  const unreadCount = THREADS.filter(t => t.unread).length;

  return (
    <DashboardShell
      active="inbox"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Messages"
      sub={`${unreadCount} unread · connected to WhatsApp Business`}
      action={
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span className="chip chip-forest" style={{ fontSize: 11 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--forest)' }} />
            +1 876 555 0100 · live
          </span>
          <button className="btn btn-secondary btn-sm">{Icon.settings({ width: 13, height: 13 })}</button>
        </div>
      }
    >
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* thread list */}
        <div style={{
          width: 320, borderRight: '1px solid var(--line)',
          display: 'flex', flexDirection: 'column', flexShrink: 0, background: 'var(--card-warm)',
        }}>
          {/* filter */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 6 }}>
            {['All', 'Unread', 'Asking to book'].map((f, i) => (
              <button key={f} className="chip" style={{
                background: i === 0 ? 'var(--ink)' : 'var(--card)',
                color: i === 0 ? '#fbf6ec' : 'var(--ink-2)',
                border: i === 0 ? '1px solid var(--ink)' : '1px solid var(--line)',
                cursor: 'pointer',
              }}>{f} {i === 1 && <span className="mono" style={{ fontSize: 9, opacity: 0.7 }}>{unreadCount}</span>}</button>
            ))}
          </div>

          {/* threads */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {THREADS.map(t => {
              const c = findClient(t.clientId);
              const isSelected = t.id === selectedId;
              return (
                <button key={t.id} onClick={() => setSelectedId(t.id)}
                  style={{
                    width: '100%', textAlign: 'left',
                    display: 'flex', gap: 12, padding: '14px 16px',
                    background: isSelected ? 'var(--card)' : 'transparent',
                    borderBottom: '1px solid var(--line)',
                    borderLeft: isSelected ? '3px solid var(--forest)' : '3px solid transparent',
                    position: 'relative',
                  }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar name={c.name} size={36} />
                    {t.unread && (
                      <div style={{
                        position: 'absolute', top: -2, right: -2,
                        width: 10, height: 10, borderRadius: '50%',
                        background: 'var(--terracotta)', border: '2px solid var(--card-warm)',
                      }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 13.5, fontWeight: t.unread ? 600 : 500 }}>{c.name.split(' ')[0]} {c.name.split(' ')[1]?.[0]}.</span>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{t.t}</span>
                    </div>
                    <div style={{
                      fontSize: 12, color: t.unread ? 'var(--ink)' : 'var(--muted)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      fontWeight: t.unread ? 500 : 400,
                    }}>{t.last}</div>
                    {t.suggestion === 'book' && (
                      <div style={{
                        marginTop: 6, fontSize: 10, color: 'var(--terracotta)',
                        fontFamily: 'var(--mono)', letterSpacing: '0.06em',
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        ✨ WANTS TO BOOK
                      </div>
                    )}
                    {t.suggestion === 'addon' && (
                      <div style={{
                        marginTop: 6, fontSize: 10, color: 'var(--ochre)',
                        fontFamily: 'var(--mono)', letterSpacing: '0.06em',
                      }}>
                        ✨ ASKING +1 BOOKING
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* conversation */}
        {selected && <Conversation thread={selected} />}
      </div>
    </DashboardShell>
  );
}

function Conversation({ thread }) {
  const c = findClient(thread.clientId);
  const [draft, setDraft] = React.useState('');
  const [ai, setAi] = React.useState(null); // { state: 'loading' | 'ready' | 'error', data }

  // Open slots used by the AI prompt
  const OPEN_SLOTS = ['Sat 30 May 11:00am', 'Sat 30 May 1:30pm', 'Sat 30 May 4:30pm', 'Sun 31 May 10:00am', 'Thu 28 May 3:00pm'];

  React.useEffect(() => {
    let cancelled = false;
    setAi({ state: 'loading' });

    const lastMessages = thread.messages.map(m => `${m.from === 'us' ? 'Tanya' : c.name.split(' ')[0]}: ${m.body}`).join('\n');
    const prompt = `You are an assistant inside the LinkUpBookings dashboard for Tanya, owner of Glow Nail Studio in Half-Way-Tree, Jamaica. Her client ${c.name} has sent these WhatsApp messages:\n\n${lastMessages}\n\nClient context:\n- ${c.visits} previous visits\n- Last visit: ${c.last}\n- Notes Tanya keeps on her: ${c.notes || 'none'}\n\nTanya's open slots this week:\n${OPEN_SLOTS.map(s => `  · ${s}`).join('\n')}\n\nRespond with ONLY a JSON object (no markdown fences, no prose around it). Keys:\n{\n  "intent": "book" | "reschedule" | "question" | "small_talk" | "thanks",\n  "summary": "one sentence in plain English explaining what the client wants",\n  "suggested_reply": "Tanya's reply in warm Jamaican English, 1-2 short sentences with friendly tone",\n  "slots_to_offer": [up to 3 strings from the open slots list, only if intent=book or reschedule, else empty array]\n}`;

    (async () => {
      try {
        const raw = await window.claude.complete(prompt);
        // strip any code fences or leading text just in case
        const match = raw.match(/\{[\s\S]*\}/);
        const json = match ? JSON.parse(match[0]) : null;
        if (!cancelled && json) setAi({ state: 'ready', data: json });
        else if (!cancelled) setAi({ state: 'error' });
      } catch (e) {
        if (!cancelled) setAi({ state: 'error' });
      }
    })();

    return () => { cancelled = true; };
  }, [thread.id]);

  const insertReply = () => {
    if (ai?.data?.suggested_reply) setDraft(ai.data.suggested_reply);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--paper)' }}>
      {/* header */}
      <div style={{
        padding: '14px 24px', borderBottom: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--card-warm)',
      }}>
        <Avatar name={c.name} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>{c.name}</div>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '0.04em' }}>
            {c.phone} · {c.visits} VISITS · LIFETIME {fmtJ(c.lifetime)}
          </div>
        </div>
        <button className="btn btn-secondary btn-sm">{Icon.users({ width: 13, height: 13 })} View profile</button>
      </div>

      {/* smart suggestion — Claude-powered */}
      <ClaudeSuggestionCard ai={ai} clientName={c.name.split(' ')[0]} onInsert={insertReply} />

      {/* messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 24px 18px' }}>
        {thread.messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: m.from === 'us' ? 'flex-end' : 'flex-start',
            marginBottom: 10,
          }}>
            <div style={{
              maxWidth: '70%',
              padding: '8px 12px',
              background: m.from === 'us' ? 'var(--forest)' : 'var(--card)',
              color: m.from === 'us' ? '#fbf6ec' : 'var(--ink)',
              borderRadius: m.from === 'us'
                ? '14px 14px 2px 14px'
                : '14px 14px 14px 2px',
              border: m.from === 'us' ? 'none' : '1px solid var(--line)',
              fontSize: 14, lineHeight: 1.45,
            }}>
              <div>{m.body}</div>
              <div className="mono" style={{
                fontSize: 9.5, marginTop: 4,
                color: m.from === 'us' ? 'rgba(251,246,236,0.6)' : 'var(--muted)',
                textAlign: 'right', letterSpacing: '0.04em',
              }}>{m.t.toUpperCase()}{m.from === 'us' && ' · ✓✓'}</div>
            </div>
          </div>
        ))}
        {/* typing indicator */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--muted)', fontSize: 11, paddingLeft: 8 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 5, height: 5, borderRadius: '50%', background: 'var(--muted-2)',
                animation: `bounce 1.2s ${i * 0.15}s infinite`,
              }} />
            ))}
          </div>
          {c.name.split(' ')[0]} is typing…
        </div>
        <style>{`@keyframes bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-3px); opacity: 1; } }`}</style>
      </div>

      {/* quick replies */}
      <div style={{ padding: '0 24px 8px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[
          { l: 'Send 2 free slots', i: Icon.cal, primary: true },
          { l: 'Send my booking link', i: Icon.link },
          { l: 'Pricing list', i: Icon.cash },
          { l: 'Address + directions', i: Icon.globe },
          { l: '"On my way!"', i: Icon.check },
        ].map((q, i) => (
          <button key={i} className="chip" style={{
            background: q.primary ? 'var(--terracotta-soft)' : 'var(--card)',
            color: q.primary ? '#8d3f1e' : 'var(--ink-2)',
            border: q.primary ? '1px solid #e6cdba' : '1px solid var(--line)',
            cursor: 'pointer',
          }}>{q.i({ width: 11, height: 11 })} {q.l}</button>
        ))}
      </div>

      {/* composer */}
      <div style={{
        padding: 16, borderTop: '1px solid var(--line)',
        display: 'flex', gap: 10, alignItems: 'flex-end',
        background: 'var(--card-warm)',
      }}>
        <button style={{
          width: 38, height: 38, borderRadius: 10, background: 'var(--card)',
          border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--muted)',
        }}>{Icon.plus({ width: 16, height: 16 })}</button>
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder={ai?.data?.suggested_reply ? `Suggested: "${ai.data.suggested_reply.slice(0, 50)}…"` : `Write back to ${c.name.split(' ')[0]}…`}
            rows="1"
            style={{
              width: '100%', padding: '10px 14px',
              background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 18,
              fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)',
              resize: 'none', outline: 'none', minHeight: 38,
            }}
          />
        </div>
        <button className="btn btn-primary" style={{ padding: '8px 14px', height: 38 }}>
          {Icon.whatsapp({ width: 14, height: 14 })} Send
        </button>
      </div>
    </div>
  );
}

window.InboxScreen = InboxScreen;

// ────────────── Claude suggestion card ──────────────
function ClaudeSuggestionCard({ ai, clientName, onInsert }) {
  if (!ai) return null;

  const intentChip = (intent) => {
    const map = {
      book: { l: 'WANTS TO BOOK', c: 'var(--terracotta)' },
      reschedule: { l: 'WANTS TO RESCHEDULE', c: 'var(--ochre)' },
      question: { l: 'HAS A QUESTION', c: 'var(--moss)' },
      small_talk: { l: 'JUST SAYING HI', c: '#a89c87' },
      thanks: { l: 'CONFIRMED ✓', c: 'var(--forest)' },
    };
    return map[intent] || map.question;
  };

  return (
    <div style={{
      margin: '14px 24px', padding: 16,
      background: 'var(--ink)', color: '#fbf6ec',
      borderRadius: 14, position: 'relative', overflow: 'hidden',
      minHeight: 130,
    }}>
      <div style={{
        position: 'absolute', top: -30, right: -30, width: 140, height: 140,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,102,61,0.32), transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ position: 'relative', width: 16, height: 16 }}>
          <span style={{
            position: 'absolute', inset: 0,
            background: 'var(--terracotta)', borderRadius: '50%',
            animation: ai.state === 'loading' ? 'pulse 1.6s ease-in-out infinite' : 'none',
          }} />
          <span style={{
            position: 'absolute', inset: 4,
            background: '#fbf6ec', borderRadius: '50%',
          }} />
        </div>
        <div className="mono" style={{ fontSize: 9.5, color: 'var(--terracotta)', letterSpacing: '0.1em' }}>
          ✨ AI · READING THE THREAD
        </div>
        {ai.state === 'ready' && (
          <span className="mono" style={{
            marginLeft: 'auto', fontSize: 9, letterSpacing: '0.08em',
            color: intentChip(ai.data.intent).c, opacity: 0.95,
          }}>{intentChip(ai.data.intent).l}</span>
        )}
      </div>

      {ai.state === 'loading' && (
        <div style={{ fontSize: 13, lineHeight: 1.5, color: '#dccfb6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ color: '#a89c87', fontStyle: 'italic' }}>Reading what {clientName} just said…</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[80, 92, 60].map((w, i) => (
              <div key={i} style={{
                height: 8, width: `${w}%`, borderRadius: 4,
                background: 'rgba(251,246,236,0.08)',
                animation: `shimmer 1.6s ${i * 0.15}s ease-in-out infinite`,
              }} />
            ))}
          </div>
        </div>
      )}

      {ai.state === 'error' && (
        <div style={{ fontSize: 13, color: '#dccfb6', lineHeight: 1.5 }}>
          The AI couldn't read this one. Tap below to write back manually.
        </div>
      )}

      {ai.state === 'ready' && (
        <>
          <div style={{ fontSize: 14, marginBottom: 12, lineHeight: 1.5 }}>
            <strong>{ai.data.summary}</strong>
          </div>
          <div style={{
            background: 'rgba(251,246,236,0.06)',
            borderLeft: '2px solid var(--ochre)',
            padding: '8px 12px', borderRadius: 4,
            fontSize: 12.5, fontStyle: 'italic',
            color: '#dccfb6', lineHeight: 1.45, marginBottom: 12,
          }}>
            "{ai.data.suggested_reply}"
          </div>
          {ai.data.slots_to_offer?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div className="mono" style={{ fontSize: 9.5, color: '#a89c87', letterSpacing: '0.08em', marginBottom: 6 }}>
                SLOTS TO OFFER
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {ai.data.slots_to_offer.map((s, i) => (
                  <span key={i} style={{
                    padding: '4px 10px', borderRadius: 999,
                    background: 'rgba(251,246,236,0.1)',
                    color: '#fbf6ec', fontSize: 11.5,
                    border: '1px solid rgba(251,246,236,0.18)',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={onInsert} style={{
              background: 'var(--terracotta)', color: '#fbf6ec',
              padding: '8px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {Icon.sparkle({ width: 12, height: 12 })} Use this reply
            </button>
            {ai.data.slots_to_offer?.length > 0 && (
              <button style={{
                background: 'rgba(251,246,236,0.95)', color: 'var(--ink)',
                padding: '8px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 500,
              }}>Send slots + book her</button>
            )}
            <button style={{
              background: 'rgba(251,246,236,0.08)', color: '#fbf6ec',
              padding: '8px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 500,
              border: '1px solid rgba(251,246,236,0.18)',
            }}>Ignore</button>
          </div>
        </>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.4; } }
        @keyframes shimmer { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}
