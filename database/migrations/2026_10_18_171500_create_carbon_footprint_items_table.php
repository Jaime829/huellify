<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carbon_footprint_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('carbon_footprint_id')->constrained()->cascadeOnDelete();
            $table->string('category');
            $table->text('activity_description');
            $table->decimal('quantity');
            $table->string('unit');
            $table->decimal('emission_factor_value');
            $table->decimal('emissions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carbon_footprint_items');
    }
};
