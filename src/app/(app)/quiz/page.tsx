'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Play,
  Clock,
  TrendingUp,
  Brain,
  ArrowRight,
  CheckCircle,
  Circle,
  Award
} from 'lucide-react';

const quizzes = [
  {
    id: 1,
    title: 'General Knowledge',
    subject: 'Matory',
    questions: 10,
    duration: 3,
    difficulty: 'Medium',
    lastScore: 8,
    bestScore: 9,
    attempts: 3,
    color: 'bg-blue-500',
    topics: ['Basic concepts', 'Definitions']
  },
  {
    id: 2,
    title: 'Algebra Review',
    subject: 'Mathematics',
    questions: 5,
    duration: 7,
    difficulty: 'Hard',
    lastScore: 4,
    bestScore: 4,
    attempts: 1,
    color: 'bg-orange-500',
    topics: ['Linear equations', 'Matrix operations']
  },
  {
    id: 3,
    title: 'Science Concepts',
    subject: 'Science',
    questions: 6,
    duration: 7,
    difficulty: 'Easy',
    lastScore: null,
    bestScore: null,
    attempts: 0,
    color: 'bg-green-500',
    topics: ['Physics basics', 'Chemistry fundamentals']
  },
];

const subjects = [
  { name: 'Subject', selected: false },
  { name: 'Difficulty', selected: false },
  { name: 'Date Type', selected: false },
  { name: 'Sort', selected: false },
];

export default function QuizPage() {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz & Test</h1>
          <p className="text-gray-600">Practice and test your knowledge</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="outline" className="text-primary border-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center space-x-4"
      >
        {subjects.map((subject, index) => (
          <Button
            key={index}
            variant="outline"
            className={`${
              subject.selected ? 'bg-primary text-white' : 'text-gray-600'
            }`}
          >
            {subject.name}
          </Button>
        ))}
        
        <Button variant="outline" className="text-gray-600">
          <Filter className="w-4 h-4 mr-2" />
          Fine
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Practice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-primary text-white mb-6">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Quick Practice</h2>
                  <p className="text-blue-100 mb-6">Start a quick practice session</p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <Button variant="glass" size="sm" className="bg-white/20 text-white border-white/30">
                      5 questions
                    </Button>
                    <Button variant="glass" size="sm" className="text-white hover:bg-white/20 border-white/20">
                      10 questions
                    </Button>
                    <Button variant="glass" size="sm" className="text-white hover:bg-white/20 border-white/20">
                      20 questions
                    </Button>
                  </div>
                  
                  <Button className="bg-white text-primary hover:bg-gray-100">
                    <Play className="w-4 h-4 mr-2" />
                    Start Practice
                  </Button>
                </div>
                
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Grid */}
          <div className="grid grid-cols-1 gap-6">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <Circle className="w-3 h-3 text-blue-500 fill-current" />
                          <Circle className="w-3 h-3 text-blue-300 fill-current" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{quiz.subject}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>{quiz.questions} questions</span>
                        <span>{quiz.duration} min</span>
                      </div>
                      <Badge 
                        variant={quiz.difficulty === 'Easy' ? 'secondary' : quiz.difficulty === 'Medium' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Best Score</span>
                        <span className="font-medium">
                          {quiz.bestScore ? `${quiz.bestScore}/${quiz.questions}` : 'Not attempted'}
                        </span>
                      </div>
                      {quiz.attempts > 0 && (
                        <div className="text-xs text-gray-500">
                          {quiz.attempts} attempt{quiz.attempts > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      {quiz.topics.map((topic, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs mr-2">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {quiz.attempts === 0 ? 'Start Quiz' : 'Retake Quiz'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Practice Card */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-card bg-gradient-to-r from-teal-400/20 to-teal-600/20 border-teal-200/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-teal-900 mb-4">Quick Practice</h3>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-3d">
                  Confident Practice
                </Button>
                <p className="text-sm text-teal-700">
                  Practice topics you're confident about
                </p>
              </div>
            </div>
          </motion.div>

          {/* Performance Card */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-xl border border-gray-200/30">
              <h3 className="flex items-center text-lg font-bold text-gray-900 mb-4">
                <Brain className="w-5 h-5 mr-2 text-primary" />
                Performance
              </h3>
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">2</div>
                  <div className="text-sm text-gray-600">average score</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Math</span>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200/50 rounded-full h-2 mr-2">
                        <div className="bg-orange-400 rounded-full h-2" style={{ width: '80%' }} />
                      </div>
                      <span className="text-sm font-medium">80%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Science</span>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200/50 rounded-full h-2 mr-2">
                        <div className="bg-green-400 rounded-full h-2" style={{ width: '95%' }} />
                      </div>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Study Recommendations */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6 backdrop-blur-xl border border-gray-200/30">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Study Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-2 glass-card rounded-lg backdrop-blur-sm border border-yellow-200/50">
                  <Award className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-yellow-900">65%</div>
                    <div className="text-xs text-yellow-700">average score</div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600">
                  Focus on mathematics topics to improve your overall performance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}