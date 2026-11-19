<?php

namespace App\Listeners;

use App\Events\WelcomeUser;
use App\Notifications\WelcomeNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class NewUserVerified implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(WelcomeUser $event): void
    {
        $user = $event->user;

        Notification::send($user, new WelcomeNotification($user->name));
    }
}
