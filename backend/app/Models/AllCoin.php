<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllCoin extends Model
{
    use HasFactory;
    protected $fillable = [
      'coin_id',
      'symbol',
      'name',
      'network',
      'price',
      'marketcap',
    ];
}
