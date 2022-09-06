<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAllCoinsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('all_coins', function (Blueprint $table) {
            $table->id();
            $table->string('coin_id');
            $table->string('symbol');
            $table->string('name');
            $table->string('network')->nullable();
            $table->float('price')->default(0);
            $table->float('marketcap')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('all_coins');
    }
}
