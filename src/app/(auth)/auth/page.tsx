'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AuthForm } from '@/components/auth/AuthForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-mesh-primary flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 text-white">
        <Link href="/" className="absolute top-8 left-8 flex items-center text-white hover:text-blue-100">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to home
        </Link>
        
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-primary font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold">StudyAI</span>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Smart Learning</h3>
                <p className="text-blue-100">AI-powered study sessions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Instant Results</h3>
                <p className="text-blue-100">Get summaries and quizzes instantly</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Track Progress</h3>
                <p className="text-blue-100">Monitor your academic growth</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white/5 backdrop-blur-2xl">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <AuthForm mode={mode} onModeChange={setMode} />
        </motion.div>
      </div>
    </div>
  );
}