<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUser;
use App\Models\Usuarios\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function createUser(CreateUser $request)
    {
        // La validación se maneja automáticamente por Laravel
        $userData = $request->all();

        // Aplicar hash bcrypt a la contraseña antes de almacenarla
        $userData['password'] = Hash::make($userData['password']);

        Usuario::create($userData);

        return response()->json(['message' => 'Usuario registrado con éxito'], 201);
    }

}
