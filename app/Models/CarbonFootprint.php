<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('period_id', 'total_emissions', 'calculated_at')]
class CarbonFootprint extends Model
{
    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function items()
    {
        return $this->hasMany(CarbonFootprintItem::class);
    }
}
