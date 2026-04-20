import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaCompass, FaCog, FaHome } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
          isActive ? 'text-primary bg-primary/10' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
        }`}
      >
        <Icon size={20} />
        <span className="hidden md:inline">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-bgCard/90 backdrop-blur-lg border-b border-slate-200 dark:border-white/10 px-4 md:px-8 py-4 flex justify-between items-center shadow-md">
      <Link to="/dashboard" className="text-2xl font-extrabold text-primary tracking-tight hover:opacity-80 transition-opacity">
        UNIverse
      </Link>
      
      <div className="flex gap-2 md:gap-6 items-center">
        <NavItem to="/dashboard" icon={FaHome} label="Dashboard" />
        <NavItem to="/skills" icon={FaCompass} label="Explore" />
        <NavItem to="/profile" icon={FaUserCircle} label="Profile" />
        <NavItem to="/settings" icon={FaCog} label="Settings" />
      </div>
    </nav>
  );
}
