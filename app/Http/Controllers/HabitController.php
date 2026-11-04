<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HabitController
{
    public function index()
    {

        return Inertia::render('Dashboard/Habits/Habits');
    }
    public function explore()
    {

        return Inertia::render('Dashboard/Habits/Explore');
    }
}
