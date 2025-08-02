// components/JournalCard.tsx
'use client'

import { useRouter } from 'next/navigation'
import { formatDate, plainText } from '@/lib/utils' // pastikan fungsi ini sudah ada
import { useState } from 'react'
import { BsPin, BsPinFill, BsEye, BsTrash } from "react-icons/bs";


import supabase from '@/lib/supabaseClient'
export default function JournalCard({ journal, onUpdated }: {
  journal: Journal,
  onUpdated: () => void
}) {
    const [pinned, setPinned] = useState(journal.pinned) // local state agar berubah langsung

    const router = useRouter()
    const [hover, setHover] = useState(false)

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Apakah Anda yakin ingin menghapus jurnal ini?")
        if (!confirm) return

        const { error } = await supabase.from('journals').delete().eq('id', id)
        if (!error) {
            onUpdated() // trigger fetch ulang di parent
        } else {
            alert("Gagal menghapus jurnal")
        }
    }

    const handlePin = async (id: string) => {
        const newPinned = !pinned
        const { error } = await supabase.from('journals').update({ pinned: newPinned }).eq('id', id)
        if (!error) {
            setPinned(newPinned)
            onUpdated() // trigger fetch ulang di parent
        } else {
            alert("Gagal menghapus jurnal")
        }
    }

  return (
    <div
      key={journal.id}
      className="relative bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            className="text-blue-600 hover:text-blue-800 hover:cursor-pointer"
            title="Pin"
            onClick={() => handlePin(journal.id)}
          >
            {pinned ? <BsPinFill size={16} /> : <BsPin size={16} />}
          </button>
          <button
            className="text-gray-600 hover:text-gray-800 hover:cursor-pointer"
            title="Edit / View"
            onClick={() => router.push(`/journal/${journal.id}`)}
          >
            <BsEye size={16} />
          </button>
          <button
            className="text-red-600 hover:text-red-800 hover:cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(journal.id)}
          >
            <BsTrash size={16} />
          </button>
        </div>
      ) :
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            className="text-blue-600 hover:text-blue-800 hover:cursor-pointer"
            title="Pin"
            onClick={() => handlePin(journal.id)}
          >
            {pinned && <BsPinFill size={16} /> }
          </button>
        </div>
      }

      <div>
        <h2 className="text-lg font-semibold mb-2">{journal.title}</h2>
        {/* <p className="text-sm text-gray-500 mb-1">
          Dibuat: {formatDate(journal.created_at)}
        </p> */}
        <p className="text-sm text-gray-500 mb-3">
          Terakhir diubah: {formatDate(journal.updated_at)}
        </p>
        <div className="text-sm text-gray-700 line-clamp-5">
          {plainText(journal.content)}...
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            journal.analysis
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {journal.analysis ? '✅ Sudah dianalisis AI' : '⚠️ Belum dianalisis AI'}
        </span>
      </div>
    </div>
  )
}
