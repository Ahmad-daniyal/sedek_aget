<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model tabel pivot. Relasi utama memakai belongsToMany pada Store dan
 * BusinessCategory; model ini dipakai untuk query pivot eksplisit/admin.
 */
class StoreBusinessCategory extends Model
{
    protected $table = 'store_business_categories';

    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = 'storeId';

    protected $fillable = [
        'storeId',
        'categoryId',
    ];
}
