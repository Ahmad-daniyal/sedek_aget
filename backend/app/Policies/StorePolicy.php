<?php

namespace App\Policies;

use App\Models\Store;
use App\Models\User;

class StorePolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Store $store): bool
    {
        return $store->status === 'ACTIVE' || $user?->role === 'ADMIN' || $user?->id === $store->ownerId;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['CUSTOMER', 'ADMIN'], true);
    }

    public function update(User $user, Store $store): bool
    {
        return $user->role === 'ADMIN' || $user->id === $store->ownerId;
    }

    public function delete(User $user, Store $store): bool
    {
        return $user->role === 'ADMIN' || $user->id === $store->ownerId;
    }
}
