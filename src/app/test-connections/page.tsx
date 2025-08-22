'use client'

import { useState, useEffect } from 'react'
import { testAllConnections, type ConnectionTestResult } from '@/lib/test-connections'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react'

export default function TestConnectionsPage() {
  const [results, setResults] = useState<ConnectionTestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastTested, setLastTested] = useState<Date | null>(null)

  const runTests = async () => {
    setIsLoading(true)
    try {
      const testResults = await testAllConnections()
      setResults(testResults)
      setLastTested(new Date())
    } catch (error) {
      console.error('Test failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <RefreshCw className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const connectedCount = results.filter(r => r.status === 'connected').length
  const totalCount = results.length

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          StudyAI Connection Tests
        </h1>
        <p className="text-gray-600">
          Verify that Supabase and Firebase AI Logic are properly configured
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold">
            Status: {connectedCount}/{totalCount} Services Connected
          </div>
          {lastTested && (
            <div className="text-sm text-gray-500">
              Last tested: {lastTested.toLocaleTimeString()}
            </div>
          )}
        </div>
        
        <Button 
          onClick={runTests} 
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Tests
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        {results.map((result, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(result.status)}
                  <span>{result.service}</span>
                </div>
                {getStatusBadge(result.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{result.message}</p>
              
              {result.details && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Details:</h4>
                  <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {results.length === 0 && !isLoading && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-gray-500">
              Click "Run Tests" to verify your connections
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Environment Check</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Supabase</h4>
            <div className="text-blue-700">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
            </div>
            <div className="text-blue-700">
              Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Firebase</h4>
            <div className="text-blue-700">
              API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}
            </div>
            <div className="text-blue-700">
              Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}
            </div>
            <div className="text-blue-700">
              App ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}