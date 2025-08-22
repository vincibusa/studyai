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
      className="w-64 bg-primary min-h-screen text-white flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold">StudyAI</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-blue-600 text-white">J</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">James</div>
            <div className="text-blue-200 text-sm">Student</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-blue-100 hover:bg-blue-600/50 hover:text-white"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Account */}
      <div className="p-4 border-t border-blue-600">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-600/50"
        >
          <User className="w-5 h-5 mr-3" />
          Account
        </Button>
      </div>
    </motion.div>
  );
}