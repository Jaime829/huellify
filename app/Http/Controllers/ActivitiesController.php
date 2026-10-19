<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivitiesController
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
