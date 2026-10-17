<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\SendResetPasswordNotification;
use App\Notifications\VerifyEmailNotification;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Enums\UserRole;
use Carbon\Carbon;
use Illuminate\Auth\Passwords\CanResetPassword;
use Override;

#[Fillable(['name', 'email', 'password', 'last_login', 'description'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    #[Override]
    public function sendEmailVerificationNotification()
    {
        return $this->notify(new VerifyEmailNotification);
    }

    #[Override]
    public function sendPasswordResetNotification($token)
    {
        return $this->notify(new SendResetPasswordNotification($token));
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function diasActivos()
    {
        return $this->activityLogs()
            ->where('login_at', '>=', Carbon::now()->subDays(30))
            ->selectRaw('DATE(login_at) as fecha')
            ->distinct()
            ->count();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'rol' => UserRole::class
        ];
    }
}
