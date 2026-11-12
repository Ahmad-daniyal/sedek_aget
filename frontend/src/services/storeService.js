import { api } from './api.js';

export const storeService = {
  stores: () => api.get('/stores'),
  categories: () => api.get('/categories'),
  detail: (slug) => api.get(`/stores/${slug}`)
};
