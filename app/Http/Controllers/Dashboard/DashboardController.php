<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController
{
    public function index()
    {

        return Inertia::render('Dashboard/Dashboard');
    }

}
