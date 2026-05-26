// Settings — finally a real page behind the sidebar nav item
function SettingsScreen({ isPro, onNav, onUpgrade, onShareLink }) {
  const [section, setSection] = React.useState('profile');
  const sections = [
    { k: 'profile',    l: 'Business profile' },
    { k: 'hours',      l: 'Hours & buffer' },
    { k: 'payments',   l: 'Payments & deposits' },
    { k: 'branding',   l: 'Your booking page' },
    { k: 'notifications', l: 'Notifications' },
    { k: 'vacation',   l: 'Vacation mode' },
    { k: 'billing',    l: 'Plan & billing' },
    { k: 'account',    l: 'Account' },
  ];

  return (
    <DashboardShell
      active="settings"
      isPro={isPro}
      onNav={onNav}
      onUpgrade={onUpgrade}
      onShareLink={onShareLink}
      title="Settings"
      sub="Tune the studio to fit yuh."
    >
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* sub-nav */}
        <div style={{
          width: 240, borderRight: '1px solid var(--line)',
          padding: '20px 14px', flexShrink: 0, background: 'var(--card-warm)',
        }}>
          {sections.map(s => (
            <button key={s.k} onClick={() => setSection(s.k)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '9px 12px', marginBottom: 2,
                borderRadius: 8, fontSize: 13,
                background: section === s.k ? 'var(--card)' : 'transparent',
                color: section === s.k ? 'var(--ink)' : 'var(--ink-2)',
                fontWeight: section === s.k ? 500 : 400,
                border: section === s.k ? '1px solid var(--line)' : '1px solid transparent',
              }}>{s.l}</button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 32, background: 'var(--paper)' }}>
          <div style={{ maxWidth: 720 }}>
            {section === 'profile' && <ProfileSection />}
            {section === 'hours' && <HoursSection />}
            {section === 'payments' && <PaymentsSection />}
            {section === 'branding' && <BrandingSection />}
            {section === 'notifications' && <NotificationsSection />}
            {section === 'vacation' && <VacationSection />}
            {section === 'billing' && <BillingSection isPro={isPro} onUpgrade={onUpgrade} />}
            {section === 'account' && <AccountSection />}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 400, letterSpacing: '-0.01em' }}>{title}</h2>
      {sub && <div style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Card({ children, padding = 22, style = {} }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--line)',
      borderRadius: 12, padding, marginBottom: 14, ...style,
    }}>{children}</div>
  );
}

function Row({ label, sub, children, last }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24,
      padding: '14px 0',
      borderBottom: last ? 'none' : '1px solid var(--line)',
      alignItems: 'center',
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{
      width: 38, height: 22, borderRadius: 11,
      background: on ? 'var(--forest)' : 'var(--line-2)',
      position: 'relative', transition: 'background 120ms',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 18 : 2,
        width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec',
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        transition: 'left 120ms',
      }} />
    </button>
  );
}

// ──────────────── Profile ────────────────
function ProfileSection() {
  return (
    <>
      <SectionHeader title="Business profile" sub="What shows on yuh booking page and receipts." />
      <Card padding={4}>
        <div style={{ padding: '0 18px' }}>
          <Row label="Business name"><input className="input" defaultValue="Glow Nail Studio" /></Row>
          <Row label="Yuh name" sub="Owner name on receipts"><input className="input" defaultValue="Tanya Williams" /></Row>
          <Row label="Phone" sub="Public on yuh booking page"><input className="input" defaultValue="+1 876 555 0100" /></Row>
          <Row label="Email"><input className="input" defaultValue="tanya@glow.jm" /></Row>
          <Row label="Address" sub="Shown after a confirmed booking"><input className="input" defaultValue="23 Constant Spring Rd, Half-Way-Tree" /></Row>
          <Row label="Parish">
            <select className="select" defaultValue="St. Andrew">
              <option>Kingston</option><option>St. Andrew</option><option>St. Catherine</option><option>St. James</option>
            </select>
          </Row>
          <Row label="GCT registration #" sub="Used on tax-ready receipts" last><input className="input" defaultValue="JM-GCT-2840-19-22" /></Row>
        </div>
      </Card>
    </>
  );
}

