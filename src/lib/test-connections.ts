/**
 * Test delle connessioni per Supabase e Firebase AI Logic
 */

import { supabase } from './supabase'
import { aiServices, aiUtils } from './firebase-ai'

export interface ConnectionTestResult {
  service: string
  status: 'connected' | 'error' | 'warning'
  message: string
  details?: any
}

/**
 * Test connessione Supabase
 */
export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  try {
    // Test base connection
    const { data, error } = await supabase.from('').select('').limit(1)
    
    if (error && error.message.includes('relation') && error.code === '42P01') {
      // Expected error since we don't have tables yet
      return {
        service: 'Supabase',
        status: 'connected',
        message: 'Connection successful - Database ready for schema creation',
        details: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      }
    }
    
    if (error) {
      return {
        service: 'Supabase',
        status: 'error',
        message: `Connection failed: ${error.message}`,
        details: error
      }
    }
    
    return {
      service: 'Supabase',
      status: 'connected',
      message: 'Connection successful',
      details: { connected: true }
    }
    
  } catch (error) {
    return {
      service: 'Supabase',
      status: 'error',
      message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: error
    }
  }
}

/**
 * Test configurazione Firebase AI Logic
 */
export async function testFirebaseAIConfiguration(): Promise<ConnectionTestResult> {
  try {
    // Check if Firebase is properly configured
    const isConfigured = aiUtils.isConfigured()
    
    if (!isConfigured) {
      return {
        service: 'Firebase AI Logic',
        status: 'error',
        message: 'Firebase configuration missing - check environment variables',
        details: {
          hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          hasAppId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        }
      }
    }
    
    return {
      service: 'Firebase AI Logic',
      status: 'connected',
      message: 'Configuration valid - AI services ready',
      details: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        configured: true
      }
    }
    
  } catch (error) {
    return {
      service: 'Firebase AI Logic',
      status: 'error',
      message: `Configuration error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: error
    }
  }
}

/**
 * Test basico AI text generation
 */
export async function testAITextGeneration(): Promise<ConnectionTestResult> {
  try {
    // Test simple text generation
    const testSummary = await aiServices.generateSummary(
      "This is a test lecture about mathematics. We covered algebra and calculus concepts."
    )
    
    if (testSummary && testSummary.summary) {
      return {
        service: 'AI Text Generation',
        status: 'connected',
        message: 'AI text generation working correctly',
        details: {
          summaryLength: testSummary.summary.length,
          keyPointsCount: testSummary.keyPoints.length
        }
      }
    }
    
    return {
      service: 'AI Text Generation',
      status: 'warning',
      message: 'AI responded but with unexpected format',
      details: testSummary
    }
    
  } catch (error) {
    return {
      service: 'AI Text Generation',
      status: 'error',
      message: `AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: error
    }
  }
}

/**
 * Test completo di tutte le connessioni
 */
export async function testAllConnections(): Promise<ConnectionTestResult[]> {
  console.log('🧪 Starting connection tests...')
  
  const results: ConnectionTestResult[] = []
  
  // Test Supabase
  console.log('Testing Supabase...')
  const supabaseResult = await testSupabaseConnection()
  results.push(supabaseResult)
  
  // Test Firebase AI Configuration
  console.log('Testing Firebase AI Logic configuration...')
  const firebaseResult = await testFirebaseAIConfiguration()
  results.push(firebaseResult)
  
  // Test AI Text Generation (only if Firebase is configured)
  if (firebaseResult.status === 'connected') {
    console.log('Testing AI text generation...')
    const aiResult = await testAITextGeneration()
    results.push(aiResult)
  }
  
  // Summary
  const connected = results.filter(r => r.status === 'connected').length
  const total = results.length
  
  console.log(`🎯 Connection tests completed: ${connected}/${total} services connected`)
  
  results.forEach(result => {
    const emoji = result.status === 'connected' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'
    console.log(`${emoji} ${result.service}: ${result.message}`)
  })
  
  return results
}

/**
 * Utility per verificare che tutti i servizi siano pronti
 */
export function areAllServicesReady(results: ConnectionTestResult[]): boolean {
  return results.every(result => result.status === 'connected' || result.status === 'warning')
}

/**
 * Ottieni la lista dei servizi che necessitano attenzione
 */
export function getServicesNeedingAttention(results: ConnectionTestResult[]): ConnectionTestResult[] {
  return results.filter(result => result.status === 'error')
}