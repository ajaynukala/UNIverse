import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
        <Route path="/" element={!isAuthenticated ? <Landing /> : requireAuth(Dashboard, 'dashboard')} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : requireAuth(Dashboard, 'dashboard')} />
        <Route path="/onboarding" element={requireAuth(Onboarding, 'onboarding')} />
        <Route path="/dashboard" element={requireAuth(Dashboard, 'dashboard')} />
        <Route path="/skills" element={requireAuth(SkillDirectory, 'skills')} />
        <Route path="/skills/:skillId" element={requireAuth(Roadmap, 'roadmap')} />
        <Route path="/profile" element={requireAuth(Profile, 'profile')} />
        <Route path="/settings" element={requireAuth(Settings, 'settings')} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const { isAuthenticated, user, theme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const requireAuth = (Component, routeName) => {
    if (!isAuthenticated) return <Navigate to="/" />;
    if (isAuthenticated && !user) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = "/";
      return null;
    }
    if (user && !user.isOnboardingCompleted && routeName !== 'onboarding') {
      return <Navigate to="/onboarding" />;
    }
    if (user && user.isOnboardingCompleted && routeName === 'onboarding') {
      return <Navigate to="/dashboard" />;
    }
    return <Component />;
  };

function GlobalLoader() {
  const globalLoading = useStore(state => state.globalLoading);
  
  return (
    <AnimatePresence>
      {globalLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-[90%] overflow-hidden"
          >
            {/* Dino Game Animation */}
            <div className="w-full h-24 mb-6 relative overflow-hidden flex items-end border-b-[3px] border-slate-300 dark:border-slate-600">
              {/* Jumping Dinosaur */}
              <motion.div
                className="absolute left-[20%] bottom-0 text-5xl z-10"
                animate={{ y: [0, -60, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              >
                🦖
              </motion.div>
              
              {/* Scrolling Cactus */}
              <motion.div
                className="absolute bottom-0 text-4xl"
                initial={{ left: "100%" }}
                animate={{ left: "-20%" }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              >
                🌵
              </motion.div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Waking up the server...</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
              Hang tight! Our servers might take up to 50 seconds to wake up from sleep. Play with the dino in your imagination!
            </p>
            
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full w-1/2 bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

  return (
    <Router>
      <GlobalLoader />
      {isAuthenticated && user?.isOnboardingCompleted && <Navbar />}
      <div className="container mx-auto px-4 md:px-8 py-8 w-full max-w-7xl">
        <AnimatedRoutes requireAuth={requireAuth} isAuthenticated={isAuthenticated} />
      </div>
    </Router>
  );
}

export default App;
