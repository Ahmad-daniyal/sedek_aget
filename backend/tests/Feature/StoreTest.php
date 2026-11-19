<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_store_list_uses_frontend_contract(): void
    {
        $this->getJson('/api/stores')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(6, 'data')
            ->assertJsonStructure([
                'data' => [[
                    'id', 'name', 'slug', 'description', 'logoUrl', 'bannerUrl',
                    'status', 'verificationScore', 'riskScore', 'phone', 'address',
                    'latitude', 'longitude', 'rating', 'reviewCount',
                    'categories' => [['id', 'name', 'slug', 'icon']],
                    'productCount',
                ]],
            ]);
    }

    public function test_store_list_can_be_filtered(): void
    {
        $this->getJson('/api/stores?search=kopi')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'kopi-gerobak-asep');

        $this->getJson('/api/stores?category=jasa')
            ->assertOk()
            ->assertJsonCount(2, 'data');
    }

    public function test_store_detail_returns_products(): void
    {
        $this->getJson('/api/stores/warung-bu-tini')
            ->assertOk()
            ->assertJsonPath('data.slug', 'warung-bu-tini')
            ->assertJsonPath('data.productCount', 3)
            ->assertJsonCount(3, 'data.products');
    }

    public function test_unknown_store_returns_404(): void
    {
        $this->getJson('/api/stores/tidak-ada')
            ->assertNotFound()
            ->assertJsonPath('success', false)
            ->assertJsonPath('message', 'Toko tidak ditemukan');
    }
}
