'use client'

import { useSearchParams } from 'next/navigation'

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

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
