<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_returns_user_without_password_hash(): void
    {
        $this->postJson('/api/auth/register', [
            'name' => 'Uji Pembeli',
            'email' => 'uji.pembeli@example.com',
            'phone' => '08123456789',
            'password' => 'rahasia123',
        ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.email', 'uji.pembeli@example.com')
            ->assertJsonPath('data.user.role', 'CUSTOMER')
            ->assertJsonMissingPath('data.user.passwordHash');

        $this->assertDatabaseHas('users', ['email' => 'uji.pembeli@example.com']);
    }

    public function test_validation_error_keeps_frontend_detail_shape(): void
    {
        $this->postJson('/api/auth/register', [
            'name' => 'A',
            'email' => 'bukan-email',
            'password' => 'pendek',
        ])
            ->assertUnprocessable()
            ->assertJsonPath('success', false)
            ->assertJsonPath('message', 'Data tidak valid')
            ->assertJsonStructure(['details' => [['path', 'message']]]);
    }

    public function test_login_and_me_work_with_session(): void
    {
        $this->postJson('/api/auth/register', [
            'name' => 'Uji Login',
            'email' => 'uji.login@example.com',
            'password' => 'rahasia123',
        ])->assertCreated();

        $this->postJson('/api/auth/login', [
            'email' => 'uji.login@example.com',
            'password' => 'rahasia123',
        ])
            ->assertOk()
            ->assertJsonPath('data.user.email', 'uji.login@example.com');

        $this->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('data.user.email', 'uji.login@example.com');

        $this->postJson('/api/auth/logout')->assertOk();

        // Satu instance aplikasi dipakai ulang untuk setiap request tiruan;
        // RequestGuard menyimpan user hasil resolusi pertama.
        Auth::forgetGuards();

        $this->getJson('/api/auth/me')->assertUnauthorized();
    }

    public function test_unauthenticated_request_without_json_accept_returns_envelope(): void
    {
        $this->get('/api/auth/me', ['Accept' => '*/*'])
            ->assertUnauthorized()
            ->assertJsonPath('success', false)
            ->assertJsonPath('message', 'Silakan masuk terlebih dahulu');
    }

    public function test_wrong_password_returns_401(): void
    {
        $this->postJson('/api/auth/register', [
            'name' => 'Uji Salah',
            'email' => 'uji.salah@example.com',
            'password' => 'rahasia123',
        ])->assertCreated();

        $this->postJson('/api/auth/login', [
            'email' => 'uji.salah@example.com',
            'password' => 'password-salah',
        ])
            ->assertUnauthorized()
            ->assertJsonPath('success', false)
            ->assertJsonPath('message', 'Email atau password salah');
    }
}
