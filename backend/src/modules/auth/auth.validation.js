import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Nama minimal 2 karakter').max(80),
  email: z.string().trim().email('Email tidak valid').toLowerCase(),
  phone: z
    .union([z.literal(''), z.string().trim().min(8, 'Nomor telepon minimal 8 digit').max(20)])
    .optional(),
  password: z.string().min(8, 'Password minimal 8 karakter').max(72)
});

export const loginSchema = z.object({
  email: z.string().trim().email('Email tidak valid').toLowerCase(),
  password: z.string().min(1, 'Password wajib diisi')
});