// ──────────────── Hours ────────────────
function HoursSection() {
  const days = [
    ['Mon', '9:00am', '5:00pm', true],
    ['Tue', '9:00am', '5:00pm', true],
    ['Wed', '9:00am', '5:00pm', true],
    ['Thu', '9:00am', '7:00pm', true],
    ['Fri', '9:00am', '7:00pm', true],
    ['Sat', '10:00am', '4:00pm', true],
    ['Sun', '', '', false],
  ];
  return (
    <>
      <SectionHeader title="Hours & buffer" sub="Clients can only book inside these windows." />

      <Card padding={0}>
        {days.map(([d, from, to, on], i) => (
          <div key={d} style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 110px 110px', gap: 12,
            alignItems: 'center', padding: '14px 22px',
            borderBottom: i < 6 ? '1px solid var(--line)' : 'none',
            opacity: on ? 1 : 0.55,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Toggle on={on} onChange={() => {}} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{d}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{on ? `${from} – ${to}` : 'Closed'}</div>
            <input className="input" defaultValue={from} disabled={!on} style={{ fontSize: 12, padding: '6px 10px' }} />
            <input className="input" defaultValue={to} disabled={!on} style={{ fontSize: 12, padding: '6px 10px' }} />
          </div>
        ))}
      </Card>

      <Card padding={4}>
        <div style={{ padding: '0 18px' }}>
          <Row label="Buffer between bookings" sub="Auto-blocked after each appointment">
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 5, 10, 15, 30].map(n => (
                <button key={n} className="chip" style={{
                  background: n === 15 ? 'var(--ink)' : 'var(--card)',
                  color: n === 15 ? '#fbf6ec' : 'var(--ink)',
                  border: n === 15 ? '1px solid var(--ink)' : '1px solid var(--line)',
                  cursor: 'pointer',
                }}>{n === 0 ? 'None' : `${n} min`}</button>
              ))}
            </div>
          </Row>
          <Row label="Lead time" sub="Stop accepting bookings within …">
            <select className="select" defaultValue="2 hours">
              <option>30 minutes</option><option>1 hour</option><option>2 hours</option><option>4 hours</option><option>24 hours</option>
            </select>
          </Row>
          <Row label="Max bookings per day" sub="Cap to prevent burnout" last>
            <input className="input" defaultValue="8" style={{ width: 80 }} />
          </Row>
        </div>
      </Card>
    </>
  );
}

// ──────────────── Payments ────────────────
function PaymentsSection() {
  return (
    <>
      <SectionHeader title="Payments & deposits" sub="How yuh get paid, and how clients hold a slot." />

      <Card padding={4}>
        <div style={{ padding: '0 18px' }}>
          <Row label="Default deposit" sub="Of service price. Set per-service in Services →">
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 10, 15, 25, 50].map(n => (
                <button key={n} className="chip" style={{
                  background: n === 25 ? 'var(--ink)' : 'var(--card)',
                  color: n === 25 ? '#fbf6ec' : 'var(--ink)',
                  border: n === 25 ? '1px solid var(--ink)' : '1px solid var(--line)',
                  cursor: 'pointer',
                }}>{n === 0 ? 'None' : `${n}%`}</button>
              ))}
            </div>
          </Row>
          <Row label="Refund window" sub="Refundable up to … before appointment">
            <select className="select" defaultValue="24 hours">
              <option>None — final sale</option><option>2 hours</option><option>12 hours</option><option>24 hours</option><option>48 hours</option>
            </select>
          </Row>
          <Row label="GCT" sub="Auto-added to invoices and reports" last>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Toggle on={true} onChange={() => {}} />
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>15% applied</span>
            </div>
          </Row>
        </div>
      </Card>

      <SectionHeader title="Payment methods" />
      <Card padding={0}>
        {[
          { l: 'NCB Lynk', sub: 'lynk@glow · J$50,400 last 30 days', on: true, badge: 'PRIMARY' },
          { l: 'Card (Stripe via NCB)', sub: 'Visa, Mastercard · 2.9% fee', on: true },
          { l: 'Cash', sub: 'Tracked at end-of-day close-out', on: true },
          { l: 'Bank transfer', sub: 'NCB account ending 4422', on: false },
        ].map((m, i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 22px',
            borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{m.l}</span>
                {m.badge && <span className="chip chip-forest" style={{ fontSize: 9 }}>{m.badge}</span>}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{m.sub}</div>
            </div>
            <Toggle on={m.on} onChange={() => {}} />
          </div>
        ))}
      </Card>
    </>
  );
}

