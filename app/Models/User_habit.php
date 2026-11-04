<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class User_habit extends Pivot
{
    protected $table = 'user_habits';
}
