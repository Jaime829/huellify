<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('category_id', 'name', 'measurement_unit_id', 'value', 'source', 'valid_from', 'valid_until', 'active')]
class EmissionFactor extends Model
{

    public function activityCategory()
    {
        return $this->hasOne(ActivityCategory::class, 'id', 'category_id');
    }

    public function transportEmissionFactor()
    {
        return $this->hasOne(TransportEmissionFactor::class);
    }
    public function energyEmissionFactor()
    {
        return $this->hasOne(EnergyEmissionFactor::class);
    }

    public function measurementUnit()
    {
        return $this->hasOne(MeasurementUnit::class, 'id', 'measurement_unit_id');
    }
}
