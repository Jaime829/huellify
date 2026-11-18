<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('user_id', 'name', 'start_date', 'end_date')]
class Period extends Model
{


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
    public function carbonFootprint()
    {
        return $this->hasOne(CarbonFootprint::class);
    }
    public function items()
    {
        return $this->hasManyThrough(
            CarbonFootprintItem::class, // Modelo final
            CarbonFootprint::class      // Modelo puente
        );
    }
}
