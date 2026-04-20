import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const user = useStore(state => state.user);
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get(`/skills/recommended?userId=${user.id}`),
      api.get(`/progress/user/${user.id}`)
    ]).then(([recRes, progRes]) => {
      const progressData = progRes.data;
      
      // Filter only those in progress for Active Quests
      setActiveQuests(progressData.filter(p => p.status === 'IN_PROGRESS'));
      
      // Identify completed skill IDs
      const completedSkillIds = new Set(
        progressData.filter(p => p.status === 'COMPLETED').map(p => p.skill.id)
      );
      
      // Filter out completed skills from recommendations
      const filteredRecommendations = recRes.data.filter(skill => !completedSkillIds.has(skill.id));
      setRecommendedSkills(filteredRecommendations.slice(0, 4));
    }).catch(console.error);
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Welcome Banner */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">Welcome back, {user.name}!</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 m-0">
            You're currently focusing on <strong className="text-slate-900 dark:text-white">{user.fieldOfStudy}</strong>. Keep up the great work!
          </p>
        </div>
        <div className="flex gap-4 md:gap-8 text-center">
          <div className="glass-panel px-6 py-4">
            <div className="text-3xl font-bold text-primary">{user.currentLevel}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Level</div>
          </div>
          <div className="glass-panel px-6 py-4">
            <div className="text-3xl font-bold text-secondary">{user.points}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Total XP</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Quests */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="glass-panel p-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
            <span className="text-amber-500">🔥</span> Active Quests
          </h2>
          {activeQuests.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No active quests. Explore skills to start your journey!</p>
          ) : (
            <div className="flex flex-col gap-4">
              {activeQuests.map(quest => (
                <motion.div key={quest.id} variants={itemVariants} className="p-4 bg-slate-100 dark:bg-black/20 rounded-xl border-l-4 border-amber-500 hover:bg-slate-200 dark:hover:bg-black/30 transition-colors">
                  <h4 className="text-lg font-bold mb-1 text-slate-900 dark:text-white">{quest.skill.name}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Current Task: Resume where you left off</p>
                  <Link to={`/skills/${quest.skill.id}`} className="btn btn-secondary py-2 text-sm w-full md:w-auto">Continue Quest</Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recommended Skills */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="glass-panel p-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
            <span className="text-primary">✨</span> Recommended for You
          </h2>
          <div className="flex flex-col gap-4">
            {recommendedSkills.map(skill => (
              <motion.div key={skill.id} variants={itemVariants} className="p-5 bg-white/50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{skill.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{skill.description}</p>
                <Link to={`/skills/${skill.id}`} className="btn btn-secondary py-2 w-full">View Roadmap</Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/skills" className="btn btn-primary w-full">Explore All Skills</Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
