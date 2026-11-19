<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Prisma schema tidak menyimpan riwayat migrasi. Guard ini membuat
        // migrasi aman dijalankan pada database yang sudah berisi data.
        if (Schema::hasTable('users')) {
            return;
        }

        Schema::create('users', function (Blueprint $table): void {
            $table->integer('id')->autoIncrement()->primary();
            $table->string('name', 80);
            $table->string('email', 120)->unique();
            $table->string('phone', 20)->nullable();
            $table->string('passwordHash', 255);
            $table->enum('role', ['ADMIN', 'CUSTOMER'])->default('CUSTOMER');
            $table->string('avatarUrl', 255)->nullable();
            $table->dateTime('createdAt', 3)->useCurrent();
            $table->dateTime('updatedAt', 3)->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
