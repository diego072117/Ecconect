<?php

namespace App\Models\Posts;

use App\Models\Califications\califications;
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
        'id_usuarioAdquirido',
        'state',
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

    public function califications()
    {
        return $this->hasMany(califications::class, 'id_post');
    }
}
