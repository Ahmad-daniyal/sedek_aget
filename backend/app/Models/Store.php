<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Store extends Model
{
    use HasFactory;

    protected $table = 'stores';

    public const CREATED_AT = 'createdAt';

    public const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'ownerId',
        'name',
        'slug',
        'description',
        'logoUrl',
        'bannerUrl',
        'status',
        'verificationScore',
        'riskScore',
        'phone',
        'address',
        'latitude',
        'longitude',
        'rating',
        'reviewCount',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'string',
            'verificationScore' => 'integer',
            'riskScore' => 'integer',
            'latitude' => 'float',
            'longitude' => 'float',
            'rating' => 'float',
            'reviewCount' => 'integer',
        ];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }

    public function location(): HasOne
    {
        return $this->hasOne(StoreLocation::class, 'storeId');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            BusinessCategory::class,
            'store_business_categories',
            'storeId',
            'categoryId',
        );
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'storeId');
    }
}
