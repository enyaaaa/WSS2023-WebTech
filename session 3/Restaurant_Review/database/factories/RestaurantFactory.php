<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'restaurant_name' => $this->faker->company,
            'restaurant_image' => $this->faker->image,
            'description_text' =>$this->faker->text(100),
            'location' => $this->faker->address,
            'rating' => $this->faker->numberBetween(0, 5),
            'opening_hours' =>$this->faker->dayOfWeek
        ];
    }
}
