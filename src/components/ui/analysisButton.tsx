"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { X } from "lucide-react"
import Groq from "groq-sdk";
import { format } from "date-fns"
import { id } from "date-fns/locale"
import supabase from "@/lib/supabaseClient";
import ReactMarkdown from 'react-markdown';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })

export default function AIAnalysisButton({ journal }: { journal: Journal | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(journal?.analysis || null)
  const [lastAnalysed, setLastAnalysed] = useState(journal?.last_analysed || null)

  const handleAnalyze = async () => {
    setIsLoading(true)

    const prompt = `
Saya ingin Anda bertindak sebagai analis keseharian berdasarkan catatan jurnal pribadi seseorang. Berikut ini adalah isi jurnalnya:

"""${journal?.content}"""

${journal?.metrics ? `Berikut ini adalah metrik numerik yang diisi pengguna: ${Object.entries(journal.metrics).map(([k, v]) => `${k}: ${v}`).join(", ")}` : "Tidak ada metrik yang diisi."}

Berikan analisis ringkas dalam 1-2 paragraf. Utamakan format poin-poin yang berisi insight dan saran singkat dari jurnal ini. Gunakan bahasa yang suportif dan empatik.
`

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "user", content: prompt },
        ],
      })

      const response = chatCompletion.choices[0]?.message?.content!

      // update ke Supabase
      const { error } = await supabase
        .from("journals")
        .update({
          analysis: response,
          last_analysed: new Date().toISOString(),
        })
        .eq("id", journal?.id)

      if (!error) {
        setAnalysis(response)
        setLastAnalysed(new Date().toISOString())
      }
    } catch (err) {
      console.error("Error generating analysis:", err)
    }

    setIsLoading(false)
  }

  if (!journal?.id) return null

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-50"
        onClick={() => setIsOpen(true)}
      >
        {analysis ? "Lihat Analisis" : "Analisis dengan AI"}
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <h1 className="text-2xl font-bold mb-2">Analisis Harimu dengan Suarahati.AI</h1>
            <p className="text-sm text-gray-500 mb-4">
              Last analysed: {lastAnalysed ? format(new Date(lastAnalysed), "PPpp", { locale: id }) : "Belum pernah"}
            </p>

            {isLoading ? (
            <div className="text-center text-gray-500 italic">Menganalisis jurnalmu...</div>
            ) : (
            <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 prose prose-sm max-w-none">
                {analysis ? <ReactMarkdown>{analysis}</ReactMarkdown> : "Belum ada analisis"}
            </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleAnalyze}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                disabled={isLoading}
              >
                Analisa Ulang
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
