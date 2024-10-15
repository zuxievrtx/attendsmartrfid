<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('admin/login', function () {
    return view('admin.login');
})->name('login');

Route::get('admin/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard')->middleware('auth:sanctum');
