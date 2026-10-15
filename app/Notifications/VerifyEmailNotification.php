<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class VerifyEmailNotification extends Notification
{
    use Queueable;


    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $verificationUrl = URL::temporarySignedRoute('verification.verify', now()->addMinutes(60), [
            'id' => $notifiable->getKey(),
            'hash' => sha1($notifiable->getEmailForVerification())
        ]);

        return (new MailMessage)
            ->view('emails.verify-account', [
                'url' => $verificationUrl
            ])
            ->subject("Confirma tu cuenta en Huellify");
            // ->greeting('Hola!')
            // ->line('Gracias por registrarte en Huellify. Tu cuenta ya esta lista, solo debes confirmarla')
            // ->action('Confirmar cuenta', $verificationUrl)
            // ->line('Si no creaste esta cuenta, puedes ignorar este mensaje')
            // ->salutation("Saludos, Huellify");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
