<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    public function habit_category()
    {
        return $this->belongsTo(Habit_category::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_habits')
            ->using(User_habit::class)
            ->withPivot('status', 'weekly_target', 'adopted_at', 'paused_at', 'abandoned_at')
            ->withTimestamps();
    }
}
