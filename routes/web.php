<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HttpPostController;
use App\Http\Controllers\SanPhamController;
use App\Http\Controllers\CartController;

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

// gọi view product
Route::get('/product',[SanPhamController::class,'index']);

// gọi view cart
Route::get('/cart',[SanPhamController::class,'viewCart'])->name('cart');


Route::get('/get-api',[HttpPostController::class, 'callApi']);

//route search theo tên sản phẩm
Route::get('/search-product',[SanPhamController::class,'searchProduct']);

// route lọc sản phẩm theo danh mục
Route::get('/filter-categories',[SanPhamController::class,'getProductsByCategory']);

// route lọc sản phẩm theo giá tăng giảm dần
Route::get('/filter-price',[SanPhamController::class,'getProductsByPrice']);


// route hiển thị sản phẩm đã có trong giỏ hàng
Route::get('/show-list-cart',[SanPhamController::class,'getProductsById']);

// hàm lọc sản phẩm theo giá tiền
Route::get('/filter-price-range', [SanPhamController::class, 'filterByPriceRange']);
