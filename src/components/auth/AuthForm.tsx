'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { auth } from '@/lib/supabase'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onModeChange: (mode: 'login' | 'signup') => void
}

export function AuthForm({ mode, onModeChange }: AuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email e password sono obbligatori')
      return false
    }

    if (mode === 'signup') {
      if (!formData.fullName) {
        setError('Nome completo è obbligatorio')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Le password non coincidono')
        return false
      }
      if (formData.password.length < 6) {
        setError('La password deve essere di almeno 6 caratteri')
        return false
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Inserisci un indirizzo email valido')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    try {
      if (mode === 'login') {
        const { data, error } = await auth.signIn(formData.email, formData.password)
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Email o password non corretti')
          } else {
            setError(error.message)
          }
          return
        }

        if (data.user) {
          router.push('/dashboard')
        }
      } else {
        const { data, error } = await auth.signUp(
          formData.email, 
          formData.password,
          {
            full_name: formData.fullName,
            email: formData.email
          }
        )

        if (error) {
          if (error.message.includes('already registered')) {
            setError('Questo email è già registrato. Prova ad accedere.')
          } else {
            setError(error.message)
          }
          return
        }

        if (data.user) {
          // Check if email confirmation is required
          if (!data.session) {
            setError('Ti abbiamo inviato una email di conferma. Controlla la tua casella di posta.')
          } else {
            router.push('/onboarding')
          }
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError('Si è verificato un errore. Riprova.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await auth.signInWithOAuth(provider)
      
      if (error) {
        setError(`Errore durante l'accesso con ${provider}: ${error.message}`)
      }
    } catch (err) {
      console.error('Social auth error:', err)
      setError(`Errore durante l'accesso con ${provider}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {mode === 'login' ? 'Accedi a StudyAI' : 'Registrati su StudyAI'}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === 'login' 
            ? 'Inserisci le tue credenziali per accedere'
            : 'Crea il tuo account per iniziare'
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Mario Rossi"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="mario@esempio.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Conferma password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'login' ? 'Accedi' : 'Registrati'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Oppure</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleSocialAuth('google')}
            disabled={isLoading}
            className="w-full"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleSocialAuth('apple')}
            disabled={isLoading}
            className="w-full"
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C8.396 0 8.312.018 8.312.018c-2.03.2-3.83 1.494-4.383 3.385C3.54 4.524 3.51 5.802 3.83 7.07c.474 1.88 1.842 3.297 3.494 4.032-.073-.17-.117-.363-.117-.57 0-1.104.896-2 2-2s2 .896 2 2c0 .207-.044.4-.117.57 1.652-.735 3.02-2.152 3.494-4.032.32-1.268.29-2.546-.041-3.667C14.007 1.494 12.207.2 10.177.018 10.177.018 10.093 0 12.017 0z"/>
            </svg>
            Apple
          </Button>
        </div>

        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
            className="text-primary hover:underline"
            disabled={isLoading}
          >
            {mode === 'login' 
              ? 'Non hai un account? Registrati'
              : 'Hai già un account? Accedi'
            }
          </button>
        </div>
      </CardContent>
    </Card>
  )
}