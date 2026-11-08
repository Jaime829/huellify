<?php

use App\Events\WelcomeUser;
use App\Http\Controllers\Activities\EnergyActivityController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Activities\TransportActivityController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserHabitController;
use App\Models\UserHabit;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.landing.index', [
        'title' => 'Inicio'
    ]);
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
        Route::post('/habits/{habit}/adopt', [HabitController::class, 'adopt'])->name('habits.adopt');
        Route::get('/habits/explore', [HabitController::class, 'explore'])->name('habits.explore');
        Route::get('/my-habits', [HabitController::class, 'index'])->name('myhabits');
        Route::get('/my-habits/{userHabit}/logs', [UserHabitController::class, 'history'])->name('habits.recordProgress');
        Route::post('/my-habits/{userHabit}/logs', [UserHabitController::class, 'recordProgress'])->name('habits.recordProgress');
        Route::patch('/my-habits/{userHabit}', [UserHabitController::class, 'update'])->name('myhabit.update');
        Route::delete('/my-habits/{userHabit}', [UserHabitController::class, 'destroy'])->name('myhabit.destroy');
    });

Route::middleware(['auth', 'verified'])
    ->prefix('habits')
    ->name('habits.')
    ->group(function () {});

Route::middleware(['auth', 'verified'])
    ->prefix('activities')
    ->name('activities.')
    ->group(function () {
        Route::get('/', [ActivityController::class, 'index'])->name('index');
        Route::get('/create', [ActivityController::class, 'create'])->name('create');


        Route::post('/create/transport', [TransportActivityController::class, 'store'])->name('transport.store');
        Route::post('/create/energy', [EnergyActivityController::class, 'store'])->name('energy.store');
    });
