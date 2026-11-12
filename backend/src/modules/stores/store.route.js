import { Router } from 'express';
import { getStore, listStores } from './store.controller.js';

export const storeRouter = Router();

storeRouter.get('/', listStores);
storeRouter.get('/:slug', getStore);
