import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ItineraryPage from './pages/ItineraryPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

// #3358ae - dark (primary)
// #99abd7 - light (secondary)
// #97dbd9 - teal (accent)

function App() {
  return (
    <Routes>
      <Route index element={<ChatPage />} />
      <Route path="activities" element={<ActivitiesPage />} />
      <Route path="itinerary" element={<ItineraryPage />} />
      <Route path="auth/callback" element={<AuthCallbackPage />} />
    </Routes>
  );
}

export default App;
