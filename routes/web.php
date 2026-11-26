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
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmissionFactorController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\HabitLogController;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserHabitController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.landing.index', [
        'title' => 'Inicio'
    ]);
})->name('landing');

Route::view('/about', 'pages.about.index', ['title' => 'Acerca de Huellify'])->name('about');
Route::view('/terms', 'pages.legal.terms', ['title' => 'Términos y condiciones'])->name('terms');
Route::view('/privacy', 'pages.legal.privacy', ['title' => 'Política de privacidad'])->name('privacy');

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


        Route::get('/history', [PeriodController::class, 'index'])->name('history');
        Route::get('/history/{period}', [PeriodController::class, 'show'])->name('history.show');

        Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
        Route::get('/activities/create', [ActivityController::class, 'create'])->name('activities.create');


        Route::post('/activities/create/transport', [TransportActivityController::class, 'store'])->name('activities.transport.store');
        Route::put('/activities/{activity}/update/transport', [TransportActivityController::class, 'update'])->name('activities.transport.update');
        Route::delete('/activities/{activity}/delete/transport', [TransportActivityController::class, 'destroy'])->name('activities.transport.destroy');
        Route::post('/activities/create/energy', [EnergyActivityController::class, 'store'])->name('activities.energy.store');
        Route::put('/activities/{activity}/update/energy', [EnergyActivityController::class, 'update'])->name('activities.energy.update');
        Route::delete('/activities/{activity}/delete/energy', [EnergyActivityController::class, 'destroy'])->name('activities.energy.destroy');

        Route::post('/habits/{habit}/adopt', [HabitController::class, 'adopt'])->name('habits.adopt');
        Route::get('/habits/explore', [HabitController::class, 'explore'])->name('habits.explore');
        Route::get('/my-habits', [HabitController::class, 'index'])->name('myhabits');
        Route::get('/my-habits/{userHabit}/logs', [HabitLogController::class, 'index'])->name('habits.recordProgress');
        Route::post('/my-habits/{userHabit}/logs', [HabitLogController::class, 'store'])->name('habits.recordProgressStore');

        Route::scopeBindings()->group(function () {
            Route::put('/my-habits/{userHabit}/logs/{habitLog}', [HabitLogController::class, 'update'])->name('habits.updateLog');
            Route::delete('/my-habits/{userHabit}/logs/{habitLog}', [HabitLogController::class, 'destroy'])->name('habits.destroyLog');
        });

        Route::get('/my-habits/{userHabit}', [UserHabitController::class, 'show'])->name('myhabit.show');
        Route::patch('/my-habits/{userHabit}', [UserHabitController::class, 'update'])->name('myhabit.update');
        Route::delete('/my-habits/{userHabit}', [UserHabitController::class, 'destroy'])->name('myhabit.destroy');

        Route::get('/recommendations', [RecommendationController::class, 'index'])->name('recommendations');
        Route::patch('/recommendations/{recommendation}/status', [RecommendationController::class, 'updateStatus'])->name('recommendations.updateStatus');
    });


Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('index');

        Route::get('/emission-factors', [EmissionFactorController::class, 'index'])->name('emissions.index');
        Route::post('/emission-factors', [EmissionFactorController::class, 'store'])->name('emissions.store');
        Route::put('/emission-factors/{emissionFactor}', [EmissionFactorController::class, 'update'])->name('emissions.update');
        Route::get('/emission-factors/{emissionFactor}', [EmissionFactorController::class, 'show'])->name('emissions.show');


        Route::get('/recommendations/metrics', [AdminController::class, 'recommendationsMetrics'])->name('recommendations.metrics');
    });


// Route::middleware(['auth', 'verified'])
//     ->prefix('activities')
//     ->name('activities.')
//     ->group(function () {
//         Route::get('/', [ActivityController::class, 'index'])->name('index');
//         Route::get('/create', [ActivityController::class, 'create'])->name('create');


//         Route::post('/create/transport', [TransportActivityController::class, 'store'])->name('transport.store');
//         Route::post('/create/energy', [EnergyActivityController::class, 'store'])->name('energy.store');
//     });
