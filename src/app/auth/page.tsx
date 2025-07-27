'use client'

import { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from "next/image";

export default function AuthPage() {
  const router = useRouter()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAuth = async () => {
    setLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
            emailRedirectTo: `${window.location.origin}/`, // optional: Supabase will redirect here after user verifies email
          },
        })

        if (error) {
          setError(error.message)
        } else {
          router.push(`/auth/confirm?email=${encodeURIComponent(email)}`)
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
          setError(error.message)
        } else {
          router.push('/journal')
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Terjadi kesalahan.')
      }
    } finally {
      setLoading(false)
    }
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
    <main className="main overflow-x-hidden">
      <div className="mainDiv min-h-screen font-sans">
        <section className="relative overflow-hidden">
          <div className="container py-15 items-center">
            <div className="flex flex-col items-center text-center w-[300px] md:w-[500px] p-8 m-auto bg-white rounded-lg shadow-2xl gap-3">
              <h1 className="text-2xl font-bold mb-4">
                {isSignUp ? 'Daftar Akun' : 'Masuk Akun'}
              </h1>

              {isSignUp && (
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="border px-3 py-2 mb-2 rounded w-full max-w-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-aos="fade-up"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 mb-2 rounded w-full max-w-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-aos="fade-up"
              />

              <input
                type="password"
                placeholder="Password"
                className="border px-3 py-2 mb-2 rounded w-full max-w-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-aos="fade-up"
              />

              {error && <p className="text-red-500">{error}</p>}

              <button
                onClick={handleAuth}
                disabled={loading}
                className="bg-[#ec616a] hover:bg-[#d5919bfb] text-white px-4 py-2 rounded w-full max-w-md mb-2 shadow-md hover:cursor-pointer font-bold"
                data-aos="fade-up"
              >
                {loading ? 'Loading...' : isSignUp ? 'Daftar' : 'Masuk'}
              </button>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="bg-white hover:bg-gray-400 text-black px-4 py-2 rounded w-full max-w-md mb-2 flex items-center justify-center gap-3 shadow-md hover:cursor-pointer font-bold"
                data-aos="fade-up"
              >
                <Image src="/Google.png" alt="Google logo" width={30} height={30} />
                
                {loading ? 'Redirecting...' : 'Lanjut dengan Google'}
              </button>

              <div className="text-sm">
                {isSignUp ? (
                  <>
                    <span className="text-black">Sudah punya akun? </span>
                    <button className="text-blue-600 underline hover:cursor-pointer font-bold" onClick={() => setIsSignUp(false)}>Masuk</button>
                  </>
                ) : (
                  <>
                    <span className="text-black">Belum punya akun? </span>
                    <button className="text-blue-600 underline hover:cursor-pointer font-bold" onClick={() => setIsSignUp(true)}>Daftar</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
