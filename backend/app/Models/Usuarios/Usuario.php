<?php

namespace App\Models\Usuarios;

use App\Models\Posts\Posts;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'name',
        'lastName',
        'email',
        'telefono',
        'password',
    ];

    // relaciones con otras tablas, puedes definirlas aquí

    public function posts()
    {
        return $this->hasMany(Posts::class, 'id_usuarioCreador');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


}
