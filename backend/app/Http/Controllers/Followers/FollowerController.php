<?php

namespace App\Http\Controllers\Followers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Followers\CreateFollower;
use App\Models\Followers\Follower;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    public function toggleFollow(CreateFollower $request)
    {
        // Obtener los datos validados del request
        $data = $request->validated();

        // Buscar si ya existe la combinación de follower_id y followed_id
        $existingFollow = Follower::where('follower_id', $data['follower_id'])
            ->where('followed_id', $data['followed_id'])
            ->first();

        if ($existingFollow) {
            // Si la relación ya existe, eliminarla
            $existingFollow->delete();
            return response()->json([
                'message' => 'El seguimiento ha sido eliminado.'
            ], 200);
        } else {
            // Si no existe la relación, crearla
            Follower::create([
                'follower_id' => $data['follower_id'],
                'followed_id' => $data['followed_id'],
            ]);
            return response()->json([
                'message' => 'El seguimiento ha sido registrado.'
            ], 201);
        }
    }

    public function getFollowings($follower_id)
    {
        $followings = Follower::where('follower_id', $follower_id)
            ->with('followed') // Asume que la relación 'followed' está definida en el modelo Follower
            ->get()
            ->pluck('followed'); // Obtener solo los usuarios seguidos

        return response()->json($followings, 200);
    }
}
