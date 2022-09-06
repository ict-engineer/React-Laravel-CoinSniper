<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    use HasFactory;

    protected $fillable = [
      'name',
      'symbol',
      'logo',
      'presale',
      'launch_date',
      'network',
      'contract',
      'description',
      'website',
      'telegram',
      'twitter',
      'discord',
      'promoted',
      'status',
      'featured',
      'hot',
      'price_bnb',
      'price_usd',
      'supply',
      'marketcap',
      'fetch_date',
  ];
          
}
