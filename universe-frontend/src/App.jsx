import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useStore from './store/useStore';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import SkillDirectory from './pages/SkillDirectory';
import Roadmap from './pages/Roadmap';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

function AnimatedRoutes({ requireAuth, isAuthenticated }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={!isAuthenticated ? <Landing /> : requireAuth(Dashboard)} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : requireAuth(Dashboard)} />
        <Route path="/onboarding" element={requireAuth(Onboarding)} />
        <Route path="/dashboard" element={requireAuth(Dashboard)} />
        <Route path="/skills" element={requireAuth(SkillDirectory)} />
        <Route path="/skills/:skillId" element={requireAuth(Roadmap)} />
        <Route path="/profile" element={requireAuth(Profile)} />
        <Route path="/settings" element={requireAuth(Settings)} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const { isAuthenticated, user, theme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const requireAuth = (Component) => {
    if (!isAuthenticated) return <Navigate to="/" />;
    if (user && !user.isOnboardingCompleted && Component.name !== 'Onboarding') {
      return <Navigate to="/onboarding" />;
    }
    if (user && user.isOnboardingCompleted && Component.name === 'Onboarding') {
      return <Navigate to="/dashboard" />;
    }
    return <Component />;
  };

  return (
    <Router>
      {isAuthenticated && user?.isOnboardingCompleted && <Navbar />}
      <div className="container mx-auto px-4 md:px-8 py-8 w-full max-w-7xl">
        <AnimatedRoutes requireAuth={requireAuth} isAuthenticated={isAuthenticated} />
      </div>
    </Router>
  );
}

export default App;
