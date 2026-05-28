import { useState } from 'react';
import ModalShell from '../components/ModalShell.jsx';
import { Icon } from '../components/shared.jsx';

export default function ShareLinkModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <ModalShell onClose={onClose} width={520}>
      <div style={{ padding: '24px 28px 8px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Your booking link</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>
            {Icon.x({ width: 16, height: 16 })}
          </button>
        </div>
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, lineHeight: 1.1 }}>
          Share this <span style={{ fontStyle: 'italic' }}>everywhere</span>.
        </h2>
      </div>

      <div style={{ padding: 24, overflowY: 'auto' }}>
        {/* link + copy */}
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
            onClick={handleCopy}
            style={{
              background: copied ? 'var(--forest)' : 'var(--ink)',
              color: '#fbf6ec', padding: '0 18px', fontSize: 12.5,
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'background 200ms',
            }}
          >
            {copied ? Icon.check({ width: 14, height: 14 }) : Icon.copy({ width: 14, height: 14 })}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* share targets */}
        <div className="label" style={{ marginBottom: 8 }}>Share to</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
          {[
            { l: 'WhatsApp', i: Icon.whatsapp, c: '#25d366'       },
            { l: 'Instagram', i: Icon.globe,   c: '#c4663d'       },
            { l: 'SMS',       i: Icon.msg,     c: 'var(--forest)' },
            { l: 'Email',     i: Icon.bell,    c: 'var(--plum)'   },
          ].map((s, i) => (
            <button
              key={i}
              style={{
                padding: '14px 8px', borderRadius: 10, background: 'var(--card)',
                border: '1px solid var(--line)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{ color: s.c }}>{s.i({ width: 18, height: 18 })}</span>
              <span style={{ fontSize: 11.5 }}>{s.l}</span>
            </button>
          ))}
        </div>

        {/* QR */}
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
