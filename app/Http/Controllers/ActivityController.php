<?php

namespace App\Http\Controllers;

use App\Models\ActivityCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ActivityController
{
    public function index(Request $request)
    {
        $user = $request->user();

        $typeFilter = $request->query('category_type');



        return Inertia::render(
            'Dashboard/Activities/Activities',
            [
                'activities' => $user ? fn() => DB::table('periods as p')
                    ->join('activities as a', 'p.id', '=', 'a.period_id')
                    ->join('activity_categories as ac', 'a.activity_category_id', '=', 'ac.id')
                    ->join('carbon_footprint_items as cfi', 'a.id', '=', 'cfi.activity_id')
                    ->where('p.user_id', $user->id)
                    ->when($typeFilter && $typeFilter !== 'all', function ($query) use ($typeFilter) {
                        return $query->where('ac.id', $typeFilter);
                    })
                    ->select('a.*', 'ac.name as category_name', 'cfi.emissions')
                    ->paginate(5)
                    ->withQueryString()
                    : null
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Dashboard/Activities/CreateActivity');
    }
}
