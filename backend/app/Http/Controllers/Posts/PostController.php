<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\CreatePost;
use App\Models\Posts\Posts;

class PostController extends Controller
{
    public function createPost(CreatePost $request)
    {
        $validatedData = $request->validated();
    
        // Almacena la imagen de la publicación
        if ($request->hasFile('publicacion')) {
            $publicacion = $request->file('publicacion');
            $publicacionPath = $publicacion->storeAs('publicaciones', 'publicacion_' . time() . '.' . $publicacion->getClientOriginalExtension(), 'public');
            $validatedData['publicacion'] = $publicacionPath;
        }
    
        $post = new Posts($validatedData);
        $post->save();
    
        return response()->json(['message' => 'Post creado con éxito'], 201);
    }
}
