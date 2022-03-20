<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Restaurant::factory(10)->create();
        Review::factory(10)->create();
        User::factory(10)->create();
    }
}
