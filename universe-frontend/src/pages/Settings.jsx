import React, { useState } from 'react';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';

export default function Settings() {
  const { theme, toggleTheme, user, logout } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/users/${user.id}/profile`, { name: formData.name });
      useStore.getState().setUser(res.data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile', err);
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Preferences</h2>
          <div className="flex justify-between items-center bg-slate-100 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 mb-8 text-slate-800 dark:text-slate-200">
            <span className="font-medium">Theme Mode</span>
            <button className="btn btn-secondary py-2" onClick={toggleTheme}>
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
          
          <h2 className="text-xl font-bold mb-6 text-red-500 dark:text-red-400">Danger Zone</h2>
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex justify-between items-center">
            <span className="text-red-600 dark:text-red-300 font-medium">Log out of your account</span>
            <button className="px-4 py-2 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors font-bold" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>

        <div className="glass-panel p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Edit Profile</h2>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-slate-600 dark:text-slate-400 text-sm font-medium">Name</label>
              <input className="input-field mb-0" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label className="block mb-2 text-slate-600 dark:text-slate-400 text-sm font-medium">Email</label>
              <input className="input-field mb-0 opacity-60 cursor-not-allowed" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} disabled />
            </div>
            <button type="submit" className="btn btn-primary mt-4">Save Changes</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
