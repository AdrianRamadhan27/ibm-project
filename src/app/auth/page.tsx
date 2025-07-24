'use client'

import { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAuth = async () => {
    setLoading(true)
    setError(null)

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/journal')
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/journal`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="border px-3 py-2 mb-2 rounded w-full max-w-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border px-3 py-2 mb-2 rounded w-full max-w-sm"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleAuth}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full max-w-sm mb-2"
      >
        {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Login'}
      </button>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full max-w-sm mb-2"
      >
        {loading ? 'Redirecting...' : 'Continue with Google'}
      </button>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-blue-600 underline text-sm"
      >
        {isSignUp ? 'Already have an account? Login' : 'No account? Sign Up'}
      </button>
    </div>
  )
}
