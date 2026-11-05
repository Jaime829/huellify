<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('name', 'slug', 'description', 'is_active')]
class HabitCategory extends Model
{
    public function habits()
    {
        return $this->hasMany(habit::class);
    }
}
