import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useStore from '../store/useStore';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function Roadmap() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  
  const [skill, setSkill] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Fetch skill details, tasks, and certs
    Promise.all([
      api.get(`/skills`),
      api.get(`/skills/${skillId}/tasks`),
      api.get(`/skills/${skillId}/certifications`),
      api.get(`/progress/user/${user.id}`)
    ]).then(([skillsRes, tasksRes, certsRes, progRes]) => {
      const currentSkill = skillsRes.data.find(s => s.id === parseInt(skillId));
      setSkill(currentSkill);
      setTasks(tasksRes.data);
      setCertifications(certsRes.data);

      const skillProgress = progRes.data.find(p => p.skill.id === parseInt(skillId));
      if (skillProgress) {
        // Fetch completed tasks directly for this skill
        api.get(`/progress/user/${user.id}/skill/${skillId}/tasks`)
          .then(taskProgRes => {
            const completedIds = taskProgRes.data.filter(tp => tp.isCompleted).map(tp => tp.task.id);
            setCompletedTasks(new Set(completedIds));
          }).catch(console.error);
      } else {
        // Auto-start the skill if they view the roadmap!
        api.post(`/progress/user/${user.id}/skill/${skillId}/start`)
          .catch(console.error);
      }
    }).catch(console.error);
  }, [skillId, user.id]);

  const toggleTask = async (taskId) => {
    try {
      const isCompleted = completedTasks.has(taskId);
      if (isCompleted) return; // Prevent uncompleting

      await api.post(`/progress/user/${user.id}/task/${taskId}/complete`);
      
      const newCompleted = new Set(completedTasks);
      newCompleted.add(taskId);
      
      // Award points locally for instant feedback
      setUser({ ...user, points: user.points + 100 });
      setCompletedTasks(newCompleted);

      // Check if all tasks are completed
      if (newCompleted.size === tasks.length && tasks.length > 0) {
        setShowCelebration(true);
      }
    } catch (err) {
      console.error('Failed to update task progress', err);
    }
  };

  if (!skill) return <div className="text-center p-10 text-slate-900 dark:text-white">Loading roadmap...</div>;

  const progressPercentage = tasks.length === 0 ? 0 : Math.round((completedTasks.size / tasks.length) * 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {showCelebration && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}
      
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-slate-900 dark:text-white">{skill.name} Roadmap</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">{skill.description}</p>
      </div>

      <div className="glass-panel p-6 mb-8 flex items-center gap-4 sticky top-20 z-40 bg-white/90 dark:bg-bgCard/90 backdrop-blur-lg border border-slate-200 dark:border-white/10">
        <div className="flex-1 bg-slate-200 dark:bg-black/20 h-4 rounded-full overflow-hidden border border-slate-300 dark:border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
        <div className="font-bold text-xl min-w-[3rem] text-right text-slate-900 dark:text-white">{progressPercentage}%</div>
      </div>

      <div className="flex flex-col gap-4 relative">
        <div className="absolute left-6 top-4 bottom-4 w-1 bg-slate-200 dark:bg-white/5 rounded-full hidden md:block" />
        
        {tasks.map((task, index) => {
          const isDone = completedTasks.has(task.id);
          const isLocked = index > 0 && !completedTasks.has(tasks[index - 1].id);

          return (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-panel p-6 flex items-start gap-4 transition-all duration-300 md:ml-12 border ${
                isDone ? 'border-primary/50 bg-primary/5' : isLocked ? 'opacity-50 grayscale pointer-events-none border-slate-200 dark:border-white/10' : 'border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-white/30'
              }`}
            >
              <button 
                onClick={() => !isLocked && toggleTask(task.id)}
                disabled={isLocked}
                className={`w-8 h-8 md:absolute md:-left-12 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all bg-white dark:bg-bgCard ${
                  isDone ? 'bg-primary border-primary text-white scale-110' : 'border-slate-300 dark:border-white/20 hover:border-primary text-transparent hover:text-primary/50'
                }`}
              >
                ✓
              </button>
              
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-1 ${isDone ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>{task.title}</h3>
                <p className={`text-slate-600 dark:text-slate-400 ${isDone ? 'line-through opacity-50' : ''}`}>{task.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 dark:bg-black/80 backdrop-blur-sm"
          >
            <div className="glass-panel p-10 max-w-lg text-center border-t-8 border-t-secondary shadow-[0_0_50px_rgba(45,212,191,0.2)]">
              <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Congratulations!</h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">You have mastered the basics of <strong className="text-slate-900 dark:text-white">{skill.name}</strong>. You've earned massive XP and are ready for the next level.</p>
              
              {certifications.length > 0 && (
                <div className="bg-slate-100 dark:bg-black/20 p-6 rounded-xl border border-slate-200 dark:border-white/10 mb-8">
                  <h4 className="font-bold mb-4 text-emerald-500 dark:text-emerald-400">Recommended Next Step:</h4>
                  {certifications.map(cert => (
                    <div key={cert.id} className="text-left mb-4 last:mb-0">
                      <strong className="block text-lg text-slate-900 dark:text-white">{cert.name}</strong>
                      <span className="text-sm text-slate-500 dark:text-slate-400">by {cert.platform}</span>
                      <a href={cert.url} target="_blank" rel="noreferrer" className="block mt-2 text-primary hover:underline">View Certification →</a>
                    </div>
                  ))}
                </div>
              )}
              
              <button 
                onClick={() => {
                  setShowCelebration(false);
                  navigate('/skills');
                }} 
                className="btn btn-primary w-full"
              >
                Discover Your Next Adventure 🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
