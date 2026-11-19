<?php

namespace App\Services;

use App\Models\Store;
use Illuminate\Database\Eloquent\Collection;

final class StoreService
{
    public function list(?string $search, ?string $category): Collection
    {
        $query = Store::query()
            ->with('categories')
            ->withCount('products')
            ->where('status', 'ACTIVE');

        if ($search) {
            $query->where(function ($builder) use ($search): void {
                $builder->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        if ($category) {
            $query->whereHas('categories', fn ($builder) => $builder->where('slug', $category));
        }

        return $query
            ->orderByDesc('verificationScore')
            ->orderBy('name')
            ->get();
    }

    public function getBySlug(string $slug): Store
    {
        return Store::where('slug', $slug)
            ->with('categories')
            ->with(['products' => fn ($builder) => $builder->where('isActive', true)->orderBy('name')])
            ->withCount('products')
            ->firstOrFail();
    }
}
