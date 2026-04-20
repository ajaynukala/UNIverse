import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useStore from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const PREDEFINED_INTERESTS = [
  "Web Development", "Artificial Intelligence", "Data Science", 
  "Mobile Apps", "Cloud Infrastructure", "UI/UX Design", 
  "Cybersecurity", "Game Development"
];

export default function Onboarding() {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [educationLevel, setEducationLevel] = useState('');
  const [educationStatus, setEducationStatus] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [otherInterest, setOtherInterest] = useState('');
  const [showOther, setShowOther] = useState(false);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalInterests = [...selectedInterests];
    if (showOther && otherInterest.trim() !== '') {
      finalInterests.push(otherInterest.trim());
    }

    try {
      const res = await api.post(`/users/${user.id}/onboarding`, {
        educationLevel,
        educationStatus,
        fieldOfStudy,
        interests: finalInterests.join(',')
      });
      setUser(res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error("Onboarding error:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save profile.';
      alert(`Onboarding failed: ${errorMessage}`);
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex flex-col items-center justify-center w-full"
    >
      <div className="glass-panel p-8 md:p-12 w-full max-w-2xl overflow-hidden relative">
        <h2 className="text-3xl font-bold mb-4 text-center text-slate-900 dark:text-white">Let's personalize your path</h2>
        
        <div className="flex gap-2 mb-8">
          <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-primary' : 'bg-slate-200 dark:bg-white/10'}`}></div>
          <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-primary' : 'bg-slate-200 dark:bg-white/10'}`}></div>
        </div>

        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); setStep(2); }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Your Education</h3>
                
                <label className="block mb-2 text-slate-600 dark:text-slate-400">Highest Level of Education</label>
                <select className="input-field" value={educationLevel} onChange={e => setEducationLevel(e.target.value)} required>
                  <option value="" disabled>Select Education Level</option>
                  <option value="High School">High School</option>
                  <option value="Bachelors">Bachelor's Degree</option>
                  <option value="Masters">Master's Degree</option>
                  <option value="PhD">PhD / Doctorate</option>
                </select>

                <label className="block mt-4 mb-3 text-slate-600 dark:text-slate-400">Status</label>
                <div className="flex gap-6 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input type="radio" className="accent-primary w-4 h-4" name="status" value="Pursuing" checked={educationStatus === 'Pursuing'} onChange={e => setEducationStatus(e.target.value)} required /> Pursuing
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input type="radio" className="accent-primary w-4 h-4" name="status" value="Completed" checked={educationStatus === 'Completed'} onChange={e => setEducationStatus(e.target.value)} required /> Completed
                  </label>
                </div>

                <label className="block mb-2 text-slate-600 dark:text-slate-400">Specification of Study</label>
                <input className="input-field" placeholder="e.g. Computer Science, Mechanical Engineering" value={fieldOfStudy} onChange={e => setFieldOfStudy(e.target.value)} required />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Your Interests</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Select the areas you are most interested in learning:</p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {PREDEFINED_INTERESTS.map(interest => (
                    <button type="button" key={interest} onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                        selectedInterests.includes(interest) 
                          ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30' 
                          : 'border-slate-300 dark:border-white/20 bg-transparent text-slate-600 dark:text-slate-300 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}>
                      {interest}
                    </button>
                  ))}
                  
                  <button type="button" onClick={() => setShowOther(!showOther)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                      showOther 
                        ? 'border-secondary bg-secondary text-white shadow-lg shadow-secondary/30' 
                        : 'border-slate-300 dark:border-white/20 bg-transparent text-slate-600 dark:text-slate-300 hover:border-secondary/50 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}>
                    Other (Request Add)
                  </button>
                </div>

                <AnimatePresence>
                  {showOther && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-6 overflow-hidden">
                      <input className="input-field" placeholder="Type your specific interest here..." value={otherInterest} onChange={e => setOtherInterest(e.target.value)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
            ) : <div></div>}
            
            <button type="submit" className="btn btn-primary">
              {step === 2 ? 'Generate My Path' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
