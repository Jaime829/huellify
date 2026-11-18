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
        Schema::create('recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('activity_categories')->cascadeOnDelete();
            $table->string('title', 150);
            $table->text('description');
            $table->decimal('estimated_savings', 10, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->text('icon')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommendations');
    }
};