// ──────────────── Branding ────────────────
function BrandingSection() {
  const colors = [
    ['Terracotta + cream', '#c4663d', '#fbf6ec'],
    ['Forest + bone', '#0c4a2d', '#f5eedf'],
    ['Plum + paper', '#6a3a4a', '#fbf6ec'],
    ['Ink + ochre', '#1a201d', '#c89b3d'],
  ];
  return (
    <>
      <SectionHeader title="Your booking page" sub="What clients see when they tap yuh link." />

      <Card padding={4}>
        <div style={{ padding: '0 18px' }}>
          <Row label="Your link" sub="Drop in IG bio, WhatsApp status, anywhere">
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--card-warm)', border: '1px solid var(--line)',
              borderRadius: 8, padding: '6px 10px',
            }}>
              <span className="mono" style={{ fontSize: 12.5, color: 'var(--muted)' }}>book.linkupbookings.com/</span>
              <input defaultValue="glow" style={{ border: 'none', background: 'transparent', fontFamily: 'var(--mono)', fontSize: 12.5, fontWeight: 600, width: 80, padding: 0, outline: 'none' }} />
            </div>
          </Row>
          <Row label="Logo" sub="Shown in the header of yuh public page">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: 'linear-gradient(135deg, var(--terracotta), #8d3f1e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 26,
              }}>g</div>
              <button className="btn btn-secondary btn-sm">Upload new</button>
            </div>
          </Row>
          <Row label="Cover photo" sub="Top of yuh booking page · 16:9">
            <div className="placeholder-img" style={{ height: 80, borderRadius: 10, width: 200 }}>cover photo</div>
          </Row>
          <Row label="Tagline" sub="One line shown under yuh name">
            <input className="input" defaultValue="Where Kingston nails come to shine. ✨" />
          </Row>
          <Row label="Accent colour" sub="The palette for yuh booking page" last>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {colors.map(([n, a, b], i) => (
                <button key={n} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: 8, borderRadius: 8,
                  background: 'var(--card)',
                  border: i === 0 ? '2px solid var(--forest)' : '1px solid var(--line)',
                }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 3, background: a }} />
                    <div style={{ width: 16, height: 16, borderRadius: 3, background: b }} />
                  </div>
                  <span style={{ fontSize: 11.5 }}>{n}</span>
                  {i === 0 && <span style={{ color: 'var(--forest)', marginLeft: 'auto' }}>{Icon.check({ width: 12, height: 12 })}</span>}
                </button>
              ))}
            </div>
          </Row>
        </div>
      </Card>
    </>
  );
}

// ──────────────── Notifications ────────────────
function NotificationsSection() {
  return (
    <>
      <SectionHeader title="Notifications" sub="Pings to yuh phone. Auto-messages to clients live in Reminders →" />

      <Card padding={0}>
        {[
          ['New booking', 'When a client books online', true],
          ['Deposit received', 'When yuh get paid', true],
          ['Cancellation', 'When someone cancels or reschedules', true],
          ['Review left', 'When a client rates yuh', true],
          ['Daily summary', 'End-of-day takings, every 6pm', true],
          ['Morning brief', 'What\'s on for the day, 7am', true],
          ['Slow day warning', "When tomorrow looks <50% booked", false],
          ['Pro tips', 'Best practices from us, weekly', false],
        ].map((r, i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 22px',
            borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{r[0]}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{r[1]}</div>
            </div>
            <Toggle on={r[2]} onChange={() => {}} />
          </div>
        ))}
      </Card>
    </>
  );
}

