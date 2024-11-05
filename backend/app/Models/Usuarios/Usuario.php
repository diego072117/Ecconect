<?php

namespace App\Models\Usuarios;

use App\Models\Califications\califications;
use App\Models\Comment\Comment;
use App\Models\Followers\Follower;
use App\Models\Posts\Posts;
use App\Models\Posts\SavePost;
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
        'username',
        'email',
        'telefono',
        'avatar',
        'isAdmin',
        'isBan',
        'password',
    ];

    // relaciones con otras tablas, puedes definirlas aquí

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_user');
    }

    public function posts()
    {
        return $this->hasMany(Posts::class, 'id_usuarioCreador');
    }

    public function savedPosts()
    {
        return $this->hasMany(SavePost::class, 'user_id');
    }


    public function followers()
    {
        return $this->hasMany(Follower::class, 'followed_id');
    }

    public function followings()
    {
        return $this->hasMany(Follower::class, 'follower_id');
    }

    public function calificationsAsPostOwner()  // Relación para usuarioPost
    {
        return $this->hasMany(califications::class, 'id_usuarioPost');
    }

    public function calificationsAsDonatedUser()  // Relación para usuarioDonado
    {
        return $this->hasMany(Califications::class, 'id_usuariodonado');
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
