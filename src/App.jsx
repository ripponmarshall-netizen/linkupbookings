import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';

import LandingScreen from './screens/Landing.jsx';
import OnboardingScreen from './screens/Onboarding.jsx';
import CalendarScreen from './screens/Calendar.jsx';
import InboxScreen from './screens/Inbox.jsx';
import MoneyScreen from './screens/Money.jsx';
import ClientsScreen from './screens/Clients.jsx';
import ServicesScreen from './screens/Services.jsx';
import RemindersScreen from './screens/Reminders.jsx';
import AnalyticsScreen from './screens/Analytics.jsx';
import SettingsScreen from './screens/Settings.jsx';
import NotificationsScreen from './screens/Notifications.jsx';
import WaitlistScreen from './screens/Waitlist.jsx';
import DayEndScreen from './screens/DayEnd.jsx';
import ReferralScreen from './screens/Referral.jsx';

const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <AppProvider>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/dashboard" element={<Navigate to="/calendar" replace />} />
          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/inbox" element={<InboxScreen />} />
          <Route path="/money" element={<MoneyScreen />} />
          <Route path="/clients" element={<ClientsScreen />} />
          <Route path="/clients/:id" element={<ClientsScreen />} />
          <Route path="/services" element={<ServicesScreen />} />
          <Route path="/reminders" element={<RemindersScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/waitlist" element={<WaitlistScreen />} />
          <Route path="/day-end" element={<DayEndScreen />} />
          <Route path="/referral" element={<ReferralScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
