<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('category_id', 'title', 'description', 'priority')]
class Recommendation extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_recommendations')
            ->using(UserRecommendation::class)
            ->withPivot('user_id', 'recommendation_id', 'status')
            ->withTimestamps();
    }
}
