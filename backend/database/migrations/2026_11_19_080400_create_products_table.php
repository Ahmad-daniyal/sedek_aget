<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('products')) {
            return;
        }

        Schema::create('products', function (Blueprint $table): void {
            $table->integer('id')->autoIncrement()->primary();
            $table->integer('storeId');
            $table->string('name', 120);
            $table->string('slug', 140);
            $table->text('description')->nullable();
            $table->integer('price');
            $table->integer('stock')->default(0);
            $table->string('imageUrl', 255)->nullable();
            $table->boolean('isActive')->default(true);
            $table->dateTime('createdAt', 3)->useCurrent();
            $table->dateTime('updatedAt', 3)->useCurrent()->useCurrentOnUpdate();

            $table->unique(['storeId', 'slug']);
            $table->foreign('storeId')->references('id')->on('stores')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
