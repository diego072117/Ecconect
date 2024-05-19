<?php

namespace App\Models\Comment;

use App\Models\Posts\Posts;
use App\Models\Usuarios\Usuario;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'comments';

    protected $fillable = [
        'id_user',
        'id_post',
        'coment',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_user');
    }

    public function post()
    {
        return $this->belongsTo(Posts::class, 'id_post');
    }
}
