'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Clock, Sunrise, Sun, Moon, Eye, Headphones, FileText, Zap } from 'lucide-react';

const steps = [
  { id: 1, title: 'Personal Info', subtitle: 'Set your preferences to help customize your experience.' },
  { id: 2, title: 'Academic Profile', subtitle: '' },
  { id: 3, title: 'Learning Preferences', subtitle: 'Set your preferences to help customize your experience.' },
];

const studyTimes = [
  { id: 'morning', label: 'Morning', time: '8:00 AM', icon: Sunrise },
  { id: 'afternoon', label: 'Afternoon', time: '1:00 PM', icon: Sun },
  { id: 'evening', label: 'Evening', time: '7:00 PM', icon: Moon },
];

const learningStyles = [
  { id: 'visual', icon: Eye, label: 'Visual' },
  { id: 'auditory', icon: Headphones, label: 'Auditory' },
  { id: 'reading', icon: FileText, label: 'Reading/Writing' },
  { id: 'kinesthetic', icon: Zap, label: 'Kinesthetic' },
];

const sessionDurations = [15, 30, 45, 60];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'James',
    university: '',
    course: '',
    year: '',
    studyTime: 'morning',
    learningStyle: 'visual',
    sessionDuration: 30,
  });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Info</h2>
              <p className="text-gray-600">Let's get to know you better</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {formData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  variant="outline"
                >
                  📷
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="Enter your university"
                />
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Profile</h2>
              <p className="text-gray-600">Tell us about your studies</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="course">Course of Study</Label>
                <Input
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, Business Administration"
                />
              </div>
              
              <div>
                <Label htmlFor="year">Academic Year</Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="e.g., 1st Year, 2nd Year"
                />
              </div>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Preferences</h2>
              <p className="text-gray-600">Set your preferences to help customize your experience.</p>
            </div>

            {/* Study Schedule */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Choose your study schedule
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {studyTimes.map((time) => (
                  <button
                    key={time.id}
                    onClick={() => setFormData({ ...formData, studyTime: time.id })}
                    className={`p-4 rounded-lg border-2 transition-colors text-center ${
                      formData.studyTime === time.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <time.icon className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-medium">{time.label}</div>
                    <div className="text-sm text-gray-500">{time.time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Style */}
            <div>
              <h3 className="font-semibold mb-4">Select your learning style</h3>
              <div className="grid grid-cols-2 gap-3">
                {learningStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, learningStyle: style.id })}
                    className={`p-4 rounded-lg border-2 transition-colors text-center ${
                      formData.learningStyle === style.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <style.icon className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-medium">{style.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Duration */}
            <div>
              <h3 className="font-semibold mb-4">Study session duration</h3>
              <div className="flex space-x-2">
                {sessionDurations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setFormData({ ...formData, sessionDuration: duration })}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      formData.sessionDuration === duration
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {duration} min
                  </button>
                ))}
              </div>
            </div>

            {/* Personalization note */}
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-600 text-xl">🧠</span>
                </div>
                <div>
                  <h4 className="font-semibold text-teal-900">Why personalized?</h4>
                  <p className="text-teal-700 text-sm mt-1">
                    Personalizing helps optimize your learning experience to your needs, boosting your efficiency.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">StudyAI</span>
            </div>
            
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">Step {currentStep} of {steps.length}</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">{Math.round((currentStep / steps.length) * 100)}%</div>
            </div>
            
            <div className="flex space-x-2 justify-center mb-6">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    currentStep >= step.id ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={currentStep === steps.length ? () => window.location.href = '/dashboard' : nextStep}
                className="flex items-center bg-primary hover:bg-primary/90"
              >
                {currentStep === steps.length ? 'Continue' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}