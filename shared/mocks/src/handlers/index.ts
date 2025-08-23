import { HttpHandler } from 'msw';
import { createPostHandlers } from './postHandlers';

// Bu ana fabrika, diğer tüm fabrikaları çağırır
export const createHandlers = (baseUrl: string): HttpHandler[] => [
  ...createPostHandlers(baseUrl)
];