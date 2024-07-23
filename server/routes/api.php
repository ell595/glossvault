<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\GlossController;
use App\Http\Middleware\ValidateAPIToken;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth Routes
Route::middleware('api')->post('register', [AuthController::class, 'registerUser']);
Route::middleware('api')->post('login', [AuthController::class, 'logInUser']);
Route::post('logout', [AuthController::class, 'logOutUser']);

// Protected Routes
Route::middleware([ValidateAPIToken::class])->group(function () {
    Route::post('getuser', [AuthController::class, 'getUser']);

    Route::post('newcollection', [CollectionController::class, 'store']);
    Route::post('getcollections', [CollectionController::class, 'index']);
    Route::post('getcollection', [CollectionController::class, 'show']);
    Route::delete('deletecollection', [CollectionController::class, 'destroy']);

    Route::post('newgloss', [GlossController::class, 'store']);
    Route::post('getglosseses', [GlossController::class, 'index']);
    Route::delete('deletegloss', [GlossController::class, 'destroy']);
});
