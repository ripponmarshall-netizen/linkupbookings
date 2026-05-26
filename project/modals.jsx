// Modals: AddAppointment, Upgrade, ShareLink, ApptDetail

function ModalShell({ onClose, width = 480, children, dark }) {
  React.useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(20,15,8,0.6)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{
        width, maxWidth: '100%', maxHeight: '88vh',
        background: dark ? 'var(--ink)' : 'var(--paper)',
        color: dark ? '#fbf6ec' : 'var(--ink)',
        borderRadius: 16, boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}>{children}</div>
    </div>
  );
}

// ────────────── Add appointment ──────────────
function AddApptModal({ onClose }) {
  const [step, setStep] = React.useState(1);
  const [client, setClient] = React.useState(null);
  const [service, setService] = React.useState(SERVICES[0]);
  const [time, setTime] = React.useState('11:00am');
  const [requireDeposit, setRequireDeposit] = React.useState(true);

  return (
    <ModalShell onClose={onClose} width={540}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">New appointment</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>{Icon.x({ width: 16, height: 16 })}</button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          {step === 1 ? 'Who?' : step === 2 ? 'What service?' : 'When?'}
        </h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {step === 1 && (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--card)', border: '1px solid var(--line)',
                padding: '10px 12px', borderRadius: 8,
              }}>
                {Icon.search({ width: 14, height: 14, style: { color: 'var(--muted)' } })}
                <input
                  className="mono"
                  placeholder="Search clients or add new..."
                  style={{ border: 'none', background: 'transparent', flex: 1, padding: 0, fontSize: 13 }}
                />
                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: 11.5 }}>
                  {Icon.plus({ width: 12, height: 12 })} New
                </button>
              </div>
            </div>
            <div className="label" style={{ marginBottom: 8 }}>Recent</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {CLIENTS.slice(0, 5).map(c => (
                <button key={c.id} onClick={() => { setClient(c); setStep(2); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: 10, borderRadius: 10, textAlign: 'left',
                    background: client?.id === c.id ? 'var(--paper-2)' : 'transparent',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--paper-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = client?.id === c.id ? 'var(--paper-2)' : 'transparent'}
                >
                  <Avatar name={c.name} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{c.phone}</div>
                  </div>
                  <span className="chip" style={{ fontSize: 10 }}>{c.visits} visits</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {SERVICES.map(s => (
                <button key={s.id} onClick={() => { setService(s); setStep(3); }}
                  style={{
                    padding: 14, textAlign: 'left',
                    background: service?.id === s.id ? s.color + '12' : 'var(--card)',
                    border: service?.id === s.id ? `1px solid ${s.color}` : '1px solid var(--line)',
                    borderRadius: 10,
                  }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: s.color, marginBottom: 8 }} />
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 4 }}>
                    {s.duration} MIN · {fmtJ(s.price)}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Date</label>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }} className="no-scroll">
                {DAYS.map((d, i) => (
                  <button key={i} className="chip" style={{
                    background: i === 1 ? 'var(--ink)' : 'var(--card)',
                    color: i === 1 ? '#fbf6ec' : 'var(--ink)',
                    border: i === 1 ? '1px solid var(--ink)' : '1px solid var(--line)',
                    minWidth: 56, padding: '8px 10px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
                  }}>
                    <span style={{ fontSize: 9.5, opacity: 0.7 }}>{d.toUpperCase()}</span>
                    <span style={{ fontSize: 15, fontFamily: 'var(--serif)' }}>{DAY_DATES[i]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Time</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {['9:00am','10:00am','11:00am','12:00pm','1:30pm','3:00pm','4:30pm','6:00pm'].map(t => (
                  <button key={t} onClick={() => setTime(t)}
                    className="chip"
                    style={{
                      background: time === t ? 'var(--forest)' : 'var(--card)',
                      color: time === t ? '#fbf6ec' : 'var(--ink)',
                      border: time === t ? '1px solid var(--forest)' : '1px solid var(--line)',
                      justifyContent: 'center', padding: '8px 0', fontSize: 12,
                    }}
                  >{t}</button>
                ))}
              </div>
            </div>

            <div style={{
              padding: 14, background: 'var(--card)', border: '1px solid var(--line)',
              borderRadius: 10, marginBottom: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Require deposit</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>25% · {fmtJ(Math.round(service.price * 0.25))} via WhatsApp link</div>
                </div>
                <button onClick={() => setRequireDeposit(!requireDeposit)}
                  style={{
                    width: 38, height: 22, borderRadius: 11,
                    background: requireDeposit ? 'var(--forest)' : 'var(--line-2)',
                    position: 'relative', transition: 'background 120ms',
                  }}>
                  <div style={{
                    position: 'absolute', top: 2, left: requireDeposit ? 18 : 2,
                    width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    transition: 'left 120ms',
                  }} />
                </button>
              </div>
            </div>

            <div>
              <label className="label">Note for this booking</label>
              <textarea className="textarea" rows="2" placeholder="Optional…" style={{ resize: 'none' }} />
            </div>
          </>
        )}
      </div>

      <div style={{
        padding: '14px 24px', borderTop: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--paper-2)',
      }}>
        {step > 1 ? (
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>
            {Icon.chev({ width: 12, height: 12, style: { transform: 'scaleX(-1)' } })} Back
          </button>
        ) : <div />}

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginRight: 6 }}>STEP {step}/3</div>
          {step < 3 ? (
            <button className="btn btn-primary btn-sm" onClick={() => setStep(step + 1)} disabled={step === 1 && !client}>
              Continue {Icon.chev({ width: 12, height: 12 })}
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              {Icon.check({ width: 13, height: 13 })} Confirm & send invite
            </button>
          )}
        </div>
      </div>
    </ModalShell>
  );
}

// ────────────── Upgrade paywall ──────────────
function UpgradeModal({ onClose, onUpgrade }) {
  const [billing, setBilling] = React.useState('monthly');
  return (
    <ModalShell onClose={onClose} width={620} dark>
      {/* close */}
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, color: '#a89c87', zIndex: 5 }}>
        {Icon.x({ width: 18, height: 18 })}
      </button>

      {/* decorative ornament */}
      <div style={{
        position: 'absolute', top: -120, right: -120,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,102,61,0.25), transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, left: -80,
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,155,61,0.18), transparent 60%)',
      }} />

      <div style={{ padding: '40px 40px 32px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 999,
          background: 'rgba(196,102,61,0.18)', color: 'var(--terracotta)',
          fontSize: 11, fontFamily: 'var(--mono)', letterSpacing: '0.08em', marginBottom: 22,
        }}>
          {Icon.sparkle({ width: 11, height: 11 })} UPGRADE
        </div>
        <h2 className="serif" style={{
          fontSize: 56, margin: '0 0 12px', lineHeight: 0.98,
          fontWeight: 400, letterSpacing: '-0.015em',
        }}>
          Stop chasing.<br/>
          <span style={{ fontStyle: 'italic', color: 'var(--ochre)' }}>Start booking.</span>
        </h2>
        <p style={{ color: '#c8bda4', fontSize: 14, lineHeight: 1.55, margin: '0 0 28px', maxWidth: 440 }}>
          Unlock a public booking link, deposits, reminders and analytics —
          everything to stop running your business from your DMs.
        </p>

        {/* billing toggle */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          {[
            { k: 'monthly', l: 'Monthly', p: 'J$400/mo', sub: '' },
            { k: 'yearly', l: 'Yearly', p: 'J$4,000/yr', sub: 'save J$800' },
          ].map(opt => (
            <button key={opt.k} onClick={() => setBilling(opt.k)}
              style={{
                flex: 1, padding: '14px 16px', borderRadius: 12,
                background: billing === opt.k ? 'rgba(251,246,236,0.95)' : 'rgba(251,246,236,0.05)',
                border: billing === opt.k ? '1px solid rgba(251,246,236,0.95)' : '1px solid rgba(251,246,236,0.12)',
                color: billing === opt.k ? 'var(--ink)' : '#fbf6ec',
                textAlign: 'left',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{opt.l}</span>
                {opt.sub && <span className="mono" style={{ fontSize: 9.5, color: billing === opt.k ? 'var(--terracotta)' : 'var(--ochre)', letterSpacing: '0.06em' }}>{opt.sub.toUpperCase()}</span>}
              </div>
              <div className="serif" style={{ fontSize: 22, fontWeight: 400 }}>{opt.p}</div>
            </button>
          ))}
        </div>

        {/* features */}
        <div style={{
          background: 'rgba(251,246,236,0.04)', borderRadius: 12,
          padding: '14px 18px', marginBottom: 24,
          border: '1px solid rgba(251,246,236,0.06)',
        }}>
          {[
            ['Public booking link & embed', 'book.linkupbookings.com/yourname'],
            ['Auto SMS + WhatsApp reminders', 'Cut no-shows by ~70%'],
            ['Collect deposits at booking', 'Refundable up to 24 hr'],
            ['Client notes & history', 'Allergies, preferences, birthdays'],
            ['Analytics & insights', 'Revenue, busiest hours, top clients'],
            ['Waitlist & intake forms', 'Plus reviews and ratings'],
          ].map(([f, sub], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderBottom: i < 5 ? '1px solid rgba(251,246,236,0.06)' : 'none',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: 'var(--terracotta)', color: '#fbf6ec',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{Icon.check({ width: 11, height: 11 })}</div>
              <div style={{ flex: 1, fontSize: 13 }}>{f}</div>
              <div className="mono" style={{ fontSize: 10, color: '#a89c87', letterSpacing: '0.04em' }}>{sub}</div>
            </div>
          ))}
        </div>

        <button className="btn btn-terracotta btn-lg" style={{ width: '100%' }} onClick={onUpgrade}>
          Start 14-day free trial · then {billing === 'monthly' ? 'J$400/mo' : 'J$4,000/yr'}
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#a89c87', marginTop: 10 }}>
          No card needed until day 15 · cancel any time
        </div>
      </div>
    </ModalShell>
  );
}

// ────────────── Share link modal ──────────────
function ShareLinkModal({ onClose }) {
  const [copied, setCopied] = React.useState(false);
  const link = 'book.linkupbookings.com/glow';

  return (
    <ModalShell onClose={onClose} width={520}>
      <div style={{ padding: '24px 28px 8px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Your booking link</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>{Icon.x({ width: 16, height: 16 })}</button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          Share this <span style={{ fontStyle: 'italic' }}>everywhere</span>.
        </h2>
      </div>

      <div style={{ padding: 24, overflowY: 'auto' }}>
        <div style={{
          display: 'flex', alignItems: 'stretch', marginBottom: 18,
          background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 16px', flex: 1,
            fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--ink)',
            display: 'flex', alignItems: 'center',
          }}>
            <span style={{ color: 'var(--muted)' }}>book.linkupbookings.com/</span>
            <span style={{ fontWeight: 600 }}>glow</span>
          </div>
          <button
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }}
            style={{
              background: copied ? 'var(--forest)' : 'var(--ink)',
              color: '#fbf6ec', padding: '0 18px', fontSize: 12.5,
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'background 200ms',
            }}>
            {copied ? Icon.check({ width: 14, height: 14 }) : Icon.copy({ width: 14, height: 14 })}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* share targets */}
        <div className="label" style={{ marginBottom: 8 }}>Share to</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
          {[
            { l: 'WhatsApp', i: Icon.whatsapp, c: '#25d366' },
            { l: 'Instagram', i: Icon.globe, c: '#c4663d' },
            { l: 'SMS', i: Icon.msg, c: 'var(--forest)' },
            { l: 'Email', i: Icon.bell, c: 'var(--plum)' },
          ].map((s, i) => (
            <button key={i} style={{
              padding: '14px 8px', borderRadius: 10, background: 'var(--card)',
              border: '1px solid var(--line)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              <span style={{ color: s.c }}>{s.i({ width: 18, height: 18 })}</span>
              <span style={{ fontSize: 11.5 }}>{s.l}</span>
            </button>
          ))}
        </div>

        {/* qr */}
        <div style={{
          display: 'flex', gap: 18, alignItems: 'center',
          padding: 18, background: 'var(--paper-2)', borderRadius: 12,
        }}>
          <div style={{
            width: 90, height: 90, background: '#fff', padding: 6,
            border: '1px solid var(--line)', borderRadius: 8,
            display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: 0,
          }}>
            {Array.from({ length: 121 }).map((_, i) => {
              const r = Math.floor(i / 11), c = i % 11;
              const corner = (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
              const cornerFill = (r === 0 || r === 2 || r === 6 || r === 8 || c === 0 || c === 2 || c === 6 || c === 8);
              const fill = corner ? cornerFill : ((i * 17 + 3) % 7 < 3);
              return <div key={i} style={{ background: fill ? '#1a201d' : '#fff' }} />;
            })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>Add to your storefront</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10 }}>
              Print this QR and stick it on your mirror. Clients scan, book themselves in.
            </div>
            <button className="btn btn-secondary btn-sm">Download PDF</button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

// ────────────── Appointment detail (popover-like) ──────────────
function ApptDetailModal({ appt, onClose }) {
  const c = findClient(appt.clientId);
  const s = findService(appt.serviceId);
  return (
    <ModalShell onClose={onClose} width={420}>
      <div style={{
        padding: '20px 24px', position: 'relative',
        borderBottom: '1px solid var(--line)',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, color: 'var(--muted)' }}>
          {Icon.x({ width: 16, height: 16 })}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '0.08em' }}>{s.name.toUpperCase()}</span>
          <span className={`chip chip-${appt.status === 'confirmed' ? 'forest' : 'ochre'}`} style={{ fontSize: 10 }}>{appt.status}</span>
        </div>
        <div className="serif" style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.1, marginBottom: 8 }}>
          {c.name}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
          {DAYS[appt.dayIdx].toUpperCase()} · {DAY_DATES[appt.dayIdx]} MAY · {fmtTime(appt.start).toUpperCase()} – {fmtTime(appt.end).toUpperCase()}
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
            <div className="serif" style={{ fontSize: 20, color: appt.deposit > 0 ? 'var(--forest)' : 'var(--muted-2)' }}>
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
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>CLIENT NOTE</div>
            {c.notes}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>{Icon.whatsapp({ width: 13, height: 13 })} Message</button>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>{Icon.pencil({ width: 13, height: 13 })} Edit</button>
          <button className="btn btn-secondary btn-sm" style={{ padding: '6px 10px' }}>{Icon.trash({ width: 13, height: 13, style: { color: 'var(--terracotta)' } })}</button>
        </div>
      </div>
    </ModalShell>
  );
}

