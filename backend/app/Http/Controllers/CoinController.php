<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\Coin;
use App\Models\AllCoin;
use App\Models\Favourite;
use App\Models\Vote;
use Carbon\Carbon;
use Codenixsv\CoinGeckoApi\CoinGeckoClient;
use Illuminate\Support\Str;

class CoinController extends Controller
{
    public function getBinanceCoinIds(){
      $coins = AllCoin::where('network', 'like', '%binance-smart-chain%')->pluck('id');
      $ids = [];
      foreach($coins as $item)
      {
        $re = AllCoin::where('id', $item)->first();
        $count = Coin::where('contract', $re->contract)->count();
        if(!$count)
          array_push($ids, $item);
      }

      return response()->json([
        'data' => $ids,
      ]);  
    }
    public function getFromCoingecko(Request $request){
      $client = new CoinGeckoClient();
      $coin = AllCoin::where('id', $request->id)->first();

      try{
        $result = $client->coins()->getCoin($coin->coin_id);
        
        $new = new Coin();
        $new->name=$result['name'];
        $new->symbol = Str::upper($result['symbol']);
        $new->marketcap = $result['market_data']['market_cap']['usd'];
        $new->price_usd = $result['market_data']['current_price']['usd'];
        $new->description = $result['description']['en'];
        $new->logo = $result['image']['large'];
        $new->presale = false;
        $new->launch_date = Carbon::now();
        $new->contract = $result['platforms']['binance-smart-chain'];
        $new->telegram = '';
        // $new->network = 'BSC';
        $new->website = $result['links']['homepage'][0];
        $new->fetch_date = Carbon::now();
        $new->save();
        
        $re = Coin::where('id', $new->id)->first();
        return response()->json([
          'data' => $re,
        ]);  
      }catch(\Exception $e)
      {
        return response()->json($e, 422);
      }
    }

    public function editCoin(Request $request){
      try{
        $coin = Coin::where('id', $request->id)->first();
        $coin->name = $request->name;
        $coin->symbol = $request->symbol;
        $coin->presale = $request->presale;
        // $coin->network = $request->network;
        $coin->launch_date = $request->launchDate;
        $coin->contract = $request->contract;
        $coin->description = $request->description;
        $coin->website = $request->website;
        $coin->telegram = $request->telegram;
        $coin->twitter = $request->twitter;
        $coin->discord = $request->discord;
        $coin->promoted = $request->promoted;
        $coin->featured = $request->featured;
        $coin->save();

        return response()->json([
          'data' => $coin,
        ]);  
      } catch(Exception $e){
        return response()->json($e, 422);
      }
    }

    public function deleteCoin(Request $request){
      try{
        $coin = Coin::where('id', $request->id)->delete();

        return response()->json([
          'message' => 'success',
        ]);  
      } catch(Exception $e){
        return response()->json($e, 422);
      }
    }
    //
    public function uploadCoin(Request $request){
      try{
        $input = $request->only('image');
        // $validator = Validator::make($input, [
        //   'image' => 'mimes:jpeg,jpg,png,gif|required|max:10000',
        // ]);

        // if ($validator->fails()) {
        //   return response()->json($validator->errors(), 422);
        // }

        $image = $request->get('image');
        $name = md5(rand(1,100) . time()).'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        \Image::make($request->get('image'))->save(public_path('imgs/').$name);

        $coin = new Coin();
        $coin->name = $request->name;
        $coin->symbol = $request->symbol;
        $coin->presale = $request->presale;
        // $coin->network = $request->network;
        $coin->launch_date = $request->launchDate;
        $coin->contract = $request->contract;
        $coin->description = $request->description;
        $coin->website = $request->website;
        $coin->telegram = $request->telegram;
        $coin->twitter = $request->twitter;
        $coin->discord = $request->discord;
        $coin->logo = env('APP_URL').'/imgs/'.$name;
        
        try{
          $client = new CoinGeckoClient();
          $id = AllCoin::where('contract', $coin->contract)->first();
          if($id){
            $result = $client->coins()->getCoin($id->coin_id);
          }
          else{
            $result = $client->coins()->getCoin(str_replace(' ', '-', Str::lower($coin->name)));
          }
          $coin->marketcap = $result['market_data']['market_cap']['usd'];
          $coin->price_usd = $result['market_data']['current_price']['usd'];
        } catch(Exception $e){
        }
        
        $coin->save();

      } catch(Exception $e){
        return response()->json($e, 422);
      }
      return response()->json([
          'message' => 'success',
      ]);
    }

    public function getPromoteCoins()
    {
      $data = Coin::where('promoted', true)->oldest()->get();

      for($i = 0; $i < count($data); $i ++)
      {
        $data[$i]->index = $i + 1;
        if(auth()->user())
        {
          $count = Favourite::where('coin_id', $data[$i]->id)->where('user_id', auth()->user()->id)->count();
          if($count)
            $data[$i]->favourite = true;
          else
            $data[$i]->favourite = false;
        }
        else
          $data[$i]->favourite = false;
      }

      return response()->json([
        'data' => $data,
      ]);
    }

    public function setFavourite(Request $request)
    {
      try{
        Favourite::where('coin_id', $request->coin_id)->where('user_id', auth()->user()->id)->delete();
        if($request->state == true){
          $favourite = new Favourite();
          $favourite->user_id = auth()->user()->id;
          $favourite->coin_id = $request->coin_id;
          $favourite->save();

          $coin = Coin::where('id', $request->coin_id)->first();
          $coin->total_favourites = $coin->total_favourites + 1;
          $coin->save();
        }
      }catch(Exception $e){
        return response()->json($e, 422);
      }
      return response()->json([
        'coin_id' => $request->coin_id, 'state' => $request->state,
      ]);
    }

