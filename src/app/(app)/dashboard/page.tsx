'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  TrendingUp,
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
        className="bg-white rounded-xl p-6 shadow-sm border"
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
            >
              <Card className="border-0 shadow-sm bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                    {stat.change && (
                      <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                  {stat.subtitle && (
                    <div className="text-xs text-gray-500 mt-1">{stat.subtitle}</div>
                  )}
                </CardContent>
              </Card>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Continue Learning
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subjects.slice(0, 3).map((subject, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                        <span className="text-xs text-gray-500">{subject.progress}%</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.nextExam}</p>
                      <div className="mt-3 bg-gray-200 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${subject.color}`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Upload */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <Mic className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Upload or Record</h3>
                      <p className="text-sm text-gray-500">
                        Drag & drop audio files or click to record
                      </p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <Button variant="outline" size="sm">
                        Upload File
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Record Audio
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-500">{activity.subject}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                      {activity.score && (
                        <Badge variant="outline" className="text-xs">
                          {activity.score}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  April 2024
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="py-2 text-gray-500 font-medium">
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      className={`
                        py-2 text-sm rounded-md transition-colors
                        ${day.isCurrentMonth ? 'text-gray-900 hover:bg-gray-100' : 'text-gray-300'}
                        ${day.isToday ? 'bg-primary text-white hover:bg-primary/90' : ''}
                        ${day.hasEvent && !day.isToday ? 'bg-orange-100 text-orange-700' : ''}
                      `}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Tools Quick Access */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-teal-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-900">AI Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with AI Tutor
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}