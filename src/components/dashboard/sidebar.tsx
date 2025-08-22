'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  PenTool, 
  Brain, 
  MessageCircle, 
  TrendingUp, 
  BarChart3,
  Settings,
  User,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Lessons', href: '/lessons', icon: BookOpen },
  { name: 'Workspaces', href: '/workspace', icon: PenTool },
  { name: 'Quiz & First', href: '/quiz', icon: Brain },
  { name: 'What More', href: '/mindmaps', icon: MessageCircle },
  { name: 'AI Tutor', href: '/tutor', icon: MessageCircle },
  { name: 'My Guides', href: '/grades', icon: TrendingUp },
  { name: 'Progress', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-72 glass min-h-screen text-white flex flex-col border-r border-white/10"
    >
      {/* Header with Glassmorphism */}
      <div className="p-6 border-b border-white/10">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
            <span className="text-white font-bold text-lg">🧠</span>
          </div>
          <span className="text-xl font-bold bg-mesh-primary bg-clip-text text-transparent">StudyAI</span>
        </motion.div>
      </div>

      {/* User Profile with Glass Card */}
      <div className="p-6 border-b border-white/10">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-12 h-12 border-2 border-white/20">
              <AvatarFallback className="bg-primary/80 text-white text-sm">J</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-white">James</div>
              <div className="text-blue-100 text-sm">Student</div>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="text-xs text-blue-200 mt-1">Learning Progress: 65%</div>
        </div>
      </div>

      {/* Navigation with Hover Animations */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigation.map((item, index) => (
            <motion.li 
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-blue-100 hover:bg-white/10 hover:text-white hover:shadow-lg hover:translate-x-1 group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium group-hover:font-semibold">{item.name}</span>
                <motion.div 
                  className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 ml-auto"
                  whileHover={{ scale: 1.5 }}
                />
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Account Section */}
      <div className="p-4 border-t border-white/10">
        <Button 
          variant="glass" 
          className="w-full justify-start text-white hover:bg-white/20"
        >
          <User className="w-5 h-5 mr-3" />
          Account Settings
        </Button>
      </div>
    </motion.div>
  );
}