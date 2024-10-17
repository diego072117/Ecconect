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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->text('descripcion')->nullable();
            $table->string('publicacion');
            $table->unsignedBigInteger('id_usuarioCreador');
            $table->string('state')->default('activo');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('id_usuarioCreador')->references('id')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
