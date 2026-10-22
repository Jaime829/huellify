<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnergyDetail extends Model
{
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
