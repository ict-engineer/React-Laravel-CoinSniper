<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoinsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('symbol');
            $table->string('logo');
            $table->boolean('presale');
            $table->date('launch_date');
            $table->string('contract');
            $table->string('network')->default('BSC');
            $table->text('description');
            $table->string('website');
            $table->string('telegram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('discord')->nullable();
            $table->boolean('promoted')->default(false);
            $table->string('status')->default('NEW');
            $table->boolean('featured')->default(false);
            $table->boolean('hot')->default(false);
            $table->bigInteger('total_votes')->default(0);
            $table->bigInteger('total_favourites')->default(0);
            $table->bigInteger('total_shares')->default(0);
            $table->float('price_bnb')->default(0);
            $table->float('price_usd')->default(0);
            $table->bigInteger('supply')->default(0);
            $table->float('marketcap')->default(0);
            $table->timestamp('fetch_date')->nullable();
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
        Schema::dropIfExists('coins');
    }
}
