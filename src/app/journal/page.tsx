'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Pencil } from "lucide-react"; // pakai lucide-react untuk ikon edit
import journalTemplate from '@/data/journalTemplate'
import type { ContextStore } from '@uiw/react-md-editor';
// Dynamic import untuk menghindari SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
type OnChange = (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void;

export default function JournalPage() {
  const [markdown, setMarkdown] = useState(journalTemplate) // Konten jurnal
  const [previewMode, setPreviewMode] = useState<'edit' | 'live'>('live');
  const [userId, setUserId] = useState<string | null>(null)
  const [title, setTitle] = useState("Judul");
  const [isEditing, setIsEditing] = useState(false);
  const [analysis, setAnalysis] = useState<object | null>(null) // Optional analysis
  const router = useRouter()

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.push('/auth')
      } else {
        setUserId(user.id)
      }
    }

    getUser()

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPreviewMode('edit'); // hanya editor di mobile
      } else {
        setPreviewMode('live'); // split view di desktop
      }
    };

    handleResize(); // atur awalnya

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const onChange = React.useCallback<OnChange>((val) => {
    setMarkdown(val || '');
  }, []);

  const handleSave = async () => {
    if (!userId || !markdown || !title) {
      alert('Judul dan isi jurnal wajib diisi.')
      return
    }

    const now = new Date().toISOString()

    const { error } = await supabase.from('journals').insert({
      user_id: userId,
      title: title,
      content: markdown,
      created_at: now,
      updated_at: now,
      analysis: analysis // bisa null, bisa JSON
    })

    if (error) {
      alert('Gagal menyimpan jurnal: ' + error.message)
    } else {
      alert('Jurnal berhasil disimpan!')
      setTitle('')
      setMarkdown('')
      setAnalysis(null)
    }
  }

  return (
    <main className="main overflow-x-hidden">
      <div className="mainDiv min-h-screen font-sans">
        {/* Section Editor */}
        <section className="relative overflow-hidden">
          <div className="container py-15 items-center px-10">
            <div className="flex flex-col items-center text-center w-full p-8 m-auto bg-white rounded-lg shadow-2xl gap-3">
              <div className="flex flex-col md:flex-row justify-center md:justify-between items-center w-full ">
                {isEditing ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={() => setIsEditing(false)} // keluar dari input, selesai edit
                      onKeyDown={handleKeyDown}
                      autoFocus
                      className="text-lg md:text-2xl font-semibold w-full outline-none bg-transparent"
                    />
                  ) : (
                    <div
                      className="flex items-center w-full justify-center md:justify-start"
                    >
                      <span className="text-lg md:text-2xl font-semibold">{title}</span>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="ml-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  )}
                  <div className='font-light w-full text-center md:text-right text-xs md:text-lg'>
                    {formattedDate}
                  </div>
                </div>
              <div className="w-full text-xs">
                <MDEditor value={markdown} onChange={onChange} height="800" preview={previewMode}/>
              </div>
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Simpan Jurnal
              </button>
            </div>
          </div>
        </section>

        {/* Section Daftar Jurnal */}
        <section className="relative overflow-hidden">
          <div className="container py-20 items-center">
            <div className="flex flex-col items-center text-center w-[300px] md:w-[500px] p-8 m-auto bg-white rounded-lg shadow-2xl gap-3">
              <h1 className="text-2xl font-bold mb-4">Daftar Jurnal</h1>
              {/* Di sini bisa ditambahkan daftar jurnal di masa depan */}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