    public function setUpvote(Request $request)
    {
      try{
        // $client = new CoinGeckoClient();
        // $result = $client->coins()->getMarkets('usd', ['page' => 2]);
        // return response()->json([
        //   'success'=>true, 'data' => $result,
        // ]);
        
          if($request->coin_id == null)
            return response()->json([
              'success'=>false, 'message' => 'You can not vote now. Only can vote once a day.',
            ]);

          $recentCount = Vote::where('user_id', auth()->user()->id)->where('coin_id', $request->coin_id)
            ->where("created_at",">",Carbon::now()->subDay())->where("created_at","<",Carbon::now())->count();

          if($recentCount){
            return response()->json([
              'success'=>false, 'message' => 'You can not vote now. Only can vote once a day.',
            ]);
          }
          $upvote = new Vote();
          $upvote->user_id = auth()->user()->id;
          $upvote->coin_id = $request->coin_id;
          $upvote->save();
          
          $coin = Coin::where('id', $request->coin_id)->first();
          $coin->total_votes = $coin->total_votes + 1;

          if ($coin->total_votes > 4)
            $coin->status = "RANKED";

          $coin->save();
          return response()->json([
            'success' => true, 'data' => $coin,
          ]);
      }catch(Exception $e){
        return response()->json($e, 422);
      }
    }

    public function getDisplayCoin(Request $request){
      try {
        $coin = Coin::where('id',$request->id)->first();

        $coin->today_votes = Vote::where('coin_id', $coin->id)
                ->where("created_at",">",Carbon::now()->subDay())->where("created_at","<",Carbon::now())->count();
        
        if(auth()->user())
        {
          $count = Favourite::where('coin_id', $coin->id)->where('user_id', auth()->user()->id)->count();
          if($count)
            $coin->favourite = true;
          else
            $coin->favourite = false;
        }
        else
          $coin->favourite = false;
        return response()->json([
          'data' => $coin,
        ]);
      }
      catch(Exception $e){
        return response()->json($e, 422);
      }
    }

    public function getAllCoins(Request $request){
      $coins = Coin::orderBy('id')->get();

      return response()->json([
        'data' => $coins,
      ]);
    }

    public function getMainCoins(Request $request)
    {
      try{
        $coins = [];
        if($request->type == "top ranked")
        {
          if($request->subType == 'all_time')
          {
            $coins = Coin::where('status', 'RANKED')->oldest()->get();
          }
          else if ($request->subType == "24hour")
          {
            $base = Coin::where('status', 'RANKED')->oldest()->get();
            foreach($base as $coin)
            {
              $recentCount = Vote::where('coin_id', $coin->id)
                ->where("created_at",">",Carbon::now()->subDay())->where("created_at","<",Carbon::now())->count();
              
              if($recentCount > 4)
              {
                array_push($coins, $coin);
              }
            }
          }
          else{
            $base = Coin::where('status', 'RANKED')->oldest()->get();
            foreach($base as $coin)
            {
              $recentCount = Vote::where('coin_id', $coin->id)
                ->where("created_at",">",Carbon::now()->subWeek())->where("created_at","<",Carbon::now())->count();
              
              if($recentCount > 4)
              {
                array_push($coins, $coin);
              }
            }
          }
        }
        else if($request->type == "hot")
        {
          $base = Coin::where('status', 'RANKED')->oldest()->get();
          foreach($base as $coin)
          {
            $recentCount = Vote::where('coin_id', $coin->id)
              ->where("created_at",">",Carbon::now()->subDay()->subDay())->where("created_at","<",Carbon::now())->count();
            $coin->recentCount = $recentCount;            
          }
          $coins = $base->unique()->sortByDesc('recentCount')->values()->all();
          $coins = array_slice($coins, 0, 25);
        }
        else if($request->type == "new")
        {
          $coins = Coin::where('status', 'NEW')->oldest()->get();
        }
        else if($request->type == "presale")
        {
          $coins = Coin::where('presale', true)->oldest()->get();
        }
        else if($request->type == "favourites")
        {
          $base = Coin::oldest()->get();
          foreach($base as $coin)
          {
            $count = Favourite::where('coin_id', $coin->id)->where('user_id', auth()->user()->id)->count();
            if($count)
              array_push($coins, $coin);
          }
        }
        else if($request->type == "featured")
        {
          $coins = Coin::where('featured', true)->oldest()->get();
        }

        for($i = 0; $i < count($coins); $i ++)
        {
          $coins[$i]->index = $i + 1;
          if(auth()->user())
          {
            $count = Favourite::where('coin_id', $coins[$i]->id)->where('user_id', auth()->user()->id)->count();
            if($count)
              $coins[$i]->favourite = true;
            else
              $coins[$i]->favourite = false;
          }
          else
            $coins[$i]->favourite = false;
        }
        return response()->json([
          'data' => $coins,
        ]);
      }catch(Exception $e){
        return response()->json($e, 422);
      }
    }

    public function getSearchCoins(Request $request)
    {
      try{
        if($request->searchStr == "")
          return response()->json([
            'data' => [],
          ]);
        $coins = Coin::where(function($query) use ($request)
        {
          $strs = explode(' ', $request->searchStr);
          foreach($strs as $str)
            $query->where('name', 'ilike', '%' . $str . '%');
        })->orWhere(function($query) use ($request)
        {
          $strs = explode(' ', $request->searchStr);
          foreach($strs as $str)
            $query->where('symbol', 'ilike', '%' . $str . '%');
        })->get();

        return response()->json([
          'data' => $coins,
        ]);
      }catch(Exception $e){
        return response()->json($e, 422);
      }
    }
}
