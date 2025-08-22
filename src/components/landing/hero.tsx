'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle, TrendingUp, Brain } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-primary to-blue-600 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center" />
      
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white space-y-8"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Elevate Your Academic Success with AI
            </motion.h1>
            
            <motion.p 
              className="text-xl text-blue-100 leading-relaxed max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Personalized learning powered by starting stage luminous intelligences.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold">
                <Link href="/auth?tab=register">Get Started Free</Link>
              </Button>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-4 text-blue-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Play className="w-5 h-5" />
              <span>Watch demo (90 seconds)</span>
            </motion.div>
          </motion.div>

          {/* Right column - Illustration */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Student illustration mockup */}
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <div className="w-64 h-64 bg-white/30 rounded-2xl flex items-center justify-center">
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-green-400 rounded-full mx-auto flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-white font-medium">AI Assistant</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-10 right-0 bg-teal-400 rounded-lg p-3"
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                  className="absolute bottom-20 left-0 bg-orange-400 rounded-lg p-3"
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-white"
        >
          <div className="text-center">
            <div className="text-3xl font-bold">10x</div>
            <div className="text-blue-200">Increase in productivity</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">95%</div>
            <div className="text-blue-200">Received posts improvement</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">1M+</div>
            <div className="text-blue-200">Students worldwide</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}