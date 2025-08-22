'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Brain,
  BookOpen,
  Target,
  Zap,
  BarChart3,
  Users,
  Award,
  Activity,
  Filter,
  Download
} from 'lucide-react';

const timeRanges = [
  { id: 'week', label: 'Last Week' },
  { id: 'month', label: 'Last Month' },
  { id: 'semester', label: 'This Semester' },
  { id: 'year', label: 'This Year' },
];

const studyData = [
  { day: 'Mon', hours: 3.5, sessions: 4 },
  { day: 'Tue', hours: 2.0, sessions: 2 },
  { day: 'Wed', hours: 4.5, sessions: 5 },
  { day: 'Thu', hours: 1.5, sessions: 2 },
  { day: 'Fri', hours: 3.0, sessions: 3 },
  { day: 'Sat', hours: 5.5, sessions: 6 },
  { day: 'Sun', hours: 2.5, sessions: 3 },
];

const subjectPerformance = [
  { name: 'Linear Algebra', accuracy: 85, trend: 'up', sessions: 15 },
  { name: 'Neural Networks', accuracy: 72, trend: 'up', sessions: 12 },
  { name: 'Vector Calculus', accuracy: 91, trend: 'stable', sessions: 18 },
  { name: 'Probability', accuracy: 68, trend: 'down', sessions: 8 },
];

