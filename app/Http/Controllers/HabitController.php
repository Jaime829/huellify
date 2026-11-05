<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HabitController
{
    public function index()
    {

        return Inertia::render('Dashboard/Habits/Habits');
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
}
