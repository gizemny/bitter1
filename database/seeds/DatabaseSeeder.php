<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 10)->create()->each(function($user) {
            $user->posts()->save(factory(App\Post::class)->make());
            
            $user->postUser()->attach(rand(1,App\Post::all()->count()));
        });
    }
}