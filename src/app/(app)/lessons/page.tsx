'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Plus,
  Play,
  FileText,
  Brain,
  Clock,
  Calendar,
  MoreHorizontal,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const lessons = [
  {
    id: 1,
    title: 'Linear Algebra Lecture 1',
    subject: 'Linear Algebra',
    professor: 'Dr. Smith',
    date: 'April 24, 2024',
    duration: '1h 45m',
    status: 'completed',
    hasTranscript: true,
    hasSummary: true,
    hasQuiz: false,
    hasMindMap: false,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Neural Networks Introduction',
    subject: 'Neural Networks',
    professor: 'Dr. Johnson',
    date: 'April 23, 2024',
    duration: '2h 10m',
    status: 'processing',
    hasTranscript: true,
    hasSummary: false,
    hasQuiz: false,
    hasMindMap: false,
    color: 'bg-orange-500',
  },
  {
    id: 3,
    title: 'Vector Calculus Chapter 3',
    subject: 'Vector Calculus',
    professor: 'Dr. Brown',
    date: 'April 22, 2024',
    duration: '1h 30m',
    status: 'completed',
    hasTranscript: true,
    hasSummary: true,
    hasQuiz: true,
    hasMindMap: true,
    color: 'bg-blue-600',
  },
  {
    id: 4,
    title: 'Probability Theory Basics',
    subject: 'Probability',
    professor: 'Dr. Wilson',
    date: 'April 21, 2024',
    duration: '1h 20m',
    status: 'completed',
    hasTranscript: true,
    hasSummary: true,
    hasQuiz: false,
    hasMindMap: true,
    color: 'bg-orange-400',
  },
];

const filters = [
  { id: 'all', label: 'All Subjects', count: 12 },
  { id: 'linear-algebra', label: 'Linear Algebra', count: 4 },
  { id: 'neural-networks', label: 'Neural Networks', count: 3 },
  { id: 'vector-calculus', label: 'Vector Calculus', count: 3 },
  { id: 'probability', label: 'Probability', count: 2 },
];

export default function LessonsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Lessons</h1>
          <p className="text-gray-600">Manage and review your recorded lessons</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Lesson
          </Button>
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Sidebar Filters */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="xl:w-64 flex-shrink-0"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Quick filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{filter.label}</span>
                  <Badge variant={selectedFilter === filter.id ? 'secondary' : 'outline'}>
                    {filter.count}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Recently viewed */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Recently viewed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Linear Algebra</div>
                  <div className="text-xs text-gray-500">2 lessons</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Neural Networks</div>
                  <div className="text-xs text-gray-500">1 lesson</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Storage */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>2.1 GB</span>
                  <span className="text-gray-500">of 5.0 GB</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '42%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4 mb-6"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Sort by Recent</span>
            </Button>
          </motion.div>

          {/* Lessons Grid/List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-6' : 'space-y-4'}
          >
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${lesson.color} rounded-full`}></div>
                        <div>
                          <CardTitle className="text-lg">{lesson.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{lesson.professor}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{lesson.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon status={lesson.status} />
                        <span className="text-sm text-gray-600 capitalize">{lesson.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2">
                        {lesson.hasTranscript && (
                          <Badge variant="outline" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            Transcript
                          </Badge>
                        )}
                        {lesson.hasSummary && (
                          <Badge variant="outline" className="text-xs">
                            📋 Summary
                          </Badge>
                        )}
                        {lesson.hasQuiz && (
                          <Badge variant="outline" className="text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            Quiz
                          </Badge>
                        )}
                        {lesson.hasMindMap && (
                          <Badge variant="outline" className="text-xs">
                            🧠 Mind Map
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        Open Workspace
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}