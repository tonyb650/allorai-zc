import { Route, Navigate, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import '../styles.css';
import React, { Suspense } from 'react';
import LoginPage from './features/login/LoginPage';
import AuthCallback from './features/login/AuthCallback';

const ExplorePage = React.lazy(() => import('explore/Module'));
const LandingPage = React.lazy(() => import('landing/Module'));
const ChatPage = React.lazy(() => import('chat/Module'));
const ItinerariesPage = React.lazy(() => import('itineraries/Module'));

// landing = 4201
// chat = 4202
// itineraries = 4203
//// explore = 4204
// login = keep it in the platform

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/landing" replace />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="chat/*" element={<ChatPage />} />
          <Route path="itineraries" element={<ItinerariesPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="auth/callback" element={<AuthCallback />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
