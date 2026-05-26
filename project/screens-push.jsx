// Push notification mockups — iOS + Android lockscreens showing AI inbox events

function PushScreen() {
  return (
    <div style={{
      flex: 1, background: '#2a2620', minHeight: 'calc(100vh - 44px)',
      padding: '28px 32px 40px', overflow: 'auto',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ color: '#fbf6ec', marginBottom: 28, textAlign: 'center' }}>
          <div className="mono" style={{ fontSize: 11, color: '#c4663d', letterSpacing: '0.12em', marginBottom: 10 }}>
            ✨ WHAT YUH SEE ON YUH LOCKSCREEN
          </div>
          <h1 className="serif" style={{ fontSize: 44, fontWeight: 400, lineHeight: 1.05, margin: 0, letterSpacing: '-0.01em' }}>
            Open yuh phone.<br/>
            <span style={{ fontStyle: 'italic', color: '#c89b3d' }}>The day's already happening.</span>
          </h1>
          <p style={{ color: '#c8bda4', fontSize: 14, maxWidth: 540, margin: '14px auto 0', lineHeight: 1.55 }}>
            The AI confirms bookings, flags no-shows, and chases deposits while you're with a client. You'll see the result here.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 36 }}>
          <Lockscreen variant="ios" />
          <Lockscreen variant="android" />
        </div>
      </div>
    </div>
  );
}

function Lockscreen({ variant }) {
  const ios = variant === 'ios';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div className="mono" style={{ fontSize: 11, color: '#a89c87', letterSpacing: '0.1em' }}>
        {ios ? 'IOS · LOCKSCREEN' : 'ANDROID · LOCKSCREEN'}
      </div>

      {/* phone bezel */}
      <div style={{
        width: 360, borderRadius: ios ? 50 : 38,
        background: '#0a0a0a', padding: ios ? 14 : 10,
        boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.04)',
      }}>
        <div style={{
          borderRadius: ios ? 38 : 28, overflow: 'hidden',
          background: `
            linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7)),
            radial-gradient(circle at 30% 20%, #c4663d, transparent 50%),
            radial-gradient(circle at 70% 70%, #6a3a4a, transparent 50%),
            radial-gradient(circle at 50% 90%, #0c4a2d, transparent 50%),
            #1a0e08
          `,
          minHeight: 680, padding: ios ? '60px 16px 24px' : '40px 14px 16px',
          color: '#fbf6ec', position: 'relative',
        }}>
          {/* status bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            position: 'absolute', top: ios ? 18 : 12, left: 24, right: 24,
            fontSize: 13, fontWeight: 600,
          }}>
            <span>{ios ? '9:41' : '11:42'}</span>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 12 }}>
              <span>📶</span><span>🔋</span>
            </div>
          </div>

          {/* iOS dynamic island */}
          {ios && (
            <div style={{
              position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
              width: 110, height: 32, borderRadius: 999, background: '#000',
            }} />
          )}

          {/* big clock */}
          <div style={{ textAlign: 'center', marginBottom: 26, marginTop: ios ? 30 : 16 }}>
            <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 4 }}>Tuesday, May 26</div>
            <div className="serif" style={{ fontSize: 96, lineHeight: 1, fontWeight: 300, letterSpacing: '-0.02em' }}>
              11:42
            </div>
          </div>

          {/* live activity / glance */}
          {ios && (
            <div style={{
              background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(20px)',
              borderRadius: 22, padding: '12px 14px', marginBottom: 12,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #c4663d, #8d3f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16 }}>g</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 500 }}>UP NEXT · Aaliyah Cooper</div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>Pedicure · in 18 minutes</div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#c4663d', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 600,
              }}>11:00</div>
            </div>
          )}

          {/* notifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { app: 'LinkUp', sub: 'BOOKING', t: 'now', title: '✓ Keisha just booked Thu 3pm', body: 'AI confirmed via WhatsApp — deposit J$1,000 received', color: '#0c4a2d' },
              { app: 'LinkUp', sub: 'WHATSAPP', t: '4m', title: 'Aaliyah is asking about Saturday', body: 'AI drafted a reply — tap to send 3 open slots', color: '#c4663d' },
              { app: 'LinkUp', sub: 'PAYMENT', t: '12m', title: 'Tanisha\'s J$8,000 cleared', body: 'NCB Lynk · Acrylic full set', color: '#c89b3d' },
              { app: 'LinkUp', sub: '✨ AI · MOMENT', t: '1h', title: 'Daniella\'s birthday in 19 days', body: 'Send her the birthday template?', color: '#6a3a4a' },
            ].map((n, i) => (
              <div key={i} style={{
                background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(20px)',
                borderRadius: ios ? 18 : 14, padding: 12,
                opacity: 1 - i * 0.04,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, #c4663d, #8d3f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 10 }}>L</div>
                  <span style={{ fontSize: 11, fontWeight: 500 }}>LinkUp</span>
                  <span className="mono" style={{ fontSize: 8.5, opacity: 0.55, letterSpacing: '0.06em' }}>· {n.sub}</span>
                  <span className="mono" style={{ fontSize: 9, opacity: 0.55, marginLeft: 'auto' }}>{n.t}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 2 }}>{n.title}</div>
                <div style={{ fontSize: 11.5, opacity: 0.8, lineHeight: 1.4 }}>{n.body}</div>
              </div>
            ))}
          </div>

          {/* iOS swipe up indicator */}
          {ios && (
            <div style={{
              position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
              width: 110, height: 4, borderRadius: 2,
              background: 'rgba(251,246,236,0.4)',
            }} />
          )}
        </div>
      </div>
    </div>
  );
}

window.PushScreen = PushScreen;
