<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@sedekaget.id'],
            [
                'name' => 'Admin sedek_aget',
                'passwordHash' => Hash::make('Admin123!'),
                'role' => 'ADMIN',
            ],
        );

        User::updateOrCreate(
            ['email' => 'pembeli@sedekaget.id'],
            [
                'name' => 'Pembeli Contoh',
                'passwordHash' => Hash::make('Buyer123!'),
                'role' => 'CUSTOMER',
            ],
        );
    }
}