// ──────────────── Vacation ────────────────
function VacationSection() {
  const [on, setOn] = React.useState(false);

  return (
    <>
      <SectionHeader title="Vacation mode" sub="Going off-island? Pause bookings. Yuh existing appointments stay on yuh calendar." />

      <Card padding={24} style={{
        background: on ? 'var(--terracotta-soft)' : 'var(--card)',
        border: on ? '1px solid var(--terracotta)' : '1px solid var(--line)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: on ? 'var(--terracotta)' : 'var(--paper-2)',
            color: on ? '#fbf6ec' : 'var(--muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.sparkle({ width: 20, height: 20 })}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: on ? '#8d3f1e' : 'var(--ink)' }}>
              {on ? 'Yuh booking page is paused' : 'Bookings are open'}
            </div>
            <div style={{ fontSize: 12.5, color: on ? '#8d3f1e' : 'var(--muted)', marginTop: 2 }}>
              {on ? "Clients see yuh 'back soon' message. Existing appts unaffected." : 'Yuh online link is accepting new bookings.'}
            </div>
          </div>
          <Toggle on={on} onChange={setOn} />
        </div>

        {on && (
          <>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14,
            }}>
              <div>
                <label className="label">From</label>
                <input className="input" defaultValue="Jun 8, 2026" />
              </div>
              <div>
                <label className="label">Until</label>
                <input className="input" defaultValue="Jun 22, 2026" />
              </div>
            </div>
            <label className="label">Message shown to clients</label>
            <textarea
              className="textarea" rows="3"
              defaultValue="Mi taking a break — back June 22! Drop yuh name and number and I'll text when bookings open. 💚"
            />

            <div style={{
              marginTop: 14, padding: 12,
              background: 'rgba(255,255,255,0.6)', borderRadius: 8,
              fontSize: 12, color: '#8d3f1e', display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <span>{Icon.check({ width: 14, height: 14 })}</span>
              <span><strong>14 existing appointments</strong> stay on yuh calendar. Yuh public page shows the away message instead of a booking form.</span>
            </div>
          </>
        )}
      </Card>
    </>
  );
}

// ──────────────── Billing ────────────────
function BillingSection({ isPro, onUpgrade }) {
  return (
    <>
      <SectionHeader title="Plan & billing" sub="Yuh on Pro · J$400/month · renews Jun 26." />

      <Card padding={24} style={{
        background: 'var(--ink)', color: '#fbf6ec', border: '1px solid var(--ink)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 180, height: 180,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,102,61,0.25), transparent 65%)',
        }} />
        <div className="mono" style={{ fontSize: 9.5, color: 'var(--terracotta)', letterSpacing: '0.1em', marginBottom: 8 }}>
          CURRENT PLAN
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
          <div className="serif" style={{ fontSize: 36, lineHeight: 1, fontStyle: isPro ? 'italic' : 'normal' }}>
            {isPro ? 'Pro' : 'Free'}
          </div>
          {isPro && <div style={{ fontSize: 14, color: '#a89c87' }}>J$400/month · billed monthly</div>}
        </div>
        {isPro ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ background: 'rgba(251,246,236,0.1)', color: '#fbf6ec', padding: '8px 14px', borderRadius: 8, fontSize: 12.5, border: '1px solid rgba(251,246,236,0.18)' }}>Switch to yearly · save J$800</button>
            <button style={{ background: 'transparent', color: '#a89c87', padding: '8px 14px', fontSize: 12.5 }}>Pause subscription</button>
          </div>
        ) : (
          <button className="btn btn-terracotta btn-sm" onClick={onUpgrade}>Upgrade to Pro</button>
        )}
      </Card>

      <div className="label" style={{ marginTop: 24, marginBottom: 10 }}>Recent invoices</div>
      <Card padding={0}>
        {[
          ['INV-2026-05', 'May 26, 2026', 'J$400.00', 'Paid'],
          ['INV-2026-04', 'Apr 26, 2026', 'J$400.00', 'Paid'],
          ['INV-2026-03', 'Mar 26, 2026', 'J$400.00', 'Paid'],
          ['INV-2026-02', 'Feb 26, 2026', 'J$400.00', 'Paid'],
        ].map((inv, i, arr) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 100px 80px 60px', gap: 14,
            alignItems: 'center', padding: '12px 22px',
            borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
            fontSize: 13,
          }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-2)' }}>{inv[0]}</span>
            <span style={{ color: 'var(--muted)' }}>{inv[1]}</span>
            <span className="mono" style={{ fontWeight: 500 }}>{inv[2]}</span>
            <span className="chip chip-forest" style={{ fontSize: 10 }}>{inv[3]}</span>
            <button style={{ fontSize: 11.5, color: 'var(--forest)' }}>PDF</button>
          </div>
        ))}
      </Card>
    </>
  );
}

// ──────────────── Account ────────────────
function AccountSection() {
  return (
    <>
      <SectionHeader title="Account" />
      <Card padding={4}>
        <div style={{ padding: '0 18px' }}>
          <Row label="Email"><input className="input" defaultValue="tanya@glow.jm" /></Row>
          <Row label="Password"><button className="btn btn-secondary btn-sm">Change password</button></Row>
          <Row label="2FA via SMS"><Toggle on={true} onChange={() => {}} /></Row>
          <Row label="Export data" sub="Get a copy of everything — clients, appts, takings" last>
            <button className="btn btn-secondary btn-sm">Request export</button>
          </Row>
        </div>
      </Card>

      <Card padding={20} style={{ borderColor: 'var(--terracotta)' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.1em', marginBottom: 8 }}>
          DANGER ZONE
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>Close yuh account</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>This deletes everything. There's no undo.</div>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ color: 'var(--terracotta)' }}>Close account</button>
        </div>
      </Card>
    </>
  );
}

Object.assign(window, { SettingsScreen, SectionHeader, Card, Row, Toggle });
