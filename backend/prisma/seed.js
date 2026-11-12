import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Makanan', slug: 'makanan', icon: 'bi-egg-fried' },
  { name: 'Minuman', slug: 'minuman', icon: 'bi-cup-straw' },
  { name: 'Jasa', slug: 'jasa', icon: 'bi-tools' },
  { name: 'Kerajinan', slug: 'kerajinan', icon: 'bi-palette' },
  { name: 'Fashion', slug: 'fashion', icon: 'bi-bag' },
  { name: 'Sembako', slug: 'sembako', icon: 'bi-basket' }
];

const stores = [
  {
    name: 'Warung Bu Tini',
    slug: 'warung-bu-tini',
    description:
      'Warung makan rumahan dengan menu harian dan sembako lengkap untuk kebutuhan warga sekitar.',
    phone: '081200000001',
    address: 'Jl. Cihampelas No. 12, Bandung',
    latitude: -6.9147,
    longitude: 107.6098,
    rating: 4.8,
    reviewCount: 124,
    verificationScore: 92,
    riskScore: 8,
    categorySlugs: ['makanan', 'sembako'],
    products: [
      { name: 'Nasi Kuning Spesial', slug: 'nasi-kuning-spesial', price: 15000, stock: 20 },
      { name: 'Gorengan Campur (5 pcs)', slug: 'gorengan-campur', price: 8000, stock: 40 },
      { name: 'Beras Premium 1 kg', slug: 'beras-premium-1kg', price: 14000, stock: 25 }
    ]
  },
  {
    name: 'Kopi Gerobak Asep',
    slug: 'kopi-gerobak-asep',
    description:
      'Kopi keliling dengan biji lokal Bandung. Bisa pre-order untuk acara kecil dan kantor.',
    phone: '081200000002',
    address: 'Area Dago, Bandung',
    latitude: -6.9175,
    longitude: 107.6191,
    rating: 4.7,
    reviewCount: 86,
    verificationScore: 90,
    riskScore: 10,
    categorySlugs: ['minuman'],
    products: [
      { name: 'Kopi Susu Gula Aren', slug: 'kopi-susu-gula-aren', price: 12000, stock: 50 },
      { name: 'Americano Dingin', slug: 'americano-dingin', price: 10000, stock: 50 }
    ]
  },
  {
    name: 'Laundry Kilat Cimahi',
    slug: 'laundry-kilat-cimahi',
    description:
      'Layanan laundry harian dengan opsi antar-jemput untuk wilayah Cimahi dan sekitarnya.',
    phone: '081200000003',
    address: 'Jl. Baros No. 5, Cimahi',
    latitude: -6.8735,
    longitude: 107.542,
    rating: 4.6,
    reviewCount: 58,
    verificationScore: 88,
    riskScore: 12,
    categorySlugs: ['jasa'],
    products: [
      { name: 'Cuci Kering Lipat 3 kg', slug: 'cuci-kering-lipat-3kg', price: 21000, stock: 100 },
      { name: 'Cuci Setrika 5 kg', slug: 'cuci-setrika-5kg', price: 40000, stock: 100 }
    ]
  },
  {
    name: 'Anyaman Lestari',
    slug: 'anyaman-lestari',
    description:
      'Kerajinan anyaman bambu buatan tangan warga lokal untuk dekorasi rumah dan hampers.',
    phone: '081200000004',
    address: 'Jl. Sukajadi No. 8, Bandung',
    latitude: -6.9034,
    longitude: 107.618,
    rating: 4.9,
    reviewCount: 73,
    verificationScore: 93,
    riskScore: 7,
    categorySlugs: ['kerajinan'],
    products: [
      { name: 'Tempat Tisu Anyaman', slug: 'tempat-tisu-anyaman', price: 35000, stock: 15 },
      { name: 'Keranjang Hampers', slug: 'keranjang-hampers', price: 55000, stock: 10 }
    ]
  },
  {
    name: 'Katering Ibu Rina',
    slug: 'katering-ibu-rina',
    description:
      'Katering rumahan untuk acara keluarga, pengajian, dan rapat kantor. Pesanan custom tersedia.',
    phone: '081200000005',
    address: 'Jl. Kopo No. 21, Bandung',
    latitude: -6.925,
    longitude: 107.605,
    rating: 4.7,
    reviewCount: 41,
    verificationScore: 86,
    riskScore: 14,
    categorySlugs: ['makanan'],
    products: [
      { name: 'Paket Nasi Box 20 Porsi', slug: 'paket-nasi-box-20', price: 350000, stock: 10 },
      { name: 'Tumpeng Mini', slug: 'tumpeng-mini', price: 125000, stock: 8 }
    ]
  },
  {
    name: 'Servis Elektronik Pak Dedi',
    slug: 'servis-elektronik-pak-dedi',
    description:
      'Servis elektronik rumahan untuk kipas, setrika, dan mesin cuci. Bisa booking jadwal.',
    phone: '081200000006',
    address: 'Jl. Buah Batu No. 9, Bandung',
    latitude: -6.93,
    longitude: 107.63,
    rating: 4.5,
    reviewCount: 33,
    verificationScore: 89,
    riskScore: 11,
    categorySlugs: ['jasa'],
    products: [
      { name: 'Servis Kipas Angin', slug: 'servis-kipas-angin', price: 45000, stock: 20 },
      { name: 'Servis Mesin Cuci', slug: 'servis-mesin-cuci', price: 90000, stock: 15 }
    ]
  }
];

async function seedCategories() {
  for (const category of categories) {
    await prisma.businessCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }
}

async function seedUsers() {
  const [adminPassword, buyerPassword] = await Promise.all([
    bcrypt.hash('Admin123!', 10),
    bcrypt.hash('Buyer123!', 10)
  ]);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@sedekaget.id' },
    update: {},
    create: {
      name: 'Admin sedek_aget',
      email: 'admin@sedekaget.id',
      passwordHash: adminPassword,
      role: 'ADMIN'
    }
  });

  await prisma.user.upsert({
    where: { email: 'pembeli@sedekaget.id' },
    update: {},
    create: {
      name: 'Pembeli Contoh',
      email: 'pembeli@sedekaget.id',
      passwordHash: buyerPassword,
      role: 'CUSTOMER'
    }
  });

  return admin;
}

async function seedStores(ownerId) {
  for (const store of stores) {
    const { categorySlugs, products, ...storeData } = store;
    const location = {
      address: store.address,
      latitude: store.latitude,
      longitude: store.longitude
    };

    const record = await prisma.store.upsert({
      where: { slug: store.slug },
      update: {
        ...storeData,
        status: 'ACTIVE',
        categories: {
          deleteMany: {},
          create: categorySlugs.map((slug) => ({ category: { connect: { slug } } }))
        },
        location: { upsert: { create: location, update: location } }
      },
      create: {
        ...storeData,
        status: 'ACTIVE',
        ownerId,
        categories: {
          create: categorySlugs.map((slug) => ({ category: { connect: { slug } } }))
        },
        location: { create: location }
      }
    });

    for (const product of products) {
      await prisma.product.upsert({
        where: { storeId_slug: { storeId: record.id, slug: product.slug } },
        update: product,
        create: { ...product, storeId: record.id }
      });
    }
  }
}

async function main() {
  await seedCategories();
  const admin = await seedUsers();
  await seedStores(admin.id);
  process.stdout.write('Seed sedek_aget selesai.\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    process.stderr.write(`Seed gagal: ${error.message}\n`);
    await prisma.$disconnect();
    process.exit(1);
  });
