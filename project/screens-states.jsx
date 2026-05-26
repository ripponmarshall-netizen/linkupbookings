// Empty / error / offline states gallery — for the design system

function StatesScreen() {
  return (
    <div style={{
      flex: 1, background: 'var(--paper)', minHeight: 'calc(100vh - 44px)',
      padding: '32px 32px 60px', overflow: 'auto',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--terracotta)', letterSpacing: '0.1em', marginBottom: 8 }}>
            ✦ DESIGN · EDGE CASES
          </div>
          <h1 className="serif" style={{ fontSize: 44, fontWeight: 400, lineHeight: 1.02, margin: 0, letterSpacing: '-0.01em' }}>
            Empty, errored, <span style={{ fontStyle: 'italic' }}>offline.</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 580, marginTop: 8, lineHeight: 1.55 }}>
            What the product looks like when things are quiet, broken, or both. Each state is designed to feel like a beginning, not a wall.
          </p>
        </div>

        {/* Empty states */}
        <div className="label" style={{ marginBottom: 14 }}>Empty states</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 36 }}>
          <EmptyTile
            title="No clients yet"
            sub="Yuh first booking will create the first client. Or, import yuh contacts and tag who's already a customer."
            cta="Import contacts"
            ctaIcon={Icon.users}
            illustration="people"
          />
          <EmptyTile
            title="No services on the list"
            sub="Add what yuh offer. Even just one to start — yuh can add more later."
            cta="Add first service"
            ctaIcon={Icon.plus}
            illustration="grid"
          />
          <EmptyTile
            title="No takings yet today"
            sub="The first 'mark paid' lights this up. Try a walk-in or wait for yuh 9am."
            cta="Take a walk-in"
            ctaIcon={Icon.cash}
            illustration="bills"
          />
          <EmptyTile
            title="Inbox is quiet"
            sub="When clients message yuh WhatsApp Business, threads appear here. The AI replies in yuh tone."
            cta="Send yuh link"
            ctaIcon={Icon.whatsapp}
            illustration="chat"
          />
          <EmptyTile
            title="Waitlist is empty"
            sub="When yuh fully booked, add demand here. Auto-fill kicks in on cancellations."
            cta="How it works"
            ctaIcon={Icon.sparkle}
            illustration="clock"
          />
          <EmptyTile
            title="No reviews to share yet"
            sub="After 3 visits, mi auto-ask each client. Mi pick the best ones for yuh to share."
            cta="Auto-ask after visits"
            ctaIcon={Icon.star}
            illustration="stars"
          />
        </div>

        {/* Error states */}
        <div className="label" style={{ marginBottom: 14 }}>Errors & connection issues</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 36 }}>
          <ErrorTile
            title="WhatsApp Business disconnected"
            sub="Yuh number isn't linked right now. Clients trying to book through WhatsApp won't get a reply. Last seen connected 2 hours ago."
            kind="warn"
            cta="Reconnect"
          />
          <ErrorTile
            title="Card payment failed · Tanisha"
            sub="J$8,000 declined — issuer didn't approve. The deposit hold is still in place. Try again or fall back to cash."
            kind="error"
            cta="Retry charge"
          />
          <ErrorTile
            title="Yuh offline"
            sub="Working in flight mode. New appointments save locally — they'll sync the second yuh back online."
            kind="info"
            cta="Working offline"
            chip="📡 OFFLINE · 3 PENDING SYNC"
          />
          <ErrorTile
            title="Sync stalled"
            sub="Calendar hasn't refreshed in 12 minutes. Probably nothing — pull to refresh, or restart the app if it sticks."
            kind="warn"
            cta="Refresh now"
          />
        </div>

        {/* Offline mode interactions */}
        <div className="label" style={{ marginBottom: 14 }}>In-context offline behaviour</div>
        <div style={{
          background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14,
          padding: 0, overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 18px',
            background: 'var(--ink)', color: '#fbf6ec',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ochre)', boxShadow: '0 0 8px var(--ochre)' }} />
            <div style={{ flex: 1, fontSize: 12 }}>
              <strong>Offline since 11:14am.</strong> 3 changes queued · will sync when back on.
            </div>
            <button style={{ color: '#c89b3d', fontSize: 11.5, padding: '4px 10px' }}>View queue</button>
          </div>
          <div style={{ padding: 20, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--ink)' }}>The rule:</strong> nothing should ever block. If we can't reach the server, save locally, show a soft yellow indicator, and reconcile on reconnect. Conflicts get a chooser modal, never silent overwrites.
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyTile({ title, sub, cta, ctaIcon, illustration }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--line)',
      borderRadius: 14, padding: 22,
      display: 'flex', flexDirection: 'column', minHeight: 280,
    }}>
      <Illustration kind={illustration} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55 }}>{sub}</div>
      </div>
      <button className="btn btn-secondary btn-sm" style={{ marginTop: 18, alignSelf: 'flex-start' }}>
        {ctaIcon({ width: 12, height: 12 })} {cta}
      </button>
    </div>
  );
}

