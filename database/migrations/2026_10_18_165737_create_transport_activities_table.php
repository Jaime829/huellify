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
        Schema::create('transport_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('period_id')->cascadeOnDelete();
            $table->foreignId('transport_type_id')->cascadeOnDelete();
            $table->foreignId('fuel_type_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('distance');
            $table->string('distance_unit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transport_activities');
    }
};
