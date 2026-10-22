<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('period_id', 'activity_category_id', 'emission_factor_id', 'activity_date', 'description', 'quantity', 'measurement_unit_id')]
class Activity extends Model
{

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function category()
    {
        return $this->belongsTo(ActivityCategory::class, 'activity_category_id');
    }

    public function measurementUnit()
    {
        return $this->belongsTo(MeasurementUnit::class, 'measurement_unit_id');
    }

    public function transportDetail()
    {
        return $this->hasOne(TransportDetail::class);
    }

    public function energyDetail()
    {
        return $this->hasOne(EnergyDetail::class);
    }



    public function emissionFactor()
    {
        return $this->belongsTo(EmissionFactor::class, 'emission_factor_id');
    }
}
