<?php

namespace App\Http\Controllers;

use App\Models\HabitLog;
use App\Models\UserHabit;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserHabitController
{
    public function recordProgress(Request $request, UserHabit $userHabit)
    {

        $minDate = explode(' ', $userHabit->adopted_at)[0];


        $data = $userHabit->habit->tracking_type === 'boolean' ? $request->validate(
            [
                'recorded_at' => ['date', 'required', "after_or_equal:{$minDate}", 'before_or_equal:today'],
                'notes' => ['string', 'nullable']
            ]
        ) : $request->validate([
            'recorded_at' => ['date', 'required', "after_or_equal:{$minDate}", 'before_or_equal:today'],
            'quantity' => ['required', 'numeric'],
            'notes' => ['string', 'nullable']
        ]);


        try {
            $userHabit->habitLogs()->create($data);
            return  redirect()->route('dashboard.myhabits')->with('status', "Avance registrado con exito");
        } catch (QueryException $e) {
            if (
                $e->getCode() === '23505' &&
                str_contains($e->getMessage(), 'habit_logs_user_habit_date_unique')
            ) {
                return back()->with(
                    'error',
                    'Ya registraste un avance para este hábito en la fecha seleccionada.',
                );
            }
        }
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

    public function history(UserHabit $userHabit)
    {
        Gate::authorize('viewHistory', $userHabit);
        $user = Auth::user();
        $userHabit->load(['habit.habit_category']);

        $userHabitActions = HabitLog::where('user_habit_id', '=', $userHabit->id)->whereHas('userHabit', function ($query) use ($user) {
            return $query->where('user_id', $user->id);
        })
            ->latest()->with(['userHabit.habit'])->paginate(3);



        return Inertia::render('Dashboard/Habits/UserHabitHistory', [
            'userHabit' => $userHabit,
            'userHabitActions' => $userHabitActions,
            'monthActions' => HabitLog::whereHas('userHabit', function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
                ->where('user_habit_id', '=', $userHabit->id)
                ->whereMonth('recorded_at', now()->month)
                ->whereYear('recorded_at', now()->year)
                ->count(),
            'totalActions' => HabitLog::whereHas('userHabit', function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })->where('user_habit_id', '=', $userHabit->id)->count(),
            'dateLastAction' => HabitLog::where('user_habit_id', '=', $userHabit->id)->latest()->first(['recorded_at']),
            'dateFirstAction' => HabitLog::where('user_habit_id', '=', $userHabit->id)->oldest()->first(['recorded_at'])
        ]);
    }

    public function destroy(UserHabit $userHabit)
    {
        Gate::authorize('delete', $userHabit);

        return $userHabit->delete() ? back()->with('status', 'Hábito eliminado con exito') : back()->with('error', 'Hubo un error al eliminar el hábito');
    }
}
