'use client'

import { useEffect, useState } from 'react'

export default function ConfirmEmailPage() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const emailParam = url.searchParams.get('email')
      setEmail(emailParam)
    }
  }, [])

  return (
    <main className="main">
      <div className="mainDiv min-h-screen font-sans">
        <section className="relative overflow-hidden">
          <div className="container py-20 items-center">
            <div className="flex flex-col items-center text-center w-[300px] md:w-[500px] p-8 m-auto bg-white rounded-lg shadow-2xl gap-3">
              <h1 className="text-2xl font-bold mb-4">Konfirmasi Email</h1>
              <p className="text-gray-700">
                {email
                  ? `Mohon konfirmasi email Anda untuk menyelesaikan pendaftaran. Silakan cek kotak masuk pada ${email}.`
                  : 'Mohon konfirmasi email Anda untuk menyelesaikan pendaftaran. Silakan cek kotak masuk email Anda.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
