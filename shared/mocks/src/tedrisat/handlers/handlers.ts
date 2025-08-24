import { http, HttpHandler, HttpResponse } from 'msw';
import { faker } from '../faker';
import type { Card, List, TedrisatService } from '@madrasah/services/tedrisat';

type MockApiHandlers = {
  [K in keyof TedrisatService]: TedrisatService[K] extends (...args: any[]) => any ? HttpHandler : never;
};

/**
* This is a factory function that creates HTTP handlers for mocking API endpoints.
* @see {@link APIService}
*/
export const tedrisatHandlers = (baseUrl: string): MockApiHandlers => {
  if (!baseUrl) {
    throw new Error("Base URL is required to create mock API handlers.");
  }

  const handlers: MockApiHandlers = {
    getCards: http.get(`${baseUrl}/cards`, (): HttpResponse<Card[]> => {
      const posts = faker.helpers.multiple((_, index) => faker.tedrisat.card(index + 1), { count: 10 })
      return HttpResponse.json(posts)
    }),
    getCard: http.get(`${baseUrl}/cards/:id`, ({params: {id}}): HttpResponse<Card> => {
      const card = faker.tedrisat.card(Number(id))
      return HttpResponse.json(card)
    }),
    getListCards: http.get(`${baseUrl}/cards/list`, (): HttpResponse<Card[]> => {
      const posts = faker.helpers.multiple((_, index) => faker.tedrisat.card(index + 1), { count: 10 })
      return HttpResponse.json(posts)
    }),
    getLists: http.get(`${baseUrl}/lists`, (): HttpResponse<List[]> => {
      const lists = faker.helpers.multiple((_, index) => faker.tedrisat.list(index + 1), { count: 10 })
      return HttpResponse.json(lists)
    }),
    getList: http.get(`${baseUrl}/lists/:id`, ({params: {id}}): HttpResponse<List> => {
      const list = faker.tedrisat.list(Number(id));
      return HttpResponse.json(list)
    }),

  }

  return handlers;
};