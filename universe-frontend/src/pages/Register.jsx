import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const setAuth = useStore(state => state.setAuth);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      setAuth(res.data.user, res.data.token);
      navigate('/onboarding');
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed.';
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[80vh] flex flex-col items-center justify-center w-full"
    >
      <div className="glass-panel p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Create Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="input-field mb-0" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input className="input-field mb-0" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input className="input-field mb-0" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary mt-4">Sign Up</button>
        </form>
        <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
          Already have an account? <Link to="/" className="text-primary font-bold hover:underline ml-2">Sign in</Link>
        </div>
      </div>
    </motion.div>
  );
}
