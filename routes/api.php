<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ProjectController;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class, 'register'])->middleware('guest:sanctum');
Route::post('login', [AuthController::class, 'login'])->middleware('guest:sanctum');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('me', [AuthController::class, 'me'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {

    Route::get('project-types', [ProjectController::class, 'getProjectTypes']);
    Route::get('project-statuses', [ProjectController::class, 'getProjectStatuses']);
    Route::apiResource('projects', ProjectController::class);

});
