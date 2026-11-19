<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('emission_factor_id', 'transport_type_id', 'fuel_type_id')]
class TransportEmissionFactor extends Model
{
    public function emissionFactor()
    {
        return $this->belongsTo(EmissionFactor::class);
    }

    public function transportType()
    {
        return $this->belongsTo(TransportType::class);
    }

    public function fuelType()
    {
        return $this->belongsTo(FuelType::class);
    }
}
