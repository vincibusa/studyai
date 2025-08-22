'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock,
  Target,
  Upload,
  Mic,
  MessageCircle,
  ChevronRight,
  Flame,
  BookOpen,
  Brain,
  BarChart3
} from 'lucide-react';

const stats = [
  {
    title: 'Study Time This Week',
    value: '5h 20m',
    change: '+12%',
    trend: 'up',
    icon: Clock,
  },
  {
    title: 'Upcoming Academics',
    value: '5 assignments due',
    subtitle: 'Next: Algebra (7 days)',
    icon: Target,
  },
  {
    title: 'Quiz Performance',
    value: '65% average score',
    change: '+5%',
    trend: 'up',
    icon: Brain,
  },
  {
    title: 'Study Streak',
    value: '2 days',
    subtitle: 'Keep it going!',
    icon: Flame,
  },
];

const subjects = [
  { name: 'Linear Algebra', progress: 75, color: 'bg-blue-500', nextExam: 'April 28, 2024' },
  { name: 'Neural Networks', progress: 60, color: 'bg-orange-500', nextExam: 'May 2, 2024' },
  { name: 'Vector Calculus', progress: 85, color: 'bg-blue-600', nextExam: 'May 5, 2024' },
  { name: 'Probability', progress: 45, color: 'bg-orange-400', nextExam: 'May 8, 2024' },
];

const recentActivities = [
  {
    type: 'lesson',
    title: 'Linear Algebra Lecture transcribed',
    subject: 'Linear Algebra',
    time: '2 hours ago',
    icon: BookOpen,
  },
  {
    type: 'quiz',
    title: 'Neural Networks Quiz completed',
    subject: 'Neural Networks',
    time: '5 hours ago',
    score: '8/10',
    icon: Brain,
  },
  {
    type: 'summary',
    title: 'Vector Calculus Summary generated',
    subject: 'Vector Calculus',
    time: '1 day ago',
    icon: BarChart3,
  },
];

const calendarDays = Array.from({ length: 35 }, (_, i) => {
  const day = i - 6; // Start from previous month
  const isCurrentMonth = day > 0 && day <= 30;
  const isToday = day === 19;
  const hasEvent = [5, 12, 19, 26].includes(day);
  
  return {
    day: isCurrentMonth ? day : '',
    isCurrentMonth,
    isToday,
    hasEvent,
  };
});

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" rounded-2xl p-6 backdrop-blur-lg"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, James</h1>
            <p className="text-gray-600">Thursday, April 25</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Quick Stats</div>
            <div className="text-2xl font-bold text-primary">April 2024</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-4 backdrop-blur-lg magnetic-hover perspective-1000"
              whileHover={{ 
                y: -5,
                rotateY: 2,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <motion.div 
                  className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/20"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <stat.icon className="w-5 h-5 text-primary" />
                </motion.div>
                {stat.change && (
                  <Badge variant={stat.trend === 'up' ? 'secondary' : 'destructive'} className="text-xs">
                    {stat.change}
                  </Badge>
                )}
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
              {stat.subtitle && (
                <div className="text-xs text-gray-500 mt-1">{stat.subtitle}</div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Continue Learning</h3>
                <ChevronRight className="w-5 h-5 text-gray-400 hover:text-primary transition-colors cursor-pointer" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subjects.slice(0, 3).map((subject, index) => (
                  <motion.div
                    key={index}
                    className="glass-card rounded-xl p-4 cursor-pointer magnetic-hover backdrop-blur-sm border border-gray-200/30"
                    whileHover={{ 
                      y: -3,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-4 h-4 rounded-full ${subject.color}`} />
                      <span className="text-sm text-gray-600">{subject.progress}%</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{subject.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{subject.nextExam}</p>
                    <div className="bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${subject.color}`}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Upload */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-lg">
              <div className="border-2 border-dashed border-primary/50 rounded-xl p-8 text-center hover:border-primary transition-all duration-300 cursor-pointer group">
                <div className="space-y-4">
                  <div className="flex justify-center space-x-4">
                    <motion.div 
                      className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/20"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <Upload className="w-5 h-5 text-primary" />
                    </motion.div>
                    <motion.div 
                      className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/30"
                      whileHover={{ rotate: -5, scale: 1.1 }}
                    >
                      <Mic className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1 group-hover:scale-105 transition-transform">Upload or Record</h3>
                    <p className="text-sm text-gray-600">
                      Drag & drop audio files or click to record
                    </p>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
                      Upload File
                    </Button>
                    <Button size="sm" variant="gradient" className="shadow-3d">
                      Record Audio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3 p-4 rounded-xl glass-card cursor-pointer magnetic-hover backdrop-blur-sm border border-gray-200/30"
                    whileHover={{ 
                      y: -2,
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.subject}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.score && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.score}
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">April 2024</h3>
                <ChevronRight className="w-4 h-4 text-gray-400 hover:text-primary transition-colors cursor-pointer" />
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={`${day}-${i}`} className="py-2 text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => (
                  <motion.button
                    key={index}
                    className={`
                      py-2 text-sm rounded-md transition-all duration-200
                      ${day.isCurrentMonth ? 'text-gray-900 hover:bg-gray-100' : 'text-gray-400'}
                      ${day.isToday ? 'bg-primary text-white hover:bg-primary/80 shadow-3d' : ''}
                      ${day.hasEvent && !day.isToday ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : ''}
                    `}
                    whileHover={{ scale: 1.05 }}
                  >
                    {day.day}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Tools Quick Access */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-lg bg-gradient-to-br from-primary/20 to-blue-400/20 border border-primary/30">
              <h3 className="text-lg font-bold text-gray-900 mb-4">AI Tools</h3>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-3d">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with AI Tutor
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}