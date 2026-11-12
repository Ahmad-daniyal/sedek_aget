import { Router } from 'express';
import { listCategories } from './category.controller.js';

export const categoryRouter = Router();

categoryRouter.get('/', listCategories);
