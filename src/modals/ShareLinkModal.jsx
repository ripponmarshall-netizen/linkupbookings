import ModalShell from '../components/ModalShell.jsx';
import { Icon } from '../components/shared.jsx';
import { useToast } from '../components/Toast.jsx';
import { copyToClipboard, shareLink, openLink, waLink, smsLink, printPage } from '../utils/actions.js';

export default function ShareLinkModal({ onClose }) {
  const { toast } = useToast();
  const link = 'lup.bk/glow';
  const url = `https://${link}`;
  const text = `Book your appointment with Glow Nail Studio ✨ ${url}`;

  async function copy() {
    const ok = await copyToClipboard(url);
    toast(ok ? 'Link copied' : 'Copy failed', { tone: ok ? 'success' : 'error' });
  }

  function shareTo(channel) {
    if (channel === 'WhatsApp') return openLink(waLink('', text));
    if (channel === 'SMS') return openLink(smsLink('', text));
    // Instagram / Facebook have no reliable web share intent — use the native
    // share sheet where available, otherwise fall back to copying the link.
    shareLink({ title: 'Glow Nail Studio', text, url }).then(result => {
      if (result === 'copied') toast('Link copied — paste it into ' + channel);
      else if (result === 'failed') toast('Could not share', { tone: 'error' });
    });
  }

  return (
    <ModalShell onClose={onClose} width={460}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Share booking link</div>
          <button onClick={onClose} aria-label="Close" style={{ color: 'var(--muted)' }}>
            {Icon.x({ width: 16, height: 16 })}
          </button>
        </div>
        <h2 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          Get more bookings
        </h2>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input className="input" value={link} readOnly aria-label="Booking link" style={{ flex: 1, fontFamily: 'var(--mono)' }} />
          <button className="btn btn-primary btn-sm" onClick={copy}>{Icon.copy({ width: 13, height: 13 })} Copy</button>
        </div>

        <div className="label" style={{ marginBottom: 12 }}>Share to</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {[
            { l: 'WhatsApp', i: Icon.whatsapp },
            { l: 'Instagram', i: Icon.instagram },
            { l: 'Facebook', i: Icon.share },
            { l: 'SMS', i: Icon.msg },
          ].map(({ l, i }) => (
            <button key={l} onClick={() => shareTo(l)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '14px 8px', background: 'var(--card)', border: '1px solid var(--line)',
              borderRadius: 10, fontSize: 11, color: 'var(--ink-2)',
            }}>
              {i({ width: 22, height: 22 })}
              {l}
            </button>
          ))}
        </div>

        <div style={{ background: 'var(--paper-2)', borderRadius: 12, padding: 18, textAlign: 'center' }}>
          <div style={{
            width: 120, height: 120, margin: '0 auto 12px', background: 'var(--card)',
            border: '1px solid var(--line)', borderRadius: 8, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            {Icon.qr ? Icon.qr({ width: 80, height: 80 }) : <span className="mono" style={{ fontSize: 10 }}>QR</span>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Scan to book · print for your salon</div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }} onClick={() => { toast('Opening print dialog…'); printPage(); }}>
            {Icon.download ? Icon.download({ width: 13, height: 13 }) : null} Download PDF
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
