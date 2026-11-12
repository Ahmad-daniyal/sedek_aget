import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

export function notFound(req, _res, next) {
  next(new AppError(`Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`, 404));
}

export function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid',
      details: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  const statusCode = error instanceof AppError ? error.statusCode : 500;

  if (statusCode === 500) {
    process.stderr.write(`${error.stack}\n`);
  }

  const message = statusCode === 500 ? 'Terjadi kesalahan pada server' : error.message;

  return res.status(statusCode).json({ success: false, message });
}
