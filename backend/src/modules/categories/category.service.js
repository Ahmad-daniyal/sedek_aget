import { prisma } from '../../config/prisma.js';

export const categoryService = {
  async list() {
    return prisma.businessCategory.findMany({ orderBy: { name: 'asc' } });
  }
};
