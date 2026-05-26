// Main app — top-level navigation between prototype screens

const SCREENS = [
  { key: 'landing',    num: '01', label: 'Marketing site' },
  { key: 'onboarding', num: '02', label: 'First-run setup' },
  { key: 'empty',      num: '03', label: 'Day-1 empty calendar' },
  { key: 'mobile',     num: '04', label: 'Owner · mobile' },
  { key: 'calendar',   num: '05', label: 'Dashboard · Calendar' },
  { key: 'inbox',      num: '06', label: 'WhatsApp inbox · AI' },
  { key: 'money',      num: '07', label: 'Takings & close-out' },
  { key: 'clients',    num: '08', label: 'Clients & notes' },
  { key: 'services',   num: '09', label: 'Services' },
  { key: 'reminders',  num: '10', label: 'Reminders' },
  { key: 'analytics',  num: '11', label: 'Analytics' },
  { key: 'settings',   num: '12', label: 'Settings' },
  { key: 'add',        num: '13', label: 'New appointment' },
  { key: 'blockoff',   num: '14', label: 'Block off' },
  { key: 'fillslot',   num: '15', label: 'Fill empty slot' },
  { key: 'markpaid',   num: '16', label: 'Mark paid' },
  { key: 'upgrade',    num: '17', label: 'Upgrade paywall' },
  { key: 'share',      num: '18', label: 'Share booking link' },
  { key: 'public',     num: '19', label: 'Client booking flow' },
];

function App() {
  const [screen, setScreen] = React.useState('landing');
  const [isPro, setIsPro] = React.useState(false);
  const [emptyData, setEmptyData] = React.useState(false);
  const [modal, setModal] = React.useState(null); // 'add' | 'upgrade' | 'share' | {appt}

  // map calendar/clients/analytics screens to dashboard backdrop; modal screens overlay on calendar
  const goto = (key) => {
    if (key === 'add')      { setScreen('calendar'); setModal('add');      return; }
    if (key === 'upgrade')  { setScreen('calendar'); setModal('upgrade');  return; }
    if (key === 'share')    { setScreen('calendar'); setModal('share');    return; }
    if (key === 'blockoff') { setScreen('calendar'); setModal('blockoff'); return; }
    if (key === 'fillslot') { setScreen('calendar'); setModal('fillslot'); return; }
    if (key === 'markpaid') { setScreen('money');    setModal('markpaid'); return; }
    if (key === 'empty')    { setEmptyData(true); setScreen('calendar'); setModal(null); return; }
    if (key === 'calendar') { setEmptyData(false); setScreen('calendar'); setModal(null); return; }
    setModal(null);
    setScreen(key);
  };

  const dashProps = {
    isPro,
    onNav: (k) => {
      if (k === 'add') setModal('add');
      else if (k === 'blockoff') setModal('blockoff');
      else if (k === 'fillslot') setModal('fillslot');
      else if (k === 'markpaid') setModal('markpaid');
      else setScreen(k);
    },
    onUpgrade: () => setModal('upgrade'),
    onShareLink: () => setModal('share'),
    onAppt: (a) => setModal({ appt: a }),
    onAddAppt: () => setModal('add'),
    onBlockOff: () => setModal('blockoff'),
    onFillSlot: () => setModal('fillslot'),
    onMarkPaid: () => setModal('markpaid'),
  };

  let body;
  if (screen === 'landing') {
    body = <Landing onCta={() => setScreen('onboarding')} onSignIn={() => setScreen('calendar')} />;
  } else if (screen === 'onboarding') {
    body = <Onboarding />;
  } else if (screen === 'mobile') {
    body = <MobileOwner />;
  } else if (screen === 'public') {
    body = <PublicBooking />;
  } else if (screen === 'calendar') {
    body = <CalendarScreen {...dashProps} emptyData={emptyData} />;
  } else if (screen === 'clients') {
    body = <ClientsScreen {...dashProps} />;
  } else if (screen === 'analytics') {
    body = <AnalyticsScreen {...dashProps} />;
  } else if (screen === 'reminders') {
    body = <RemindersScreen {...dashProps} />;
  } else if (screen === 'inbox') {
    body = <InboxScreen {...dashProps} />;
  } else if (screen === 'money') {
    body = <MoneyScreen {...dashProps} />;
  } else if (screen === 'settings') {
    body = <SettingsScreen {...dashProps} />;
  } else if (screen === 'services') {
    body = <ServicesScreen {...dashProps} />;
  }

  // active tab in nav
  const activeTab = modal === 'add' ? 'add'
                  : modal === 'upgrade' ? 'upgrade'
                  : modal === 'share' ? 'share'
                  : modal === 'blockoff' ? 'blockoff'
                  : modal === 'fillslot' ? 'fillslot'
                  : modal === 'markpaid' ? 'markpaid'
                  : (screen === 'calendar' && emptyData) ? 'empty'
                  : screen;

  return (
    <>
      {/* prototype top bar */}
      <div className="proto-bar no-select">
        <div className="proto-brand">
          <span className="dot" />
          <span>LinkUp<i>Bookings</i></span>
        </div>
        {SCREENS.map(s => (
          <button key={s.key}
            className={`proto-tab ${activeTab === s.key ? 'active' : ''}`}
            onClick={() => goto(s.key)}
          >
            <span className="num">{s.num}</span>
            <span>{s.label}</span>
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span className="mono" style={{ fontSize: 10, color: 'rgba(251,246,236,0.4)', letterSpacing: '0.08em' }}>
            ACCOUNT
          </span>
          <button
            onClick={() => setIsPro(!isPro)}
            style={{
              padding: '4px 10px', borderRadius: 999, fontSize: 11,
              background: isPro ? 'var(--terracotta)' : 'rgba(251,246,236,0.1)',
              color: isPro ? '#fbf6ec' : 'rgba(251,246,236,0.75)',
              fontFamily: 'var(--mono)', letterSpacing: '0.06em',
              border: isPro ? 'none' : '1px solid rgba(251,246,236,0.15)',
            }}
          >
            {isPro ? 'PRO' : 'FREE'} · TOGGLE
          </button>
        </div>
      </div>

      {/* main stage */}
      <div className="stage">
        <div style={{
          width: '100%', minHeight: 'calc(100vh - 44px)',
          background: screen === 'mobile' || screen === 'public' ? '#1a1612' : 'var(--paper)',
          display: 'flex', flexDirection: 'column',
          minWidth: screen === 'landing' ? 1100 : screen === 'mobile' ? 1340 : screen === 'public' ? 'auto' : screen === 'onboarding' ? 1080 : 1280,
        }}>
          {body}
        </div>
      </div>

      {/* modals */}
      {modal === 'add' && <AddApptModal onClose={() => setModal(null)} />}
      {modal === 'upgrade' && <UpgradeModal onClose={() => setModal(null)} onUpgrade={() => { setIsPro(true); setModal(null); }} />}
      {modal === 'share' && <ShareLinkModal onClose={() => setModal(null)} />}
      {modal === 'blockoff' && <BlockOffModal onClose={() => setModal(null)} />}
      {modal === 'fillslot' && <FillSlotModal onClose={() => setModal(null)} />}
      {modal === 'markpaid' && <MarkPaidModal onClose={() => setModal(null)} />}
      {modal && typeof modal === 'object' && modal.appt && (
        <ApptDetailModal appt={modal.appt} onClose={() => setModal(null)} />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
