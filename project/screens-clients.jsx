// Clients list + detail with notes

function ClientsScreen({ isPro, onNav, onUpgrade, onShareLink, onAppt }) {
  const [selected, setSelected] = React.useState(CLIENTS[0]);
  const [filter, setFilter] = React.useState('All');

  const filters = ['All', 'VIP', 'Regular', 'New'];

  return (
    <DashboardShell
      active="clients"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Clients"
      sub={`${CLIENTS.length} contacts · ${CLIENTS.filter(c => c.tags.includes('VIP')).length} VIPs`}
      action={
        <button className="btn btn-primary btn-sm">
          {Icon.plus({ width: 13, height: 13 })} Add client
        </button>
      }
    >
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* list */}
        <div style={{
          width: 360, borderRight: '1px solid var(--line)',
          display: 'flex', flexDirection: 'column', flexShrink: 0,
        }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 6 }}>
            {filters.map(f => (
              <button key={f}
                onClick={() => setFilter(f)}
                className="chip"
                style={{
                  background: filter === f ? 'var(--ink)' : 'transparent',
                  color: filter === f ? '#fbf6ec' : 'var(--ink-2)',
                  border: filter === f ? '1px solid var(--ink)' : '1px solid var(--line)',
                  cursor: 'pointer',
                }}
              >{f}</button>
            ))}
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {CLIENTS
              .filter(c => filter === 'All' || c.tags.includes(filter))
              .map(c => (
                <button key={c.id}
                  onClick={() => setSelected(c)}
                  style={{
                    width: '100%', textAlign: 'left',
                    display: 'flex', gap: 12, alignItems: 'center',
                    padding: '14px 20px',
                    background: selected?.id === c.id ? 'var(--paper-2)' : 'transparent',
                    borderBottom: '1px solid var(--line)',
                    borderLeft: selected?.id === c.id ? '3px solid var(--forest)' : '3px solid transparent',
                  }}
                >
                  <Avatar name={c.name} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</span>
                      {c.tags.includes('VIP') && (
                        <span style={{ color: 'var(--ochre)' }}>{Icon.star({ width: 11, height: 11 })}</span>
                      )}
                    </div>
                    <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2 }}>
                      {c.visits} VISITS · LAST {c.last.toUpperCase()}
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* detail */}
        {selected ? <ClientDetail client={selected} isPro={isPro} onUpgrade={onUpgrade} onAppt={onAppt} /> : null}
      </div>
    </DashboardShell>
  );
}

