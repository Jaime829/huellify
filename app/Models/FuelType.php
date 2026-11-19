<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FuelType extends Model
{
    public function transportEmissionFactor()
    {
        return $this->hasMany(TransportEmissionFactor::class);
    }
}
