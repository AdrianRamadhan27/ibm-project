'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { PenTool } from "lucide-react"; // pakai lucide-react untuk ikon edit
import Link from 'next/link'
import JournalCard from '@/components/ui/journalCard';
// Dynamic import untuk menghindari SSR issues

export default function JournalPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [pinnedJournals, setPinnedJournals] = useState<Journal[]>([])
  const [otherJournals, setOtherJournals] = useState<Journal[]>([])
  const [refreshFlag, setRefreshFlag] = useState(false)
  
  const router = useRouter()




  const fetchJournals = async (uid: string) => {
    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .eq('user_id', uid)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Gagal mengambil jurnal:', error.message)
    } else {
      setPinnedJournals(data.filter(j => j.pinned))
      setOtherJournals(data.filter(j => !j.pinned))

    }
  }

  useEffect(() => {
    setRefreshFlag(false)
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.push('/auth')
      } else {
        setUserId(user.id)
        fetchJournals(user.id)
      }
    }

    getUser()


    
  }, [userId, refreshFlag])



  return (
    <main className="main overflow-x-hidden">
      <div className="mainDiv min-h-screen font-sans">
        {/* Section Editor */}
        <div className='container px-10 py-10 justify-end items-end'>
          <Link href="/journal/write">
            <div className='hover:cursor-pointer p-3 bg-blue-600 items-center text-center m-auto text-white w-fit rounded-md flex gap-3'>
              Tulis Jurnal Baru
              <PenTool />
            </div>
          </Link>
        </div>


        {/* Section Daftar Jurnal Favorit */}
        {pinnedJournals.length > 0 && (
          <section className="relative overflow-hidden">
            <div className="container py-5 items-center px-10">
              <div className="flex flex-col items-center w-full p-8 m-auto bg-white rounded-lg shadow-2xl gap-3">
                <h2 className="text-xl font-bold text-center mb-6">📌 Jurnal Favorit</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {pinnedJournals.map((journal) => (
                    <JournalCard
                      key={journal.id}
                      journal={journal}
                      onUpdated={() => setRefreshFlag(true)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section Daftar Jurnal Lainnya */}
        <section className="relative overflow-hidden">
          <div className="container py-5 items-center px-10">
            <div className="flex flex-col items-center w-full p-8 m-auto bg-white rounded-lg shadow-2xl gap-3">
              <h2 className="text-xl font-bold text-center mb-6">📝 Semua Jurnalmu</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {otherJournals.map((journal) => (
                  <JournalCard
                    key={journal.id}
                    journal={journal}
                    onUpdated={() => setRefreshFlag(true)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