function ErrorTile({ title, sub, kind, cta, chip }) {
  const colors = {
    warn:  { bg: 'rgba(200,155,61,0.08)', border: 'var(--ochre)', dot: 'var(--ochre)', label: 'WARNING' },
    error: { bg: 'rgba(196,102,61,0.08)', border: 'var(--terracotta)', dot: 'var(--terracotta)', label: 'ERROR' },
    info:  { bg: 'var(--paper-2)', border: 'var(--line-2)', dot: 'var(--muted)', label: 'INFO' },
  };
  const c = colors[kind];
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderLeft: `3px solid ${c.border}`,
      borderRadius: 12, padding: 18,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.dot, boxShadow: `0 0 6px ${c.dot}` }} />
        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.1em', color: c.dot }}>{c.label}</div>
        {chip && <span className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', marginLeft: 'auto', letterSpacing: '0.06em' }}>{chip}</span>}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.55, flex: 1 }}>{sub}</div>
      <button style={{
        marginTop: 14, alignSelf: 'flex-start',
        padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
        background: 'var(--ink)', color: '#fbf6ec',
      }}>{cta}</button>
    </div>
  );
}

function Illustration({ kind }) {
  // hand-drawn SVG marks — abstract, on-brand
  const common = { width: 64, height: 64, viewBox: '0 0 64 64', fill: 'none', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const marks = {
    people: (
      <svg {...common}>
        <circle cx="22" cy="22" r="8" stroke="var(--terracotta)" />
        <circle cx="42" cy="22" r="6" stroke="var(--forest)" opacity="0.4" />
        <path d="M10 50 Q22 38 34 50" stroke="var(--terracotta)" />
        <path d="M32 48 Q42 40 52 48" stroke="var(--forest)" opacity="0.4" />
        <circle cx="50" cy="40" r="3" fill="var(--ochre)" />
      </svg>
    ),
    grid: (
      <svg {...common}>
        <rect x="8" y="8" width="20" height="20" rx="3" stroke="var(--terracotta)" />
        <rect x="36" y="8" width="20" height="20" rx="3" stroke="var(--ochre)" />
        <rect x="8" y="36" width="20" height="20" rx="3" stroke="var(--forest)" />
        <rect x="36" y="36" width="20" height="20" rx="3" stroke="var(--plum)" strokeDasharray="3 3" />
      </svg>
    ),
    bills: (
      <svg {...common}>
        <rect x="8" y="20" width="48" height="28" rx="3" stroke="var(--forest)" />
        <circle cx="32" cy="34" r="6" stroke="var(--ochre)" />
        <path d="M14 16 L48 16 M16 12 L46 12" stroke="var(--terracotta)" opacity="0.5" />
      </svg>
    ),
    chat: (
      <svg {...common}>
        <path d="M10 14 Q10 10 14 10 L40 10 Q44 10 44 14 L44 30 Q44 34 40 34 L24 34 L18 40 L18 34 L14 34 Q10 34 10 30 Z" stroke="var(--forest)" />
        <path d="M22 50 Q22 46 26 46 L52 46 Q56 46 56 50 L56 56 L48 56" stroke="var(--terracotta)" opacity="0.6" strokeDasharray="3 3" />
      </svg>
    ),
    clock: (
      <svg {...common}>
        <circle cx="32" cy="32" r="22" stroke="var(--ochre)" />
        <path d="M32 18 L32 32 L42 38" stroke="var(--terracotta)" strokeWidth="2" />
        <circle cx="32" cy="32" r="2" fill="var(--ink)" />
      </svg>
    ),
    stars: (
      <svg {...common}>
        <path d="M32 12 L36 24 L48 26 L39 34 L42 46 L32 40 L22 46 L25 34 L16 26 L28 24 Z" stroke="var(--ochre)" fill="var(--paper-2)" />
        <circle cx="14" cy="14" r="2" fill="var(--terracotta)" />
        <circle cx="52" cy="50" r="3" fill="var(--forest)" opacity="0.4" />
      </svg>
    ),
  };
  return <div style={{ marginBottom: 18 }}>{marks[kind]}</div>;
}

window.StatesScreen = StatesScreen;
