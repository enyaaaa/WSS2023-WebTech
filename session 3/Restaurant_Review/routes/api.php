<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('restaurant', RestaurantController::class);
Route::get('restaurant', 'App\Http\Controllers\RestaurantController@index');
Route::post('restaurant', 'App\Http\Controllers\RestaurantController@store');
Route::put('restaurant', 'App\Http\Controllers\RestaurantController@update');
Route::delete('restaurant', 'App\Http\Controllers\RestaurantController@destroy');

Route::apiResource('review', ReviewController::class);
Route::get('review', 'App\Http\Controllers\ReviewController@index');
Route::post('review', 'App\Http\Controllers\ReviewController@store');
Route::put('review', 'App\Http\Controllers\ReviewController@update');
Route::delete('review', 'App\Http\Controllers\ReviewController@destroy');