<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('carbon_footprint_id', 'activity_id', 'category_id', 'activity_description', 'quantity', 'measurement_unit_id', 'emission_factor_value', 'emissions')]
class CarbonFootprintItem extends Model
{
    public function carbonFootprint()
    {
        return $this->belongsTo(CarbonFootprint::class);
    }
}
