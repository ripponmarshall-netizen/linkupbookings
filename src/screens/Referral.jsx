import React from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { fmtJ } from '../data/seed.js';
import { useToast } from '../components/Toast.jsx';
import { copyToClipboard, waLink, openLink } from '../utils/actions.js';

const REFERRAL_URL = 'https://linkupbookings.com/r/tanyaW';

export default function ReferralScreen() {
  const { toast } = useToast();
  const [phone, setPhone] = React.useState('');
  const [showInvite, setShowInvite] = React.useState(false);

  async function copyLink() {
    const ok = await copyToClipboard(REFERRAL_URL);
    toast(ok ? 'Referral link copied' : 'Copy failed', { tone: ok ? 'success' : 'error' });
  }

  function shareWhatsApp() {
    openLink(waLink('', `Join me on LinkUpBookings — we both get J$400 off 💚 ${REFERRAL_URL}`));
  }

  function sendInvite() {
    const num = phone.trim();
    if (!num) return;
    openLink(waLink(num, `Hey! Join me on LinkUpBookings and we both earn J$400 off: ${REFERRAL_URL}`));
    toast('Opening WhatsApp invite…');
    setPhone('');
    setShowInvite(false);
  }

  const referrals = [
    { name: 'Andrea — Andrea Cuts', stage: 'paid', date: '2 weeks ago', reward: 'J$400 credit · applied' },
    { name: 'Shantel — Lash by Shan', stage: 'trial', date: '4 days ago', reward: 'Trial — earn when she upgrades' },
    { name: 'Kemar — Trim Barbershop', stage: 'invited', date: '1 hour ago', reward: 'Pending invite' },
    { name: 'Rochelle — RB Lashes', stage: 'paid', date: '1 month ago', reward: 'J$400 credit · applied' },
  ];

  const earned = referrals.filter(r => r.stage === 'paid').length * 400;
  const pending = referrals.filter(r => r.stage === 'trial').length * 400;

  return (
    <DashboardShell
      title="Refer a friend"
      sub="J$400 off for you, J$400 off for them"
    >
      <div style={{ flex: 1, overflow: 'auto', background: 'var(--paper)' }}>
        {/* hero */}
        <div style={{
          background: 'var(--ink)', color: '#fbf6ec',
          padding: '40px 32px 32px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -120, right: -80, width: 320, height: 320,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,102,61,0.32), transparent 60%)',
          }} />
          <div style={{
            position: 'absolute', bottom: -100, left: '40%', width: 240, height: 240,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,155,61,0.18), transparent 60%)',
          }} />

          <div className="referral-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, position: 'relative' }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: '#c89b3d', letterSpacing: '0.1em', marginBottom: 14 }}>
                ✦ FOR YUH FELLOW HUSTLERS
              </div>
              <h2 className="serif referral-hero-title" style={{ fontSize: 56, margin: '0 0 16px', lineHeight: 0.98, fontWeight: 400, letterSpacing: '-0.015em' }}>
                Refer another owner,<br/>
                <span style={{ fontStyle: 'italic', color: 'var(--ochre)' }}>get a month free.</span>
              </h2>
              <p style={{ color: '#c8bda4', fontSize: 15, lineHeight: 1.55, maxWidth: 480, margin: '0 0 26px' }}>
                Yuh barber friend, yuh stylist cousin, yuh lash girl — every owner who upgrades from yuh link gets J$400 off, and yuh get J$400 off too. No limit.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn btn-terracotta btn-lg" onClick={shareWhatsApp}>
                  {Icon.whatsapp({ width: 16, height: 16 })} Share on WhatsApp
                </button>
                <button onClick={copyLink} style={{
                  background: 'rgba(251,246,236,0.08)', color: '#fbf6ec',
                  padding: '14px 22px', borderRadius: 8, fontSize: 15, fontWeight: 500,
                  border: '1px solid rgba(251,246,236,0.18)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  {Icon.copy({ width: 14, height: 14 })} Copy link
                </button>
              </div>
            </div>

            <div style={{
              background: 'rgba(251,246,236,0.04)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(251,246,236,0.08)',
              borderRadius: 16, padding: 24, position: 'relative',
            }}>
              <div className="mono" style={{ fontSize: 10, color: '#a89c87', letterSpacing: '0.1em', marginBottom: 18 }}>
                YUH PERSONAL LINK
              </div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 15,
                background: 'rgba(0,0,0,0.18)', padding: '12px 14px',
                borderRadius: 8, marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ color: '#a89c87' }}>linkupbookings.com/r/</span>
                <span style={{ color: '#fbf6ec', fontWeight: 600 }}>tanyaW</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <div className="mono" style={{ fontSize: 9.5, color: '#a89c87', letterSpacing: '0.08em', marginBottom: 4 }}>EARNED</div>
                  <div className="serif" style={{ fontSize: 32, color: 'var(--ochre)', fontWeight: 400 }}>{fmtJ(earned)}</div>
                  <div style={{ fontSize: 11, color: '#a89c87' }}>2 friends upgraded</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 9.5, color: '#a89c87', letterSpacing: '0.08em', marginBottom: 4 }}>PENDING</div>
                  <div className="serif" style={{ fontSize: 32, color: '#dccfb6', fontWeight: 400 }}>{fmtJ(pending)}</div>
                  <div style={{ fontSize: 11, color: '#a89c87' }}>1 on trial</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* referrals list + preview */}
        <div style={{ padding: '40px 32px', background: 'var(--paper)' }}>
          <div className="referral-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40 }}>
            <div>
              <div className="label" style={{ marginBottom: 14 }}>Yuh referrals · {referrals.length}</div>
              <div style={{
                background: 'var(--card)', border: '1px solid var(--line)',
                borderRadius: 12, overflow: 'hidden',
              }}>
                {referrals.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 18px',
                    borderBottom: i < referrals.length - 1 ? '1px solid var(--line)' : 'none',
                  }}>
                    <Avatar name={r.name} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.name}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '0.04em', marginTop: 2 }}>
                        {r.reward.toUpperCase()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className={`chip ${
                        r.stage === 'paid' ? 'chip-forest' :
                        r.stage === 'trial' ? 'chip-ochre' :
                        'chip-terracotta'
                      }`} style={{ fontSize: 10.5 }}>
                        {r.stage === 'paid' && '✓ '}
                        {r.stage}
                      </span>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
                        {r.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showInvite ? (
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <input
                    className="input"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') sendInvite(); }}
                    placeholder="+1 876 555 0000"
                    aria-label="Phone number to invite"
                    autoFocus
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-primary" onClick={sendInvite} disabled={!phone.trim()}>Send</button>
                </div>
              ) : (
                <button className="btn btn-secondary" style={{ marginTop: 14 }} onClick={() => setShowInvite(true)}>
                  {Icon.plus({ width: 13, height: 13 })} Invite by phone number
                </button>
              )}
            </div>

            {/* preview */}
            <div>
              <div className="label" style={{ marginBottom: 14 }}>What they'll see</div>
              <div style={{
                background: '#0d141a', borderRadius: 16, padding: 16,
                marginBottom: 16,
              }}>
                <div style={{
                  background: 'var(--paper)', borderRadius: 12, padding: 22,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: -40, right: -40, width: 140, height: 140,
                    borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,102,61,0.18), transparent 60%)',
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Avatar name="Tanya Williams" size={28} />
                    <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>
                      <strong>Tanya from Glow</strong> shared LinkUpBookings with yuh
                    </div>
                  </div>
                  <div className="serif" style={{ fontSize: 28, fontWeight: 400, lineHeight: 1.05, marginBottom: 6 }}>
                    First month <span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>on the house.</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
                    Take bookings, deposits & reminders from yuh WhatsApp — no more lost slots.
                  </div>
                  <button style={{
                    background: 'var(--terracotta)', color: '#fbf6ec',
                    padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, width: '100%',
                  }} onClick={shareWhatsApp}>Claim J$400 off →</button>
                  <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textAlign: 'center', marginTop: 8, letterSpacing: '0.06em' }}>
                    LINKUPBOOKINGS.COM/R/TANYAW
                  </div>
                </div>
              </div>

              <div style={{
                padding: 14, background: 'var(--terracotta-soft)', borderRadius: 10,
                borderLeft: '3px solid var(--terracotta)',
                fontSize: 12, color: '#8d3f1e', lineHeight: 1.55,
              }}>
                <strong>Tip:</strong> drop yuh link in any of these WhatsApp groups — "HWT Hustlers", "Salon Owners JA", "Beauty Biz Network".
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
