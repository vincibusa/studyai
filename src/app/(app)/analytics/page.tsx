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

      {/* Key Metrics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-primary" />
              <Badge className="bg-green-100 text-green-800">+15%</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">47.5h</div>
            <div className="text-sm text-gray-600">Total Study Time</div>
            <div className="text-xs text-gray-500 mt-2">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-green-600" />
              <Badge className="bg-blue-100 text-blue-800">+8%</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">25</div>
            <div className="text-sm text-gray-600">Study Sessions</div>
            <div className="text-xs text-gray-500 mt-2">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Brain className="w-8 h-8 text-purple-600" />
              <Badge className="bg-purple-100 text-purple-800">+12%</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">78%</div>
            <div className="text-sm text-gray-600">Avg Quiz Score</div>
            <div className="text-xs text-gray-500 mt-2">Last 30 days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-yellow-600" />
              <Badge className="bg-orange-100 text-orange-800">12 days</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">92%</div>
            <div className="text-sm text-gray-600">Consistency Rate</div>
            <div className="text-xs text-gray-500 mt-2">Study streak active</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Charts and Detailed Analytics */}
        <div className="xl:col-span-2 space-y-6">
          {/* Study Hours Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Study Hours This Week
                  <Badge variant="outline">{studyData.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyData.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div
                          className="bg-primary rounded-full h-4 transition-all duration-500"
                          style={{ width: `${(day.hours / maxHours) * 100}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-700">{day.hours}h</span>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-500">{day.sessions} sessions</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject Performance */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <motion.div
                      key={subject.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div>
                          <div className="font-medium">{subject.name}</div>
                          <div className="text-sm text-gray-500">{subject.sessions} sessions completed</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{subject.accuracy}%</div>
                          <div className="text-xs text-gray-500">Accuracy</div>
                        </div>
                        {getTrendIcon(subject.trend)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <insight.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">{insight.title}</div>
                        <div className="text-xs mt-1 opacity-80">{insight.description}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Detailed Reports
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Compare with Peers
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Set New Goals
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Review
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Study Recommendations */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-purple-50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Study Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Focus on Probability Theory - below target</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Maintain Vector Calculus performance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Review Neural Networks concepts</span>
                  </div>
                </div>
                
                <Button size="sm" className="w-full mt-4">
                  Create Study Plan
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}