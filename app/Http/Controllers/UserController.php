<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserDeleteRequest;
use App\Http\Requests\UserUpdateRequest;
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
        return Inertia::render('Dashboard/Profile');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        Gate::authorize('update', $user);

        $data = $request->validated();

        $user->update($data);

        return back()->with('succes', 'Perfil actualizado con exito');
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
            back()->withErrors([
                'password' => 'Password incorrecta'
            ]);
    }
}
