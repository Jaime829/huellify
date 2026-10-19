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
        Schema::create('emission_factors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('activity_categories')->cascadeOnDelete();
            $table->string('name', 150);
            $table->foreignId('measurement_unit_id')->constrained('measurement_units');
            $table->decimal('value', 12, 6);
            $table->string('source', 255);
            $table->date('valid_from');
            $table->date('valid_until')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emission_factors');
    }
};
