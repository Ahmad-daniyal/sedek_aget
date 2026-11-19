<?php

namespace App\Services;

use App\Models\BusinessCategory;
use Illuminate\Database\Eloquent\Collection;

final class CategoryService
{
    public function list(): Collection
    {
        return BusinessCategory::orderBy('name')->get();
    }
}
