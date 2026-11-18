<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('name', 'description', 'kg_co2e_per_unit', 'unit_label', 'source', 'methodology', 'is_active', 'icon')]
class EquivalenceFactor extends Model
{
    //
}
