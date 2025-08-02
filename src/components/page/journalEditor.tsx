'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Pencil, Save } from "lucide-react";
import ToggleSwitch from '@/components/ui/toggleSwitch';
import MetrikSlider from '@/components/ui/metrikSlider';
import journalTemplate from '@/data/journalTemplate';
import type { ContextStore } from '@uiw/react-md-editor';
import AIAnalysisButton from '@/components/ui/analysisButton'
// Dynamic import untuk menghindari SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
type OnChange = (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void;

export default function JournalEditor({ initialJournal = null }: { initialJournal?: Journal | null }) {
    const [markdown, setMarkdown] = useState(initialJournal?.content || '')
    const [previewMode, setPreviewMode] = useState<'edit' | 'live'>('live')
    const [useTemplate, setUseTemplate] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const [title, setTitle] = useState(initialJournal?.title || 'Judul')
    const [isEditing, setIsEditing] = useState(false)
    const [isSaved, setIsSaved] = useState(false)


    const [metrics, setMetrics] = useState<Record<string, Metric>>(
      initialJournal?.metrics ?? {
        fun: { enabled: false, value: 50 },
        productivity: { enabled: false, value: 50 },
        stress: { enabled: false, value: 50 },
      }
    )
    const now = new Date().toISOString()

    const [savedJournalData, setSavedJournalData] = useState(initialJournal || null)

    function mergeTemplate(userText: string, template: string): string {
        // Gantikan placeholder {ISI_JURNAL} dengan tulisan pengguna.
        // Jika userText kosong, kita biarkan kosong.
        return template.replace("{ISI_JURNAL}", userText.trim());
    }

   
    // Fungsi untuk menangani toggle "Gunakan Template"
    const handleToggleTemplate = () => {
        setUseTemplate((prev) => {
            const newState = !prev;
            if (newState) {
                // Jika template diaktifkan, masukkan tulisan sebelumnya ke dalam template.
                if (markdown != '') {
                    const prevMarkdown = markdown;
                    setMarkdown(mergeTemplate(prevMarkdown, journalTemplate))
                } else {
                    setMarkdown(journalTemplate)
                }

            } else {
            // Jika dimatikan, kamu bisa mengosongkan editor atau membiarkannya apa adanya.
            // Contoh: membiarkan apa yang sudah ada
                setMarkdown("");
            }
        return newState;
    });
    };



  const router = useRouter()

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const onChange = React.useCallback<OnChange>((val) => {
    setMarkdown(val || '');
  }, []);


  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
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
        setPreviewMode('edit')
      } else {
        setPreviewMode('live')
      }
    }

    if (initialJournal) {
      setIsSaved(true)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)


  }, [userId, initialJournal])



  const handleSave = async () => {
    if (!userId || !markdown || !title) {
        alert('Judul dan isi jurnal wajib diisi.')
        return
    }


    // Ambil metrik yang aktif
    const metricsToSave = metrics

    let data, error

    if (isSaved && savedJournalData?.id) {
      // --- UPDATE ---
      const res = await supabase
        .from('journals')
        .update({
          title,
          content: markdown,
          updated_at: now,
          metrics: metricsToSave,
        })
        .eq('id', savedJournalData.id)
        .select()
        .single()

      data = res.data
      error = res.error
    } else {
      // --- INSERT ---
      const res = await supabase
        .from('journals')
        .insert({
          user_id: userId,
          title,
          content: markdown,
          created_at: now,
          updated_at: now,
          metrics: metricsToSave,
          analysis: null,
          last_analysed: null,
        })
        .select()
        .single()

      data = res.data
      error = res.error
    }

    if (error) {
      alert('Gagal menyimpan jurnal: ' + error.message)
    } else {
      setIsSaved(true)
      setSavedJournalData(data)
      alert('Jurnal berhasil disimpan!')
    }
  }


  return (
    <main className="main overflow-x-hidden">
      <div className="mainDiv min-h-screen font-sans">
        {/* Section Editor */}
        <section className="relative overflow-hidden">
          <div className="container py-15 items-center px-10">
            <div className="flex flex-col items-center text-center w-full p-8 m-auto bg-white rounded-lg shadow-2xl gap-3">
                {/* Tombol opsional pakai template */}
                {
                  !isSaved &&  (<ToggleSwitch
                      enabled={useTemplate}
                      onToggle={handleToggleTemplate}
                      label="Template Jurnal"
                      />
                  )
                }

                
              <div className="flex flex-col  justify-center text-center md:justify-between items-center w-full ">
                {isEditing ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={() => setIsEditing(false)} // keluar dari input, selesai edit
                      onKeyDown={handleKeyDown}
                      autoFocus
                      className="text-lg md:text-2xl text-center font-semibold w-full outline-none bg-transparent"
                    />
                  ) : (
                    <div
                      className="flex items-center w-full justify-center text-center"
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
                  <div className='font-light w-full text-center text-xs md:text-lg'>
                    {formattedDate}
                  </div>
                </div>
              <div className="w-full text-xs">
                <MDEditor value={markdown} onChange={onChange} height="800" preview={previewMode}/>
              </div>
              {/* Metrik Pengukuran Keseharian */}
                <div className="w-full text-left space-y-6 mt-6">
                <h3 className="text-lg font-semibold">Tolak Ukur Harian (Opsional)</h3>

                {/* Kesenangan */}
                <MetrikSlider
                    label="Tingkat Kesenangan"
                    valueKey="fun"
                    state={metrics}
                    setState={setMetrics}
                />

                {/* Produktivitas */}
                <MetrikSlider
                    label="Tingkat Produktivitas"
                    valueKey="productivity"
                    state={metrics}
                    setState={setMetrics}
                />

                {/* Stres */}
                <MetrikSlider
                    label="Tingkat Stres"   
                    valueKey="stress"
                    state={metrics}
                    setState={setMetrics}
                />
                </div>

                <button
                onClick={handleSave}
                className="hover:cursor-pointer mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                <Save size={16} /> Simpan Jurnal
                </button>

            </div>
          </div>

          {/* <div className='text-center'>
            Data: {savedJournalData}
          </div> */}
        </section>

      </div>
      {isSaved && <AIAnalysisButton journal={savedJournalData} />}

    </main>
  )
}
