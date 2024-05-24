<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HttpPostController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//
Route::get('/', [HttpPostController::class,'index']);

Route::get('/bai2',function (){
    return view('bai2');
});

    Route::get('/bai8',function (){
    return view('bai8');
});

Route::get('/api',function (){
    return view('api-axios');
});


Route::get('/get-api',[HttpPostController::class, 'callApi']);


