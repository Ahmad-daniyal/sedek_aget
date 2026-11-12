import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma.js';
import { AppError } from '../../utils/AppError.js';

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt
  };
}

export const authService = {
  async register({ name, email, phone, password }) {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      throw new AppError('Email sudah terdaftar', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, phone: phone || null, passwordHash }
    });

    return sanitizeUser(user);
  },

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AppError('Email atau password salah', 401);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new AppError('Email atau password salah', 401);
    }

    return sanitizeUser(user);
  },

  async getProfile(id) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new AppError('Pengguna tidak ditemukan', 404);
    }

    return sanitizeUser(user);
  }
};
