import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import useStore from '../store/useStore';
import { FaGraduationCap, FaMapSigns, FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Landing() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const setAuth = useStore(state => state.setAuth);
  const navigate = useNavigate();

  useEffect(() => {
    // Silent ping to preemptively wake up the Render server while the user types their credentials
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    fetch(`${apiUrl}/auth/login`, { method: 'OPTIONS' }).catch(() => {});
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      setAuth(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Invalid credentials';
      alert(`Login failed: ${errorMessage}`);
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left side: Hero Content */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="z-10 relative">
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-inherit to-secondary bg-clip-text text-transparent">
            Master Your Future with <span className="text-primary">UNIverse</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-lg">
            A personalized, gamified learning platform tailored to your education and interests. Build real skills, complete quests, and level up your career.
          </motion.p>
          
          <div className="flex flex-col gap-6">
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="p-4 bg-white dark:bg-white/5 rounded-2xl text-primary border border-slate-200 dark:border-white/10 shadow-lg"><FaMapSigns size={28} /></div>
              <div>
                <h3 className="text-lg font-bold m-0 text-slate-900 dark:text-white">Intelligent Roadmaps</h3>
                <p className="text-slate-500 dark:text-slate-400 m-0">Paths tailored perfectly to you.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="p-4 bg-white dark:bg-white/5 rounded-2xl text-secondary border border-slate-200 dark:border-white/10 shadow-lg"><FaTrophy size={28} /></div>
              <div>
                <h3 className="text-lg font-bold m-0 text-slate-900 dark:text-white">Gamified Learning</h3>
                <p className="text-slate-500 dark:text-slate-400 m-0">Earn points and level up as you learn.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="p-4 bg-white dark:bg-white/5 rounded-2xl text-emerald-500 dark:text-emerald-400 border border-slate-200 dark:border-white/10 shadow-lg"><FaGraduationCap size={28} /></div>
              <div>
                <h3 className="text-lg font-bold m-0 text-slate-900 dark:text-white">Industry Certificates</h3>
                <p className="text-slate-500 dark:text-slate-400 m-0">Get ready for recognized certifications.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-panel p-10 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input className="input-field mb-0" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input className="input-field mb-0" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit" className="btn btn-primary mt-4">Sign In</button>
          </form>
          <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline ml-2">Sign up</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
