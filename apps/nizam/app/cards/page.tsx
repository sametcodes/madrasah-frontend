'use client'

import { useState, useEffect } from 'react'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { TableHeader } from './components/table-header'
import { useQuery } from '~/hooks/useQuery'
import { useApi } from '~/hooks/useApi'
import { faker } from '@madrasah/msw/tedrisat'
import { Card } from '@madrasah/services/tedrisat'

export default function CardsPage() {
  const { api } = useApi()
  const { data: cards, error, isLoading, refetch } = useQuery(api => api.getCards())
  const [localCards, setLocalCards] = useState(cards)

  // Sync local cards with server data
  useEffect(() => {
    setLocalCards(cards)
  }, [cards])

  if (error) {
    return <div>Error loading cards</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  const onCardCreate = async () => {
    if (!api) return
    const randomCard = faker.tedrisat.card()

    const response = await api.createCard(randomCard)
    if (!response.error) {
      refetch()
    }
  }

  const onRowUpdate = async (updatedRow: Card) => {
    if (!api) return

    // Optimistically update local state
    setLocalCards(prev =>
      prev?.map(card =>
        card.id === updatedRow.id ? updatedRow : card,
      ) || [],
    )

    try {
      const response = await api.updateCard(updatedRow.id, updatedRow)
      if (response.error) {
        console.error('Failed to update card:', response.error)
        // Rollback on error
        setLocalCards(cards)
      }
      else {
        console.log('Card updated successfully:', response.data)
        // Optionally refetch to ensure consistency
        // refetch();
      }
    }
    catch (error) {
      console.error('Failed to update card:', error)
      // Rollback on error
      setLocalCards(cards)
    }
  }

  return (
    <div className="container py-10">
      <TableHeader onCardCreate={onCardCreate} />
      <DataTable
        columns={columns}
        data={localCards || []}
        onRowUpdate={onRowUpdate}
      />
    </div>
  )
}
