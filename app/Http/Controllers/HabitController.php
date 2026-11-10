<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitCategory;
use App\Models\HabitLog;
use App\Models\User_habit;
use App\Models\UserHabit;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HabitController
{
    public function index(Request $request)
    {

        $user = Auth::user();
        $startOfWeek = now()->startOfWeek(Carbon::MONDAY);
        $endOfWeek = now()->endOfWeek(Carbon::SUNDAY);

        $filter_status = $request->query('status');

        $userHabits = $user->habits()->when($filter_status && $filter_status !== 'all', function ($query) use ($filter_status) {
            $query->where('user_habits.status', $filter_status);
        })->get();

        $userHabitsFormateado = $userHabits->map(
            function ($habit) use ($startOfWeek, $endOfWeek) {
                $habit->habit_category;
                $habit->progress = $habit->tracking_type === 'quantity' ? $habit->pivot->habitLogs()->whereBetween('recorded_at', [
                    $startOfWeek->toDateString(),
                    $endOfWeek->toDateString()
                ])
                    ->sum('quantity') : $habit->pivot->habitLogs()
                    ->whereBetween('recorded_at', [
                        $startOfWeek->toDateString(),
                        $endOfWeek->toDateString()
                    ])->count();

                $habit->lastRecord = $habit->pivot->habitLogs()->latest('recorded_at')->first(['created_at']);
                return $habit;
            }
        );


        return Inertia::render(
            'Dashboard/Habits/Habits',
            [
                'userHabits' => fn() => $userHabitsFormateado,
                'numberAdoptedHabits' => fn() => UserHabit::where('user_id', '=', $user->id)->count(),
                'numberActiveHabits' => fn() => UserHabit::where([
                    ['user_id', '=', $user->id],
                    ['status', '=', 'active']
                ])->count(),
                'monthActions' => fn() => HabitLog::whereHas('userHabit', function ($query) use ($user) {
                    return $query->where('user_id', $user->id);
                })
                    ->whereMonth('recorded_at', now()->month)
                    ->whereYear('recorded_at', now()->year)
                    ->count()
            ]
        );
    }
    public function explore(Request $request)
    {

        $filter_type = $request->query('habit_category');
        $filter_name = $request->query('habit_name');

        return Inertia::render(
            'Dashboard/Habits/Explore',
            [
                'habits' => fn() => DB::table('habits as h')
                    ->join('habit_categories as hc', 'h.habit_category_id', '=', 'hc.id')
                    ->when($filter_type && $filter_type !== 'all', function ($query) use ($filter_type) {
                        return $query->where('hc.id', $filter_type);
                    })
                    ->when($filter_name, function ($query) use ($filter_name) {
                        return $query->where('h.name', 'ILIKE', '%' . $filter_name . '%');;
                    })
                    ->select('h.*', 'hc.name as habit_category_name', 'hc.slug as habit_category_slug')
                    ->get(),
                'habitCategories' => fn() => HabitCategory::all()
            ]
        );
    }

    public function adopt(Request $request, Habit $habit)
    {
        $data = $request->validate([
            'weekly_target' => ['required', 'numeric']
        ]);

        $user = $request->user();

        try {
            $userHabit =  UserHabit::create([
                'user_id' => $user->id,
                'habit_id' => $habit->id,
                'weekly_target' => $data['weekly_target'],
                'adopted_at' => now()
            ]);

            return $userHabit ? redirect()->route('dashboard.myhabits')->with('status', "Hábito adoptado con exito") : back()->with('error', 'Hubo un error al adoptar hábito');
        } catch (QueryException $e) {
            if (
                $e->getCode() === '23505'
            ) {
                return back()->with(
                    'error',
                    'Ya adoptaste ese habito, selecciona otro.'
                );
            }
        }
    }
}
