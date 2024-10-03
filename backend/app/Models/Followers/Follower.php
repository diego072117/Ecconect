<?php

namespace App\Models\Followers;

use App\Models\Usuarios\Usuario;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    use HasFactory;

    protected $table = 'followers';

    protected $fillable = [
        'follower_id',
        'followed_id',
    ];

    public function follower()
    {
        return $this->belongsTo(Usuario::class, 'follower_id');
    }

    public function followed()
    {
        return $this->belongsTo(Usuario::class, 'followed_id');
    }
}
