"use client"

import supabase from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import JournalCard from "../ui/journalCard"
import { User } from '@supabase/supabase-js'


export default function Dashboard({ user }: { user: User }) {
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshFlag, setRefreshFlag] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setRefreshFlag(false)

      const { data: journalsData, error: journalsError } = await supabase
        .from("journals")
        .select("id, title, created_at, updated_at, content, analysis, pinned")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(4)

      if (!journalsError) setJournals(journalsData || [])
      setLoading(false)
    }

    fetchData()
  }, [user.id, refreshFlag])

  if (loading) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="space-y-12 pb-16">
      {/* Header Selamat Datang */}
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">Selamat Datang, {user.user_metadata?.full_name || "Pengguna"}</h1>
        <p className="text-gray-600 mt-2 text-sm">Suarakan Hatimu</p>
      </div>

      {/* Section Daftar Jurnal */}
      <section className="relative overflow-hidden">
        <div className="container py-10 px-6 md:px-10">
          <div className="flex flex-col items-center w-full p-8 bg-white rounded-lg shadow-2xl gap-6">
            <h2 className="text-2xl font-bold text-center mb-6">Jurnal terakhirmu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
    {journals.length === 0 ? (
      <div className="text-center text-gray-500 mt-4">
        Anda belum menulis jurnal.
      </div>
    ) : (
      journals.map((journal) => (
        <JournalCard
          key={journal.id}
          journal={journal}
          onUpdated={()=>{setRefreshFlag(true)}}
        />
      ))
    )}

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
