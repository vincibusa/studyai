'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send,
  Mic,
  Paperclip,
  Sparkles,
  BookOpen,
  Brain,
  MessageCircle,
  Settings,
  MoreVertical,
  User
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const mockMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi tell how can I assist you today?",
    timestamp: new Date('2024-04-25T10:30:00'),
  },
  {
    id: '2',
    role: 'user',
    content: "Can you explain the Pythagorean theorem?",
    timestamp: new Date('2024-04-25T10:31:00'),
  },
  {
    id: '3',
    role: 'assistant',
    content: "Certainly! The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of squares of the lengths of the other two sides.\n\nThe formula is: a² + b² = c²\n\nWhere:\n- a and b are the lengths of the two shorter sides (legs)\n- c is the length of the hypotenuse\n\nThis theorem is fundamental in geometry and has practical applications in construction, navigation, and engineering.",
    timestamp: new Date('2024-04-25T10:32:00'),
    suggestions: [
      "Can you give me an example?",
      "How is this used in real life?",
      "What about other types of triangles?",
    ],
  },
];

const quickSuggestions = [
  "Explain this concept in simple terms",
  "Create practice problems",
  "Help me understand this better",
  "Show me real-world applications",
];

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand your question. Let me help you with that...",
        timestamp: new Date(),
        suggestions: [
          "Can you elaborate on that?",
          "Show me more examples",
          "What's the next step?",
        ],
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 h-[calc(100vh-120px)]">
      <div className="flex flex-col xl:flex-row h-full space-y-6 xl:space-y-0 xl:space-x-6">
        {/* Chat Sidebar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="xl:w-80 space-y-4"
        >
          {/* AI Tutor Header */}
          <Card>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-primary">AI Tutor</CardTitle>
              <p className="text-sm text-gray-600">Your personal study assistant</p>
            </CardHeader>
          </Card>

          {/* Context Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-1">Current Session</div>
                <div>Mathematics • Geometry</div>
              </div>
              
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-1">Recent Topics</div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs mr-2">Pythagorean Theorem</Badge>
                  <Badge variant="outline" className="text-xs mr-2">Right Triangles</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <div className="text-sm text-gray-600 mb-2">
                  Ask your AI tutor anything:
                </div>
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left text-sm text-primary hover:text-primary/80 hover:bg-primary/5 p-2 rounded-lg w-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2">Learning history</div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Mathematics basics</div>
                  <div className="text-xs text-gray-500">Algebra concepts</div>
                  <div className="text-xs text-gray-500">Word problems</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Chat Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 flex flex-col"
        >
          <Card className="flex-1 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      <Brain className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">AI Tutor</div>
                    <div className="text-sm text-green-600">Online</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="p-6 space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-3 max-w-[70%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className={message.role === 'user' ? 'bg-gray-600' : 'bg-primary'}>
                          {message.role === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Brain className="w-4 h-4 text-white" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2">
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        <div className={`text-xs text-gray-500 ${
                          message.role === 'user' ? 'text-right' : 'text-left'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && message.role === 'assistant' && (
                          <div className="space-y-2 mt-3">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block text-left text-sm text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex space-x-3 max-w-[70%]">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary">
                          <Brain className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>

            {/* Input Area */}
            <div className="p-6 border-t">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask your AI tutor anything..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}