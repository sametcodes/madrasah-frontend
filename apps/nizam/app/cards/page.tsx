'use client'

import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

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

  const onDeckFileImport = async (file: File) => {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0] || ''
    const worksheet = workbook.Sheets[sheetName]

    // TODO: make an error popup
    // TODO: add i18n
    if (!worksheet) {
      return console.error('No worksheet found in the uploaded file')
    }

    const json = XLSX.utils.sheet_to_json(worksheet)
    console.log(json) // This is an array of objects, one per row
  }

  return (
    <div className="container py-10">
      <TableHeader onCardCreate={onCardCreate} onDeckFileImport={onDeckFileImport} />
      <DataTable
        columns={columns}
        data={localCards || []}
        onRowUpdate={onRowUpdate}
      />
    </div>
  )
}
