<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable('user_id', 'recommendation_id', 'status', 'adopted_at')]
class UserRecommendation extends Pivot
{
    protected $table = 'user_recommendations';

    public function recommendation()
    {
        return $this->belongsTo(Recommendation::class);
    }
}
