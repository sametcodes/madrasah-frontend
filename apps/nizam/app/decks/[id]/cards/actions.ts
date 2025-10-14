'use server'

import { cookies } from 'next/headers'
import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'

export const updateFlashcard = async (cardId: number, updatedCard: {
  contentFront?: string
  contentBack?: string
}) => {
  const cookieStore = await cookies()
  const { cards } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  try {
    await cards.updateFlashcard({
      id: cardId,
      updateFlashcardDto: {
        contentBack: updatedCard.contentBack,
        contentFront: updatedCard.contentFront,
      },
    })
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
    return true
  }
  catch (error) {
    console.log('Error updating flashcard:', error)
    return false
  }
}
