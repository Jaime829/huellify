<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransportType extends Model
{
    public function transportEmissionFactor()
    {
        return $this->hasMany(TransportEmissionFactor::class);
    }
}
