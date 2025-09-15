import { createTedrisatClient } from './client'
import { Card } from './types'

type HttpClient = ReturnType<typeof createTedrisatClient>

export class TedrisatService {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  async getCards() {
    return this.client<Card[]>('/cards')
  }

  async createCard(body: Card) {
    return this.client<Card>(`/card`, { method: 'POST', body: JSON.stringify(body) })
  }

  async getCard(id: number) {
    return this.client<Card>(`/cards/${id}`)
  }

  async updateCard(id: number, body: Partial<Card>) {
    return this.client<Card>(`/cards/${id}`, { method: 'PUT', body: JSON.stringify(body) })
  }
}
