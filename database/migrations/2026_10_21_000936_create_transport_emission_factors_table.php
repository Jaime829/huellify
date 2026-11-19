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
        Schema::create('transport_emission_factors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emission_factor_id')->unique()->constrained('emission_factors')->cascadeOnDelete();
            $table->foreignId('transport_type_id')->constrained('transport_types')->cascadeOnDelete();
            $table->foreignId('fuel_type_id')->constrained('fuel_types')->cascadeOnDelete();
            $table->unique(['transport_type_id', 'fuel_type_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transport_emission_factors');
    }
};
