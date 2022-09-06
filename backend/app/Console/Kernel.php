<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Coin;
use App\Models\AllCoin;
use Codenixsv\CoinGeckoApi\CoinGeckoClient;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function getMarket()
    {
      
    }
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        //   $schedule->call(function () {
        //     $client = new CoinGeckoClient();
        //     $coins = Coin::orderBy('id')->get();
        //     foreach($coins as $coin)
        //     {
        //       try{
        //         $id = AllCoin::where('symbol', Str::lower($coin->symbol))->where('name', $coin->name)->first();
        //         if($id){
        //           $result = $client->coins()->getCoin($id->coin_id);
        //         }
        //         else{
        //           $result = $client->coins()->getCoin(str_replace(' ', '-', Str::lower($coin->name)));
        //         }
                
        //         $coin->marketcap = $result['market_data']['market_cap']['usd'];
        //         $coin->price_usd = $result['market_data']['current_price']['usd'];
        //         // $coin->description = $result['description']['en'];
        //         // $coin->logo = $result['image']['large'];
        //         // $coin->website = $result['links']['homepage'][0];
        //         $coin->fetch_date = Carbon::now();
        //         $coin->save();
        //       }catch(\Exception $e)
        //       {
        //       }
        //     }
        //   })->everyMinute();
        
        $schedule->call(function () {
          $client = new CoinGeckoClient();
          $count = AllCoin::count();
          $count = $count / 100;
          \Log::info("Cron is working fine!");
          for ($i = 0; $i <= $count + 2; $i ++)
          {
            try{
              $result = $client->coins()->getMarkets('usd', ['page' => $i]);
              foreach($result as $item){
                
                $coin = AllCoin::where('coin_id', $item['id'])->first();
                if($coin)
                {
                  $coin->price = $item['current_price'] ?? 0;
                  $coin->marketcap = $item['market_cap'] ?? 0;
                  $coin->save();
                }
              }
            }catch(\Exception $e)
            {
              \Log::info($e);
            }
          }
          $coins = Coin::orderBy('id')->get();
          
          foreach($coins as $coin)
          {
            try{
              $id = AllCoin::where('contract', $coin->contract)->first();
              $coin->marketcap = $id->marketcap;
              $coin->price_usd = $id->price;
              $coin->fetch_date = Carbon::now();
              $coin->save();
            }catch(\Exception $e)
            {
            }
          }
        })->everyMinute();
        // $schedule->call(function () {
        //   $client = new CoinGeckoClient();
        //   $coins = AllCoin::get();
          
        //   foreach($coins as $coin)
        //   {
        //     try{
        //       $result = $client->coins()->getCoin($coin->coin_id);
              
        //       $new = new Coin();
        //       $new->name=$result['name'];
        //       $new->symbol = Str::upper($result['symbol']);
        //       $new->marketcap = $result['market_data']['market_cap']['usd'];
        //       $new->price_usd = $result['market_data']['current_price']['usd'];
        //       $new->description = $result['description']['en'];
        //       $new->logo = $result['image']['large'];
        //       $new->presale = false;
        //       $new->launch_date = Carbon::now();
        //       $new->contract = $result['platforms']['binance-smart-chain'];
        //       $new->telegram = $result['links']['homepage'][0];
        //       $new->website = $result['links']['homepage'][0];
        //       $new->fetch_date = Carbon::now();
        //       $new->save();
        //     }catch(\Exception $e)
        //     {
        //     }
        //   }
        // })->everyMinute();
        
      
        $schedule->call(function () {
          $coins = Coin::where('presale', true)->get();
          foreach($coins as $coin)
          {
            if($coin->launch_date <= Carbon::now())
            {
              $coin->presale = false;
              $coin->save();
            }
          }

          $client = new CoinGeckoClient();
          $result=$client->coins()->getList();
          foreach($result as $item){
            try{
              $count = AllCoin::where('coin_id', $item['id'])->count();
              if($count == 0)
              {
                $new = new AllCoin();
                $new->coin_id = $item['id'];
                $new->symbol = $item['symbol'];
                $new->name = $item['name'];
                $new->save();
              }
            }catch(\Exception $e)
             {
             }
          }

          $results= AllCoin::where('network', null)->get();
          foreach($results as $item){
            try{
              $result = $client->coins()->getCoin($item->coin_id);
              $item->network = implode(',', array_keys($result['platforms']));
              if(isset($result['platforms']['binance-smart-chain']))
                  $item->contract = $result['platforms']['binance-smart-chain'];
              $item->save();
              sleep(1);
            }catch(\Exception $e)
             {
             }
          }
        })->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
