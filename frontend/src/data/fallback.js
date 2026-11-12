const makanan = { id: 1, name: 'Makanan', slug: 'makanan', icon: 'bi-egg-fried' };
const minuman = { id: 2, name: 'Minuman', slug: 'minuman', icon: 'bi-cup-straw' };
const jasa = { id: 3, name: 'Jasa', slug: 'jasa', icon: 'bi-tools' };
const kerajinan = { id: 4, name: 'Kerajinan', slug: 'kerajinan', icon: 'bi-palette' };
const fashion = { id: 5, name: 'Fashion', slug: 'fashion', icon: 'bi-bag' };
const sembako = { id: 6, name: 'Sembako', slug: 'sembako', icon: 'bi-basket' };

export const fallbackCategories = [makanan, minuman, jasa, kerajinan, fashion, sembako];

export const fallbackStores = [
  {
    id: 1,
    name: 'Warung Bu Tini',
    slug: 'warung-bu-tini',
    description:
      'Warung makan rumahan dengan menu harian dan sembako lengkap untuk kebutuhan warga sekitar.',
    logoUrl: null,
    bannerUrl: null,
    status: 'ACTIVE',
    verificationScore: 92,
    riskScore: 8,
    phone: '081200000001',
    address: 'Jl. Cihampelas No. 12, Bandung',
    latitude: -6.9147,
    longitude: 107.6098,
    rating: 4.8,
    reviewCount: 124,
    categories: [makanan, sembako],
    productCount: 3
  },
  {
    id: 2,
    name: 'Kopi Gerobak Asep',
    slug: 'kopi-gerobak-asep',
    description:
      'Kopi keliling dengan biji lokal Bandung. Bisa pre-order untuk acara kecil dan kantor.',
    logoUrl: null,
    bannerUrl: null,
    status: 'ACTIVE',
    verificationScore: 90,
    riskScore: 10,
    phone: '081200000002',
    address: 'Area Dago, Bandung',
    latitude: -6.9175,
    longitude: 107.6191,
    rating: 4.7,
    reviewCount: 86,
    categories: [minuman],
    productCount: 2
  },
  {
    id: 3,
    name: 'Laundry Kilat Cimahi',
    slug: 'laundry-kilat-cimahi',
    description:
      'Layanan laundry harian dengan opsi antar-jemput untuk wilayah Cimahi dan sekitarnya.',
    logoUrl: null,
    bannerUrl: null,
    status: 'ACTIVE',
    verificationScore: 88,
    riskScore: 12,
    phone: '081200000003',
    address: 'Jl. Baros No. 5, Cimahi',
    latitude: -6.8735,
    longitude: 107.542,
    rating: 4.6,
    reviewCount: 58,
    categories: [jasa],
    productCount: 2
  },
  {
    id: 4,
    name: 'Anyaman Lestari',
    slug: 'anyaman-lestari',
    description:
      'Kerajinan anyaman bambu buatan tangan warga lokal untuk dekorasi rumah dan hampers.',
    logoUrl: null,
    bannerUrl: null,
    status: 'ACTIVE',
    verificationScore: 93,
    riskScore: 7,
    phone: '081200000004',
    address: 'Jl. Sukajadi No. 8, Bandung',
    latitude: -6.9034,
    longitude: 107.618,
    rating: 4.9,
    reviewCount: 73,
    categories: [kerajinan],
    productCount: 2
  },
  {
    id: 5,
    name: 'Katering Ibu Rina',
    slug: 'katering-ibu-rina',
    description:
      'Katering rumahan untuk acara keluarga, pengajian, dan rapat kantor. Pesanan custom tersedia.',
    logoUrl: null,
    bannerUrl: null,
    status: 'ACTIVE',
    verificationScore: 86,
    riskScore: 14,
    phone: '081200000005',
    address: 'Jl. Kopo No. 21, Bandung',
    latitude: -6.925,
    longitude: 107.605,
    rating: 4.7,
    reviewCount: 41,
    categories: [makanan],
    productCount: 2
  },
  {
    id: 6,
    name: 'Servis Elektronik Pak Dedi',
    slug: 'servis-elektronik-pak-dedi',
    description:
      'Servis elektronik rumahan untuk kipas, setrika, dan mesin cuci. Bisa booking jadwal.',
    logoUrl: null,
    bannerUrl: null,
    status: 'ACTIVE',
    verificationScore: 89,
    riskScore: 11,
    phone: '081200000006',
    address: 'Jl. Buah Batu No. 9, Bandung',
    latitude: -6.93,
    longitude: 107.63,
    rating: 4.5,
    reviewCount: 33,
    categories: [jasa],
    productCount: 2
  }
];
