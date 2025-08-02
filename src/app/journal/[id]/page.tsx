'use client'

import supabase from '@/lib/supabaseClient'
import JournalEditor from '@/components/page/journalEditor'
import { use, useEffect, useState } from 'react'
export default function JournalDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = use(props.params)
    const [journal, setJournal] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const fetchJournal = async (uid: string, id: string) => {
        const { data: journal, error } = await supabase
            .from('journals')
            .select('*')
            .eq('user_id', uid)
            .eq('id', id)
            .single()

        if (error || !journal) {
            console.warn('Jurnal tidak ditemukan atau bukan milik user:', error?.message)
            setNotFound(true)
        } else {
            setJournal(journal)
        }
    }
    

    useEffect(() => {
        const getUser = async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        if (error || !user) {
            setNotFound(true)
        } else {
            fetchJournal(user.id, id)
        }
        }

        getUser()
    }, [])

    if (notFound) {
        return <div className=" text-center p-20 h-screen">
            <h1 className='text-red-600 text-3xl font-bold'>Anda tidak dapat mengakses halaman ini</h1>
            </div>
    }



    return (
    <div>

        {journal ? (
        <JournalEditor initialJournal={journal} />
        ) : (
        <div>Loading jurnal...</div>
        )}
    </div>
    )
  
}
