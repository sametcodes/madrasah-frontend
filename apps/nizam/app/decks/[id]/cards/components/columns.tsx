'use client'

import { EditableCell } from './editable-cell'
import { ColumnDef } from '@tanstack/react-table'
import { FlashcardResponse } from '@madrasah/services/tedrisat'

// Editable Cell Component

export const columns: ColumnDef<FlashcardResponse>[] = [
  {
    id: 'front',
    accessorFn: row => row.contentFront,
    header: 'Front face',
    cell: props => (
      <EditableCell
        className="w-full truncate font-medium"
        {...props}
      />
    ),
  },
  {
    id: 'back',
    accessorFn: row => row.contentBack,
    header: 'Back face',
    cell: props => (
      <EditableCell
        {...props}
      />
    ),
    size: 300,
    minSize: 200,
    maxSize: 400,
  },
]
