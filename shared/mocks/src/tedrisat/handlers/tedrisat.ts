import { http, HttpResponse } from 'msw'
import { MockApiHandlers } from '../../types'

import type { Card, TedrisatService } from '@madrasah/services/tedrisat'
import { db } from '../db'

/**
* This is a factory function that creates HTTP handlers for mocking API endpoints.
*/
export const tedrisatHandlers = (baseUrl: string): MockApiHandlers<TedrisatService> => {
  if (!baseUrl) {
    throw new Error('Base URL is required to create mock API handlers.')
  }

  const handlers: MockApiHandlers<TedrisatService> = {
    getCards: http.get(`${baseUrl}/cards`, (): HttpResponse<Card[]> => {
      console.log('Fetching all cards from mock DB')
      const cards = db.card.findMany({})
      return HttpResponse.json(cards)
    }),
    getCard: http.get(`${baseUrl}/cards/:id`, ({ params: { id } }): HttpResponse<Card> => {
      const card = db.card.findFirst({
        where: { id: { equals: Number(id) } },
      })
      return HttpResponse.json(card)
    }),
    createCard: http.post(`${baseUrl}/card`, ({ request }): HttpResponse<Card> => {
      console.log(request)
      const body = request.body as unknown as Card
      if (!body) return HttpResponse.error()

      const response = db.card.create(body)
      return HttpResponse.json(response)
    }),
    updateCard: http.put(`${baseUrl}/cards/:id`, async ({ params: { id }, request }) => {
      console.log('Updating card:', id)
      const body = await request.json() as Partial<Card>
      if (!body) return HttpResponse.error()

      const updatedCard = db.card.update({
        where: { id: { equals: Number(id) } },
        data: body,
      })

      if (!updatedCard) {
        return new HttpResponse(JSON.stringify({ error: 'Card not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return HttpResponse.json(updatedCard)
    }),
  }

  return handlers
}
