<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $table = 'users';

    // Prisma memakai nama kolom camelCase; nama fisik dipertahankan agar
    // database lama tidak perlu diubah.
    public const CREATED_AT = 'createdAt';

    public const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'passwordHash',
        'role',
        'avatarUrl',
    ];

    protected $hidden = [
        'passwordHash',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'role' => 'string',
        ];
    }

    public function getAuthPassword(): string
    {
        return $this->passwordHash;
    }

    public function stores(): HasMany
    {
        return $this->hasMany(Store::class, 'ownerId');
    }
}
