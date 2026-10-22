<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('name', 'slug', 'description')]
class ActivityCategory extends Model
{
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
