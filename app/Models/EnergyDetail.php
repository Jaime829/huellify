<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('activity_id', 'energy_source_id')]
class EnergyDetail extends Model
{
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
