<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Advert;

class AdvertController extends Controller
{
    //
    public function getAllAdverts()
    {
      $adverts = Advert::oldest()->get();
      for($i = 0; $i < count($adverts); $i ++)
      {
        $adverts[$i]->index = $i + 1;
      }
      return response()->json([
        'data' => $adverts,
      ]);
    }

    public function getDisplayAdverts(){
      $main = Advert::where('display', 'Main Page')->first();
      $info = Advert::where('display', 'Information Page')->first();
      return response()->json([
        'data' => ["mainAdvert"=> $main, "informationAdvert" => $info],
      ]);
    }

    public function changeAdvertDisplay(Request $request){
      Advert::where('display', $request->state)->update(['display'=>'None']);
      $advert = Advert::where('id', $request->id)->first();
      $advert->display = $request->state;
      $advert->save();
      return response()->json([
        'data' => $advert,
      ]);
    }

    public function uploadAdvert(Request $request){
      
      if($request->has('image'))
      {
         $image = $request->image;
         
         $filename = md5(rand(1,100) . time()). '.'.$image->getClientOriginalExtension();
         
         $image->move('imgs/', $filename);

        $advert = new Advert();
        $advert->advert_url = env('APP_URL', 'http://localhost:8000').'/imgs/'.$filename;
        $advert->save();
      }

       $adverts = Advert::oldest()->get();
       for($i = 0; $i < count($adverts); $i ++)
       {
         $adverts[$i]->index = $i + 1;
       }
       return response()->json([
         'data' => $adverts,
       ]);
    }
}
