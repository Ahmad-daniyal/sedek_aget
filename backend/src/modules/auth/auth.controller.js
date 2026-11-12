import { config } from '../../config/env.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authCookieOptions, clearCookieOptions } from '../../utils/cookie.js';
import { signToken } from '../../utils/jwt.js';
import { authService } from './auth.service.js';

function createSessionCookie(res, user) {
  const token = signToken({ id: user.id, role: user.role });
  res.cookie(config.cookieName, token, authCookieOptions);
}

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  createSessionCookie(res, user);
  res.status(201).json({ success: true, data: { user } });
});

export const login = asyncHandler(async (req, res) => {
  const user = await authService.login(req.body);
  createSessionCookie(res, user);
  res.json({ success: true, data: { user } });
});

export const logout = (req, res) => {
  res.clearCookie(config.cookieName, clearCookieOptions);
  res.json({ success: true, data: { message: 'Berhasil keluar' } });
};

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  res.json({ success: true, data: { user } });
});