const insights = [
  {
    type: 'positive',
    title: 'Peak Performance Time',
    description: 'You study best between 9-11 AM with 95% focus rate',
    icon: Clock,
  },
  {
    type: 'warning',
    title: 'Attention Span',
    description: 'Optimal session length is 45 minutes for maximum retention',
    icon: Brain,
  },
  {
    type: 'info',
    title: 'Study Pattern',
    description: '15-minute breaks every hour increase retention by 23%',
    icon: Target,
  },
  {
    type: 'positive',
    title: 'Consistency Boost',
    description: '12-day study streak! Keep the momentum going',
    icon: Zap,
  },
];

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');

  const maxHours = Math.max(...studyData.map(d => d.hours));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Progress</h1>
          <p className="text-gray-600">Track your learning patterns and performance insights</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {timeRanges.map((range) => (
              <Button
                key={range.id}
                variant={selectedTimeRange === range.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTimeRange(range.id)}
                className="text-xs"
              >
                {range.label}
              </Button>
            ))}
          </div>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics - Glassmorphic Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { icon: Clock, value: '47.5h', label: 'Total Study Time', change: '+15%', color: 'primary' },
          { icon: Activity, value: '25', label: 'Study Sessions', change: '+8%', color: 'green-600' },
          { icon: Brain, value: '78%', label: 'Avg Quiz Score', change: '+12%', color: 'purple-600' },
          { icon: Award, value: '92%', label: 'Consistency Rate', change: '12 days', color: 'yellow-600' }
        ].map((metric, index) => (
          <motion.div
            key={index}
            className="glass-card rounded-2xl p-6 backdrop-blur-lg magnetic-hover perspective-1000"
            whileHover={{ 
              y: -5,
              rotateY: 2,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <motion.div 
                className={`w-10 h-10 bg-${metric.color === 'primary' ? 'primary/20' : metric.color.replace('600', '100')} rounded-xl flex items-center justify-center backdrop-blur-sm border ${metric.color === 'primary' ? 'border-primary/20' : `border-${metric.color}/20`}`}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <metric.icon className={`w-5 h-5 ${metric.color === 'primary' ? 'text-primary' : `text-${metric.color}`}`} />
              </motion.div>
              <Badge variant={metric.change.includes('+') ? 'secondary' : 'default'} className="text-xs">
                {metric.change}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600">{metric.label}</div>
            <div className="text-xs text-gray-500 mt-2">
              {index === 3 ? 'Study streak active' : index === 2 ? 'Last 30 days' : 'This month'}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Charts and Detailed Analytics */}
        <div className="xl:col-span-2 space-y-6">
          {/* Study Hours Chart - Modern Visualization */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Study Hours This Week</h3>
                <Badge variant="outline">{studyData.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h total</Badge>
              </div>
              
              <div className="space-y-5">
                {studyData.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{day.day}</span>
                      <span className="text-sm text-gray-500">{day.sessions} sessions</span>
                    </div>
                    
                    <div className="relative">
                      {/* Background track */}
                      <div className="bg-gray-200/50 rounded-full h-3 overflow-hidden">
                        {/* Animated progress bar */}
                        <motion.div
                          className="bg-mesh-primary h-3 rounded-full relative"
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.hours / maxHours) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        >
                          {/* Floating value indicator */}
                          <motion.span
                            className="absolute right-0 top-0 transform translate-x-full -translate-y-1/2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-lg"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.2 + 1.2 }}
                          >
                            {day.hours}h
                          </motion.span>
                        </motion.div>
                      </div>
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.02 }}
                      />
                    </div>
                    
                    {/* Day performance indicator */}
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-500">
                        {day.hours >= 4 ? '🏆 Peak' : day.hours >= 2 ? '👍 Good' : '💪 Can improve'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {((day.hours / maxHours) * 100).toFixed(0)}% of max
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Subject Performance - Modern Cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Subject Performance Breakdown</h3>
              
              <div className="space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glass-card rounded-xl p-4 backdrop-blur-sm cursor-pointer magnetic-hover"
                    whileHover={{ 
                      y: -2,
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{subject.name}</div>
                          <div className="text-sm text-gray-500">{subject.sessions} sessions</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {/* Accuracy circle with gradient */}
                        <div className="relative">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <div className="text-sm font-bold text-gray-900">{subject.accuracy}%</div>
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-mesh-primary rounded-full opacity-20"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                          />
                        </div>
                        
                        {/* Trend indicator with animation */}
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {getTrendIcon(subject.trend)}
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Progress bar for sessions */}
                    <div className="mt-3 bg-gray-200/50 rounded-full h-1.5">
                      <motion.div
                        className="bg-primary rounded-full h-1.5"
                        initial={{ width: 0 }}
                        animate={{ width: `${(subject.sessions / 18) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      Session completion
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights - Glassmorphic Cards */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-lg">
              <div className="flex items-center mb-6">
                <motion.div 
                  className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/20"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Brain className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 ml-3">AI Insights</h3>
              </div>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`glass-card rounded-xl p-4 backdrop-blur-sm cursor-pointer magnetic-hover ${getInsightColor(insight.type)} border`}
                    whileHover={{ 
                      y: -2,
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <motion.div 
                        className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-primary/20 flex-shrink-0"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <insight.icon className="w-4 h-4 text-primary" />
                      </motion.div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">{insight.title}</div>
                        <div className="text-xs mt-1 text-gray-600">{insight.description}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions - Glassmorphic Buttons */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="glass" className="w-full justify-start text-gray-900 border-gray-200/50 hover:border-primary/30">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Detailed Reports
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="glass" className="w-full justify-start text-gray-900 border-gray-200/50 hover:border-primary/30">
                    <Users className="w-4 h-4 mr-2" />
                    Compare with Peers
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="glass" className="w-full justify-start text-gray-900 border-gray-200/50 hover:border-primary/30">
                    <Target className="w-4 h-4 mr-2" />
                    Set New Goals
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="glass" className="w-full justify-start text-gray-900 border-gray-200/50 hover:border-primary/30">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Review
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Study Recommendations - Glassmorphic Gradient */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-lg bg-gradient-to-br from-primary/20 via-purple-400/20 to-blue-400/20 border border-primary/30">
              <div className="flex items-center mb-6">
                <motion.div 
                  className="w-10 h-10 bg-primary/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/40"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Target className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold text-primary ml-3">Study Recommendations</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <motion.div 
                  className="flex items-center space-x-3 p-3 glass-card rounded-xl backdrop-blur-sm cursor-pointer magnetic-hover"
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-900">Focus on Probability Theory - below target</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3 p-3 glass-card rounded-xl backdrop-blur-sm cursor-pointer magnetic-hover"
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-900">Maintain Vector Calculus performance</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3 p-3 glass-card rounded-xl backdrop-blur-sm cursor-pointer magnetic-hover"
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-900">Review Neural Networks concepts</span>
                </motion.div>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button variant="gradient" size="sm" className="w-full shadow-3d">
                  Create Study Plan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}