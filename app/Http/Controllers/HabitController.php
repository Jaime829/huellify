<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitCategory;
use App\Models\User_habit;
use App\Models\UserHabit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use function Pest\Laravel\isAuthenticated;

class HabitController
{
    public function index()
    {
        $userHabit = Auth::user()->habits;
        $userHabitFormateado = $userHabit->map(
            function ($habit) {
                $habit->habit_category;
                return $habit;
            }
        );


        return Inertia::render(
            'Dashboard/Habits/Habits',
            ['userHabits' => $userHabitFormateado]
        );
    }
    public function explore(Request $request)
    {

        $filter_type = $request->query('habit_category');
        $filter_name = $request->query('habit_name');

        return Inertia::render(
            'Dashboard/Habits/Explore',
            [
                'habits' => DB::table('habits as h')
                    ->join('habit_categories as hc', 'h.habit_category_id', '=', 'hc.id')
                    ->when($filter_type && $filter_type !== 'all', function ($query) use ($filter_type) {
                        return $query->where('hc.id', $filter_type);
                    })
                    ->when($filter_name, function ($query) use ($filter_name) {
                        return $query->where('h.name', 'ILIKE', '%' . $filter_name . '%');;
                    })
                    ->select('h.*', 'hc.name as habit_category_name', 'hc.slug as habit_category_slug')
                    ->get(),
                'habitCategories' => HabitCategory::all()
            ]
        );
    }

    public function adopt(Request $request, Habit $habit)
    {
        $data = $request->validate([
            'weekly_target' => ['required', 'numeric']
        ]);

        $user = $request->user();

        $userHabit =  UserHabit::create([
            'user_id' => $user->id,
            'habit_id' => $habit->id,
            'weekly_target' => $data['weekly_target'],
            'adopted_at' => now()
        ]);

        return $userHabit ? redirect()->route('dashboard.habits')->with('status', "Hábito adoptado con exito") : back()->with('error', 'Hubo un error al adoptar hábito');
    }
}
