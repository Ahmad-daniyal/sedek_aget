import { config } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { verifyToken } from '../utils/jwt.js';

function extractToken(req) {
  if (req.cookies?.[config.cookieName]) {
    return req.cookies[config.cookieName];
  }

  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    return header.slice(7);
  }

  return null;
}

export function requireAuth(req, _res, next) {
  const token = extractToken(req);

  if (!token) {
    return next(new AppError('Silakan masuk terlebih dahulu', 401));
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch {
    return next(new AppError('Sesi tidak valid atau kedaluwarsa', 401));
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Akses ditolak', 403));
    }

    return next();
  };
}
