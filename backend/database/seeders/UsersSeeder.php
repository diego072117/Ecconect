<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert([
            [
                'name' => 'Diego Parra',
                'username' => 'Shirow',
                'email' => 'parra@gmail.com',
                'telefono' => '1234567890',
                'password' => Hash::make('123'),
            ],
            [
                'name' => 'Daniela M',
                'username' => 'Dani',
                'email' => 'dani@gmail.com',
                'telefono' => '1234567890',
                'password' => Hash::make('123'),
            ],
            [
                'name' => 'Merly Mejia',
                'username' => 'Merly',
                'email' => 'merly@gmail.com',
                'telefono' => '1234567890',
                'password' => Hash::make('123'),
            ],
            [
                'name' => 'Juliana Melo',
                'username' => 'Juli',
                'email' => 'Juli@gmail.com',
                'telefono' => '1234567890',
                'password' => Hash::make('123'),
            ],
            [
                'name' => 'Juan Gomez',
                'username' => 'Juan',
                'email' => 'juan@gmail.com',
                'telefono' => '1234567890',
                'password' => Hash::make('123'),
            ],
            [
                'name' => 'Carlos Falcon',
                'username' => 'Moroc',
                'email' => 'carlos@gmail.com',
                'telefono' => '1234567890',
                'password' => Hash::make('123'),
            ],
            [
                'name' => 'Kevin Torres',
                'username' => 'Kevin',
                'email' => 'kevin@gmail.com',
                'telefono' => '1234567890',
                'password' => Hash::make('123'),
            ],
        ]);
    }
}
