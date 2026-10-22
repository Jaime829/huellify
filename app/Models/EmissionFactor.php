<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('category_id', 'name', 'measurement_unit_id', 'value', 'source', 'valid_from', 'valid_until', 'active')]
class EmissionFactor extends Model
{
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function transportEmissionFactor()
    {
        return $this->hasOne(TransportEmissionFactor::class);
    }
    public function energyEmissionFactor()
    {
        return $this->hasOne(EnergyEmissionFactor::class);
    }
}
