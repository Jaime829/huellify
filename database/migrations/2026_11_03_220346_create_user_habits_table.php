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
        Schema::create('user_habits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('habit_id')->constrained('habits')->restrictOnDelete();
            $table->enum('status', ['active', 'paused', 'abandoned'])->default('active');
            $table->decimal('weekly_target', 10, 2)->unsigned();
            $table->timestamp('adopted_at');
            $table->timestamp('paused_at')->nullable();
            $table->timestamp('abandoned_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_habits');
    }
};
