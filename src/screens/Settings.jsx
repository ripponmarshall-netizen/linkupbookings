import { useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useToast } from '../components/Toast.jsx';
import { copyToClipboard, printPage } from '../utils/actions.js';
import ConfirmModal from '../modals/ConfirmModal.jsx';

const TABS = ['Profile', 'Hours', 'Payments', 'Booking', 'Notifications', 'Billing', 'Account'];

export default function SettingsScreen() {
  const { isPro, togglePro } = useApp();
  const [tab, setTab] = useState('Profile');

  return (
    <DashboardShell title="Settings" sub="Manage your account and preferences">
      <div className="split-pane" style={{ display: 'flex', height: '100%' }}>
        {/* Settings nav */}
        <div className="split-pane-rail" style={{ width: 200, borderRight: '1px solid var(--line)', padding: '16px 0', flexShrink: 0, background: 'var(--card-warm)' }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                width: '100%', textAlign: 'left', padding: '10px 20px', fontSize: 13.5,
                background: tab === t ? 'var(--paper-2)' : 'transparent',
                color: tab === t ? 'var(--ink)' : 'var(--muted)',
                fontWeight: tab === t ? 600 : 400,
                borderLeft: tab === t ? '2px solid var(--forest)' : '2px solid transparent',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div className="split-pane-body" style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          {tab === 'Profile' && <ProfileSettings />}
          {tab === 'Hours' && <HoursSettings />}
          {tab === 'Payments' && <PaymentsSettings />}
          {tab === 'Booking' && <BookingSettings />}
          {tab === 'Notifications' && <NotificationsSettings />}
          {tab === 'Billing' && <BillingSettings isPro={isPro} togglePro={togglePro} />}
          {tab === 'Account' && <AccountSettings />}
        </div>
      </div>
    </DashboardShell>
  );
}

function Field({ label, children, htmlFor }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label className="label" htmlFor={htmlFor} style={{ display: 'block', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

/** Persist Settings sub-sections to localStorage under their own key so each save sticks. */
function useSettingsForm(section, initial) {
  const key = `lup_settings_${section}`;
  const [form, setForm] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return { ...initial, ...JSON.parse(raw) };
    } catch { /* ignore */ }
    return initial;
  });
  const set = (patch) => setForm(f => ({ ...f, ...patch }));
  const persist = () => {
    try { localStorage.setItem(key, JSON.stringify(form)); } catch { /* ignore */ }
  };
  return [form, set, persist];
}

function ProfileSettings() {
  const { toast } = useToast();
  const [form, set, persist] = useSettingsForm('profile', {
    business: 'Glow Nail Studio',
    name: 'Tanya Williams',
    bio: "Kingston's cosiest nail studio ✨",
    whatsapp: '+1 876 555 0199',
    location: '12 Hope Road, Kingston 6',
  });
  return (
    <div style={{ maxWidth: 480 }}>
      <h2 className="serif" style={{ fontSize: 22, margin: '0 0 20px', fontWeight: 400 }}>Profile</h2>
      <Field label="Business name" htmlFor="set-business"><input id="set-business" className="input" value={form.business} onChange={e => set({ business: e.target.value })} /></Field>
      <Field label="Your name" htmlFor="set-name"><input id="set-name" className="input" value={form.name} onChange={e => set({ name: e.target.value })} /></Field>
      <Field label="Bio" htmlFor="set-bio"><textarea id="set-bio" className="textarea" rows="3" value={form.bio} onChange={e => set({ bio: e.target.value })} /></Field>
      <Field label="WhatsApp number" htmlFor="set-wa"><input id="set-wa" className="input" value={form.whatsapp} onChange={e => set({ whatsapp: e.target.value })} /></Field>
      <Field label="Location" htmlFor="set-loc"><input id="set-loc" className="input" value={form.location} onChange={e => set({ location: e.target.value })} /></Field>
      <button className="btn btn-primary" onClick={() => { persist(); toast('Profile saved', { tone: 'success' }); }}>Save changes</button>
    </div>
  );
}

function HoursSettings() {
  const { toast } = useToast();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [hours, setHours, persist] = useSettingsForm('hours',
    days.reduce((acc, d) => ({ ...acc, [d]: { open: d !== 'Sunday', from: '9:00am', to: '6:00pm' } }), {})
  );
  const [buffer, setBuffer, persistBuffer] = useSettingsForm('buffer', { mins: '15' });
  return (
    <div style={{ maxWidth: 480 }}>
      <h2 className="serif" style={{ fontSize: 22, margin: '0 0 20px', fontWeight: 400 }}>Working hours</h2>
      {days.map(d => (
        <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ width: 90, fontSize: 13 }}>{d}</div>
          <button
            aria-label={`Toggle ${d} ${hours[d].open ? 'closed' : 'open'}`}
            onClick={() => setHours({ [d]: { ...hours[d], open: !hours[d].open } })}
            style={{
              width: 38, height: 22, borderRadius: 11, flexShrink: 0,
              background: hours[d].open ? 'var(--forest)' : 'var(--line-2)', position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 2, left: hours[d].open ? 18 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fbf6ec', transition: 'left 120ms' }} />
          </button>
          {hours[d].open ? (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12.5, color: 'var(--muted)' }}>
              <input className="input" style={{ width: 92, padding: '6px 8px' }} value={hours[d].from} onChange={e => setHours({ [d]: { ...hours[d], from: e.target.value } })} aria-label={`${d} open time`} />
              <span>–</span>
              <input className="input" style={{ width: 92, padding: '6px 8px' }} value={hours[d].to} onChange={e => setHours({ [d]: { ...hours[d], to: e.target.value } })} aria-label={`${d} close time`} />
            </div>
          ) : (
            <span style={{ fontSize: 12.5, color: 'var(--muted-2)' }}>Closed</span>
          )}
        </div>
      ))}
      <div style={{ marginTop: 18 }}>
        <label className="label" htmlFor="set-buffer" style={{ display: 'block', marginBottom: 6 }}>Buffer between appointments</label>
        <select id="set-buffer" className="select" value={buffer.mins} onChange={e => setBuffer({ mins: e.target.value })} style={{ maxWidth: 200 }}>
          {['0', '5', '10', '15', '30'].map(m => <option key={m} value={m}>{m} minutes</option>)}
        </select>
      </div>
      <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={() => { persist(); persistBuffer(); toast('Hours saved', { tone: 'success' }); }}>Save hours</button>
    </div>
  );
}

