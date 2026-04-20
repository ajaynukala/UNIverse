import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

export default function SkillDirectory() {
  const [skills, setSkills] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const user = useStore(state => state.user);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const skillsRes = await api.get('/skills');
      setSkills(skillsRes.data);
      
      if (user) {
        const progRes = await api.get(`/progress/user/${user.id}`);
        setUserProgress(progRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetSkill = async (skillId, e) => {
    e.preventDefault(); // Prevent link navigation
    if (window.confirm('Are you sure you want to reset this skill? All progress will be lost.')) {
      try {
        await api.delete(`/progress/user/${user.id}/skill/${skillId}/reset`);
        fetchData();
      } catch (err) {
        console.error('Failed to reset skill', err);
        alert('Failed to reset skill');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div initial="hidden" animate="show" exit={{ opacity: 0 }}>
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Explore Skills</h1>
      <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl">Browse our comprehensive directory of skills and start a new learning journey today.</p>
      
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => {
          const progress = userProgress.find(p => p.skill.id === skill.id);
          const isCompleted = progress?.status === 'COMPLETED';

          return (
            <motion.div key={skill.id} variants={itemVariants} whileHover={isCompleted ? {} : { y: -5, scale: 1.02 }} className={`glass-panel p-6 flex flex-col h-full border-t-4 transition-all ${isCompleted ? 'border-t-emerald-500 opacity-80' : 'border-t-secondary/50 hover:border-t-primary cursor-pointer'}`}>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{skill.name}</h2>
                {isCompleted && <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-md">COMPLETED</span>}
              </div>
              <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-white/10 text-xs font-semibold rounded-full mb-4 w-max text-secondary">{skill.category}</span>
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{skill.description}</p>
              
              <div className="flex gap-2 mt-auto">
                {isCompleted ? (
                  <>
                    <button disabled className="btn bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400 cursor-not-allowed flex-1">Journey Finished</button>
                    <button onClick={(e) => resetSkill(skill.id, e)} className="btn bg-red-100 dark:bg-red-500/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-500/40">Reset</button>
                  </>
                ) : (
                  <Link to={`/skills/${skill.id}`} className="btn btn-primary w-full text-center">{progress ? 'Continue Journey' : 'Start Journey'}</Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
