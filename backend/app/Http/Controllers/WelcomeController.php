<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Codenixsv\CoinGeckoApi\CoinGeckoClient;
use Carbon\Carbon;
use App\Models\Coin;
use App\Models\AllCoin;
use Illuminate\Support\Str;

class WelcomeController extends Controller
{
    //
    public function index()
    {
      // $client = new CoinGeckoClient();
      $start = Carbon::now();
      // $result=$client->coins()->getList();
      
      // foreach($result as $item){
      //   $result = $client->coins()->getCoin($item['id']);
      //   $new = new AllCoin();
      //   $new->coin_id = $item['id'];
      //   $new->symbol = $item['symbol'];
      //   $new->name = $item['name'];
      //   $new->network = implode(',', array_keys($result['platforms']));
      //   $new->save();
      // }
      $end = Carbon::now();
      return view('welcome', ['start' => $start, 'end' =>$end]);
    }
}
