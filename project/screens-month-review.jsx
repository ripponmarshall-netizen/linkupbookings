// Month-in-review — Wrapped-style shareable summary

function MonthReviewScreen() {
  const [card, setCard] = React.useState(0);
  const cards = [
    {
      key: 'intro',
      bg: 'linear-gradient(135deg, #1a201d 0%, #0c4a2d 100%)',
      content: (
        <>
          <div className="mono" style={{ fontSize: 11, color: '#c89b3d', letterSpacing: '0.14em', marginBottom: 22 }}>
            ✦ GLOW · MAY 2026
          </div>
          <div className="serif" style={{ fontSize: 96, fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#fbf6ec' }}>
            What a<br/><span style={{ fontStyle: 'italic', color: '#c4663d' }}>month.</span>
          </div>
          <p style={{ color: '#c8bda4', fontSize: 16, lineHeight: 1.55, marginTop: 36, maxWidth: 380 }}>
            Yuh closed yuh biggest month yet. Here's what happened, in 6 cards.
          </p>
        </>
      ),
    },
    {
      key: 'revenue',
      bg: 'linear-gradient(135deg, #fbf6ec 0%, #f3e2d4 100%)',
      content: (
        <>
          <div className="mono" style={{ fontSize: 11, color: '#c4663d', letterSpacing: '0.14em', marginBottom: 14 }}>
            01 · REVENUE
          </div>
          <div className="serif" style={{ fontSize: 156, lineHeight: 0.88, fontWeight: 400, letterSpacing: '-0.02em', color: '#1a201d' }}>
            J$182k
          </div>
          <div className="serif" style={{ fontSize: 32, fontStyle: 'italic', color: '#8d3f1e', marginTop: 18, lineHeight: 1.1 }}>
            ↑ 18% better than April.
          </div>
          <p style={{ fontSize: 14, color: '#3a3a33', lineHeight: 1.55, marginTop: 22, maxWidth: 420 }}>
            That's 28 services · 19 unique clients · J$3,800 in tips. Yuh hour rate climbed to J$5,200 average.
          </p>
        </>
      ),
    },
    {
      key: 'busiest',
      bg: 'linear-gradient(135deg, #6a3a4a 0%, #3a1f2a 100%)',
      content: (
        <>
          <div className="mono" style={{ fontSize: 11, color: '#c89b3d', letterSpacing: '0.14em', marginBottom: 14 }}>
            02 · BUSIEST DAY
          </div>
          <div className="serif" style={{ fontSize: 110, lineHeight: 0.9, fontWeight: 400, color: '#fbf6ec', letterSpacing: '-0.015em' }}>
            Saturday<br/><span style={{ fontStyle: 'italic', color: '#c89b3d' }}>17 May</span>
          </div>
          <div style={{ display: 'flex', gap: 36, marginTop: 36 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: '#a89c87', letterSpacing: '0.08em' }}>BOOKINGS</div>
              <div className="serif" style={{ fontSize: 44, color: '#fbf6ec' }}>9</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: '#a89c87', letterSpacing: '0.08em' }}>REVENUE</div>
              <div className="serif" style={{ fontSize: 44, color: '#fbf6ec' }}>J$32k</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: '#a89c87', letterSpacing: '0.08em' }}>HOURS</div>
              <div className="serif" style={{ fontSize: 44, color: '#fbf6ec' }}>9.5</div>
            </div>
          </div>
          <p style={{ color: '#c8bda4', fontSize: 14, lineHeight: 1.55, marginTop: 36, maxWidth: 380 }}>
            Yuh worked from 8am to 6pm. Bring snacks. Hydrate.
          </p>
        </>
      ),
    },
    {
      key: 'topclient',
      bg: 'linear-gradient(135deg, #c4663d 0%, #8d3f1e 100%)',
      content: (
        <>
          <div className="mono" style={{ fontSize: 11, color: '#fbf6ec', letterSpacing: '0.14em', marginBottom: 14, opacity: 0.7 }}>
            03 · YUH TOP REGULAR
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 8, marginBottom: 22 }}>
            <Avatar name="Aaliyah Cooper" size={96} color="#fbf6ec" />
            <div>
              <div className="serif" style={{ fontSize: 56, fontWeight: 400, lineHeight: 1, color: '#fbf6ec' }}>Aaliyah C.</div>
              <div style={{ color: '#fbf6ec', opacity: 0.85, fontSize: 14, marginTop: 8 }}>4 visits · J$18,000 · 0 no-shows</div>
            </div>
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.18)', padding: 18, borderRadius: 12,
            color: '#fbf6ec', maxWidth: 460,
          }}>
            <p style={{ fontSize: 16, lineHeight: 1.5, fontStyle: 'italic', fontFamily: 'var(--serif)', margin: 0 }}>
              "Best in HWT. Mi nuh trust nobody else with mi acrylics."
            </p>
            <div className="mono" style={{ fontSize: 10, marginTop: 10, opacity: 0.7, letterSpacing: '0.08em' }}>★★★★★ · MAY 12 REVIEW</div>
          </div>
        </>
      ),
    },
    {
      key: 'topservice',
      bg: 'linear-gradient(135deg, #c89b3d 0%, #8a6a18 100%)',
      content: (
        <>
          <div className="mono" style={{ fontSize: 11, color: '#fbf6ec', letterSpacing: '0.14em', marginBottom: 14, opacity: 0.8 }}>
            04 · MOST BOOKED
          </div>
          <div className="serif" style={{ fontSize: 124, lineHeight: 0.9, fontWeight: 400, color: '#fbf6ec', letterSpacing: '-0.02em' }}>
            <span style={{ fontStyle: 'italic' }}>Acrylic</span><br/>full set.
          </div>
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'baseline', gap: 14, color: '#fbf6ec' }}>
            <span className="serif" style={{ fontSize: 56 }}>9</span>
            <span style={{ opacity: 0.85, fontSize: 16 }}>bookings · J$72,000 · 40% of revenue</span>
          </div>
          <p style={{ color: '#fbf6ec', opacity: 0.85, fontSize: 14, marginTop: 28, maxWidth: 420 }}>
            Yuh chrome finish single-handedly funded the new lamp. 🪞
          </p>
        </>
      ),
    },
    {
      key: 'milestone',
      bg: 'linear-gradient(135deg, #0c4a2d 0%, #062117 100%)',
      content: (
        <>
          <div className="mono" style={{ fontSize: 11, color: '#c89b3d', letterSpacing: '0.14em', marginBottom: 14 }}>
            05 · A MILESTONE
          </div>
          <div className="serif" style={{ fontSize: 124, lineHeight: 0.9, fontWeight: 400, color: '#fbf6ec', letterSpacing: '-0.02em' }}>
            500th<br/><span style={{ fontStyle: 'italic', color: '#c89b3d' }}>booking.</span>
          </div>
          <p style={{ color: '#c8bda4', fontSize: 16, lineHeight: 1.55, marginTop: 28, maxWidth: 460 }}>
            Yuh hit 500 lifetime bookings on the platform on May 23, 11:14am — Keisha's pedi. Free service yuh next 500 say what 🍷
          </p>
          <div style={{
            marginTop: 26, padding: '14px 22px',
            background: 'rgba(200,155,61,0.18)', border: '1px solid rgba(200,155,61,0.4)',
            borderRadius: 999, display: 'inline-block', color: '#fbf6ec', fontSize: 12, letterSpacing: '0.06em',
          }}>
            ✦ Glow Founders Club · earned May 23
          </div>
        </>
      ),
    },
    {
      key: 'finale',
      bg: 'linear-gradient(135deg, #1a201d 0%, #2a2620 100%)',
      content: (
        <>
          <div className="mono" style={{ fontSize: 11, color: '#c4663d', letterSpacing: '0.14em', marginBottom: 22 }}>
            ✦ MAY 2026 · CLOSED
          </div>
          <div className="serif" style={{ fontSize: 92, fontWeight: 400, lineHeight: 0.95, color: '#fbf6ec', letterSpacing: '-0.02em' }}>
            Onto<br/><span style={{ fontStyle: 'italic', color: '#c89b3d' }}>June, queen.</span>
          </div>
          <p style={{ color: '#c8bda4', fontSize: 15, lineHeight: 1.55, marginTop: 30, maxWidth: 420 }}>
            Yuh already got 14 bookings in for June (J$48k pipeline). Mi'll cheer yuh on.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
            <button style={{
              background: '#c4663d', color: '#fbf6ec',
              padding: '12px 22px', borderRadius: 8, fontSize: 13.5, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>{Icon.whatsapp({ width: 14, height: 14 })} Share to WhatsApp</button>
            <button style={{
              background: 'transparent', color: '#fbf6ec',
              padding: '12px 22px', borderRadius: 8, fontSize: 13.5, fontWeight: 500,
              border: '1px solid rgba(251,246,236,0.18)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>{Icon.copy({ width: 14, height: 14 })} Save all 7 as images</button>
          </div>
        </>
      ),
    },
  ];

  const cur = cards[card];

  return (
    <div style={{ flex: 1, background: '#2a2620', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* topbar */}
      <div style={{
        padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        color: '#fbf6ec',
      }}>
        <div>
          <div className="mono" style={{ fontSize: 10, color: '#a89c87', letterSpacing: '0.08em' }}>YOUR MAY 2026</div>
          <div className="serif" style={{ fontSize: 22, fontStyle: 'italic' }}>Glow · Month in Review</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ color: '#a89c87', padding: 8 }} onClick={() => setCard(Math.max(0, card - 1))}>
            {Icon.chev({ width: 16, height: 16, style: { transform: 'scaleX(-1)' } })}
          </button>
          <button style={{ color: '#a89c87', padding: 8 }} onClick={() => setCard(Math.min(cards.length - 1, card + 1))}>
            {Icon.chev({ width: 16, height: 16 })}
          </button>
        </div>
      </div>

      {/* the card */}
      <div style={{
        flex: 1, padding: '32px 32px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 880, maxWidth: '100%', aspectRatio: '1.4 / 1',
          background: cur.bg, borderRadius: 24,
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          position: 'relative', overflow: 'hidden',
          padding: '56px 60px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', top: -100, right: -100, width: 320, height: 320,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 60%)',
            pointerEvents: 'none',
          }} />
          {cur.content}

          {/* glow watermark */}
          <div className="mono" style={{
            position: 'absolute', bottom: 18, right: 22, fontSize: 9,
            color: 'rgba(251,246,236,0.4)', letterSpacing: '0.1em',
          }}>GLOW · LINKUPBOOKINGS</div>
        </div>
      </div>

      {/* dots */}
      <div style={{
        display: 'flex', gap: 6, justifyContent: 'center', padding: '0 0 24px',
      }}>
        {cards.map((_, i) => (
          <button key={i} onClick={() => setCard(i)} style={{
            width: i === card ? 30 : 8, height: 8, borderRadius: 4,
            background: i === card ? '#c4663d' : 'rgba(251,246,236,0.2)',
            transition: 'width 200ms, background 200ms',
          }} />
        ))}
      </div>
    </div>
  );
}

window.MonthReviewScreen = MonthReviewScreen;
