<?php

namespace Database\Seeders;

use App\Models\BusinessCategory;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    private const STORES = [
        [
            'name' => 'Warung Bu Tini',
            'slug' => 'warung-bu-tini',
            'description' => 'Warung makan rumahan dengan menu harian dan sembako lengkap untuk kebutuhan warga sekitar.',
            'phone' => '081200000001',
            'address' => 'Jl. Cihampelas No. 12, Bandung',
            'latitude' => -6.9147,
            'longitude' => 107.6098,
            'rating' => 4.8,
            'reviewCount' => 124,
            'verificationScore' => 92,
            'riskScore' => 8,
            'categorySlugs' => ['makanan', 'sembako'],
            'products' => [
                ['name' => 'Nasi Kuning Spesial', 'slug' => 'nasi-kuning-spesial', 'price' => 15000, 'stock' => 20],
                ['name' => 'Gorengan Campur (5 pcs)', 'slug' => 'gorengan-campur', 'price' => 8000, 'stock' => 40],
                ['name' => 'Beras Premium 1 kg', 'slug' => 'beras-premium-1kg', 'price' => 14000, 'stock' => 25],
            ],
        ],
        [
            'name' => 'Kopi Gerobak Asep',
            'slug' => 'kopi-gerobak-asep',
            'description' => 'Kopi keliling dengan biji lokal Bandung. Bisa pre-order untuk acara kecil dan kantor.',
            'phone' => '081200000002',
            'address' => 'Area Dago, Bandung',
            'latitude' => -6.9175,
            'longitude' => 107.6191,
            'rating' => 4.7,
            'reviewCount' => 86,
            'verificationScore' => 90,
            'riskScore' => 10,
            'categorySlugs' => ['minuman'],
            'products' => [
                ['name' => 'Kopi Susu Gula Aren', 'slug' => 'kopi-susu-gula-aren', 'price' => 12000, 'stock' => 50],
                ['name' => 'Americano Dingin', 'slug' => 'americano-dingin', 'price' => 10000, 'stock' => 50],
            ],
        ],
        [
            'name' => 'Laundry Kilat Cimahi',
            'slug' => 'laundry-kilat-cimahi',
            'description' => 'Layanan laundry harian dengan opsi antar-jemput untuk wilayah Cimahi dan sekitarnya.',
            'phone' => '081200000003',
            'address' => 'Jl. Baros No. 5, Cimahi',
            'latitude' => -6.8735,
            'longitude' => 107.542,
            'rating' => 4.6,
            'reviewCount' => 58,
            'verificationScore' => 88,
            'riskScore' => 12,
            'categorySlugs' => ['jasa'],
            'products' => [
                ['name' => 'Cuci Kering Lipat 3 kg', 'slug' => 'cuci-kering-lipat-3kg', 'price' => 21000, 'stock' => 100],
                ['name' => 'Cuci Setrika 5 kg', 'slug' => 'cuci-setrika-5kg', 'price' => 40000, 'stock' => 100],
            ],
        ],
        [
            'name' => 'Anyaman Lestari',
            'slug' => 'anyaman-lestari',
            'description' => 'Kerajinan anyaman bambu buatan tangan warga lokal untuk dekorasi rumah dan hampers.',
            'phone' => '081200000004',
            'address' => 'Jl. Sukajadi No. 8, Bandung',
            'latitude' => -6.9034,
            'longitude' => 107.618,
            'rating' => 4.9,
            'reviewCount' => 73,
            'verificationScore' => 93,
            'riskScore' => 7,
            'categorySlugs' => ['kerajinan'],
            'products' => [
                ['name' => 'Tempat Tisu Anyaman', 'slug' => 'tempat-tisu-anyaman', 'price' => 35000, 'stock' => 15],
                ['name' => 'Keranjang Hampers', 'slug' => 'keranjang-hampers', 'price' => 55000, 'stock' => 10],
            ],
        ],
        [
            'name' => 'Katering Ibu Rina',
            'slug' => 'katering-ibu-rina',
            'description' => 'Katering rumahan untuk acara keluarga, pengajian, dan rapat kantor. Pesanan custom tersedia.',
            'phone' => '081200000005',
            'address' => 'Jl. Kopo No. 21, Bandung',
            'latitude' => -6.925,
            'longitude' => 107.605,
            'rating' => 4.7,
            'reviewCount' => 41,
            'verificationScore' => 86,
            'riskScore' => 14,
            'categorySlugs' => ['makanan'],
            'products' => [
                ['name' => 'Paket Nasi Box 20 Porsi', 'slug' => 'paket-nasi-box-20', 'price' => 350000, 'stock' => 10],
                ['name' => 'Tumpeng Mini', 'slug' => 'tumpeng-mini', 'price' => 125000, 'stock' => 8],
            ],
        ],
        [
            'name' => 'Servis Elektronik Pak Dedi',
            'slug' => 'servis-elektronik-pak-dedi',
            'description' => 'Servis elektronik rumahan untuk kipas, setrika, dan mesin cuci. Bisa booking jadwal.',
            'phone' => '081200000006',
            'address' => 'Jl. Buah Batu No. 9, Bandung',
            'latitude' => -6.93,
            'longitude' => 107.63,
            'rating' => 4.5,
            'reviewCount' => 33,
            'verificationScore' => 89,
            'riskScore' => 11,
            'categorySlugs' => ['jasa'],
            'products' => [
                ['name' => 'Servis Kipas Angin', 'slug' => 'servis-kipas-angin', 'price' => 45000, 'stock' => 20],
                ['name' => 'Servis Mesin Cuci', 'slug' => 'servis-mesin-cuci', 'price' => 90000, 'stock' => 15],
            ],
        ],
    ];

    public function run(): void
    {
        $ownerId = User::where('email', 'admin@sedekaget.id')->value('id');

        foreach (self::STORES as $data) {
            $attributes = [
                'ownerId' => $ownerId,
                'name' => $data['name'],
                'description' => $data['description'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'latitude' => $data['latitude'],
                'longitude' => $data['longitude'],
                'rating' => $data['rating'],
                'reviewCount' => $data['reviewCount'],
                'verificationScore' => $data['verificationScore'],
                'riskScore' => $data['riskScore'],
                'status' => 'ACTIVE',
            ];

            $store = Store::updateOrCreate(['slug' => $data['slug']], $attributes);

            $categoryIds = BusinessCategory::whereIn('slug', $data['categorySlugs'])->pluck('id');
            $store->categories()->syncWithoutDetaching($categoryIds);

            $store->location()->updateOrCreate(
                ['storeId' => $store->id],
                [
                    'address' => $data['address'],
                    'latitude' => $data['latitude'],
                    'longitude' => $data['longitude'],
                ],
            );

            foreach ($data['products'] as $product) {
                $store->products()->updateOrCreate(
                    ['slug' => $product['slug']],
                    $product,
                );
            }
        }
    }
}
