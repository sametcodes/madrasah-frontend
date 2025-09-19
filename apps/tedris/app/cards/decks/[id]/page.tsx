import { cookies } from 'next/headers'
import FlashCardList from '~/features/flashcards/components/flashcard-list'
import { getAuthenticatedApiService } from '~/lib/services'

export default async function Page() {
  const cookieStore = await cookies()
  const api = getAuthenticatedApiService(cookieStore)
  const { data: cards, error } = await api.getDeckCards('asdkjaskw13892013')

  if (error) {
    return (
      <div>
        Error:
        <div>
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-full">
      <FlashCardList cards={cards} />
    </div>
  )
}
