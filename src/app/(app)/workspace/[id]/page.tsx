'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Download,
  Share,
  FileText,
  Brain,
  MessageCircle,
  BarChart3,
  Search,
  Copy,
  Settings,
  Send,
  Bookmark
} from 'lucide-react';

const transcriptSegments = [
  {
    id: 1,
    timestamp: "0:03",
    speaker: "A",
    text: "Probability is a branch of mathematics that deals with the study of quantifying outcomes and some uncertainty...",
    confidence: 0.95
  },
  {
    id: 2,
    timestamp: "0:23",
    speaker: "A", 
    text: "The fundamental elements of probability theory include experiments, outcomes, and sample spaces based on probabilistic concepts.",
    confidence: 0.88
  },
  {
    id: 3,
    timestamp: "0:31",
    speaker: "A",
    text: "Introduction: Frenchman's introduction to probability",
    confidence: 0.92
  }
];

export default function WorkspacePage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(125); // seconds
  const [duration] = useState(450); // seconds
  const [volume, setVolume] = useState(75);
  const [activeTab, setActiveTab] = useState('summary');
  const [chatInput, setChatInput] = useState('');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  const tabs = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'keypoints', label: 'Key Points', icon: Bookmark },
    { id: 'questions', label: 'Generate Questions', icon: Brain },
    { id: 'concepts', label: 'Explain Concept', icon: MessageCircle },
    { id: 'resources', label: 'Related Resources', icon: BarChart3 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">AI Generated Summary</h3>
              <div className="flex space-x-2">
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                This lecture introduces the fundamental concepts of probability theory, including the mathematical framework for quantifying uncertainty and analyzing random events. The discussion covers basic probability definitions, sample spaces, and the foundational principles that govern probabilistic reasoning.
              </p>
              
              <h4 className="font-semibold mt-6 mb-3">Key Topics Covered:</h4>
              <ul className="space-y-2">
                <li>• Definition of probability and its mathematical foundations</li>
                <li>• Sample spaces and experimental outcomes</li>
                <li>• Basic probability concepts and terminology</li>
                <li>• Introduction to probabilistic reasoning methods</li>
              </ul>
            </div>
          </div>
        );
      
      case 'keypoints':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Key Points</h3>
            <div className="space-y-3">
              {[
                "Probability quantifies uncertainty in mathematical terms",
                "Sample spaces contain all possible outcomes of an experiment", 
                "Events are subsets of sample spaces",
                "Probability values range from 0 to 1"
              ].map((point, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 glass-card rounded-lg backdrop-blur-sm border border-blue-200/30">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'questions':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Practice Questions</h3>
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Generate More
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="font-medium mb-2">1. What is the primary purpose of probability theory?</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="q1" className="text-primary" />
                    <span className="text-sm">To predict exact outcomes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="q1" className="text-primary" />
                    <span className="text-sm">To quantify uncertainty and analyze random events</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="q1" className="text-primary" />
                    <span className="text-sm">To eliminate randomness from experiments</span>
                  </label>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <p className="font-medium mb-2">2. Define a sample space in probability theory.</p>
                <textarea 
                  className="w-full mt-2 p-2 border rounded-lg text-sm"
                  placeholder="Enter your answer here..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
        
      case 'concepts':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Concept Explanations</h3>
            
            <div className="space-y-4">
              <div className="p-4 glass-card rounded-lg backdrop-blur-sm border border-gray-200/30">
                <h4 className="font-semibold mb-2 text-primary">Probability Theory</h4>
                <p className="text-sm text-gray-700 mb-3">
                  A mathematical framework for analyzing uncertainty and random phenomena. It provides tools to quantify the likelihood of events and make predictions under uncertainty.
                </p>
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
                  Learn more about this concept
                </Button>
              </div>
              
              <div className="p-4 glass-card rounded-lg backdrop-blur-sm border border-gray-200/30">
                <h4 className="font-semibold mb-2 text-primary">Sample Space</h4>
                <p className="text-sm text-gray-700 mb-3">
                  The set of all possible outcomes of a probability experiment. It forms the foundation for defining events and calculating probabilities.
                </p>
                <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
                  Learn more about this concept
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'resources':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Related Resources</h3>
            
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-white/10 cursor-pointer glass-card backdrop-blur-sm border-gray-200/30">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Probability Fundamentals - Chapter 1</h4>
                    <p className="text-xs text-gray-500">Textbook reading</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg hover:bg-white/10 cursor-pointer glass-card backdrop-blur-sm border-gray-200/30">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Practice Problems Set A</h4>
                    <p className="text-xs text-gray-500">15 problems • Beginner level</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg hover:bg-white/10 cursor-pointer glass-card backdrop-blur-sm border-gray-200/30">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Interactive Probability Simulator</h4>
                    <p className="text-xs text-gray-500">Web tool</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Deterministic pseudo-random generator so SSR and client match
  const pseudoRandom = (i: number, seed = 0) => {
    const v = Math.sin((i + seed) * 12.9898) * 43758.5453
    return Math.abs(v - Math.floor(v))
  }

  const waveformBars = Array.from({ length: 40 }).map((_, i) => ({
    height: `${(20 + pseudoRandom(i, 1) * 60).toFixed(4)}%`
  }))

  return (
    <div className="h-screen flex">
      {/* Left Panel - Audio Player & Info */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-80 border-r bg-white p-6 space-y-6"
      >
        {/* Header Info */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Introduction to Probability</h1>
          <p className="text-sm text-gray-600 mb-4">Probability in Statistics</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Duration: {formatTime(duration)}</span>
            <span>Apr 25, 2024</span>
          </div>
        </div>

        {/* Audio Waveform Visualization */}
        <div className="glass-card rounded-lg p-4 backdrop-blur-sm border border-gray-200/30">
          <div className="flex items-center justify-center h-24 mb-4">
            <div className="flex items-end space-x-1 h-full">
              {waveformBars.map((b, i) => (
                <div
                  key={i}
                  className={`w-1 bg-primary rounded-full ${
                    i < (progress / 100) * 40 ? 'opacity-100' : 'opacity-30'
                  }`}
                  style={{ height: b.height }}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-600 mb-4">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          
          <div className="bg-gray-200 rounded-full h-1 mb-4">
            <div 
              className="bg-primary rounded-full h-1 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Audio Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-3d"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-1" />
                )}
              </Button>
            </motion.div>
            
            <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-gray-600" />
            <div className="flex-1 bg-gray-200 rounded-full h-1">
              <div 
                className="bg-primary rounded-full h-1"
                style={{ width: `${volume}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-8">{volume}%</span>
          </div>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-900 mb-3">Quick Actions</div>
          
          <Button variant="glass" size="sm" className="w-full justify-start border-gray-200/50 text-gray-900">
            <Download className="w-4 h-4 mr-2" />
            Download Original
          </Button>
          
          <Button variant="glass" size="sm" className="w-full justify-start border-gray-200/50 text-gray-900">
            <Share className="w-4 h-4 mr-2" />
            Share Session
          </Button>
        </div>
      </motion.div>

      {/* Center Panel - Transcript */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 flex flex-col"
      >
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Transcript</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search in transcript..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="glass" size="sm" className="border-gray-200/50 text-gray-900">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {transcriptSegments.map((segment) => (
            <motion.div
              key={segment.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: segment.id * 0.1 }}
              className="flex space-x-4 p-4 hover:bg-white/10 rounded-lg cursor-pointer group glass-card backdrop-blur-sm border border-transparent hover:border-gray-200/20 transition-all">
              <div className="text-sm text-primary font-mono w-12 flex-shrink-0">
                {segment.timestamp}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <p className="text-gray-900 leading-relaxed group-hover:bg-yellow-100 transition-colors">
                    {segment.text}
                  </p>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="outline" className="text-xs">
                      Speaker {segment.speaker}
                    </Badge>
                    <div className="text-xs text-gray-400">
                      {Math.round(segment.confidence * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Panel - AI Tools */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-96 border-l bg-white flex flex-col"
      >
        {/* Tab Navigation */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderTabContent()}
        </div>

        {/* AI Chat Input */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about this lesson..."
              className="flex-1"
            />
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}