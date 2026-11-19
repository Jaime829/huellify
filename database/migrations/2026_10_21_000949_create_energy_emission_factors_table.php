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
        Schema::create('energy_emission_factors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emission_factor_id')->unique()->constrained('emission_factors')->cascadeOnDelete();
            $table->foreignId('energy_source_id')->constrained('energy_sources')->cascadeOnDelete();
            $table->unique('energy_source_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('energy_emission_factors');
    }
};
