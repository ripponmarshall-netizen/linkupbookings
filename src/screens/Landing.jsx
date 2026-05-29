import { useNavigate } from 'react-router-dom';
import { Icon, Logo, Avatar } from '../components/shared.jsx';

export default function LandingScreen() {
  const navigate = useNavigate();
  const goCta = () => navigate('/onboarding');
  const goSignIn = () => navigate('/calendar');
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="page-scroll" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      {/* nav */}
      <div style={{ justifyContent: 'space-between' }} className="landing-nav app-bar">
        <Logo size={18} />
        <div style={{ display: 'flex', gap: 32, fontSize: 13.5, color: 'var(--ink-2)' }} className="landing-nav-links">
          <a style={{ cursor: 'pointer' }} onClick={() => scrollTo('features')}>Features</a>
          <a style={{ cursor: 'pointer' }} onClick={() => scrollTo('pricing')}>Pricing</a>
          <a style={{ cursor: 'pointer' }} onClick={() => scrollTo('features')}>For solo pros</a>
          <a style={{ cursor: 'pointer' }} onClick={goCta}>Help</a>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-ghost btn-sm" onClick={goSignIn}>Sign in</button>
          <button className="btn btn-primary btn-sm" onClick={goCta}>Start free trial</button>
        </div>
      </div>

      {/* hero */}
      <div style={{ padding: '88px 56px 64px', maxWidth: 1280, margin: '0 auto' }} className="landing-hero-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'center' }} className="landing-hero-grid">
          <div>
            <div className="chip chip-terracotta" style={{ marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terracotta)' }} />
              Built for Jamaican small business
            </div>
            <h1 className="serif" style={{
              fontSize: 'clamp(52px, 8vw, 92px)', lineHeight: 0.95, margin: '0 0 24px',
              letterSpacing: '-0.02em', fontWeight: 400,
            }}>
              Run yuh<br />
              booking,<br />
              not yuh DMs.
            </h1>
            <p style={{
              fontSize: 18, lineHeight: 1.5, color: 'var(--muted)',
              maxWidth: 480, margin: '0 0 36px',
            }}>
              A booking calendar, client list and self-serve link — so you stop chasing DMs and just
              do the work. Made for hairdressers, nail techs, tutors and solo pros.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 22, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={goCta}>
                Start 14-day free trial {Icon.arrow({ width: 14, height: 14 })}
              </button>
              <button className="btn btn-secondary btn-lg" onClick={goSignIn}>See how it works</button>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--muted-2)', fontFamily: 'var(--mono)' }}>
              NO CARD REQUIRED · J$400/MONTH AFTER · CANCEL ANY TIME
            </div>
          </div>

          <LandingHero />
        </div>
      </div>

      {/* social proof strip */}
      <div className="landing-strip" style={{
        borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        padding: '20px 56px', background: 'var(--paper-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)',
        textTransform: 'uppercase', letterSpacing: '0.1em',
      }}>
        <span>Trusted by 1,200+ solo pros across the island</span>
        <div style={{ display: 'flex', gap: 20, opacity: 0.65, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 18, textTransform: 'none', fontStyle: 'italic' }}>Glow Nail Studio</span>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 18, textTransform: 'none' }}>KING'S Barber</span>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 18, textTransform: 'none', fontStyle: 'italic' }}>Lessons w/ Miss A</span>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 18, textTransform: 'none' }}>BRAIDS by Tash</span>
        </div>
      </div>

      {/* features */}
      <div id="features" style={{ padding: '96px 56px', maxWidth: 1280, margin: '0 auto' }} className="landing-section">
        <div style={{ maxWidth: 620, marginBottom: 56 }}>
          <div className="label" style={{ marginBottom: 16 }}>What you get</div>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: 0, lineHeight: 1.02, letterSpacing: '-0.015em', fontWeight: 400 }}>
            Three jobs.<br />One small fee.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          <FeatureCard
            num="01"
            title="A calendar that's actually yours"
            body="Drag, drop, and block out your week. Add a walk-in in two taps. No more juggling a paper book and your WhatsApp."
            color="var(--forest)" tint="var(--forest-soft)"
          />
          <FeatureCard
            num="02"
            title="One link, instead of twenty DMs"
            body="Share your booking link. Clients pick a service, see only your free slots, leave a deposit. You wake up to a confirmed week."
            color="var(--terracotta)" tint="var(--terracotta-soft)"
            paid
          />
          <FeatureCard
            num="03"
            title="Notes you'll actually re-read"
            body="Allergies, favourite colours, who tips. Notes attached to every client so the next visit feels personal — even six months later."
            color="var(--plum)" tint="#f0e2e6"
            paid
          />
        </div>
      </div>

      {/* pricing */}
      <div id="pricing" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ padding: '96px 56px', maxWidth: 1280, margin: '0 auto' }} className="landing-section">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ marginBottom: 16 }}>Pricing</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: 0, lineHeight: 1.02, letterSpacing: '-0.015em', fontWeight: 400 }}>
              Two tiers.<br />No funny business.
            </h2>
          </div>
          <PricingTable onCta={goCta} />
          <div style={{ textAlign: 'center', marginTop: 36, fontSize: 13, color: 'var(--muted)' }}>
            Paid in JMD. Includes GCT. Pause or cancel from the dashboard, no fuss.
          </div>
        </div>
      </div>

      {/* testimonial */}
      <div style={{ padding: '96px 56px', maxWidth: 1080, margin: '0 auto', textAlign: 'center' }} className="landing-section">
        <div style={{ fontSize: 36, color: 'var(--terracotta)', marginBottom: 16, fontFamily: 'var(--serif)' }}>"</div>
        <p className="serif" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', lineHeight: 1.25, margin: '0 0 28px', letterSpacing: '-0.01em' }}>
          Used to lose a slot every other day to someone who forget. Now they book themself, pay
          a deposit, and show up. <span style={{ fontStyle: 'italic', color: 'var(--forest)' }}>Best J$400 mi spend.</span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center' }}>
          <Avatar name="Tanya Williams" size={36} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 500 }}>Tanya W.</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Owner, Glow Nail Studio · Half-Way-Tree</div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="landing-footer" style={{ background: 'var(--ink)', color: '#dccfb6', padding: '48px 56px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1280, margin: '0 auto', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
          <Logo size={18} color="#fbf6ec" />
          <div style={{ display: 'flex', gap: 64, fontSize: 13, flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#fbf6ec', marginBottom: 12, fontWeight: 500 }}>Product</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a style={{ cursor: 'pointer' }}>Features</a>
                <a style={{ cursor: 'pointer' }}>Pricing</a>
                <a style={{ cursor: 'pointer' }}>Roadmap</a>
              </div>
            </div>
            <div>
              <div style={{ color: '#fbf6ec', marginBottom: 12, fontWeight: 500 }}>Help</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a style={{ cursor: 'pointer' }}>Docs</a>
                <a style={{ cursor: 'pointer' }}>Contact</a>
                <a style={{ cursor: 'pointer' }}>WhatsApp us</a>
              </div>
            </div>
            <div>
              <div style={{ color: '#fbf6ec', marginBottom: 12, fontWeight: 500 }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a style={{ cursor: 'pointer' }}>About</a>
                <a style={{ cursor: 'pointer' }}>Privacy</a>
                <a style={{ cursor: 'pointer' }}>Terms</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 36, paddingTop: 20, fontSize: 12, color: '#a89c87', maxWidth: 1280, margin: '36px auto 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 LinkUpBookings Ltd. Kingston, Jamaica.</span>
          <span className="mono">v2.4 · built on convex</span>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ num, title, body, color, tint, paid }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)', padding: 28, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 20 }}>
        {num} {paid && <span style={{ color: 'var(--terracotta)', marginLeft: 6 }}>· PRO</span>}
      </div>
      <div style={{
        width: 48, height: 48, borderRadius: 12, background: tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, marginBottom: 24,
      }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, background: color }} />
      </div>
      <h3 className="serif" style={{ fontSize: 26, margin: '0 0 12px', lineHeight: 1.15, fontWeight: 400 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--muted)', margin: 0 }}>{body}</p>
    </div>
  );
}

function PricingTable({ onCta }) {
  const rows = [
    ['Calendar (day/week/month view)', true, true],
    ['Unlimited appointments', true, true],
    ['Add appointments yourself', true, true],
    ['Walk-in payment tracking', true, true],
    ["Today's takings view", true, true],
    ['Client contacts', 'Up to 50', 'Unlimited'],
    ['Client notes per profile', '3 notes', 'Unlimited'],
    ['Public booking link', false, true],
    ['Accept deposits at booking', false, true],
    ['Auto WhatsApp + SMS reminders', false, true],
    ['Waitlist when fully booked', false, true],
    ['Custom intake forms', false, true],
    ['Photo lookbook per client', false, true],
    ['Analytics dashboard', '"Today" only', 'Full 30/90 day'],
    ['Reviews & ratings', false, true],
    ['Block off time / holidays', true, true],
    ['Support', 'Email', 'Priority WhatsApp'],
  ];

  const cell = (v) => {
    if (v === true) return <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: 'var(--forest-soft)', color: 'var(--forest)', alignItems: 'center', justifyContent: 'center' }}>{Icon.check({ width: 12, height: 12 })}</span>;
    if (v === false) return <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: 'var(--paper-2)', color: 'var(--muted-2)', alignItems: 'center', justifyContent: 'center' }}>{Icon.x({ width: 10, height: 10 })}</span>;
    return <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink)' }}>{v}</span>;
  };

  return (
    <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto' }}>
      {/* Badge lives on the (non-clipping) wrapper so it isn't cut off by the card's overflow:hidden */}
      <div style={{
        position: 'absolute', top: -12, right: 16, zIndex: 1,
        background: 'var(--terracotta)', color: '#fbf6ec',
        padding: '4px 10px', borderRadius: 999,
        fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.08em',
      }}>MOST POPULAR</div>
      <div style={{
        background: 'var(--card)', borderRadius: 18, overflow: 'hidden',
        border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)',
      }}>
      <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', borderBottom: '1px solid var(--line)' }}>
        <div style={{ padding: '28px 24px' }}>
          <div className="label">Compare</div>
        </div>
        <div style={{ padding: '24px 20px', borderLeft: '1px solid var(--line)', textAlign: 'center' }}>
          <div className="serif" style={{ fontSize: 22, marginBottom: 2 }}>Free</div>
          <div className="serif" style={{ fontSize: 42, lineHeight: 1, fontWeight: 400 }}>J$0</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>forever, on you</div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: 12, width: '100%' }} onClick={onCta}>Start free</button>
        </div>
        <div style={{
          padding: '24px 20px', borderLeft: '1px solid var(--line)', textAlign: 'center',
          background: 'var(--ink)', color: '#fbf6ec', position: 'relative',
        }}>
          <div className="serif" style={{ fontSize: 22, marginBottom: 2, fontStyle: 'italic' }}>Pro</div>
          <div className="serif" style={{ fontSize: 42, lineHeight: 1, fontWeight: 400 }}>
            J$400<span style={{ fontSize: 13, color: '#a89c87' }}>/mo</span>
          </div>
          <div style={{ fontSize: 11, color: '#a89c87', marginTop: 6 }}>14 days free, no card</div>
          <button className="btn btn-terracotta btn-sm" style={{ marginTop: 12, width: '100%' }} onClick={onCta}>Start trial</button>
        </div>
      </div>

      {rows.map(([label, free, pro], i) => (
        <div key={i} className="pricing-grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
          background: i % 2 === 0 ? 'var(--card-warm)' : 'var(--card)',
          borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none',
        }}>
          <div style={{ padding: '14px 24px', fontSize: 13.5, color: 'var(--ink)' }}>{label}</div>
          <div style={{ padding: '14px 20px', borderLeft: '1px solid var(--line)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cell(free)}</div>
          <div style={{ padding: '14px 20px', borderLeft: '1px solid var(--line)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,102,61,0.04)' }}>{cell(pro)}</div>
        </div>
      ))}
      </div>
    </div>
  );
}