function PaymentsSettings() {
  const { toast } = useToast();
  const methods = ['Cash', 'Card (Square)', 'Bank transfer', 'Lynk / WiPay'];
  const [form, set, persist] = useSettingsForm('payments', { enabled: ['Cash', 'Card (Square)'] });
  const toggle = (m) => set({ enabled: form.enabled.includes(m) ? form.enabled.filter(x => x !== m) : [...form.enabled, m] });
  return (
    <div style={{ maxWidth: 480 }}>
      <h2 className="serif" style={{ fontSize: 22, margin: '0 0 20px', fontWeight: 400 }}>Payments</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 20 }}>
        Choose how clients pay deposits and balances.
      </p>
      {methods.map((m, i) => (
        <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.enabled.includes(m)} onChange={() => toggle(m)} style={{ width: 16, height: 16, accentColor: 'var(--forest)' }} />
          <span style={{ fontSize: 13.5 }}>{m}</span>
        </label>
      ))}
      <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => { persist(); toast('Payment methods saved', { tone: 'success' }); }}>Save</button>
    </div>
  );
}

function BookingSettings() {
  const { toast } = useToast();
  const [form, set, persist] = useSettingsForm('booking', {
    welcome: 'Book your appointment below ✨',
    showPrices: true,
  });
  const link = 'lup.bk/glow';
  return (
    <div style={{ maxWidth: 480 }}>
      <h2 className="serif" style={{ fontSize: 22, margin: '0 0 20px', fontWeight: 400 }}>Booking page</h2>
      <Field label="Your booking link" htmlFor="set-link">
        <div style={{ display: 'flex', gap: 8 }}>
          <input id="set-link" className="input" value={link} readOnly style={{ flex: 1 }} />
          <button className="btn btn-secondary btn-sm" onClick={async () => { const ok = await copyToClipboard(`https://${link}`); toast(ok ? 'Link copied' : 'Copy failed', { tone: ok ? 'success' : 'error' }); }}>Copy</button>
        </div>
      </Field>
      <Field label="Welcome message" htmlFor="set-welcome"><textarea id="set-welcome" className="textarea" rows="3" value={form.welcome} onChange={e => set({ welcome: e.target.value })} /></Field>
      <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', cursor: 'pointer' }}>
        <input type="checkbox" checked={form.showPrices} onChange={e => set({ showPrices: e.target.checked })} style={{ width: 16, height: 16, accentColor: 'var(--forest)' }} />
        <span style={{ fontSize: 13.5 }}>Show prices publicly</span>
      </label>
      <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => { persist(); toast('Booking page saved', { tone: 'success' }); }}>Save</button>
    </div>
  );
}

