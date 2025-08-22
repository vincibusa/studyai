'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle, TrendingUp, Brain } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  // Deterministic pseudo-random generator based on index so SSR output matches client
  const pseudoRandom = (i: number, seed = 0) => {
    // simple hash -> fractional part
    const v = Math.sin((i + seed) * 12.9898) * 43758.5453
    return Math.abs(v - Math.floor(v))
  }

  const particles = Array.from({ length: 20 }).map((_, i) => {
    const leftNum = pseudoRandom(i) * 100
    const topNum = pseudoRandom(i, 1) * 100
    const durationNum = 3 + pseudoRandom(i, 2) * 2
    const delayNum = pseudoRandom(i, 3) * 2

    return {
      left: `${leftNum.toFixed(3)}%`,
      top: `${topNum.toFixed(3)}%`,
      duration: Number(durationNum.toFixed(3)),
      delay: Number(delayNum.toFixed(3)),
    }
  })

  return (
    <section className="relative min-h-screen bg-mesh-primary overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-mesh-primary animate-gradient">
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i * 0.5) * 20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay
            }}
            style={{
              left: p.left,
              top: p.top
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-white space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              Revolutionize Your
              <span className="block bg-mesh-secondary bg-clip-text text-transparent">Learning Journey</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            >
              AI-powered personalized education that adapts to your learning style and accelerates your academic success.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="xl" variant="neobrutal" className="font-semibold">
                <Link href="/auth?tab=register">Start Learning Free</Link>
              </Button>
              
              <Button size="xl" variant="glass" className="text-white border-white/30">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-6 text-blue-100 pt-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Setup in 2 minutes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - 3D AI Illustration */}
          <motion.div
            initial={{ x: 80, opacity: 0, rotateY: 15 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main AI Brain Illustration */}
              <div className="w-96 h-96 mx-auto relative perspective-1000">
                <motion.div 
                  className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-2xl border border-white/20 transform-style-3d"
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-72 h-72 mx-auto mt-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl flex items-center justify-center transform translate-z-20">
                    <div className="text-center space-y-4">
                      <motion.div 
                        className="w-20 h-20 bg-mesh-secondary rounded-2xl mx-auto flex items-center justify-center shadow-2xl"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain className="w-10 h-10 text-white" />
                      </motion.div>
                      <div className="text-white font-semibold text-lg">AI Tutor Pro</div>
                      <div className="text-blue-200 text-sm">Always Learning</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating AI Elements */}
                <motion.div
                  animate={{ 
                    y: [-15, 15, -15],
                    rotateZ: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-8 right-4 glass-card rounded-xl p-3"
                >
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [15, -15, 15],
                    rotateZ: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-12 left-4 glass-card rounded-xl p-3"
                >
                  <CheckCircle className="w-6 h-6 text-cyan-400" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-20 left-8 w-4 h-4 bg-yellow-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats section with Glass Cards */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { value: "10x", label: "Productivity Boost", icon: "🚀" },
            { value: "95%", label: "Grade Improvement", icon: "📈" },
            { value: "1M+", label: "Students Worldwide", icon: "🌍" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 + index * 0.2 }}
              className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
              <div className="text-2xl mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}