Object.assign(window, { AddApptModal, UpgradeModal, ShareLinkModal, ApptDetailModal, BlockOffModal, FillSlotModal, MarkPaidModal });

// ────────────── Block off time ──────────────
function BlockOffModal({ onClose }) {
  const [reason, setReason] = React.useState('Lunch break');
  const [recurring, setRecurring] = React.useState(false);
  const reasons = [
    { l: 'Lunch break', i: '💫', color: 'var(--ochre)' },
    { l: 'School run', i: '🚸', color: 'var(--terracotta)' },
    { l: 'Doctor / personal', i: '⚕', color: 'var(--plum)' },
    { l: 'Holiday', i: '✨', color: 'var(--forest)' },
    { l: 'Just blocked', i: '—', color: 'var(--muted)' },
  ];

  return (
    <ModalShell onClose={onClose} width={540}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Block off time</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>{Icon.x({ width: 16, height: 16 })}</button>
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
              <button key={i} className="chip" style={{
                background: i === 2 ? 'var(--ink)' : 'var(--card)',
                color: i === 2 ? '#fbf6ec' : 'var(--ink)',
                border: i === 2 ? '1px solid var(--ink)' : '1px solid var(--line)',
                minWidth: 56, padding: '8px 10px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <span style={{ fontSize: 9.5, opacity: 0.7 }}>{d.toUpperCase()}</span>
                <span style={{ fontSize: 15, fontFamily: 'var(--serif)' }}>{DAY_DATES[i]}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label className="label">From</label>
            <input className="input" defaultValue="1:00pm" />
          </div>
          <div>
            <label className="label">To</label>
            <input className="input" defaultValue="2:00pm" />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="label">Reason (for yuh records)</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {reasons.map(r => (
              <button key={r.l} onClick={() => setReason(r.l)} className="chip" style={{
                background: reason === r.l ? r.color + '20' : 'var(--card)',
                color: reason === r.l ? r.color : 'var(--ink)',
                border: reason === r.l ? `1px solid ${r.color}` : '1px solid var(--line)',
                cursor: 'pointer', padding: '6px 12px',
              }}>{r.i} {r.l}</button>
            ))}
          </div>
        </div>

        <div style={{
          padding: 14, background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 10, marginBottom: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Repeat every week</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Block Wednesdays 1–2pm until cancelled</div>
            </div>
            <button onClick={() => setRecurring(!recurring)}
              style={{
                width: 38, height: 22, borderRadius: 11,
                background: recurring ? 'var(--forest)' : 'var(--line-2)',
                position: 'relative',
              }}>
              <div style={{
                position: 'absolute', top: 2, left: recurring ? 18 : 2,
                width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
                transition: 'left 120ms',
              }} />
            </button>
          </div>
        </div>

        <label className="label">Note shown to clients (optional)</label>
        <input className="input" placeholder="e.g. ‘back at 2pm’ — leave blank to just hide the slot" />
      </div>

      <div style={{ padding: '14px 24px', borderTop: '1px solid var(--line)', background: 'var(--paper-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>WILL HIDE 4 SLOTS FROM YUH BOOKING PAGE</span>
        <button className="btn btn-primary btn-sm" onClick={onClose}>
          {Icon.lock({ width: 13, height: 13 })} Block it off
        </button>
      </div>
    </ModalShell>
  );
}

// ────────────── Fill empty slot ──────────────
function FillSlotModal({ onClose }) {
  const [segment, setSegment] = React.useState('regulars');
  const [discount, setDiscount] = React.useState(15);
  const [channel, setChannel] = React.useState('whatsapp');

  const segments = [
    { k: 'regulars', l: 'Regulars',  n: 12, sub: 'visited 2x+ in 90 days' },
    { k: 'vip',      l: 'VIP only',  n: 4,  sub: 'top 10% spenders' },
    { k: 'lapsed',   l: 'Lapsed',    n: 8,  sub: "haven't booked in 60d" },
    { k: 'all',      l: 'Everyone',  n: 47, sub: 'all clients' },
  ];
  const segmentCount = segments.find(s => s.k === segment).n;
  const message = `Hey {first_name}! Mi have an open slot Thu 29th at 3pm — ${discount}% off if yuh grab it 💚 Book here: lup.bk/glow`;

  return (
    <ModalShell onClose={onClose} width={780}>
      <div style={{ padding: '20px 28px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Fill an empty slot</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>{Icon.x({ width: 16, height: 16 })}</button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          Thu 3pm · <span style={{ fontStyle: 'italic' }}>let's not let it go to waste.</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', padding: 0, flex: 1, minHeight: 0 }}>
        {/* form */}
        <div style={{ padding: 24, overflowY: 'auto', borderRight: '1px solid var(--line)' }}>
          <label className="label" style={{ marginBottom: 8 }}>Send to</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 18 }}>
            {segments.map(s => (
              <button key={s.k} onClick={() => setSegment(s.k)}
                style={{
                  padding: 12, borderRadius: 10, textAlign: 'left',
                  background: segment === s.k ? 'var(--card)' : 'transparent',
                  border: segment === s.k ? '1px solid var(--forest)' : '1px solid var(--line)',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.l}</span>
                  <span className="mono" style={{ fontSize: 11, color: segment === s.k ? 'var(--forest)' : 'var(--muted)' }}>{s.n} ppl</span>
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>{s.sub}</div>
              </button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>Sweeten the deal</label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {[0, 10, 15, 20, 25].map(d => (
              <button key={d} onClick={() => setDiscount(d)} className="chip" style={{
                background: discount === d ? 'var(--terracotta)' : 'var(--card)',
                color: discount === d ? '#fbf6ec' : 'var(--ink)',
                border: discount === d ? '1px solid var(--terracotta)' : '1px solid var(--line)',
                cursor: 'pointer', padding: '6px 12px',
              }}>{d === 0 ? 'No discount' : `${d}% off`}</button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>Send via</label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {[
              { k: 'whatsapp', l: 'WhatsApp', i: Icon.whatsapp },
              { k: 'sms', l: 'SMS', i: Icon.msg },
            ].map(c => (
              <button key={c.k} onClick={() => setChannel(c.k)} className="chip" style={{
                background: channel === c.k ? 'var(--ink)' : 'var(--card)',
                color: channel === c.k ? '#fbf6ec' : 'var(--ink-2)',
                border: channel === c.k ? '1px solid var(--ink)' : '1px solid var(--line)',
                cursor: 'pointer', padding: '6px 12px',
              }}>{c.i({ width: 11, height: 11 })} {c.l}</button>
            ))}
          </div>

          <label className="label" style={{ marginBottom: 8 }}>Message</label>
          <textarea
            defaultValue={message}
            rows="4"
            style={{
              width: '100%', padding: 12,
              background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10,
              fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.55, resize: 'vertical', outline: 'none',
            }}
          />
        </div>

        {/* preview */}
        <div style={{ padding: 24, background: 'var(--paper-2)', overflowY: 'auto' }}>
          <div className="label" style={{ marginBottom: 12 }}>Preview</div>
          <div style={{
            background: '#0d141a', borderRadius: 16, padding: 16, marginBottom: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14 }}>g</div>
              <span style={{ fontSize: 12, color: '#e9edef', fontWeight: 500 }}>Glow Nail Studio</span>
            </div>
            <div style={{
              background: '#005c4b', color: '#e9edef',
              padding: '8px 12px', borderRadius: 8, fontSize: 13, lineHeight: 1.45,
            }}>
              {message.replace('{first_name}', 'Aaliyah')}
              <div style={{ fontSize: 9.5, color: '#aebac1', textAlign: 'right', marginTop: 4 }}>3:00 PM ✓</div>
            </div>
          </div>

          {/* expected response */}
          <div className="label" style={{ marginBottom: 10 }}>Realistic outcome</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Will receive', segmentCount + ' people', 'var(--ink)'],
              ['Expected reads', Math.round(segmentCount * 0.96) + ' (96%)', 'var(--ink-2)'],
              ['Likely bookings', '1–2', 'var(--forest)'],
              ['Cost', 'J$0', 'var(--ink-2)'],
            ].map(([k, v, c], i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 12px', background: 'var(--card)', borderRadius: 8,
                border: '1px solid var(--line)',
              }}>
                <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{k}</span>
                <span className="mono" style={{ fontSize: 11.5, fontWeight: 500, color: c }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 28px', borderTop: '1px solid var(--line)', background: 'var(--paper-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-terracotta btn-sm" onClick={onClose}>
          {Icon.sparkle({ width: 13, height: 13 })} Send to {segmentCount} clients
        </button>
      </div>
    </ModalShell>
  );
}

// ────────────── Mark as paid ──────────────
function MarkPaidModal({ appt, onClose }) {
  const a = appt || { clientId: 'c3', serviceId: 's3', deposit: 1500, start: 11 };
  const c = findClient(a.clientId);
  const s = findService(a.serviceId);
  const balance = s.price - (a.deposit || 0);

  const [method, setMethod] = React.useState('cash');
  const [tip, setTip] = React.useState(0);
  const total = balance + tip;

  const methods = [
    { k: 'cash', l: 'Cash', i: Icon.cash },
    { k: 'lynk', l: 'NCB Lynk', i: Icon.phone },
    { k: 'card', l: 'Card', i: Icon.cash },
    { k: 'other', l: 'Other', i: Icon.plus },
  ];

  return (
    <ModalShell onClose={onClose} width={460}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Collect payment</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>{Icon.x({ width: 16, height: 16 })}</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
          <Avatar name={c.name} size={36} />
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 500 }}>{c.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{s.name} · {fmtTime(a.start)}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 22 }}>
        {/* breakdown */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 10, padding: '14px 16px', marginBottom: 18,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
            <span style={{ color: 'var(--muted)' }}>Service</span>
            <span className="mono">{fmtJ(s.price)}</span>
          </div>
          {a.deposit > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--forest)' }}>Deposit paid</span>
              <span className="mono" style={{ color: 'var(--forest)' }}>− {fmtJ(a.deposit)}</span>
            </div>
          )}
          {tip > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--ochre)' }}>Tip</span>
              <span className="mono" style={{ color: 'var(--ochre)' }}>+ {fmtJ(tip)}</span>
            </div>
          )}
          <div style={{ height: 1, background: 'var(--line)', margin: '6px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14, fontWeight: 600 }}>
            <span>Total to collect</span>
            <span className="mono serif" style={{ fontSize: 20 }}>{fmtJ(total)}</span>
          </div>
        </div>

        {/* method */}
        <label className="label" style={{ marginBottom: 8 }}>Method</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 18 }}>
          {methods.map(m => (
            <button key={m.k} onClick={() => setMethod(m.k)}
              style={{
                padding: '10px 6px', borderRadius: 8,
                background: method === m.k ? 'var(--ink)' : 'var(--card)',
                color: method === m.k ? '#fbf6ec' : 'var(--ink)',
                border: method === m.k ? '1px solid var(--ink)' : '1px solid var(--line)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                fontSize: 11.5, fontWeight: 500,
              }}>
              {m.i({ width: 14, height: 14 })} {m.l}
            </button>
          ))}
        </div>

        {/* tip */}
        <label className="label" style={{ marginBottom: 8 }}>Tip</label>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {[0, 200, 500, 1000].map(t => (
            <button key={t} onClick={() => setTip(t)} className="chip" style={{
              background: tip === t ? 'var(--ochre)' : 'var(--card)',
              color: tip === t ? '#fbf6ec' : 'var(--ink)',
              border: tip === t ? '1px solid var(--ochre)' : '1px solid var(--line)',
              cursor: 'pointer', padding: '6px 14px', flex: 1, justifyContent: 'center',
            }}>{t === 0 ? 'None' : fmtJ(t)}</button>
          ))}
          <input className="input" placeholder="custom" style={{ width: 90, fontSize: 12 }}
            onChange={e => setTip(parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0)} />
        </div>
      </div>

      <div style={{
        padding: '14px 24px', borderTop: '1px solid var(--line)',
        background: 'var(--paper-2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-2)' }}>
          <input type="checkbox" defaultChecked /> SMS receipt to {c.name.split(' ')[0]}
        </label>
        <button className="btn btn-primary btn-sm" onClick={onClose}>
          {Icon.check({ width: 13, height: 13 })} Mark paid · {fmtJ(total)}
        </button>
      </div>
    </ModalShell>
  );
}
