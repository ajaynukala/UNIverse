import React from 'react';
import useStore from '../store/useStore';
import { FaTrophy, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Profile() {
  const user = useStore(state => state.user);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="glass-panel p-10 text-center mb-10 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white mb-6 shadow-[0_0_30px_rgba(124,58,237,0.4)]"
        >
          {user.name.charAt(0).toUpperCase()}
        </motion.div>
        
        <h1 className="text-4xl font-extrabold mb-2 text-slate-900 dark:text-white">{user.name}</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">{user.email}</p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-lg">
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200">
            <FaGraduationCap className="text-primary text-2xl" />
            <span>{user.educationLevel} ({user.educationStatus})</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200">
            <FaMapMarkerAlt className="text-secondary text-2xl" />
            <span>Field: {user.fieldOfStudy}</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
        <FaTrophy className="text-amber-500" /> Trophy Room
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 text-center border-t-4 border-t-primary">
          <div className="text-5xl font-extrabold text-primary mb-4">{user.currentLevel}</div>
          <h3 className="text-lg text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Current Level</h3>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 text-center border-t-4 border-t-secondary">
          <div className="text-5xl font-extrabold text-secondary mb-4">{user.points}</div>
          <h3 className="text-lg text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Total XP Earned</h3>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 text-center border-t-4 border-t-emerald-500 dark:border-t-emerald-400">
          <div className="text-5xl font-extrabold text-emerald-500 dark:text-emerald-400 mb-4">{user.interests ? user.interests.split(',').length : 0}</div>
          <h3 className="text-lg text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Interests Tracked</h3>
        </motion.div>
      </div>
    </motion.div>
  );
}
