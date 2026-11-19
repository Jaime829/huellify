<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equivalence_factors', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->text('description');
            $table->decimal('kg_co2e_per_unit', 12, 6);
            $table->string('unit_label', 50);
            $table->string('source', 255);
            $table->text('methodology');
            $table->boolean('is_active')->default(true);
            $table->text('icon')->nullable();
            $table->timestamps();
        });
        DB::statement("
            ALTER TABLE equivalence_factors
            ADD CONSTRAINT check_equivalence_factors_positive_kg_co2e
            CHECK (kg_co2e_per_unit > 0)
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equivalence_factors');
    }
};
