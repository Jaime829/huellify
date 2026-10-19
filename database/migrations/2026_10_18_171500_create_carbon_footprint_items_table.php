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
            $table->foreignId('carbon_footprint_id')->constrained('carbon_footprints')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('emission_categories')->cascadeOnDelete();
            $table->string('activity_description', 255);
            $table->decimal('quantity', 12, 3);
            $table->foreignId('measurement_unit_id')->constrained('measurement_units')->cascadeOnDelete();
            $table->decimal('emission_factor_value', 12, 6);
            $table->decimal('emissions', 14, 4);
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
