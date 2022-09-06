<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoinController;
use App\Http\Controllers\AdvertController;
use App\Http\Controllers\VerifyEmailController;
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

Route::group([
  'middleware' => 'api',
  'prefix' => 'auth'

], function ($router) {
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/signup', [AuthController::class, 'register']);
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/get_user_info', [AuthController::class, 'getUserInfo']);
  Route::post('/change_password', [AuthController::class, 'changePassword']);
  
});

Route::post('/password/email', [AuthController::class, 'forgotPassword'])->name('password.email');;
Route::post('/password/reset', [AuthController::class, 'passwordReset'])->name('password.reset');;

//Coin
Route::post('/upload-coin', [CoinController::class, 'uploadCoin'])->name('upload-coin');
Route::post('/set_favourite', [CoinController::class, 'setFavourite'])->name('set_favourite');
Route::post('/set_upvote', [CoinController::class, 'setUpvote'])->name('set_upvote');
Route::get('/get_promote_coin', [CoinController::class, 'getPromoteCoins'])->name('get_promote_coin');
Route::post('/get_main_coin', [CoinController::class, 'getMainCoins'])->name('get_main_coin');
Route::post('/get_search_coin', [CoinController::class, 'getSearchCoins'])->name('get_search_coin');
Route::post('/get_display_coin', [CoinController::class, 'getDisplayCoin'])->name('get_display_coin');
Route::get('/get_all_coins', [CoinController::class, 'getAllCoins'])->name('get_all_coins');
Route::post('/edit_coin', [CoinController::class, 'editCoin'])->name('edit_coin');
Route::post('/delete_coin', [CoinController::class, 'deleteCoin'])->name('delete_coin');
Route::post('/get_coins_from_api', [CoinController::class, 'getFromCoingecko'])->name('get_coins_from_api');
Route::get('/get_binance_coinids', [CoinController::class, 'getBinanceCoinIds'])->name('get_binance_coinids');

//Advert
Route::get('/get_all_adverts', [AdvertController::class, 'getAllAdverts'])->name('get_all_adverts');
Route::get('/get_display_adverts', [AdvertController::class, 'getDisplayAdverts'])->name('get_display_adverts');
Route::post('/change_advert_display', [AdvertController::class, 'changeAdvertDisplay'])->name('change_advert_display');
Route::post('/upload_advert', [AdvertController::class, 'uploadAdvert'])->name('upload_advert');

// Verify email
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

// Resend link to verify email

Route::post('/email/verify/resend', function (Request $request) {
  $request->user()->sendEmailVerificationNotification();
  return response()->json([
    'message' => 'Success',
  ], 201);
})->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');
