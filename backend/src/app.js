import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { authRouter } from './modules/auth/auth.route.js';
import { categoryRouter } from './modules/categories/category.route.js';
import { storeRouter } from './modules/stores/store.route.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'sedek_aget-api',
      timestamp: new Date().toISOString()
    }
  });
});

app.use('/api/auth', authRouter);
app.use('/api/stores', storeRouter);
app.use('/api/categories', categoryRouter);

app.use(notFound);
app.use(errorHandler);
