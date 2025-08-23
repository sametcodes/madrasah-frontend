import { http, HttpHandler, HttpResponse } from 'msw';
import { Post } from '@madrasah/services/api/types';

// Artık bir dizi değil, bir fonksiyon ihraç ediyoruz
export const createPostHandlers = (baseUrl: string): HttpHandler[] => {
  // baseUrl'in gelip gelmediğini kontrol etmek, hataları önler
  if (!baseUrl) {
    return [];
  }

  return [
    http.get(`${baseUrl}/posts`, () => {
      return HttpResponse.json<Post[]>([
        {
          id: 1,
          userId: 2,
          title: 'Post 1 (from Factory)',
          body: 'Content for post 1',
        },
      ]);
    }),
  ];
};