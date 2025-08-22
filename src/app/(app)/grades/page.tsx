'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  Plus,
  Edit,
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  BarChart3,
  Filter
} from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  credits: number;
  currentGrade?: number;
  targetGrade: number;
  exams: Exam[];
  color: string;
  professor: string;
}

interface Exam {
  id: string;
  date: string;
  grade?: number;
  type: 'written' | 'oral' | 'project';
  weight: number;
}

const subjects: Subject[] = [
  {
    id: '1',
    name: 'Linear Algebra',
    credits: 9,
    currentGrade: 28,
    targetGrade: 30,
    professor: 'Dr. Smith',
    color: 'bg-blue-500',
    exams: [
      { id: '1', date: '2024-03-15', grade: 25, type: 'written', weight: 0.7 },
      { id: '2', date: '2024-03-20', grade: 30, type: 'oral', weight: 0.3 },
    ]
  },
  {
    id: '2', 
    name: 'Neural Networks',
    credits: 6,
    currentGrade: 24,
    targetGrade: 28,
    professor: 'Dr. Johnson',
    color: 'bg-orange-500',
    exams: [
      { id: '3', date: '2024-04-10', grade: 24, type: 'written', weight: 1.0 },
    ]
  },
  {
    id: '3',
    name: 'Vector Calculus', 
    credits: 12,
    currentGrade: 30,
    targetGrade: 30,
    professor: 'Dr. Brown',
    color: 'bg-green-500',
    exams: [
      { id: '4', date: '2024-02-28', grade: 30, type: 'written', weight: 0.8 },
      { id: '5', date: '2024-03-05', grade: 30, type: 'oral', weight: 0.2 },
    ]
  },
  {
    id: '4',
    name: 'Probability Theory',
    credits: 9,
    targetGrade: 27,
    professor: 'Dr. Wilson',
    color: 'bg-purple-500',
    exams: [
      { id: '6', date: '2024-05-15', type: 'written', weight: 0.6 },
      { id: '7', date: '2024-05-20', type: 'oral', weight: 0.4 },
    ]
  },
];

export default function GradesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate overall GPA
  const completedSubjects = subjects.filter(s => s.currentGrade);
  const totalCredits = completedSubjects.reduce((sum, s) => sum + s.credits, 0);
  const weightedGrades = completedSubjects.reduce((sum, s) => sum + (s.currentGrade! * s.credits), 0);
  const currentGPA = totalCredits > 0 ? (weightedGrades / totalCredits).toFixed(1) : '0.0';
  
  const targetCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const targetWeightedGrades = subjects.reduce((sum, s) => sum + (s.targetGrade * s.credits), 0);
  const targetGPA = (targetWeightedGrades / targetCredits).toFixed(1);

  const getTrendIcon = (current?: number, target?: number) => {
    if (!current || !target) return null;
    if (current >= target) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-orange-500" />;
  };

  const getGradeColor = (grade?: number, target?: number) => {
    if (!grade || !target) return 'text-gray-500';
    if (grade >= target) return 'text-green-600';
    if (grade >= target - 3) return 'text-orange-600';
    return 'text-red-600';
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Grades</h1>
          <p className="text-gray-600">Track your academic performance and goals</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Grade
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <Badge variant="outline">Current</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{currentGPA}</div>
            <div className="text-sm text-gray-600">Overall GPA</div>
            <div className="text-xs text-gray-500 mt-2">{totalCredits} credits completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-green-600" />
              <Badge variant="outline">Target</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{targetGPA}</div>
            <div className="text-sm text-gray-600">Target GPA</div>
            <div className="text-xs text-green-600 mt-2">
              +{(parseFloat(targetGPA) - parseFloat(currentGPA)).toFixed(1)} to reach
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{subjects.length}</div>
            <div className="text-sm text-gray-600">Total Subjects</div>
            <div className="text-xs text-blue-600 mt-2">
              {subjects.filter(s => !s.currentGrade).length} pending
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-yellow-600" />
              <Badge variant="outline">Achievement</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {Math.round((completedSubjects.filter(s => s.currentGrade! >= s.targetGrade).length / completedSubjects.length) * 100) || 0}%
            </div>
            <div className="text-sm text-gray-600">Goals Achieved</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Subjects List */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={subject.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedSubject(selectedSubject === subject.id ? null : subject.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-4 h-4 ${subject.color} rounded-full`}></div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                            <p className="text-sm text-gray-500">{subject.professor} • {subject.credits} CFU</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`text-lg font-bold ${getGradeColor(subject.currentGrade, subject.targetGrade)}`}>
                              {subject.currentGrade || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500">Current</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-700">{subject.targetGrade}</div>
                            <div className="text-xs text-gray-500">Target</div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(subject.currentGrade, subject.targetGrade)}
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {selectedSubject === subject.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t space-y-3"
                        >
                          <h4 className="font-medium text-gray-900">Exam History</h4>
                          {subject.exams.map((exam) => (
                            <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div>
                                  <div className="text-sm font-medium">
                                    {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)} Exam
                                  </div>
                                  <div className="text-xs text-gray-500">{exam.date}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <Badge variant="outline" className="text-xs">
                                  {(exam.weight * 100).toFixed(0)}% weight
                                </Badge>
                                <div className="font-bold">
                                  {exam.grade || 'Pending'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subjects.flatMap(s => 
                    s.exams.filter(e => !e.grade).map(e => ({ ...e, subject: s.name, color: s.color }))
                  ).slice(0, 3).map((exam, index) => (
                    <div key={exam.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 ${exam.color} rounded-full`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{exam.subject}</div>
                        <div className="text-xs text-gray-500">{exam.date} • {exam.type}</div>
                      </div>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Exams
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Best Subject</span>
                    <span className="font-medium">Vector Calculus</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Improvement Needed</span>
                    <span className="font-medium text-orange-600">Neural Networks</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Next Goal</span>
                    <span className="font-medium">+0.5 GPA</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}