<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignInRequest;
use Illuminate\Auth\Events\Authenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class LoginController
{
    public function index()
    {
        return view('auth.login');
    }
    public function store(SignInRequest $request)
    {
        $data = $request->validated();


        if (Auth::attempt($data, $request->boolean('remember'))) {

            $request->session()->regenerate();

            return redirect()->route('dashboard.index');
        }

        return back()->withErrors([
            'password' => 'Credenciales incorrectas'
        ])->onlyInput('email');
    }
}
