<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class AuthService
{
    public function register(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'passwordHash' => Hash::make($data['password']),
            'role' => 'CUSTOMER',
        ]);
    }

    public function login(array $data): ?User
    {
        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->passwordHash)) {
            return null;
        }

        return $user;
    }
}
