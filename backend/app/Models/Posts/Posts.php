<?php

namespace App\Models\Posts;

use App\Models\Comment\Comment;
use App\Models\Usuarios\Usuario;
use App\Models\Posts\SavePost;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Posts extends Model
{
    use SoftDeletes;

    protected $table = 'posts';

    protected $fillable = [
        'descripcion',
        'publicacion',
        'id_usuarioCreador',
        'like',
    ];

    public function usuarioCreador()
    {
        return $this->belongsTo(Usuario::class, 'id_usuarioCreador');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_post');
    }

    public function savedByUsers()
    {
        return $this->hasMany(SavePost::class, 'post_id');
    }
}
