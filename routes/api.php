<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\PushNotificationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);
Route::post('/v2/login', [LoginController::class, 'login']);
Route::post('/push-notifications', [PushNotificationController::class, 'store']);
Route::post('/push-notifications', [PushNotificationController::class, 'sendNotification']);
