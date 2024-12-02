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
        $posts = Posts::where('state', 'activo')->orderBy('created_at', 'DESC')->get();

        // Cargar la relación con el usuario creador para cada post
        $posts->load('usuarioCreador');

        return response()->json(['posts' => $posts], 200);
    }

    public function getAllPostsAdmin()
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

    public function finishPost($postId)
    {
        $post = Posts::findOrFail($postId);

        if (!$post) {
            return response()->json(['message' => 'El post no fue encontrado'], 404);
        }

        $post->state = 'finalizado';
        $post->save();

        return response()->json(['message' => 'El post ha sido finalizado con éxito'], 200);
    }

    public function searchPosts(Request $request)
    {
        $searchTerm = $request->input('property');


        if (empty($searchTerm)) {
            return response()->json(['error' => 'Debe proporcionar un término de búsqueda.'], 400);
        }

        $posts = Posts::where('descripcion', 'LIKE', '%' . $searchTerm . '%')->get();

        $posts->load('usuarioCreador');

        // Si no se encuentran resultados
        if ($posts->isEmpty()) {
            return response()->json(['message' => 'No se encontraron posts con esa descripción.'], 404);
        }

        return response()->json(['postsSearchByUser' => $posts], 200);
    }

    public function getMostCommentedPosts()
    {
        $posts = Posts::with(['usuarioCreador'])
            ->withCount('comments') // Cuenta los comentarios relacionados
            ->having('comments_count', '>', 0) // Excluye posts con 0 comentarios
            ->orderBy('comments_count', 'desc') // Ordena por número de comentarios en orden descendente
            ->take(6) // Limita el resultado a los 6 más comentados
            ->get();

        return response()->json($posts);
    }

    public function deletePost($postId)
    {
        $post = Posts::findOrFail($postId);
    
        if (!$post) {
            return response()->json(['message' => 'El post no fue encontrado'], 404);
        }
    
        // Cambia el estado del post a 'finalizado'
        $post->state = 'finalizado';
        $post->save();
    
        $post->delete();
    
        return response()->json(['message' => 'Post finalizado y eliminado con éxito'], 200);
    }
    
}
