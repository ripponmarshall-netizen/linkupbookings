import { useState } from 'react';
import ModalShell from '../components/ModalShell.jsx';
import { Icon, Avatar } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { fmtTime, fmtJ } from '../data/seed.js';
import { useToast } from '../components/Toast.jsx';

export default function MarkPaidModal({ appt, onClose }) {
  const { markPaid, clients, services } = useApp();

  const a = appt;
  const c = clients.find(client => client.id === a?.clientId) || {};
  const s = services.find(service => service.id === a?.serviceId) || {};
  const balance = (s.price || 0) - (a?.deposit || 0);

  const { toast } = useToast();
  const [method, setMethod] = useState('cash');
  const [tip, setTip] = useState(0);
  const [receipt, setReceipt] = useState(true);
  const total = balance + tip;

  const methods = [
    { k: 'cash',  l: 'Cash',     i: Icon.cash  },
    { k: 'lynk',  l: 'NCB Lynk', i: Icon.phone },
    { k: 'card',  l: 'Card',     i: Icon.cash  },
    { k: 'other', l: 'Other',    i: Icon.plus  },
  ];

  function handleMarkPaid() {
    if (a?.id) {
      markPaid(a.id, method, tip);
    }
    toast(`${fmtJ(total)} collected${receipt && c.name ? ` · receipt sent to ${c.name.split(' ')[0]}` : ''}`, { tone: 'success' });
    onClose();
  }

  if (!a) return null;

  return (
    <ModalShell onClose={onClose} width={460}>
      <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">Collect payment</div>
          <button onClick={onClose} style={{ color: 'var(--muted)' }}>
            {Icon.x({ width: 16, height: 16 })}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
          <Avatar name={c.name} size={36} />
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 500 }}>{c.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{s.name} · {fmtTime(a.start)}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 22 }}>
        {/* breakdown */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 10, padding: '14px 16px', marginBottom: 18,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
            <span style={{ color: 'var(--muted)' }}>Service</span>
            <span className="mono">{fmtJ(s.price)}</span>
          </div>
          {a.deposit > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--forest)' }}>Deposit paid</span>
              <span className="mono" style={{ color: 'var(--forest)' }}>− {fmtJ(a.deposit)}</span>
            </div>
          )}
          {tip > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--ochre)' }}>Tip</span>
              <span className="mono" style={{ color: 'var(--ochre)' }}>+ {fmtJ(tip)}</span>
            </div>
          )}
          <div style={{ height: 1, background: 'var(--line)', margin: '6px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14, fontWeight: 600 }}>
            <span>Total to collect</span>
            <span className="mono serif" style={{ fontSize: 20 }}>{fmtJ(total)}</span>
          </div>
        </div>

        {/* method */}
        <label className="label" style={{ marginBottom: 8 }}>Method</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 18 }}>
          {methods.map(m => (
            <button
              key={m.k}
              onClick={() => setMethod(m.k)}
              style={{
                padding: '10px 6px', borderRadius: 8,
                background: method === m.k ? 'var(--ink)' : 'var(--card)',
                color: method === m.k ? '#fbf6ec' : 'var(--ink)',
                border: method === m.k ? '1px solid var(--ink)' : '1px solid var(--line)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                fontSize: 11.5, fontWeight: 500,
              }}
            >
              {m.i({ width: 14, height: 14 })} {m.l}
            </button>
          ))}
        </div>

        {/* tip */}
        <label className="label" style={{ marginBottom: 8 }}>Tip</label>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {[0, 200, 500, 1000].map(t => (
            <button
              key={t}
              onClick={() => setTip(t)}
              className="chip"
              style={{
                background: tip === t ? 'var(--ochre)' : 'var(--card)',
                color: tip === t ? '#fbf6ec' : 'var(--ink)',
                border: tip === t ? '1px solid var(--ochre)' : '1px solid var(--line)',
                cursor: 'pointer', padding: '6px 14px', flex: 1, justifyContent: 'center',
              }}
            >
              {t === 0 ? 'None' : fmtJ(t)}
            </button>
          ))}
          <input
            className="input"
            placeholder="custom"
            style={{ width: 90, fontSize: 12 }}
            onChange={e => setTip(parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0)}
          />
        </div>
      </div>

      <div style={{
        padding: '14px 24px', borderTop: '1px solid var(--line)',
        background: 'var(--paper-2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-2)' }}>
          <input type="checkbox" checked={receipt} onChange={e => setReceipt(e.target.checked)} style={{ accentColor: 'var(--forest)' }} /> SMS receipt to {c.name?.split(' ')[0]}
        </label>
        <button className="btn btn-primary btn-sm" onClick={handleMarkPaid}>
          {Icon.check({ width: 13, height: 13 })} Mark paid · {fmtJ(total)}
        </button>
      </div>
    </ModalShell>
  );
}
