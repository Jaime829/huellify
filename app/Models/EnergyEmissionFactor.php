<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnergyEmissionFactor extends Model
{
    public function emissionFactor()
    {
        return $this->belongsTo(EmissionFactor::class);
    }

    public function energySource()
    {
        return $this->belongsTo(EnergySource::class);
    }
}
