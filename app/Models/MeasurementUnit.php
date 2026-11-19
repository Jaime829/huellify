<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MeasurementUnit extends Model
{
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function habits()
    {
        return $this->hasMany(Habit::class);
    }

    public function EmissionFactors()
    {
        return $this->belongsTo(EmissionFactor::class, 'measurement_unit_id', 'id');
    }
}
