'use client'

import supabase from '@/lib/supabaseClient'
import JournalEditor from '@/components/page/journalEditor'
import { use, useEffect, useState } from 'react'
export default function JournalDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = use(props.params)
    const [journal, setJournal] = useState(null)
    const [message, setMessage] = useState('')

    const fetchJournal = async (uid: string, id: string) => {
        const { data: journal, error } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', uid)
        .eq('id', id)
        .single()

        if (error) {
            console.error('Gagal mengambil jurnal:', error.message)
        } else {
            // setMessage("Success Get Journal")

            // setMessage(journal.title)
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
        // router.push('/auth')
        setMessage("No User")
      } else {
        // setMessage("Success Auth")
        fetchJournal(user.id, id)
      }
    }

    getUser()


    
  }, [])



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
