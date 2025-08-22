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
          <div className="flex items-center glass rounded-lg p-1 backdrop-blur-sm border border-gray-200/50">
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
          
          <Button variant="gradient" className="shadow-3d">
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
          <div className="glass-card rounded-2xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/20"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Filter className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 ml-3">Quick filters</h3>
            </div>
            <div className="space-y-2">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 magnetic-hover ${
                    selectedFilter === filter.id
                      ? 'bg-primary text-white shadow-3d'
                      : 'glass-card backdrop-blur-sm hover:bg-primary/10'
                  }`}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <span className="font-medium">{filter.label}</span>
                  <Badge variant={selectedFilter === filter.id ? 'secondary' : 'outline'}>
                    {filter.count}
                  </Badge>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recently viewed */}
          <div className="glass-card rounded-2xl p-6 backdrop-blur-lg mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recently viewed</h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3 p-3 glass-card rounded-xl backdrop-blur-sm cursor-pointer magnetic-hover"
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Linear Algebra</div>
                  <div className="text-xs text-gray-600">2 lessons</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 p-3 glass-card rounded-xl backdrop-blur-sm cursor-pointer magnetic-hover"
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Neural Networks</div>
                  <div className="text-xs text-gray-600">1 lesson</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Storage */}
          <div className="glass-card rounded-2xl p-6 backdrop-blur-lg mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Storage</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-900 font-medium">2.1 GB</span>
                <span className="text-gray-600">of 5.0 GB</span>
              </div>
              <div className="bg-gray-200/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-mesh-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '42%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="text-xs text-gray-600 text-center">
                42% storage used
              </div>
            </div>
          </div>
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
                className="pl-10 glass backdrop-blur-sm border-gray-200/50"
              />
            </div>
            
            <Button variant="glass" className="flex items-center space-x-2 border-gray-200/50 text-gray-900">
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
                <div className="glass-card rounded-2xl p-6 backdrop-blur-lg cursor-pointer magnetic-hover perspective-1000"
                  whileHover={{ 
                    y: -5,
                    rotateY: 2,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className={`w-4 h-4 ${lesson.color} rounded-full flex-shrink-0`}
                        whileHover={{ scale: 1.2 }}
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{lesson.professor}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-900">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
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

                    <div className="flex flex-wrap gap-2">
                      {lesson.hasTranscript && (
                        <Badge variant="secondary" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          Transcript
                        </Badge>
                      )}
                      {lesson.hasSummary && (
                        <Badge variant="secondary" className="text-xs">
                          📋 Summary
                        </Badge>
                      )}
                      {lesson.hasQuiz && (
                        <Badge variant="secondary" className="text-xs">
                          <Brain className="w-3 h-3 mr-1" />
                          Quiz
                        </Badge>
                      )}
                      {lesson.hasMindMap && (
                        <Badge variant="secondary" className="text-xs">
                          🧠 Mind Map
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="glass" className="flex-1 border-gray-200/50 text-gray-900">
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                      <Button size="sm" variant="gradient" className="flex-1 shadow-3d">
                        Open Workspace
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}