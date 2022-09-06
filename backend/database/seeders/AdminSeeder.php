<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            "user_id" => "d61dfa90-b61e-43c2-856a-ffe6031aca79",
            "user_email" => 'admin@gmail.com',
            "user_role" => "admin",
            "user_password" => Hash::make('password'),
            "user_access_token" => "",
            "user_social_provider" => ""
        ]);
    }
}
