<?php

use App\Http\Controllers\Posts\PostController;
use App\Http\Controllers\Usuarios\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'Users', 'controller' => UsuarioController::class], function () {
    Route::post('/CreateUser', 'createUser');
    Route::get('/GetUserById/{id}', 'getUserById');
    Route::get('/GeAlltUsers', 'getAllUsers');
    Route::post('/Login', 'loginUser');
    Route::post('/UpdateUser/{id}', 'updateUser');
});

Route::group(['prefix' => 'Posts', 'controller' => PostController::class], function () {
    Route::post('/CreatePost', 'createPost');
    Route::post('/UpdatePost/{id}', 'updatePost');
    Route::get('/GetPosts', 'getAllPosts');
    Route::get('/GetPostById/{id}', 'getPostById');
    Route::post('/SavePost', 'savePost');
    Route::get('/PostByUser/{id}', 'getPostByUser');
    Route::post('/SaveComment', 'saveComment');
    Route::get('/PostComment/{id}', 'getCommentsByPost');
    Route::put('/FinishPost/{id}', 'finishPost');
    Route::get('/SearchPosts', 'searchPosts');
});
