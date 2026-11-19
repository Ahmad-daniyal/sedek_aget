<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('store_locations')) {
            return;
        }

        Schema::create('store_locations', function (Blueprint $table): void {
            $table->integer('id')->autoIncrement()->primary();
            $table->integer('storeId')->unique();
            $table->string('address', 255);
            $table->double('latitude');
            $table->double('longitude');

            $table->foreign('storeId')->references('id')->on('stores')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_locations');
    }
};
