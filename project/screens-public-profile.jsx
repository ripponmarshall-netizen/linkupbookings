// Public-facing business profile / SEO landing page (different from booking flow)

function PublicProfileScreen() {
  return (
    <BrowserWindow url="linkupbookings.com/glow" theme="light">
      <div style={{ background: '#fff', color: '#1a201d', fontFamily: 'var(--sans)', minHeight: 700 }}>
        {/* hero — hero image + intro */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', minHeight: 420 }}>
          {/* image side */}
          <div style={{
            background: 'linear-gradient(135deg, #c4663d 0%, #8d3f1e 60%, #6a3a4a 100%)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(200,155,61,0.32), transparent 50%),
                radial-gradient(circle at 40% 90%, rgba(0,0,0,0.4), transparent 60%)
              `,
            }} />
            <div style={{
              position: 'absolute', bottom: 20, left: 24, right: 24,
              color: '#fbf6ec', display: 'flex', gap: 6,
            }}>
              {['#c4663d', '#0c4a2d', '#6a3a4a', '#c89b3d'].map((c, i) => (
                <div key={i} style={{
                  flex: 1, height: 60, borderRadius: 8,
                  background: `linear-gradient(135deg, ${c}, ${c}99)`,
                  border: '2px solid rgba(255,255,255,0.3)',
                }} />
              ))}
            </div>
            <div className="mono" style={{
              position: 'absolute', top: 20, left: 24, fontSize: 10,
              color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em',
            }}>EST. 2022 · KGN</div>
          </div>

          {/* content side */}
          <div style={{ padding: '52px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #c4663d, #8d3f1e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fbf6ec', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22,
              }}>g</div>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic' }}>Glow</div>
                <div className="mono" style={{ fontSize: 9.5, color: '#7a7062', letterSpacing: '0.08em' }}>NAIL STUDIO · HWT</div>
              </div>
            </div>

            <h1 className="serif" style={{
              fontSize: 56, fontWeight: 400, lineHeight: 0.98,
              letterSpacing: '-0.015em', margin: '0 0 14px',
            }}>
              Honest nails,<br/>
              <span style={{ fontStyle: 'italic', color: '#c4663d' }}>nuh wait, nuh stress.</span>
            </h1>
            <p style={{ fontSize: 15, color: '#3a3a33', lineHeight: 1.55, margin: '0 0 26px', maxWidth: 440 }}>
              Tanya. Solo nail tech in Half-Way-Tree. 14 years doing dis. Acrylic, gel, art — book yuh slot, pay deposit, show up fresh.
            </p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
              <button style={{
                background: '#0c4a2d', color: '#fbf6ec',
                padding: '14px 22px', borderRadius: 8, fontSize: 14.5, fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>{Icon.cal({ width: 15, height: 15 })} Book a slot</button>
              <button style={{
                background: '#fff', color: '#1a201d',
                padding: '14px 22px', borderRadius: 8, fontSize: 14.5, fontWeight: 500,
                border: '1px solid #e6dcc4',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>{Icon.whatsapp({ width: 15, height: 15 })} WhatsApp first</button>
            </div>

            {/* social proof bar */}
            <div style={{ display: 'flex', gap: 28 }}>
              {[
                ['★ 4.9', '127 reviews'],
                ['47', 'regulars'],
                ['<2hr', 'reply time'],
              ].map(([v, l], i) => (
                <div key={i}>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 400, lineHeight: 1 }}>{v}</div>
                  <div className="mono" style={{ fontSize: 9.5, color: '#7a7062', letterSpacing: '0.08em', marginTop: 4 }}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* services strip */}
        <div style={{
          borderTop: '1px solid #e6dcc4', borderBottom: '1px solid #e6dcc4',
          padding: '24px 56px', background: '#fdfaf2',
          display: 'flex', gap: 30, overflowX: 'auto',
        }} className="no-scroll">
          {SERVICES.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{ width: 4, height: 30, borderRadius: 2, background: s.color }} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</div>
                <div className="mono" style={{ fontSize: 10.5, color: '#7a7062' }}>
                  {fmtJ(s.price)} · {s.duration}min
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* lookbook + about */}
        <div style={{ padding: '56px 56px 40px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: '#c4663d', letterSpacing: '0.1em', marginBottom: 12 }}>RECENT WORK</div>
            <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.05, margin: '0 0 22px' }}>
              Last <span style={{ fontStyle: 'italic' }}>week's sets.</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {[
                '#c4663d', '#0c4a2d', '#6a3a4a', '#c89b3d',
                '#4d6a48', '#8d3f1e', '#0a3d25', '#3a3a33',
              ].map((c, i) => (
                <div key={i} style={{
                  aspectRatio: '0.85', borderRadius: 8, overflow: 'hidden',
                  background: `linear-gradient(135deg, ${c}, ${c}cc)`,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: i % 3 === 0 ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 50%)' :
                               i % 3 === 1 ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 4px, transparent 4px 12px)' :
                                              'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.18), transparent 60%)',
                  }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mono" style={{ fontSize: 10, color: '#c4663d', letterSpacing: '0.1em', marginBottom: 12 }}>ABOUT</div>
            <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.05, margin: '0 0 18px' }}>
              <span style={{ fontStyle: 'italic' }}>14 years</span> in dis.
            </h2>
            <p style={{ fontSize: 14, color: '#3a3a33', lineHeight: 1.6, marginTop: 0 }}>
              Started in mi mother kitchen on Hagley Park. Trained at Pulse, picked up gel from a salon in Brooklyn, came back home and never looked back.
            </p>
            <p style={{ fontSize: 14, color: '#3a3a33', lineHeight: 1.6 }}>
              Mi only do one client at a time so yuh get the full hour. Yuh nuh sharing mi with three other people.
            </p>

            <div style={{
              marginTop: 22, padding: 16,
              background: '#fdfaf2', borderRadius: 10,
              borderLeft: '3px solid #c89b3d',
            }}>
              <div className="mono" style={{ fontSize: 9.5, color: '#7a7062', letterSpacing: '0.08em', marginBottom: 8 }}>HOURS</div>
              {[['Mon–Wed', '9am – 5pm'], ['Thu–Fri', '9am – 7pm'], ['Sat', '8am – 4pm'], ['Sun', 'Closed']].map(([d, t], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 13 }}>
                  <span style={{ color: '#7a7062' }}>{d}</span>
                  <span style={{ fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* reviews */}
        <div style={{ padding: '40px 56px 56px', background: '#fdfaf2', borderTop: '1px solid #e6dcc4' }}>
          <div className="mono" style={{ fontSize: 10, color: '#c4663d', letterSpacing: '0.1em', marginBottom: 12 }}>FROM REGULARS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {[
              ['"Best in HWT. Mi nuh trust nobody else with mi acrylics."', 'Aaliyah · 18 visits'],
              ['"Always on time, always fresh designs. The hour goes quick — vibes."', 'Tanisha · 12 visits'],
              ['"She bring snacks. Need mi seh more?"', 'Marsha · 9 visits'],
            ].map(([q, who], i) => (
              <div key={i} style={{
                background: '#fff', border: '1px solid #e6dcc4', borderRadius: 12, padding: 22,
              }}>
                <div style={{ color: '#c89b3d', fontSize: 14, letterSpacing: 1, marginBottom: 10 }}>★★★★★</div>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.35, fontStyle: 'italic', margin: '0 0 16px' }}>
                  {q}
                </p>
                <div className="mono" style={{ fontSize: 10, color: '#7a7062', letterSpacing: '0.06em' }}>
                  — {who.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div style={{
          padding: '32px 56px', background: '#1a201d', color: '#a89c87',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12,
        }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.06em' }}>
            22 CONSTANT SPRING RD · KGN 10 · OPEN MON–SAT
          </div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.06em' }}>
            POWERED BY <span style={{ color: '#c4663d' }}>LINKUPBOOKINGS</span>
          </div>
        </div>
      </div>
    </BrowserWindow>
  );
}

window.PublicProfileScreen = PublicProfileScreen;
