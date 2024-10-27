<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('califications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_usuarioPost');
            $table->unsignedBigInteger('id_usuariodonado');
            $table->unsignedBigInteger('id_post');
            $table->unsignedTinyInteger('calification')->nullable();
            $table->boolean('calificado')->default(false);
            $table->timestamps();

            // Definición de claves foráneas
            $table->foreign('id_usuarioPost')->references('id')->on('usuarios');
            $table->foreign('id_usuariodonado')->references('id')->on('usuarios');
            $table->foreign('id_post')->references('id')->on('posts'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('califications');
    }
};
