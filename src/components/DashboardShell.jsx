import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon, Logo, Avatar } from './shared.jsx';
import { useApp } from '../context/AppContext.jsx';

const NAV_ITEMS = [
  { key: 'calendar',      label: 'Calendar',   icon: Icon.cal },
  { key: 'inbox',         label: 'Messages',   icon: Icon.msg },
  { key: 'clients',       label: 'Clients',    icon: Icon.users },
  { key: 'money',         label: 'Takings',    icon: Icon.cash },
  { key: 'reminders',     label: 'Reminders',  icon: Icon.bell },
  { key: 'analytics',     label: 'Analytics',  icon: Icon.chart },
  { key: 'services',      label: 'Services',   icon: Icon.sparkle },
  { key: 'settings',      label: 'Settings',   icon: Icon.settings },
];

const BOTTOM_NAV = [
  { key: 'calendar', label: 'Calendar', icon: Icon.cal },
  { key: 'inbox',    label: 'Messages', icon: Icon.msg },
  { key: 'clients',  label: 'Clients',  icon: Icon.users },
  { key: 'money',    label: 'Takings',  icon: Icon.cash },
  { key: 'more',     label: 'More',     icon: Icon.menu },
];

const MORE_NAV_ITEMS = [
  { key: 'reminders',     label: 'Reminders',     icon: Icon.bell },
  { key: 'analytics',     label: 'Analytics',     icon: Icon.chart },
  { key: 'services',      label: 'Services',      icon: Icon.sparkle },
  { key: 'settings',      label: 'Settings',      icon: Icon.settings },
  { key: 'notifications', label: 'Notifications', icon: Icon.bell },
  { key: 'waitlist',      label: 'Waitlist',      icon: Icon.clock },
  { key: 'referral',      label: 'Refer & Earn',  icon: Icon.sparkle },
];

const SECONDARY_NAV_ITEMS = MORE_NAV_ITEMS.slice(4);
const MORE_KEYS = new Set(MORE_NAV_ITEMS.map(item => item.key));

export default function DashboardShell({ title, sub, action, children, rightPanel }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isPro, togglePro } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const active = pathname.replace(/^\/linkupbookings(?=\/|$)/, '').split('/')[1] || 'calendar';

  // Close transient menus on route change (covers back/forward navigation too)
  useEffect(() => {
    setDrawerOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const go = (key) => {
    navigate('/' + key);
    setDrawerOpen(false);
    setMoreOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="sidebar-logo" style={{
        padding: '20px 16px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid var(--line)',
      }}>
        <Logo size={14} />
      </div>

      {/* Business card */}
      <div className="sidebar-business" style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name="Glow Nail Studio" size={34} color="var(--terracotta)" />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>Glow Nail Studio</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Kingston, Jamaica</div>
          </div>
        </div>
        {/* Pro/Free toggle */}
        <button
          type="button"
          onClick={togglePro}
          style={{
            marginTop: 10, width: '100%',
            padding: '6px 10px', borderRadius: 6, fontSize: 11,
            background: isPro ? 'var(--terracotta)' : 'var(--paper-2)',
            color: isPro ? '#fbf6ec' : 'var(--muted)',
            border: '1px solid var(--line)',
            fontFamily: 'var(--mono)', letterSpacing: '0.05em',
          }}
        >
          {isPro ? '✦ PRO PLAN' : 'FREE PLAN — tap to demo Pro'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ padding: '8px 0', flex: 1 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              className="sidebar-nav-item"
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => go(item.key)}
              style={{
                width: 'calc(100% - 16px)', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', borderRadius: 8, margin: '1px 8px',
                background: isActive ? 'var(--forest-soft)' : 'transparent',
                color: isActive ? 'var(--forest)' : 'var(--ink-2)',
                fontWeight: isActive ? 500 : 400, fontSize: 13.5,
                transition: 'background 120ms, color 120ms',
              }}
            >
              {item.icon({ width: 16, height: 16 })}
              <span className="sidebar-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* More links */}
      <div style={{ padding: '8px 8px 20px', borderTop: '1px solid var(--line)' }}>
        {SECONDARY_NAV_ITEMS.map(item => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => go(item.key)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 8px', borderRadius: 8,
                color: isActive ? 'var(--forest)' : 'var(--muted)',
                background: isActive ? 'var(--forest-soft)' : 'transparent',
                fontSize: 12.5, transition: 'color 120ms, background 120ms',
              }}
            >
              {item.icon({ width: 14, height: 14 })}
              <span className="sidebar-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="dash-shell">
      {/* Desktop sidebar */}
      <aside className="dash-sidebar no-select">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} style={{ display: 'block' }}>
          <div className="drawer-panel open" onClick={e => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main */}
      <main className="dash-main">
        {/* Top bar */}
        <div className="dash-topbar">
          {/* Hamburger (mobile only) */}
          <button
            className="show-mobile"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            style={{ color: 'var(--ink)', padding: 4 }}
          >
            {Icon.menu({ width: 20, height: 20 })}
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{title}</div>
            {sub && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{sub}</div>}
          </div>

          {/* Search (tablet+) */}
          <div className="hide-mobile" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--paper-2)', border: '1px solid var(--line)',
            borderRadius: 8, padding: '7px 12px', width: 200,
          }}>
            {Icon.search({ width: 14, height: 14, style: { color: 'var(--muted)' } })}
            <input
              aria-label="Search bookings"
              placeholder="Search…"
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, width: '100%', color: 'var(--ink)' }}
            />
          </div>

          {action && <div style={{ flexShrink: 0 }}>{action}</div>}
        </div>

        {/* Content */}
        <div className="dash-content">
          {children}
        </div>
      </main>

      {/* Right panel (desktop only) */}
      {rightPanel && (
        <aside className="dash-panel hide-mobile">
          {rightPanel}
        </aside>
      )}

      {/* Bottom nav (mobile only) */}
      <nav className="bottom-nav no-select">
        <div className="bottom-nav-items">
          {BOTTOM_NAV.map(item => {
            const isActive = item.key === 'more' ? moreOpen || MORE_KEYS.has(active) : active === item.key;
            return (
              <button
                key={item.key}
                className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                type="button"
                aria-label={item.key === 'more' ? 'Open more navigation' : `Go to ${item.label}`}
                aria-expanded={item.key === 'more' ? moreOpen : undefined}
                aria-controls={item.key === 'more' ? 'mobile-more-nav' : undefined}
                aria-current={isActive && item.key !== 'more' ? 'page' : undefined}
                onClick={() => item.key === 'more' ? setMoreOpen(o => !o) : go(item.key)}
              >
                {item.icon({ width: 20, height: 20 })}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* More drawer + backdrop */}
        {moreOpen && (
          <div className="more-overlay" onClick={() => setMoreOpen(false)} />
        )}
        {moreOpen && (
          <div className="more-sheet" id="mobile-more-nav" role="dialog" aria-label="More navigation">
            {MORE_NAV_ITEMS.map(item => {
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  className={`more-sheet-item ${isActive ? 'active' : ''}`}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => go(item.key)}
                >
                  {item.icon({ width: 18, height: 18 })}
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </div>
  );
}
