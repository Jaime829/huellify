<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('name', 'description')]
class EnergySource extends Model
{
    public function energyEmissionFactor()
    {
        return $this->hasMany(EnergyEmissionFactor::class);
    }
}
