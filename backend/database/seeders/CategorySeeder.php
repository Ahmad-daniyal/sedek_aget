<?php

namespace Database\Seeders;

use App\Models\BusinessCategory;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    private const CATEGORIES = [
        ['name' => 'Makanan', 'slug' => 'makanan', 'icon' => 'bi-egg-fried'],
        ['name' => 'Minuman', 'slug' => 'minuman', 'icon' => 'bi-cup-straw'],
        ['name' => 'Jasa', 'slug' => 'jasa', 'icon' => 'bi-tools'],
        ['name' => 'Kerajinan', 'slug' => 'kerajinan', 'icon' => 'bi-palette'],
        ['name' => 'Fashion', 'slug' => 'fashion', 'icon' => 'bi-bag'],
        ['name' => 'Sembako', 'slug' => 'sembako', 'icon' => 'bi-basket'],
    ];

    public function run(): void
    {
        foreach (self::CATEGORIES as $category) {
            BusinessCategory::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
