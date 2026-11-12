import { prisma } from '../../config/prisma.js';
import { AppError } from '../../utils/AppError.js';

function toStoreSummary(store) {
  return {
    id: store.id,
    name: store.name,
    slug: store.slug,
    description: store.description,
    logoUrl: store.logoUrl,
    bannerUrl: store.bannerUrl,
    status: store.status,
    verificationScore: store.verificationScore,
    riskScore: store.riskScore,
    phone: store.phone,
    address: store.address,
    latitude: store.latitude,
    longitude: store.longitude,
    rating: store.rating,
    reviewCount: store.reviewCount,
    categories: store.categories.map((item) => item.category),
    productCount: store._count?.products ?? 0
  };
}

export const storeService = {
  async list({ search, category } = {}) {
    const where = { status: 'ACTIVE' };

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { address: { contains: search } }
      ];
    }

    if (category) {
      where.categories = { some: { category: { slug: category } } };
    }

    const stores = await prisma.store.findMany({
      where,
      include: {
        categories: { include: { category: true } },
        _count: { select: { products: true } }
      },
      orderBy: [{ verificationScore: 'desc' }, { name: 'asc' }]
    });

    return stores.map(toStoreSummary);
  },

  async getBySlug(slug) {
    const store = await prisma.store.findUnique({
      where: { slug },
      include: {
        categories: { include: { category: true } },
        products: { where: { isActive: true }, orderBy: { name: 'asc' } },
        _count: { select: { products: true } }
      }
    });

    if (!store) {
      throw new AppError('Toko tidak ditemukan', 404);
    }

    return { ...toStoreSummary(store), products: store.products };
  }
};
