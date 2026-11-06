<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable('user_id', 'habit_id', 'status', 'weekly_target', 'adopted_at', 'paused_at', 'abandoned_at')]
class UserHabit extends Pivot
{
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $table = 'user_habits';
}
