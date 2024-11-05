<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUser;
use App\Http\Requests\User\UpdateUser;
use App\Models\Usuarios\Usuario;
use Illuminate\Http\Request;
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

    public function getUserById($id)
    {
        $user = Usuario::with(['followings', 'followers'])->find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $averageCalification = $user->calificationsAsPostOwner()->avg('calification');

        $user->average_calification = $averageCalification;

        return response()->json($user);
    }

    public function getAllUsers()
    {
        $users = Usuario::orderBy('created_at', 'DESC')->get();

        return response()->json($users);
    }

    public function loginUser(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $user = auth()->user(); // Obtén el usuario autenticado

        return $this->respondWithTokenAndUser($token, $user);
    }

    protected function respondWithTokenAndUser($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ]);
    }

    public function updateUser(UpdateUser $request, $id)
    {
        $user = Usuario::findOrFail($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        //$newUserInfo = collect($request->all());

        $validatedData = $request->validated();

        // Actualizar el avatar si se proporciona uno nuevo
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarPath = $avatar->storeAs('avatars', 'avatar_' . $user->id . '_' . time() . '.' . $avatar->getClientOriginalExtension(), 'public');
            $validatedData['avatar'] = $avatarPath;
        }

        // Actualizar el usuario con los datos validados
        $user->update($validatedData);

        return $user;
    }

    public function getTopUsersByPosts()
    {
        $users = Usuario::withCount(['posts' => function ($query) {
            $query->where('created_at', '>=', now()->subMonth());
        }])
            ->having('posts_count', '>', 0)
            ->orderBy('posts_count', 'desc')
            ->take(6)
            ->get();

        return response()->json($users);
    }

    public function toggleBanStatus($id)
    {
        $user = Usuario::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Cambiar el valor de isBan a su opuesto
        $user->isBan = !$user->isBan;
        $user->save();

        return response()->json([
            'message' => 'Estado de ban actualizado',
            'isBan' => $user->isBan
        ]);
    }
}
