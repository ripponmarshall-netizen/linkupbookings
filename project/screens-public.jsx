// Public booking page — rendered in iPhone frame
function PublicBooking() {
  const [step, setStep] = React.useState(1);
  const [selService, setSelService] = React.useState(null);
  const [selSlot, setSelSlot] = React.useState(null);

  return (
    <div style={{
      minHeight: '100vh', background: '#1a1612',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', position: 'relative', overflow: 'hidden',
    }}>
      {/* ambient backdrop */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.5,
        background: 'radial-gradient(circle at 30% 40%, #3a2a1c 0, transparent 60%), radial-gradient(circle at 70% 70%, #1c2a1f 0, transparent 60%)',
      }} />
      <div className="mono" style={{
        position: 'absolute', top: 30, left: 30,
        fontSize: 11, color: '#a89c87', letterSpacing: '0.12em',
      }}>BOOK.LINKUPBOOKINGS.COM/GLOW · client view</div>

      <div style={{ position: 'relative' }}>
        <IOSDevice width={390} height={780}>
          <div style={{ background: 'var(--paper)', minHeight: '100%', paddingTop: 50 }}>
            {step === 1 && <PBHome onNext={(s) => { setSelService(s); setStep(2); }} />}
            {step === 2 && <PBSlot service={selService} onBack={() => setStep(1)} onNext={(slot) => { setSelSlot(slot); setStep(3); }} />}
            {step === 3 && <PBCheckout service={selService} slot={selSlot} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
            {step === 4 && <PBConfirm service={selService} slot={selSlot} />}
          </div>
        </IOSDevice>

        {/* step indicator outside phone */}
        <div style={{
          position: 'absolute', top: -36, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 6,
        }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              width: n === step ? 24 : 8, height: 4, borderRadius: 2,
              background: n <= step ? 'var(--terracotta)' : '#3a3329',
              transition: 'width 200ms',
            }} />
          ))}
        </div>
      </div>

      {/* annotations */}
      <div style={{
        position: 'absolute', bottom: 30, left: 30, right: 30,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: '#a89c87', fontSize: 12,
      }}>
        <span className="mono" style={{ letterSpacing: '0.08em' }}>STEP {step} OF 4</span>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
          What clients see when you share your link.
        </span>
      </div>
    </div>
  );
}

function PBHeader({ small }) {
  return (
    <div style={{ padding: small ? '8px 20px 12px' : '8px 20px 20px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: small ? 0 : 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24,
        }}>g</div>
        <div>
          <div className="serif" style={{ fontSize: 19, fontStyle: 'italic', lineHeight: 1 }}>Glow Nail Studio</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
            <span style={{ color: 'var(--forest)' }}>● open</span> · Half-Way-Tree · ★ 4.9
          </div>
        </div>
      </div>
    </div>
  );
}

