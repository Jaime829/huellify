<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserHabit;
use Illuminate\Auth\Access\Response;

class UserHabitPolicy
{



    public function viewHistory(User $user, UserHabit $userHabit): bool
    {
        return $user->id === $userHabit->user_id;
    }


    public function createLog(User $user, UserHabit $userHabit)
    {
        return $user->id === $userHabit->user_id;
    }

    public function update(User $user, UserHabit $userHabit): bool
    {
        return $user->id === $userHabit->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, UserHabit $userHabit): bool
    {
        return $user->id === $userHabit->user_id;
    }
}
