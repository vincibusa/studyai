export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university: string;
  course: string;
  year: number;
  targetGPA: number;
}

export interface Subject {
  id: string;
  name: string;
  professor: string;
  credits: number;
  currentGrade?: number;
  targetGrade: number;
  color: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: Subject;
  duration: number;
  date: Date;
  audioUrl?: string;
  transcript?: string;
  summary?: string;
  hasQuiz: boolean;
  hasMindMap: boolean;
  status: 'processing' | 'completed' | 'error';
}

export interface Quiz {
  id: string;
  title: string;
  subject: Subject;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  lastScore?: number;
  bestScore?: number;
  attempts: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'open-ended';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface MindMap {
  id: string;
  title: string;
  subject: Subject;
  nodes: MindMapNode[];
  connections: MindMapConnection[];
  lastModified: Date;
}

export interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  type: 'concept' | 'category' | 'detail';
}

export interface MindMapConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: {
    lessonId?: string;
    subjectId?: string;
  };
}

export interface StudySession {
  id: string;
  date: Date;
  duration: number;
  activities: ('lesson' | 'quiz' | 'chat' | 'review')[];
  subjects: Subject[];
}