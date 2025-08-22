'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, GraduationCap, BookOpen, Target, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'

const steps = [
  {
    id: 'welcome',
    title: 'Benvenuto su StudyAI! 🎉',
    subtitle: 'Iniziamo personalizzando la tua esperienza di studio'
  },
  {
    id: 'basic-info',
    title: 'Informazioni di base',
    subtitle: 'Raccontaci qualcosa di te'
  },
  {
    id: 'education',
    title: 'Il tuo percorso educativo',
    subtitle: 'Aiutaci a personalizzare i contenuti'
  },
  {
    id: 'preferences',
    title: 'Preferenze di studio',
    subtitle: 'Come preferisci imparare?'
  },
  {
    id: 'complete',
    title: 'Tutto pronto! 🚀',
    subtitle: 'Il tuo profilo è stato configurato'
  }
]

const educationLevels = [
  { id: 'high_school', label: 'Scuola Superiore', icon: '🎓' },
  { id: 'undergraduate', label: 'Laurea Triennale', icon: '📚' },
  { id: 'graduate', label: 'Laurea Magistrale', icon: '🎯' },
  { id: 'professional', label: 'Formazione Professionale', icon: '💼' }
]

const learningStyles = [
  { id: 'visual', label: 'Visuale', description: 'Imparo meglio con immagini e grafici', icon: '👁️' },
  { id: 'auditory', label: 'Uditivo', description: 'Preferisco ascoltare e discutere', icon: '👂' },
  { id: 'kinesthetic', label: 'Cinestetico', description: 'Imparo facendo e praticando', icon: '✋' }
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    institution: '',
    fieldOfStudy: '',
    educationLevel: '',
    dailyStudyGoal: 60,
    selectedLearningStyles: [] as string[],
    preferredDifficulty: 'medium'
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleLearningStyle = (styleId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedLearningStyles: prev.selectedLearningStyles.includes(styleId)
        ? prev.selectedLearningStyles.filter(id => id !== styleId)
        : [...prev.selectedLearningStyles, styleId]
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: // basic-info
        return formData.fullName.trim() !== ''
      case 2: // education
        return formData.educationLevel !== '' && formData.fieldOfStudy.trim() !== ''
      case 3: // preferences
        return formData.selectedLearningStyles.length > 0
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const learningStyleObj = learningStyles.reduce((acc, style) => {
        acc[style.id] = formData.selectedLearningStyles.includes(style.id)
        return acc
      }, {} as Record<string, boolean>)

      const { error } = await updateProfile({
        full_name: formData.fullName,
        institution: formData.institution,
        field_of_study: formData.fieldOfStudy,
        education_level: formData.educationLevel,
        daily_study_goal: formData.dailyStudyGoal,
        learning_style: learningStyleObj,
        preferred_difficulty: formData.preferredDifficulty,
      })

      if (error) {
        console.error('Error updating profile:', error)
        return
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Error completing onboarding:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // welcome
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                StudyAI ti aiuterà a trasformare le tue lezioni in risorse di studio personalizzate
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <p className="text-sm font-medium">Trascrivi Audio</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <p className="text-sm font-medium">Genera Quiz</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <p className="text-sm font-medium">AI Tutor</p>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 1: // basic-info
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nome completo *</Label>
                <Input
                  id="fullName"
                  placeholder="Il tuo nome completo"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="institution">Istituzione</Label>
                <Input
                  id="institution"
                  placeholder="Università, scuola o azienda"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        )

      case 2: // education
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Label>Livello di istruzione *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {educationLevels.map((level) => (
                  <Card
                    key={level.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.educationLevel === level.id
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleInputChange('educationLevel', level.id)}
                  >
                    <CardContent className="p-4 flex items-center space-x-3">
                      <span className="text-2xl">{level.icon}</span>
                      <span className="font-medium">{level.label}</span>
                      {formData.educationLevel === level.id && (
                        <Check className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="fieldOfStudy">Campo di studio *</Label>
              <Input
                id="fieldOfStudy"
                placeholder="Es. Ingegneria, Medicina, Economia..."
                value={formData.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                className="mt-1"
              />
            </div>
          </motion.div>
        )

      case 3: // preferences
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Label>Come preferisci imparare? *</Label>
              <p className="text-sm text-gray-600 mb-4">Seleziona uno o più stili di apprendimento</p>
              <div className="space-y-3">
                {learningStyles.map((style) => (
                  <Card
                    key={style.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.selectedLearningStyles.includes(style.id)
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleLearningStyle(style.id)}
                  >
                    <CardContent className="p-4 flex items-start space-x-3">
                      <span className="text-2xl">{style.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{style.label}</h3>
                          {formData.selectedLearningStyles.includes(style.id) && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="dailyGoal">Obiettivo di studio giornaliero (minuti)</Label>
              <div className="mt-2 flex items-center space-x-4">
                <Input
                  id="dailyGoal"
                  type="number"
                  min="15"
                  max="480"
                  value={formData.dailyStudyGoal}
                  onChange={(e) => handleInputChange('dailyStudyGoal', parseInt(e.target.value) || 60)}
                  className="w-24"
                />
                <span className="text-gray-600">minuti al giorno</span>
              </div>
            </div>
          </motion.div>
        )

      case 4: // complete
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Perfetto!</h3>
              <p className="text-lg text-gray-600">
                Il tuo profilo è stato configurato. Ora puoi iniziare a caricare le tue lezioni e sfruttare il potere dell'AI per migliorare il tuo apprendimento.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-800">
                  <strong>Prossimi passi:</strong> Carica la tua prima lezione audio nella dashboard per vedere StudyAI in azione!
                </p>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Passo {currentStep + 1} di {steps.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            {/* Step Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h1>
              <p className="text-gray-600">
                {steps[currentStep].subtitle}
              </p>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Indietro</span>
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Completando...</span>
                    </>
                  ) : (
                    <>
                      <span>Inizia con StudyAI</span>
                      <Target className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2"
                >
                  <span>Continua</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}