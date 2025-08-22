'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { auth, supabase, type Profile } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>
  signInWithOAuth: (provider: 'google' | 'apple') => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch user profile from database
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
      }

      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          const profile = await fetchProfile(session.user.id)
          setProfile(profile)
        }

        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)

        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)

          if (session?.user) {
            const profile = await fetchProfile(session.user.id)
            setProfile(profile)
          } else {
            setProfile(null)
          }

          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Auth actions
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await auth.signIn(email, password)
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { error } = await auth.signUp(email, password, userData)
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signInWithOAuth = async (provider: 'google' | 'apple') => {
    try {
      const { error } = await auth.signInWithOAuth(provider)
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await auth.signOut()
      if (!error) {
        router.push('/')
      }
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { error: new Error('No user logged in') }
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (!error && profile) {
        setProfile({ ...profile, ...updates })
      }

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}