<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BusinessCategory extends Model
{
    protected $table = 'business_categories';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'slug',
        'icon',
    ];

    public function stores(): BelongsToMany
    {
        return $this->belongsToMany(
            Store::class,
            'store_business_categories',
            'categoryId',
            'storeId',
        );
    }
}
