<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('stores')) {
            return;
        }

        Schema::create('stores', function (Blueprint $table): void {
            $table->integer('id')->autoIncrement()->primary();
            $table->integer('ownerId');
            $table->string('name', 120);
            $table->string('slug', 140)->unique();
            $table->text('description')->nullable();
            $table->string('logoUrl', 255)->nullable();
            $table->string('bannerUrl', 255)->nullable();
            $table->enum('status', ['PENDING', 'ACTIVE', 'SUSPENDED', 'CLOSED'])->default('PENDING');
            $table->integer('verificationScore')->nullable();
            $table->integer('riskScore')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('address', 255)->nullable();
            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();
            $table->double('rating')->default(0);
            $table->integer('reviewCount')->default(0);
            $table->dateTime('createdAt', 3)->useCurrent();
            $table->dateTime('updatedAt', 3)->useCurrent()->useCurrentOnUpdate();

            $table->index('status');
            $table->foreign('ownerId')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