function ClientDetail({ client, isPro, onUpgrade, onAppt }) {
  const [tab, setTab] = React.useState('overview');
  const history = APPTS.filter(a => a.clientId === client.id);

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--card-warm)' }}>
      {/* header */}
      <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
          <Avatar name={client.name} size={64} />
          <div style={{ flex: 1 }}>
            <h1 className="serif" style={{ margin: 0, fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em' }}>
              {client.name}
            </h1>
            <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 12.5, color: 'var(--muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {Icon.phone({ width: 12, height: 12 })} {client.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {Icon.msg({ width: 12, height: 12 })} {client.email}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              {client.tags.map(t => (
                <span key={t} className={`chip ${t === 'VIP' ? 'chip-ochre' : t === 'New' ? 'chip-terracotta' : 'chip-forest'}`}>
                  {t === 'VIP' && Icon.star({ width: 10, height: 10 })}
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary btn-sm">{Icon.whatsapp({ width: 13, height: 13 })} WhatsApp</button>
            <button className="btn btn-primary btn-sm">
              {Icon.plus({ width: 13, height: 13 })} {client.visits > 0 ? 'Book again' : 'Book'}
            </button>
          </div>
        </div>

        {/* stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, marginTop: 24, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
          {[
            { l: 'Lifetime value', v: fmtJ(client.lifetime) },
            { l: 'Visits', v: client.visits, sub: 'in 14 months' },
            { l: 'Avg. ticket', v: fmtJ(Math.round(client.lifetime / client.visits)) },
            { l: 'Last visit', v: client.last },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--card)', padding: '14px 16px' }}>
              <div className="label" style={{ marginBottom: 4 }}>{s.l}</div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1, fontWeight: 400 }}>{s.v}</div>
              {s.sub && <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* tabs */}
      <div style={{ padding: '0 32px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 4 }}>
        {[
          ['overview', 'Overview'],
          ['notes', `Notes & history`],
          ['appts', `Appointments · ${history.length}`],
          ['lookbook', 'Lookbook'],
          ['forms', 'Intake forms'],
        ].map(([k, l]) => (
          <button key={k}
            onClick={() => setTab(k)}
            style={{
              padding: '12px 14px', fontSize: 13, fontWeight: 500,
              color: tab === k ? 'var(--ink)' : 'var(--muted)',
              borderBottom: tab === k ? '2px solid var(--forest)' : '2px solid transparent',
              marginBottom: -1,
            }}
          >{l}</button>
        ))}
      </div>

      <div style={{ padding: '24px 32px' }}>
        {tab === 'notes' ? (
          isPro ? <NotesTab client={client} /> : <NotesTabFree client={client} onUpgrade={onUpgrade} />
        ) : tab === 'appts' ? (
          <AppointmentsTab history={history} onAppt={onAppt} />
        ) : tab === 'lookbook' ? (
          isPro ? <LookbookTab client={client} /> : <LookbookLocked onUpgrade={onUpgrade} />
        ) : tab === 'forms' ? (
          isPro ? <IntakeTab client={client} /> : <FormsLocked onUpgrade={onUpgrade} />
        ) : (
          <OverviewTab client={client} />
        )}
      </div>
    </div>
  );
}

function ProLockedNotes({ onUpgrade }) {
  // Legacy — kept for safety. Use NotesTabFree instead.
  return <NotesTabFree client={CLIENTS[0]} onUpgrade={onUpgrade} />;
}

function NotesTabFree({ client, onUpgrade }) {
  // Show 3 notes free, then a soft wall
  const sampleNotes = [
    { d: 'May 10', body: client.notes || 'Polite. On time.', tag: 'visit' },
    { d: 'Apr 26', body: 'Asked about doing her sister\'s birthday set in June. Group of 3.', tag: 'follow-up' },
    { d: 'Apr 12', body: 'Slightly late — traffic on Constant Spring Rd.', tag: 'visit' },
  ];
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{
        marginBottom: 18, padding: '10px 14px',
        background: 'var(--terracotta-soft)', borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 12, color: '#8d3f1e',
        border: '1px solid #e6cdba',
      }}>
        <span style={{ color: 'var(--terracotta)' }}>{Icon.sparkle({ width: 14, height: 14 })}</span>
        <span style={{ flex: 1 }}>
          <strong>3 of 3 free notes used for {client.name.split(' ')[0]}.</strong> Upgrade for unlimited — plus a timeline yuh can scroll through any time.
        </span>
        <button className="btn btn-terracotta btn-sm" onClick={onUpgrade}>Upgrade</button>
      </div>

      {sampleNotes.map((n, i) => (
        <div key={i} style={{
          background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 18, marginBottom: 10,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              {n.d.toUpperCase()} · {n.tag.toUpperCase()}
            </div>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>{n.body}</div>
        </div>
      ))}

      {/* the soft wall */}
      <div style={{ position: 'relative', marginTop: 12 }}>
        <div style={{ filter: 'blur(2px)', opacity: 0.5, pointerEvents: 'none' }}>
          <div style={{
            background: 'var(--card)', border: '1px solid var(--line)',
            borderRadius: 12, padding: 18,
          }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>MAR 28 · PREFERENCE</div>
            <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>New: prefers ballerina shape, not stiletto. Update on file.</div>
          </div>
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(to bottom, transparent 0%, var(--paper) 60%)',
          paddingTop: 30,
        }}>
          <button className="btn btn-primary btn-sm" onClick={onUpgrade}>
            {Icon.lock({ width: 12, height: 12 })} Unlock 4 more notes
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────── Lookbook tab ──────────────
function LookbookTab({ client }) {
  const palette = ['#c4663d', '#0c4a2d', '#6a3a4a', '#c89b3d', '#4d6a48', '#8d3f1e'];
  // generate 9 photo placeholders with metadata
  const photos = Array.from({ length: 9 }).map((_, i) => ({
    color: palette[i % palette.length],
    pattern: i % 3,
    date: ['May 10', 'Apr 26', 'Apr 5', 'Mar 18', 'Feb 28', 'Feb 12', 'Jan 22', 'Jan 4', 'Dec 14'][i],
    svc: ['Acrylic chrome', 'Gel French', 'Pedicure', 'Acrylic almond', 'Gel ombre', 'Pedi spa', 'Acrylic ballerina', 'Gel cat-eye', 'Pedi gel'][i],
  }));

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{
        marginBottom: 18, padding: '12px 14px',
        background: 'var(--paper-2)', borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 12, color: 'var(--ink-2)',
      }}>
        <span style={{ color: 'var(--ochre)' }}>{Icon.sparkle({ width: 14, height: 14 })}</span>
        Add a photo after every visit — then next time, {client.name.split(' ')[0]} can scroll through her own history.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {photos.map((p, i) => (
          <div key={i} style={{
            aspectRatio: '1', borderRadius: 10, overflow: 'hidden',
            position: 'relative', cursor: 'pointer',
            background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
          }}>
            {/* fake pattern */}
            <div style={{
              position: 'absolute', inset: 0,
              background: p.pattern === 0 ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 50%)` :
                         p.pattern === 1 ? `repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 4px, transparent 4px 12px)` :
                                           `radial-gradient(circle at 70% 70%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(circle at 20% 80%, rgba(0,0,0,0.15), transparent 50%)`,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: 10,
              background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))',
              color: '#fbf6ec',
            }}>
              <div className="mono" style={{ fontSize: 9, opacity: 0.8, letterSpacing: '0.06em' }}>{p.date.toUpperCase()}</div>
              <div style={{ fontSize: 11.5, fontWeight: 500 }}>{p.svc}</div>
            </div>
          </div>
        ))}
        <button style={{
          aspectRatio: '1', borderRadius: 10,
          background: 'var(--card)', border: '1px dashed var(--line-2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 6, color: 'var(--muted)',
        }}>
          {Icon.plus({ width: 22, height: 22 })}
          <span style={{ fontSize: 11, fontWeight: 500 }}>Add photo</span>
        </button>
      </div>

      <div style={{
        marginTop: 18, padding: 14,
        background: 'var(--forest-soft)', borderRadius: 10,
        fontSize: 12, color: 'var(--forest)', lineHeight: 1.5,
        borderLeft: '3px solid var(--forest)',
      }}>
        <strong>Tip:</strong> share her lookbook in WhatsApp — she can show family the styles she\'s tried. Clients love this.
      </div>
    </div>
  );
}

function LookbookLocked({ onUpgrade }) {
  return (
    <div style={{
      maxWidth: 520, margin: '20px auto', textAlign: 'center',
      padding: 36, background: 'var(--card)', borderRadius: 16,
      border: '1px dashed var(--line-2)',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: 'var(--terracotta-soft)', color: 'var(--terracotta)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>{Icon.sparkle({ width: 22, height: 22 })}</div>
      <h3 className="serif" style={{ fontSize: 26, margin: '0 0 8px', fontWeight: 400 }}>
        Build a <span style={{ fontStyle: 'italic' }}>visual history</span> per client.
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: 13.5, margin: '0 0 18px', lineHeight: 1.55 }}>
        Before/after photos attached to every visit — perfect for repeats, referrals, IG.
      </p>
      <button className="btn btn-terracotta btn-sm" onClick={onUpgrade}>Unlock on Pro</button>
    </div>
  );
}

function FormsLocked({ onUpgrade }) {
  return (
    <div style={{
      maxWidth: 520, margin: '20px auto', textAlign: 'center',
      padding: 36, background: 'var(--card)', borderRadius: 16,
      border: '1px dashed var(--line-2)',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: 'var(--terracotta-soft)', color: 'var(--terracotta)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>{Icon.lock({ width: 20, height: 20 })}</div>
      <h3 className="serif" style={{ fontSize: 24, margin: '0 0 8px', fontWeight: 400 }}>
        Custom intake forms
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: 13.5, margin: '0 0 18px', lineHeight: 1.55 }}>
        Ask clients about allergies, preferences, anything you need — collected when they book.
      </p>
      <button className="btn btn-terracotta btn-sm" onClick={onUpgrade}>Unlock on Pro</button>
    </div>
  );
}

function OverviewTab({ client }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
      <div>
        <div className="label">Pinned note</div>
        <div style={{
          background: 'var(--card)', padding: 18, borderRadius: 12,
          border: '1px solid var(--line)',
          borderLeft: '3px solid var(--ochre)',
          fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)',
          marginTop: 8,
        }}>{client.notes || 'No notes yet — add one.'}</div>

        <div className="label" style={{ marginTop: 24 }}>Activity</div>
        <div style={{ marginTop: 8 }}>
          {[
            { d: 'May 24', t: 'Booked Gel Manicure · J$3,500', dot: 'var(--forest)' },
            { d: 'May 10', t: 'Visit completed — paid J$8,000 + J$500 tip', dot: 'var(--ochre)' },
            { d: 'May 8',  t: 'Deposit received — J$2,000', dot: 'var(--forest)' },
            { d: 'Apr 26', t: 'Visit completed — paid J$3,500', dot: 'var(--ochre)' },
          ].map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 60, paddingTop: 1 }}>{e.d}</div>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: e.dot, marginTop: 6 }} />
              <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)' }}>{e.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="label">Preferences</div>
        <div style={{ background: 'var(--card)', borderRadius: 12, border: '1px solid var(--line)', padding: 4, marginTop: 8 }}>
          {[
            ['Favourite service', 'Acrylic Full Set'],
            ['Preferred shape', 'Ballerina'],
            ['Allergies', 'Acetone'],
            ['Books usually', 'Saturdays · 11am'],
            ['Birthday', 'June 14'],
          ].map(([k, v], i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 14px',
              borderBottom: i < 4 ? '1px solid var(--line)' : 'none',
            }}>
              <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{k}</span>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>

        <button className="btn btn-secondary" style={{ width: '100%', marginTop: 16 }}>
          {Icon.pencil({ width: 13, height: 13 })} Edit preferences
        </button>
      </div>
    </div>
  );
}

function NotesTab({ client }) {
  const notes = [
    { d: 'May 10', body: client.notes || 'Polite. On time. Loves chrome.', tag: 'visit' },
    { d: 'Apr 26', body: 'Asked about doing her sister\'s birthday set in June. Group of 3.', tag: 'follow-up' },
    { d: 'Apr 12', body: 'Slightly late — traffic on Constant Spring Rd. Not a pattern, just noting.', tag: 'visit' },
    { d: 'Mar 28', body: 'New: prefers ballerina shape, not stiletto. Update on file.', tag: 'preference' },
  ];
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--line)',
        borderRadius: 12, padding: 4, marginBottom: 18,
      }}>
        <textarea
          placeholder="Add a note about this visit — allergies, prefs, gossip…"
          style={{
            width: '100%', minHeight: 70, padding: 14, border: 'none',
            background: 'transparent', resize: 'none',
            fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span className="chip" style={{ fontSize: 11 }}>visit</span>
            <span className="chip" style={{ fontSize: 11 }}>+ tag</span>
          </div>
          <button className="btn btn-primary btn-sm">Save note</button>
        </div>
      </div>

      {notes.map((n, i) => (
        <div key={i} style={{
          background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 18, marginBottom: 10,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              {n.d.toUpperCase()} · {n.tag.toUpperCase()}
            </div>
            <button style={{ color: 'var(--muted-2)' }}>{Icon.pencil({ width: 12, height: 12 })}</button>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>{n.body}</div>
        </div>
      ))}
    </div>
  );
}

function AppointmentsTab({ history, onAppt }) {
  return (
    <div style={{ maxWidth: 720 }}>
      {history.length === 0 && (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>No appointments yet.</div>
      )}
      {history.map(a => {
        const s = findService(a.serviceId);
        return (
          <button key={a.id} onClick={() => onAppt(a)}
            style={{
              width: '100%', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 16,
              padding: 16, background: 'var(--card)',
              border: '1px solid var(--line)', borderRadius: 12,
              marginBottom: 8,
            }}>
            <div style={{ width: 3, height: 30, borderRadius: 2, background: s.color }} />
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 90 }}>
              {DAYS[a.dayIdx]} · {DAY_DATES[a.dayIdx]} MAY
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>
                {fmtTime(a.start)} – {fmtTime(a.end)} · {fmtJ(s.price)}
              </div>
            </div>
            <span className={`chip chip-${a.status === 'confirmed' ? 'forest' : 'ochre'}`} style={{ fontSize: 11 }}>
              {a.status}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function IntakeTab({ client }) {
  return (
    <div style={{ maxWidth: 720 }}>
      <div className="label">Submitted with last booking · May 10, 2026</div>
      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, padding: 22, marginTop: 8 }}>
        {[
          ['Do you have any allergies we should know about?', 'Yes — acetone gives me a rash.'],
          ['Preferred nail shape', 'Ballerina'],
          ['Are you pregnant or nursing?', 'No'],
          ['Anything else?', 'I have a wedding on June 4th, would love a soft pink with chrome accent.'],
        ].map(([q, a], i) => (
          <div key={i} style={{
            padding: '14px 0',
            borderBottom: i < 3 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{q}</div>
            <div style={{ fontSize: 14, color: 'var(--ink)' }}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.ClientsScreen = ClientsScreen;
