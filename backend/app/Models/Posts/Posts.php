<?php

namespace App\Models\Posts;

use App\Models\Usuarios\Usuario;
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
}
