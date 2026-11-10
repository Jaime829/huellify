<?php

namespace App\Http\Controllers;

use App\Models\HabitLog;
use App\Models\UserHabit;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class HabitLogController
{
    public function index(UserHabit $userHabit)
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

    public function store(Request $request, UserHabit $userHabit)
    {
        Gate::authorize('createLog', $userHabit);

        $minDate = explode(' ', $userHabit->adopted_at)[0];
        $numberActions = $userHabit->habitLogs()->count();


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


        if ($numberActions >= $userHabit->weekly_target) {
            return back()->with('noChange', 'Ya haz alcanzado tu objetivo semanal.');
        }


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


    public function update(Request $request, UserHabit $userHabit, HabitLog $habitLog)
    {
        Gate::authorize('update', $userHabit);


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
            return $habitLog->update($data) ? back()->with('status', 'Registro actualizado con exito') : back()->with('error', 'Hubo un error al actualizar el registro');
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

    public function destroy(UserHabit $userHabit, HabitLog $habitLog)
    {
        Gate::authorize('delete', $userHabit);

        return $habitLog->delete() ? back()->with('status', 'Registro eliminado con exito') : back()->with('error', 'Hubo un error al eliminar el registro');
    }
}
