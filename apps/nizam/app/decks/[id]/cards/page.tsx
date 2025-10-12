'use client'

import { useState, useEffect, use } from 'react'
import * as XLSX from 'xlsx'

import { columns } from './components/columns'
import { DataTable } from '~/components/data-table'
import { TableHeader } from './components/table-header'
import { FlashcardResponse, FlashcardResponseTypeEnum } from '@madrasah/services/tedrisat'

type SpreadsheetCardRepresentation = {
  id: number
  type: FlashcardResponseTypeEnum
  front: string
  back: string
  author?: string
  is_public?: boolean
  note?: string
}

export default function DeckCardsPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = use(params)

  const [localCards, setLocalCards] = useState<FlashcardResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Sync local cards with server data
  useEffect(() => {
    async function loadCards() {
      try {
        const response = await fetch(`/api/decks/${id}/cards`)
        if (!response.ok) {
          throw new Error('Failed to fetch cards')
        }
        const data = await response.json()
        setLocalCards(data)
      }
      catch (error) {
        console.error('Failed to load cards:', error)
      }
      finally {
        setIsLoading(false)
      }
    }

    loadCards()
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const onRowUpdate = async (updatedRow: FlashcardResponse) => {
    console.log('Row updated:', updatedRow)
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

    const json = XLSX.utils.sheet_to_json<SpreadsheetCardRepresentation>(worksheet)
    const cardsToImport: FlashcardResponse[] = json.map((row, index) => ({
      id: index,
      type: row.type,
      contentFront: row.front,
      contentBack: row.back,
      deckId: Number(id),
      authorId: 1, // TODO: replace with actual user id
    }))

    setLocalCards(prevCards => [...prevCards, ...cardsToImport])
  }

  const onClickDownloadSampleFile = () => {
    const sampleCards: SpreadsheetCardRepresentation[] = Array.from({ length: 5 }).map(() => {
      const sampleCard = localCards[0] || {
        id: 1,
        author: 'Sample Author',
        type: FlashcardResponseTypeEnum.Vocabulary,
        is_public: true,
        contentFront: 'Front word',
        contentBack: 'Back word',
        contentNote: 'Note',
        deckId: Number(id),
      }
      return {
        ...sampleCard,
        id: sampleCard.id,
        front: sampleCard?.contentFront || 'Front word',
        back: sampleCard?.contentBack || 'Back word',
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(sampleCards)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SampleCards')
    XLSX.writeFile(workbook, 'sample_cards.xlsx')
  }

  return (
    <div className="container py-10">
      <TableHeader onClickDownloadSampleFile={onClickDownloadSampleFile} onDeckFileImport={onDeckFileImport} />
      <DataTable
        columns={columns}
        data={localCards || []}
        onRowUpdate={onRowUpdate}
      />
    </div>
  )
}
