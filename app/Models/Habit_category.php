<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habit_category extends Model
{
    public function habits()
    {
        return $this->hasMany(habit::class);
    }
}
