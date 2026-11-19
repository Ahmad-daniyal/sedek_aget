<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('store_business_categories')) {
            return;
        }

        Schema::create('store_business_categories', function (Blueprint $table): void {
            $table->integer('storeId');
            $table->integer('categoryId');

            $table->primary(['storeId', 'categoryId']);
            $table->foreign('storeId')->references('id')->on('stores')->cascadeOnDelete();
            $table->foreign('categoryId')->references('id')->on('business_categories')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_business_categories');
    }
};
