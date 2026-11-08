<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('name', 'slug', 'recommended_weekly_target', 'description', 'instructions', 'icon', 'tracking_type', 'is_active')]
class Habit extends Model
{
    public function habit_category()
    {
        return $this->belongsTo(HabitCategory::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_habits')
            ->using(UserHabit::class)
            ->withPivot('status', 'weekly_target', 'adopted_at', 'paused_at', 'abandoned_at')
            ->withTimestamps();
    }


    // public function

    public function measurement_unit()
    {
        return $this->belongsTo(MeasurementUnit::class);
    }
}
