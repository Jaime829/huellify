<?php

namespace App\Http\Controllers;

use App\Models\ActivityCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController
{
    public function index()
    {
        return Inertia::render('Dashboard/Activities/Activities');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Activities/CreateActivity');
    }
}