function LandingHero() {
  return (
    <div style={{ position: 'relative', height: 540 }} className="landing-hero-visual">
      {/* back card — phone preview */}
      <div style={{
        position: 'absolute', right: 0, top: 36, width: 240, height: 460,
        background: 'var(--card)', borderRadius: 28,
        border: '1px solid var(--line)', boxShadow: 'var(--shadow-lg)',
        transform: 'rotate(6deg)',
        padding: 16, overflow: 'hidden',
      }}>
        <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', marginBottom: 12, letterSpacing: '0.1em' }}>
          BOOK.LINKUPBOOKINGS.COM/GLOW
        </div>
        <div className="serif" style={{ fontSize: 28, lineHeight: 1.05, marginBottom: 4, fontStyle: 'italic' }}>
          Glow Nail<br />Studio
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 20 }}>Half-Way-Tree · open today</div>
        {[
          ['Gel Manicure', '60 min', 'J$3,500'],
          ['Acrylic Full Set', '2 hr', 'J$8,000'],
          ['Pedicure', '75 min', 'J$4,500'],
        ].map(([n, d, p], i) => (
          <div key={i} style={{ padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 10, marginBottom: 8, background: 'var(--card-warm)' }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{n}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <span>{d}</span><span>{p}</span>
            </div>
          </div>
        ))}
      </div>

      {/* front card — calendar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 360, height: 480,
        background: 'var(--card)', borderRadius: 16,
        border: '1px solid var(--line)', boxShadow: 'var(--shadow-lg)',
        transform: 'rotate(-3deg)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 18px', borderBottom: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--paper-2)',
        }}>
          <div className="serif" style={{ fontSize: 18 }}>Tue · May 26</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--card)', border: '1px solid var(--line)' }} />
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--card)', border: '1px solid var(--line)' }} />
          </div>
        </div>
        {[
          { time: '9:30', name: 'Tanisha B.', svc: 'Gel Manicure', color: 'var(--terracotta)', tint: 'var(--terracotta-soft)' },
          { time: '11:00', name: 'Aaliyah C.', svc: 'Pedicure', color: 'var(--plum)', tint: '#f0e2e6' },
          { time: '1:00', name: 'Marsha H.', svc: 'Acrylic Full Set', color: 'var(--forest)', tint: 'var(--forest-soft)' },
          { time: '3:15', name: 'Keisha R.', svc: 'Gel Manicure', color: 'var(--terracotta)', tint: 'var(--terracotta-soft)' },
        ].map((a, i) => (
          <div key={i} style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 38 }}>{a.time}</div>
            <div style={{ width: 3, height: 28, borderRadius: 2, background: a.color }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{a.svc}</div>
            </div>
            <span className="chip" style={{ fontSize: 10, padding: '2px 7px', background: a.tint, color: a.color, border: 'none' }}>confirmed</span>
          </div>
        ))}
      </div>

      {/* floating stat bubble */}
      <div style={{
        position: 'absolute', left: 230, bottom: 16,
        background: 'var(--ink)', color: '#fbf6ec',
        padding: '14px 18px', borderRadius: 14,
        boxShadow: 'var(--shadow-lg)', transform: 'rotate(-2deg)',
      }}>
        <div className="mono" style={{ fontSize: 9, color: '#a89c87', letterSpacing: '0.1em', marginBottom: 4 }}>THIS WEEK</div>
        <div className="serif" style={{ fontSize: 28, lineHeight: 1 }}>J$84,500 <span style={{ color: '#c89b3d', fontSize: 16 }}>↑ 12%</span></div>
      </div>
    </div>
  );
}
