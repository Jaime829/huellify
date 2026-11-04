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
        Schema::create('habits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('habit_category_id')->constrained('habit_categories')->restrictOnDelete();
            $table->foreignId('measurement_unit_id')->nullable()->constrained('measurement_units')->restrictOnDelete();
            $table->string('name', 150);
            $table->string('slug', 170);
            $table->text('description');
            $table->text('instructions');
            $table->string('icon', 100);
            $table->enum('tracking_type', ['boolean', 'quantity']);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habits');
    }
};
