'use client'

import { useRouter } from 'next/navigation'
import { columns } from './components/columns'
import { DataTable } from '~/components/data-table'
import { useEffect, useState } from 'react'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'

export default function DecksPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [decks, setDecks] = useState<FlashcardDeckResponse[]>([])

  useEffect(() => {
    async function loadDecks() {
      try {
        const response = await fetch('/api/decks')
        if (!response.ok) {
          throw new Error('Failed to fetch decks')
        }
        const data = await response.json()
        setDecks(data)
      }
      catch (error) {
        console.error('Failed to load decks:', error)
      }
      finally {
        setIsLoading(false)
      }
    }

    loadDecks()
  }, [])

  const handleRowClick = (deck: FlashcardDeckResponse) => {
    router.push(`/decks/${deck.id}/cards`)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-10">
      <DataTable
        columns={columns}
        data={decks || []}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
