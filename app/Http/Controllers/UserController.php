<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Period;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class UserController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $actualPeriod = Period::with(['carbonFootprint'])->where('user_id', '=', $user->id)->latest()->first();

        return Inertia::render('Dashboard/Profile', [
            'actualPeriod' => $actualPeriod
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        Gate::authorize('update', $user);

        $data = $request->validated();

        return $user->update($data) ? back()->with('status', 'Perfil actualizado con exito') : back()->with('error', 'Hubo un error al actualizar tu perfil.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserDeleteRequest $request, User $user)
    {
        Gate::authorize('delete', $user);

        $request->validated();

        $status = $user->delete();

        return $status ? Inertia::location(route('auth.login')) :
            back()->with(
                'error',
                'Password incorrecta'
            );
    }
}
