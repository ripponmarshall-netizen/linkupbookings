import { useState } from 'react';
import DashboardShell from '../components/DashboardShell.jsx';
import { Icon, Toggle } from '../components/shared.jsx';
import { useApp } from '../context/AppContext.jsx';

const SECTIONS = [
  { key: 'profile',     label: 'Profile',             icon: Icon.users },
  { key: 'hours',       label: 'Hours & buffer',       icon: Icon.clock },
  { key: 'payments',    label: 'Payments & deposits',  icon: Icon.cash },
  { key: 'booking',     label: 'Booking page',         icon: Icon.globe },
  { key: 'notifs',      label: 'Notifications',        icon: Icon.bell },
  { key: 'vacation',    label: 'Vacation mode',        icon: Icon.lock },
  { key: 'billing',     label: 'Plan & billing',       icon: Icon.sparkle },
  { key: 'account',     label: 'Account',              icon: Icon.settings },
];

export default function SettingsScreen() {
  const { isPro, togglePro } = useApp();
  const [section, setSection] = useState('profile');
  const [vacationOn, setVacationOn] = useState(false);

  return (
    <DashboardShell title="Settings" sub="Business, hours, integrations">
      <div className="split-pane" style={{ display: 'flex', height: '100%', minHeight: 0 }}>
        {/* Section nav */}
        <div className="split-pane-rail" style={{ width: 220, borderRight: '1px solid var(--line)', background: 'var(--card-warm)', flexShrink: 0, overflowY: 'auto' }}>
          <div style={{ padding: '16px 0' }}>
            {SECTIONS.map(s => (
              <button key={s.key} onClick={() => setSection(s.key)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 20px', fontSize: 13.5, textAlign: 'left',
                background: section === s.key ? 'var(--paper-2)' : 'transparent',
                color: section === s.key ? 'var(--ink)' : 'var(--ink-2)',
                fontWeight: section === s.key ? 500 : 400,
                borderLeft: section === s.key ? '3px solid var(--forest)' : '3px solid transparent',
              }}>
                <span style={{ color: section === s.key ? 'var(--forest)' : 'var(--muted)' }}>
                  {s.icon({ width: 16, height: 16 })}
                </span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="split-pane-body" style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          {section === 'profile' && <ProfileSection />}
          {section === 'hours'   && <HoursSection />}
          {section === 'payments' && <PaymentsSection isPro={isPro} />}
          {section === 'booking' && <BookingSection isPro={isPro} />}
          {section === 'notifs'  && <NotifsSection />}
          {section === 'vacation' && <VacationSection on={vacationOn} setOn={setVacationOn} />}
          {section === 'billing' && <BillingSection isPro={isPro} onToggle={togglePro} />}
          {section === 'account' && <AccountSection />}
        </div>
      </div>
    </DashboardShell>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{sub}</div>}
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="label" style={{ marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

function ToggleRow({ label, sub, on, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  );
}

function ProfileSection() {
  return (
    <div>
      <SectionHeader title="Business profile" sub="This appears on yuh booking page and receipts." />
      <FormRow label="Business name">
        <input className="input" defaultValue="Glow Nail Studio" />
      </FormRow>
      <FormRow label="Bio / tagline">
        <textarea className="textarea" rows={3} defaultValue="Honest nails, nuh wait, nuh stress. Kingston's best kept secret." style={{ resize: 'none' }} />
      </FormRow>
      <FormRow label="WhatsApp Business number">
        <input className="input" defaultValue="+1 876 555 0100" />
      </FormRow>
      <FormRow label="Location">
        <input className="input" defaultValue="Half-Way-Tree, Kingston" />
      </FormRow>
      <button className="btn btn-primary">Save changes</button>
    </div>
  );
}

function HoursSection() {
  const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const defaults = [
    { open: true, start: '9:00', end: '18:00' },
    { open: true, start: '9:00', end: '18:00' },
    { open: true, start: '9:00', end: '18:00' },
    { open: true, start: '9:00', end: '18:00' },
    { open: true, start: '9:00', end: '17:00' },
    { open: true, start: '9:00', end: '16:00' },
    { open: false, start: '10:00', end: '15:00' },
  ];
  const [hours, setHours] = useState(defaults);

  return (
    <div>
      <SectionHeader title="Working hours" sub="Set yuh open hours. Clients can only book within these times." />
      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
        {DAYS.map((d, i) => (
          <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderBottom: i < 6 ? '1px solid var(--line)' : 'none' }}>
            <Toggle on={hours[i].open} onChange={v => setHours(h => h.map((x, j) => j === i ? { ...x, open: v } : x))} size="sm" />
            <div style={{ width: 90, fontSize: 13.5, fontWeight: 500, color: hours[i].open ? 'var(--ink)' : 'var(--muted)' }}>{d}</div>
            {hours[i].open ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <select className="select" style={{ width: 90 }} defaultValue={hours[i].start}>
                  {['8:00','9:00','10:00','11:00'].map(t => <option key={t}>{t}</option>)}
                </select>
                <span style={{ color: 'var(--muted)' }}>–</span>
                <select className="select" style={{ width: 90 }} defaultValue={hours[i].end}>
                  {['16:00','17:00','18:00','19:00','20:00'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            ) : (
              <span style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic' }}>Closed</span>
            )}
          </div>
        ))}
      </div>
      <FormRow label="Buffer between appointments">
        <select className="select" style={{ maxWidth: 200 }}>
          <option>None</option>
          <option>10 minutes</option>
          <option>15 minutes</option>
          <option>30 minutes</option>
        </select>
      </FormRow>
      <button className="btn btn-primary">Save hours</button>
    </div>
  );
}

function PaymentsSection({ isPro }) {
  const [prefs, setPrefs] = useState({ deposit: isPro, cards: isPro, bank: true });
  const toggle = (key, value) => setPrefs(p => ({ ...p, [key]: value }));
  return (
    <div>
      <SectionHeader title="Payments & deposits" sub="How yuh collect money." />
      {!isPro && (
        <div style={{ background: 'var(--terracotta-soft)', borderRadius: 10, padding: 16, marginBottom: 20, borderLeft: '3px solid var(--terracotta)' }}>
          <div style={{ fontSize: 13, color: '#8d3f1e', lineHeight: 1.5 }}>
            🔒 Deposits and card payments require Pro. Free plan: cash and bank transfer only.
          </div>
        </div>
      )}
      <ToggleRow label="Require deposit on booking" sub="25% upfront via WhatsApp link" on={prefs.deposit} onChange={v => toggle('deposit', isPro ? v : false)} />
      <ToggleRow label="Accept card payments" sub="Lynk, NCB, Visa" on={prefs.cards} onChange={v => toggle('cards', isPro ? v : false)} />
      <ToggleRow label="Accept bank transfer" sub="Show account details on receipt" on={prefs.bank} onChange={v => toggle('bank', v)} />
      <div style={{ marginTop: 20 }}>
        <FormRow label="Cash instructions">
          <textarea className="textarea" rows={2} defaultValue="Pay on arrival. Exact change appreciated." style={{ resize: 'none' }} />
        </FormRow>
      </div>
      <button className="btn btn-primary" style={{ marginTop: 8 }}>Save</button>
    </div>
  );
}

function BookingSection({ isPro }) {
  const [prefs, setPrefs] = useState({ showPrice: true, showReviews: isPro });
  const toggle = (key, value) => setPrefs(p => ({ ...p, [key]: value }));
  return (
    <div>
      <SectionHeader title="Booking page" sub="How yuh page looks to clients." />
      {!isPro && (
        <div style={{ background: 'var(--terracotta-soft)', borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 13, color: '#8d3f1e', borderLeft: '3px solid var(--terracotta)' }}>
          🔒 Booking page customisation is a Pro feature.
        </div>
      )}
      <FormRow label="Page slug">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>linkupbookings.com/</span>
          <input className="input" defaultValue="glow" style={{ maxWidth: 160 }} />
        </div>
      </FormRow>
      <FormRow label="Hero message">
        <textarea className="textarea" rows={2} defaultValue="Honest nails, nuh wait, nuh stress." style={{ resize: 'none' }} />
      </FormRow>
      <ToggleRow label="Show price on booking page" sub="Visible to clients before they book" on={prefs.showPrice} onChange={v => toggle('showPrice', v)} />
      <ToggleRow label="Show reviews on booking page" sub="Auto-pulled from Google & WhatsApp" on={prefs.showReviews} onChange={v => toggle('showReviews', isPro ? v : false)} />
      <button className="btn btn-primary" style={{ marginTop: 16 }}>Save</button>
    </div>
  );
}

function NotifsSection() {
  const [prefs, setPrefs] = useState({ booking: true, cancelled: true, deposit: true, message: true, summary: true, report: false });
  const toggle = (key, value) => setPrefs(p => ({ ...p, [key]: value }));
  return (
    <div>
      <SectionHeader title="Notifications" sub="When yuh get pinged." />
      <ToggleRow label="New booking" sub="Push + WhatsApp" on={prefs.booking} onChange={v => toggle('booking', v)} />
      <ToggleRow label="Booking cancelled" sub="Push only" on={prefs.cancelled} onChange={v => toggle('cancelled', v)} />
      <ToggleRow label="Deposit received" sub="Push + WhatsApp" on={prefs.deposit} onChange={v => toggle('deposit', v)} />
      <ToggleRow label="Client message" sub="Push only" on={prefs.message} onChange={v => toggle('message', v)} />
      <ToggleRow label="Day summary at 8pm" sub="WhatsApp summary of the day" on={prefs.summary} onChange={v => toggle('summary', v)} />
      <ToggleRow label="Weekly report on Sunday" sub="Revenue, busiest day, top client" on={prefs.report} onChange={v => toggle('report', v)} />
    </div>
  );
}

function VacationSection({ on, setOn }) {
  return (
    <div>
      <SectionHeader title="Vacation mode" sub="Block new bookings while yuh away. Existing appointments are unaffected." />
      <div style={{
        background: on ? 'rgba(196,102,61,0.06)' : 'var(--card)',
        border: `1px solid ${on ? 'var(--terracotta)' : 'var(--line)'}`,
        borderRadius: 14, padding: 20, marginBottom: 20, transition: 'all 200ms',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: on ? 16 : 0 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{on ? '✈️ On vacation' : 'Turn on vacation mode'}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Booking page shows "unavailable" during this period</div>
          </div>
          <Toggle on={on} onChange={setOn} />
        </div>
        {on && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4 }}>
            <FormRow label="From"><input type="date" className="input" defaultValue="2026-06-15" /></FormRow>
            <FormRow label="To"><input type="date" className="input" defaultValue="2026-06-22" /></FormRow>
          </div>
        )}
      </div>
      {on && (
        <div style={{ background: 'var(--terracotta-soft)', borderRadius: 10, padding: 14, fontSize: 12.5, color: '#8d3f1e', lineHeight: 1.55 }}>
          Clients who try to book between Jun 15–22 will see your vacation message instead of the slot picker.
        </div>
      )}
    </div>
  );
}

function BillingSection({ isPro, onToggle }) {
  return (
    <div>
      <SectionHeader title="Plan & billing" />
      <div style={{
        background: isPro ? 'var(--ink)' : 'var(--card)',
        color: isPro ? '#fbf6ec' : 'var(--ink)',
        border: `1px solid ${isPro ? 'var(--ink)' : 'var(--line)'}`,
        borderRadius: 14, padding: 24, marginBottom: 20,
      }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', marginBottom: 8, color: isPro ? 'var(--ochre)' : 'var(--muted)' }}>
          {isPro ? '✦ PRO PLAN' : 'FREE PLAN'}
        </div>
        <div className="serif" style={{ fontSize: 36, marginBottom: 8 }}>
          {isPro ? 'J$400 / month' : 'J$0 / month'}
        </div>
        <div style={{ fontSize: 13.5, color: isPro ? '#c8bda4' : 'var(--muted)', lineHeight: 1.5 }}>
          {isPro ? 'All features, no limits. Cancel anytime.' : 'Calendar management only. No online booking.'}
        </div>
        <button onClick={onToggle} style={{
          marginTop: 16, padding: '10px 20px', borderRadius: 8, fontSize: 13.5, fontWeight: 600,
          background: isPro ? 'rgba(255,255,255,0.1)' : 'var(--terracotta)',
          color: isPro ? '#fbf6ec' : '#fff',
          border: isPro ? '1px solid rgba(255,255,255,0.15)' : 'none',
        }}>
          {isPro ? 'Cancel plan' : 'Upgrade to Pro — J$400/mo'}
        </button>
      </div>

      <div className="label" style={{ marginBottom: 10 }}>Invoices</div>
      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
        {['May 2026','Apr 2026','Mar 2026'].map((m, i) => (
          <div key={m} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < 2 ? '1px solid var(--line)' : 'none' }}>
            <span style={{ fontSize: 13.5 }}>{m}</span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>J$400</span>
              <span className="chip chip-forest" style={{ fontSize: 10 }}>Paid</span>
              <button style={{ color: 'var(--forest)', fontSize: 12 }}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountSection() {
  return (
    <div>
      <SectionHeader title="Account" sub="Yuh personal login and security." />
      <FormRow label="Name"><input className="input" defaultValue="Tanya Williams" /></FormRow>
      <FormRow label="Email"><input className="input" defaultValue="tanya@glownailstudio.com" type="email" /></FormRow>
      <FormRow label="Password"><input className="input" defaultValue="••••••••••" type="password" /></FormRow>
      <button className="btn btn-primary" style={{ marginBottom: 32 }}>Save changes</button>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--terracotta)', marginBottom: 12 }}>Danger zone</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
            Delete all data
          </button>
          <button className="btn btn-secondary btn-sm" style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
            Close account
          </button>
        </div>
      </div>
    </div>
  );
}