function NotificationsSettings() {
  const { toast } = useToast();
  const items = ['New booking', 'Cancellation', 'Payment received', 'Daily summary', 'Weekly report'];
  const [form, set, persist] = useSettingsForm('notifs', { enabled: items.slice(0, 3) });
  const toggle = (it) => set({ enabled: form.enabled.includes(it) ? form.enabled.filter(x => x !== it) : [...form.enabled, it] });
  return (
    <div style={{ maxWidth: 480 }}>
      <h2 className="serif" style={{ fontSize: 22, margin: '0 0 20px', fontWeight: 400 }}>Notifications</h2>
      {items.map((it, i) => (
        <label key={it} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--line)' : 'none', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.enabled.includes(it)} onChange={() => toggle(it)} style={{ width: 16, height: 16, accentColor: 'var(--forest)' }} />
          <span style={{ fontSize: 13.5 }}>{it}</span>
        </label>
      ))}
      <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => { persist(); toast('Notification preferences saved', { tone: 'success' }); }}>Save</button>
    </div>
  );
}

function BillingSettings({ isPro, togglePro }) {
  const { toast } = useToast();
  return (
    <div style={{ maxWidth: 480 }}>
      <h2 className="serif" style={{ fontSize: 22, margin: '0 0 20px', fontWeight: 400 }}>Billing</h2>
      <div style={{
        padding: 20, borderRadius: 12, marginBottom: 20,
        background: isPro ? 'var(--forest-soft)' : 'var(--paper-2)',
        border: `1px solid ${isPro ? 'var(--forest)' : 'var(--line)'}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{isPro ? 'Pro plan' : 'Free plan'}</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>
              {isPro ? 'J$2,400/month · renews 14 Jun' : 'Upgrade for unlimited everything'}
            </div>
          </div>
          <button className={isPro ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm'} onClick={togglePro}>
            {isPro ? 'Manage' : 'Upgrade'}
          </button>
        </div>
      </div>
      <div className="label" style={{ marginBottom: 12 }}>Invoices</div>
      {['May 2026', 'April 2026', 'March 2026'].map((m, i) => (
        <div key={m} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--line)' : 'none' }}>
          <span style={{ fontSize: 13 }}>{m}</span>
          <button style={{ fontSize: 12.5, color: 'var(--forest)' }} onClick={() => { toast(`Preparing ${m} invoice…`); printPage(); }}>Download</button>
        </div>
      ))}
    </div>
  );
}

function AccountSettings() {
  const { toast } = useToast();
  const { reset } = useApp();
  const [form, set, persist] = useSettingsForm('account', { email: 'tanya@glow.jm', password: 'password123' });
  const [confirm, setConfirm] = useState(false);

  function exportData() {
    try {
      const data = localStorage.getItem('lup_data') || '{}';
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'linkupbookings-data.json';
      a.click();
      URL.revokeObjectURL(url);
      toast('Data exported', { tone: 'success' });
    } catch {
      toast('Export failed', { tone: 'error' });
    }
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <h2 className="serif" style={{ fontSize: 22, margin: '0 0 20px', fontWeight: 400 }}>Account</h2>
      <Field label="Email" htmlFor="set-email"><input id="set-email" className="input" value={form.email} onChange={e => set({ email: e.target.value })} /></Field>
      <Field label="Password" htmlFor="set-pass"><input id="set-pass" className="input" type="password" value={form.password} onChange={e => set({ password: e.target.value })} /></Field>
      <button className="btn btn-primary" onClick={() => { persist(); toast('Account updated', { tone: 'success' }); }}>Save changes</button>
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
        <div className="label" style={{ marginBottom: 12, color: 'var(--terracotta)' }}>Danger zone</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)' }} onClick={exportData}>Export data</button>
          <button className="btn btn-secondary btn-sm" style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)' }} onClick={() => setConfirm(true)}>Delete account</button>
        </div>
      </div>
      {confirm && (
        <ConfirmModal
          title="Delete all data?"
          body="This resets the app to its starting state and clears every appointment, client, and setting on this device. This cannot be undone."
          confirmLabel="Delete everything"
          danger
          onConfirm={() => { reset(); toast('All data deleted', { tone: 'error' }); }}
          onClose={() => setConfirm(false)}
        />
      )}
    </div>
  );
}
