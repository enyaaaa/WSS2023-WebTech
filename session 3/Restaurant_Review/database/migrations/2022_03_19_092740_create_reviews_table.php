<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string("username", 64);
            $table->text("review", 1024)->nullable();
            $table->dateTime("dateposted");
            $table->integer("rating")->nullable();
            $table->timestamps();
            $table->unsignedBigInteger("user_id")->nullable();
            $table->unsignedBigInteger("restaurant_id")->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
