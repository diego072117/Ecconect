<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    private $seeders = [
        // Otros seeders aquí
        UsersSeeder::class,
    ];

    public function run()
    {
        $this->call($this->seeders);
    }
}
