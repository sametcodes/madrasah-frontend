'use client'

import { useState, useEffect, use } from 'react'
import * as XLSX from 'xlsx'
import { updateFlashcard } from '../actions'

import { columns } from './columns'
import { DataTable } from '~/components/data-table'
import { TableHeader } from './table-header'
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

export default function DeckCards({
  deckId,
  flashcards,
}: {
  deckId: string
  flashcards: FlashcardResponse[] | undefined
}) {
  const [localCards, setLocalCards] = useState<FlashcardResponse[]>(flashcards || [])

  const onRowUpdate = async (updatedRow: FlashcardResponse) => {
    const response = await updateFlashcard(updatedRow.id, {
      contentFront: updatedRow.contentFront,
      contentBack: updatedRow.contentBack,
    })

    if (response) {
      setLocalCards(prevCards => prevCards.map(card => card.id === updatedRow.id ? updatedRow : card))
    }

    return response
  }

  const onDeckFileImport = async (file: File) => {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0] || ''
    const worksheet = workbook.Sheets[sheetName]

    if (!worksheet) {
      return console.error('No worksheet found in the uploaded file')
    }

    const json = XLSX.utils.sheet_to_json<SpreadsheetCardRepresentation>(worksheet)
    const cardsToImport: FlashcardResponse[] = json.map((row, index) => ({
      id: index,
      type: row.type,
      contentFront: row.front,
      contentBack: row.back,
      deckId: Number(deckId),
      authorId: 1,
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
        deckId: Number(deckId),
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
