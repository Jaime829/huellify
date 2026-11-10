<?php

namespace App\Http\Controllers;

use App\Models\HabitLog;
use App\Models\UserHabit;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserHabitController
{

    public function show(UserHabit $userHabit)
    {
        $startOfWeek = now()->startOfWeek(Carbon::MONDAY);
        $endOfWeek = now()->endOfWeek(Carbon::SUNDAY);
        $userHabit->load(['habit', 'habit.habit_category']);

        $progress = $userHabit->habit->tracking_type === 'quantity' ? $userHabit->habitLogs()
            ->whereBetween('recorded_at', [
                $startOfWeek->toDateString(),
                $endOfWeek->toDateString()
            ])
            ->sum('quantity') : $userHabit->habitLogs()
            ->whereBetween('recorded_at', [
                $startOfWeek->toDateString(),
                $endOfWeek->toDateString()
            ])->count();

        return Inertia::render('Dashboard/Habits/ShowMyHabit', [
            'userHabit' => $userHabit,
            'habitLogs' => fn() => $userHabit->habitLogs()
                ->whereBetween('recorded_at', [
                    $startOfWeek->toDateString(),
                    $endOfWeek->toDateString()
                ])
                ->get(),
            'progress' => fn() => $progress
        ]);
    }

    public function update(Request $request, UserHabit $userHabit)
    {
        Gate::authorize('update', $userHabit);


        if (isset($request->all()['weekly_target'])) {
            $data = $request->validate([
                'weekly_target' => ['required', 'numeric']
            ]);

            if ($data['weekly_target'] === $userHabit->weekly_target) {
                return back()->with('noChange', 'El objetivo semanal ya está configurado con ese valor. Ingresa una cantidad diferente si deseas modificarlo.');
            }

            return $userHabit->update([
                'weekly_target' => $data['weekly_target']
            ]) ? back()->with('status', 'Objetivo actualizado con exito') : back()->with('error', 'Hubo un error al actualizar el objetivo');
        }

        if (isset($request->all()['action'])) {
            $data = $request->validate([
                'action' => ['in:pause,abandon,resume,readopt', 'required']
            ]);

            switch ($data['action']) {
                case 'pause':

                    if ($userHabit->status === 'abandoned') {
                        return back()->with('error', 'No puedes pausar un hábito abandonado.');
                    }
                    if ($userHabit->status === 'paused') {
                        return back()->with('noChange', 'No puedes pausar un hábito que ya esta pausado.');
                    }

                    return $userHabit->update([
                        'status' => 'paused',
                        'paused_at' => now(),
                        'abandoned_at' => null
                    ]) ? back()->with('status', 'Hábito pausado con exito.') : back()->with('error', 'Hubo un error al pausar el hábito.');

                case 'abandon':
                    return $userHabit->update([
                        'status' => 'abandoned',
                        'paused_at' => null,
                        'abandoned_at' => now()
                    ]) ? back()->with('status', 'Hábito abandonado con exito.') : back()->with('error', 'Hubo un error al abandonar el hábito.');

                case 'resume':
                    if ($userHabit->status !== 'paused') {
                        return back()->with('error', 'Accion no válida.');
                    }

                    return $userHabit->update([
                        'status' => 'active',
                        'paused_at' => null,
                        'abandoned_at' => null
                    ]) ? back()->with('status', 'Hábito reanudado con exito.') : back()->with('error', 'Hubo un error al reanudadar el hábito.');

                case 'readopt':
                    if ($userHabit->status !== 'abandoned') {
                        return back()->with('error', 'Accion no válida.');
                    }
                    return $userHabit->update([
                        'status' => 'active',
                        'paused_at' => null,
                        'abandoned_at' => null
                    ]) ? back()->with('status', 'Hábito readoptado con exito.') : back()->with('error', 'Hubo un error al reanudadar el hábito.');

                default:
                    return back()->with('error', 'Accion no válida.');
            }
        }
    }

    public function destroy(UserHabit $userHabit)
    {
        Gate::authorize('delete', $userHabit);

        return $userHabit->delete() ? back()->with('status', 'Hábito eliminado con exito') : back()->with('error', 'Hubo un error al eliminar el hábito');
    }
}
