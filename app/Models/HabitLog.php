<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('user_habit_id', 'recorded_at', 'quantity', 'notes')]
class HabitLog extends Model
{

    public function userHabit()
    {
        return $this->belongsTo(UserHabit::class);
    }
}
