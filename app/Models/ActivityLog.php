<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'login_at'])]
class ActivityLog extends Model
{

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
