<?php

use App\Http\Controllers\API\ScreenshotController;
use App\Http\Controllers\API\BrowserActivityController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Screenshot routes
Route::post('screenshots', [ScreenshotController::class, 'store']);
Route::get('screenshots', [ScreenshotController::class, 'index']);
Route::get('screenshots/{screenshot}', [ScreenshotController::class, 'show']);
Route::delete('screenshots/{screenshot}', [ScreenshotController::class, 'destroy']);

// Browser activity routes
Route::post('activities', [BrowserActivityController::class, 'store']);
Route::get('activities', [BrowserActivityController::class, 'index']);
Route::put('activities/{activity}', [BrowserActivityController::class, 'update']);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
