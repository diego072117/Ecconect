<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\CreatePost;
use App\Http\Requests\Post\UpdatePost;
use App\Models\Comment\Comment;
use App\Models\Posts\Posts;
use App\Models\Posts\SavePost;
use Illuminate\Http\Request;

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

    public function updatePost(UpdatePost $request, $postId)
    {
        $post = Posts::findOrFail($postId);

        if (!$post) {
            return response()->json(['message' => 'El post no fue encontrado'], 404);
        }

        $validatedData = $request->validated();

        // Verificar si hay una nueva imagen en la solicitud
        if ($request->hasFile('publicacion')) {
            $newImage = $request->file('publicacion');
            $newImagePath = $newImage->storeAs('publicaciones', 'publicacion_' . time() . '.' . $newImage->getClientOriginalExtension(), 'public');
            $validatedData['publicacion'] = $newImagePath;
        }

        $post->update($validatedData);

        return response()->json(['message' => 'Post actualizado con éxito'], 200);
    }

    public function getAllPosts()
    {
        // Obtener todos los posts ordenados del más reciente al más viejo
        $posts = Posts::orderBy('created_at', 'DESC')->get();

        // Cargar la relación con el usuario creador para cada post
        $posts->load('usuarioCreador');

        return response()->json(['posts' => $posts], 200);
    }

    public function getPostByUser($userId)
    {
        // Filtra los posts por el user_id proporcionado
        $posts = Posts::where('id_usuarioCreador', $userId)->orderBy('created_at', 'DESC')->get();

        return response()->json(['posts' => $posts], 200);
    }

    public function savePost(Request $request)
    {

        $savedPost = new SavePost($request->all());
        $savedPost->save();

        return response()->json(['message' => 'Post guardado con éxito'], 201);
    }

    public function getPostById($postId)
    {

        $post = Posts::findOrFail($postId);

        if (!$post) {
            return response()->json(['message' => 'El post no fue encontrado'], 404);
        }

        $post->load('usuarioCreador');

        return $post;
    }

    public function saveComment(Request $request)
    {
        // $validatedData = $request->validate([
        //     'id_user' => 'required|exists:usuarios,id',
        //     'id_post' => 'required|exists:posts,id',
        //     'coment' => 'required|string|max:255',
        // ]);

        $comment = new Comment($request->all());
        $comment->save();

        return response()->json(['message' => 'Comentario creado con éxito'], 201);
    }

    public function getCommentsByPost($postId)
    {
        $post = Posts::findOrFail($postId);

        if (!$post) {
            return response()->json(['message' => 'El post no fue encontrado'], 404);
        }

        $comments = Comment::where('id_post', $postId)->orderBy('created_at', 'DESC')->get();

        $comments->load("usuario");

        return  $comments;
    }
}
