<?php

namespace App\Policies;

use App\Models\CarbonFootprint;
use App\Models\Period;
use App\Models\User;

class PeriodPolicy
{
    /**
     * Create a new policy instance.
     */
    public function view(User $user, Period $period): bool
    {
        return $user->id === $period->user_id;
    }
}
