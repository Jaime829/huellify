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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('period_id')->constrained('periods')->cascadeOnDelete();
            $table->foreignId('activity_category_id')->constrained('activity_categories')->cascadeOnDelete();
            $table->foreignId('emission_factor_id')->constrained('emission_factors')->cascadeOnDelete();
            $table->date('activity_date');
            $table->string('description', 255);
            $table->decimal('quantity', 12, 3);
            $table->foreignId('measurement_unit_id')->constrained('measurement_units')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