function PBHome({ onNext }) {
  return (
    <div>
      <PBHeader />
      {/* hero strip */}
      <div style={{ padding: '18px 20px 8px' }}>
        <div className="label" style={{ marginBottom: 6 }}>Step 1 of 4</div>
        <h2 className="serif" style={{ fontSize: 32, margin: '0 0 4px', lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.01em' }}>
          Pick a <span style={{ fontStyle: 'italic' }}>service</span>.
        </h2>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>You'll choose a time next.</div>
      </div>

      <div style={{ padding: '12px 16px 32px' }}>
        {SERVICES.map(s => (
          <button key={s.id} onClick={() => onNext(s)}
            style={{
              width: '100%', textAlign: 'left',
              padding: 14, marginBottom: 8,
              background: 'var(--card)',
              border: '1px solid var(--line)', borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: s.color + '18', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: s.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 500 }}>{s.name}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                {s.duration} MIN · {fmtJ(s.price)}
              </div>
            </div>
            {Icon.chev({ width: 14, height: 14, style: { color: 'var(--muted-2)' } })}
          </button>
        ))}

        <div style={{
          marginTop: 14, padding: 14,
          background: 'var(--paper-2)', borderRadius: 10,
          fontSize: 12, color: 'var(--muted)', textAlign: 'center',
          lineHeight: 1.5,
        }}>
          Not sure?  <a style={{ color: 'var(--forest)', fontWeight: 500 }}>WhatsApp the studio →</a>
        </div>
      </div>
    </div>
  );
}

function PBSlot({ service, onBack, onNext }) {
  // generate slots over 5 days
  const days = [
    { d: 'Today', date: '26 May', sub: 'Tue' },
    { d: 'Tomorrow', date: '27 May', sub: 'Wed' },
    { d: 'Thu', date: '28 May', sub: 'Thu' },
    { d: 'Fri', date: '29 May', sub: 'Fri' },
    { d: 'Sat', date: '30 May', sub: 'Sat' },
  ];
  const [day, setDay] = React.useState(1);

  const slots = [
    { t: '9:00am', avail: true },
    { t: '10:30am', avail: false },
    { t: '12:00pm', avail: true, popular: true },
    { t: '1:30pm', avail: true },
    { t: '3:00pm', avail: false },
    { t: '4:30pm', avail: true },
    { t: '6:00pm', avail: true, last: true },
  ];

  return (
    <div>
      <div style={{ padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onBack} style={{ padding: 6, fontSize: 13, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {Icon.chev({ width: 14, height: 14, style: { transform: 'scaleX(-1)' } })} Back
        </button>
      </div>
      <div style={{ padding: '0 20px 12px' }}>
        <div className="label">Step 2 of 4</div>
        <h2 className="serif" style={{ fontSize: 28, margin: '4px 0 4px', lineHeight: 1.05, fontWeight: 400 }}>
          When can you <span style={{ fontStyle: 'italic' }}>come</span>?
        </h2>
        <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>
          {service.name} · {service.duration} min
        </div>
      </div>

      {/* day strip */}
      <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 6, overflowX: 'auto' }} className="no-scroll">
        {days.map((dd, i) => (
          <button key={i} onClick={() => setDay(i)}
            style={{
              minWidth: 64, padding: '10px 6px',
              background: day === i ? 'var(--ink)' : 'var(--card)',
              color: day === i ? '#fbf6ec' : 'var(--ink)',
              borderRadius: 10, border: '1px solid var(--line)',
              textAlign: 'center', flexShrink: 0,
            }}>
            <div style={{ fontSize: 10, color: day === i ? '#a89c87' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{dd.d}</div>
            <div className="serif" style={{ fontSize: 18, lineHeight: 1.1, marginTop: 2 }}>{dd.date.split(' ')[0]}</div>
          </button>
        ))}
      </div>

      {/* slots */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="label" style={{ padding: '0 4px 8px' }}>Morning</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
          {slots.slice(0, 3).map((s, i) => (
            <SlotBtn key={i} slot={s} onNext={onNext} />
          ))}
        </div>
        <div className="label" style={{ padding: '0 4px 8px' }}>Afternoon</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {slots.slice(3).map((s, i) => (
            <SlotBtn key={i} slot={s} onNext={onNext} />
          ))}
        </div>
      </div>

      {/* waitlist */}
      <div style={{ padding: '0 16px 32px' }}>
        <div style={{
          padding: 14, background: 'var(--terracotta-soft)', borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: 'var(--terracotta)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbf6ec',
          }}>{Icon.bell({ width: 16, height: 16 })}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: '#8d3f1e' }}>Don't see a good time?</div>
            <div style={{ fontSize: 11, color: '#8d3f1e', opacity: 0.85 }}>Join the waitlist — we'll text you if someone cancels.</div>
          </div>
          <button style={{
            background: 'var(--terracotta)', color: '#fbf6ec',
            padding: '6px 12px', borderRadius: 6, fontSize: 11.5, fontWeight: 500,
          }}>Join</button>
        </div>
      </div>
    </div>
  );
}

function SlotBtn({ slot, onNext }) {
  const disabled = !slot.avail;
  return (
    <button onClick={() => !disabled && onNext(slot)} disabled={disabled}
      style={{
        padding: '14px 10px', borderRadius: 10,
        background: disabled ? 'var(--paper-2)' : 'var(--card)',
        color: disabled ? 'var(--muted-2)' : 'var(--ink)',
        border: '1px solid var(--line)',
        position: 'relative', overflow: 'hidden',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textDecoration: disabled ? 'line-through' : 'none',
      }}>
      <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1 }}>{slot.t}</div>
      {slot.popular && <div style={{ fontSize: 9.5, color: 'var(--terracotta)', marginTop: 4, fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>POPULAR</div>}
      {slot.last && <div style={{ fontSize: 9.5, color: 'var(--forest)', marginTop: 4, fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>LAST OF DAY</div>}
      {disabled && <div style={{ fontSize: 9.5, color: 'var(--muted-2)', marginTop: 4, fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>BOOKED</div>}
    </button>
  );
}

function PBCheckout({ service, slot, onBack, onNext }) {
  const deposit = Math.round(service.price * 0.25);
  return (
    <div>
      <div style={{ padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onBack} style={{ padding: 6, fontSize: 13, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {Icon.chev({ width: 14, height: 14, style: { transform: 'scaleX(-1)' } })} Back
        </button>
      </div>
      <div style={{ padding: '0 20px 8px' }}>
        <div className="label">Step 3 of 4</div>
        <h2 className="serif" style={{ fontSize: 28, margin: '4px 0', lineHeight: 1.05, fontWeight: 400 }}>
          Confirm your <span style={{ fontStyle: 'italic' }}>details</span>.
        </h2>
      </div>

      {/* summary */}
      <div style={{ padding: '8px 16px 16px' }}>
        <div style={{
          background: 'var(--card)', borderRadius: 12,
          border: '1px solid var(--line)', padding: 14,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 4, height: 36, borderRadius: 2, background: service.color }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>{service.name}</div>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2 }}>
              TOMORROW · WED 27 MAY · {slot.t.toUpperCase()}
            </div>
          </div>
          <div className="mono" style={{ fontSize: 13, fontWeight: 500 }}>{fmtJ(service.price)}</div>
        </div>
      </div>

      {/* form */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ marginBottom: 10 }}>
          <label className="label">Name</label>
          <input className="input" placeholder="Your full name" defaultValue="" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label className="label">Phone</label>
          <input className="input" placeholder="876…" defaultValue="" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label className="label">Any allergies or notes?</label>
          <textarea className="textarea" rows="2" placeholder="Optional — but the studio loves a heads-up."
            style={{ resize: 'none' }} />
        </div>
      </div>

      {/* deposit */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: 'var(--forest-soft)', borderRadius: 12, padding: 14,
          border: '1px solid #cad6c9',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--forest)' }}>Hold this slot with a deposit</div>
            <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest)' }}>{fmtJ(deposit)}</div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--forest)', opacity: 0.85, lineHeight: 1.4 }}>
            25% of {fmtJ(service.price)}. Refundable up to 24 hrs before. Balance paid in studio.
          </div>
        </div>
      </div>

      {/* pay */}
      <div style={{ padding: '0 16px 24px' }}>
        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={onNext}>
          Pay deposit · {fmtJ(deposit)} {Icon.arrow({ width: 14, height: 14 })}
        </button>
        <div style={{ fontSize: 10.5, color: 'var(--muted)', textAlign: 'center', marginTop: 10, lineHeight: 1.4 }}>
          Secured by NCB. Pay with card or NCB Quisk.
        </div>
      </div>
    </div>
  );
}

function PBConfirm({ service, slot }) {
  return (
    <div style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%', background: 'var(--forest)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fbf6ec', margin: '0 auto 22px',
      }}>{Icon.check({ width: 32, height: 32 })}</div>
      <h2 className="serif" style={{ fontSize: 36, margin: '0 0 8px', lineHeight: 1.05, fontWeight: 400 }}>
        You're <span style={{ fontStyle: 'italic' }}>booked</span>.
      </h2>
      <div style={{ color: 'var(--muted)', fontSize: 13.5, marginBottom: 28, lineHeight: 1.5 }}>
        We'll text you a reminder 24 hours before. See you then.
      </div>

      <div style={{
        background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14,
        padding: 18, textAlign: 'left', marginBottom: 20,
      }}>
        <div className="serif" style={{ fontSize: 18, fontStyle: 'italic' }}>Glow Nail Studio</div>
        <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2, letterSpacing: '0.06em' }}>23 CONSTANT SPRING RD, HWT</div>
        <div style={{ height: 1, background: 'var(--line)', margin: '14px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'var(--muted)', fontSize: 12 }}>Service</span>
          <span style={{ fontSize: 12.5, fontWeight: 500 }}>{service.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'var(--muted)', fontSize: 12 }}>When</span>
          <span style={{ fontSize: 12.5, fontWeight: 500 }}>Wed 27 May · {slot.t}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'var(--muted)', fontSize: 12 }}>Deposit paid</span>
          <span className="mono" style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--forest)' }}>{fmtJ(Math.round(service.price * 0.25))}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--muted)', fontSize: 12 }}>Balance in studio</span>
          <span className="mono" style={{ fontSize: 12.5, fontWeight: 500 }}>{fmtJ(service.price - Math.round(service.price * 0.25))}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button className="btn btn-secondary" style={{ flex: 1 }}>
          {Icon.cal({ width: 13, height: 13 })} Add to calendar
        </button>
        <button className="btn btn-secondary" style={{ flex: 1 }}>
          {Icon.whatsapp({ width: 13, height: 13 })} Share
        </button>
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
        Need to reschedule? Tap the link in your text — easy.
      </div>
    </div>
  );
}

window.PublicBooking = PublicBooking;
