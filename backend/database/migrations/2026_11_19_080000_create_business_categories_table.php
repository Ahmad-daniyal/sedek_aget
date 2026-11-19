<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('business_categories')) {
            return;
        }

        Schema::create('business_categories', function (Blueprint $table): void {
            $table->integer('id')->autoIncrement()->primary();
            $table->string('name', 80);
            $table->string('slug', 100)->unique();
            $table->string('icon', 60)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_categories');
    }
};
