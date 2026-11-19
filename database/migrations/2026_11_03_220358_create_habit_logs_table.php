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
        Schema::create('habit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_habit_id')->constrained('user_habits')->cascadeOnDelete();
            $table->date('recorded_at');
            $table->decimal('quantity', 10, 2)->nullable();
            $table->text('notes')->nullable();

            $table->unique(
                ['user_habit_id', 'recorded_at'],
                'habit_logs_user_habit_date_unique'
            );

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habit_logs');
    }
};
