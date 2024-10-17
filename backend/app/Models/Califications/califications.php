<?php

namespace App\Models\Califications;

use App\Models\Usuarios\Usuario;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class califications extends Model
{
    use HasFactory;

    protected $table = 'califications';

    protected $fillable = [
        'id_usuarioPost',
        'id_usuariodonado',
        'calification',
    ];

    public function usuarioPost()
    {
        return $this->belongsTo(Usuario::class, 'id_usuarioPost');
    }

    public function usuarioDonado()
    {
        return $this->belongsTo(Usuario::class, 'id_usuariodonado');
    }
}
