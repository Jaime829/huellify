<?php

use App\Events\WelcomeUser;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('landing');

Route::middleware('guest')
    ->prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::get('/login', [LoginController::class, 'index'])->name('login');
        Route::post('/login', [LoginController::class, 'store'])->name('login.store');

        Route::get('/register', [RegisterController::class, 'index'])->name('register');
        Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
    });

Route::get('/auth/forgot-password', [PasswordController::class, 'create'])->name('password.request');
route::post('auth/forgot-password', [PasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/auth/reset-password/{token}', [PasswordController::class, 'showResetForm'])->middleware('guest')->name('password.reset');
Route::post('/auth/reset-password', [PasswordController::class, 'update'])->middleware('guest')->name('password.update');

Route::post('/auth/logout', [LogoutController::class, 'store'])->middleware('auth')->name('auth.logout');

Route::get('auth/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    event(new WelcomeUser($request->user()));
    return redirect()->route('dashboard.index')->with('success', 'Email confirmado con exito, Bienvenido');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::get('auth/email/notice', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::post('auth/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('success', 'Email reenviado con exito');
})->middleware(['auth', 'throttle:1,1'])->name('verification.send');

Route::middleware(['auth', 'verified'])
    ->prefix('user')
    ->name('user.')
    ->group(function () {
        Route::put('/update/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/delete/{user}', [UserController::class, 'destroy'])->name('destroy');
    });


Route::middleware(['auth', 'verified'])
    ->prefix('dashboard')
    ->name('dashboard.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('index');

        Route::get('/profile', [UserController::class, 'index'])->name('profile');
    });
