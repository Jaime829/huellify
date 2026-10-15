<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Support\Str;

class PasswordController
{
    public function create()
    {
        return view('auth.password-email');
    }

    public function sendResetLinkEmail(Request $request)
    {
        $data = $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($data);

        return  $status === Password::RESET_LINK_SENT ?
            back()->with(['status' => __('passwords.sent')])
            : back()->withErrors(['email' => __('passwords.user')]);
    }
    public function showResetForm(string $token)
    {

        return view('auth.reset-password', [
            'token' => $token
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => [
                'confirmed',
                'required',
                RulesPassword::min(8)
                    ->letters()
                    ->mixedCase()
                    ->symbols()
                    ->numbers()
                    ->uncompromised()
            ]
        ]);

        $status = Password::reset($data, function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        });

        return $status === Password::PASSWORD_RESET ?
            redirect()->route('auth.login')->with(['status' => __($status)]) :
            redirect()->route('auth.login')->withErrors([
                'email' => __($status)
            ]);
    }
}
