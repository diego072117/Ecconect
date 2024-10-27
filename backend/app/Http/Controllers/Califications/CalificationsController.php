<?php

namespace App\Http\Controllers\Califications;

use App\Http\Controllers\Controller;
use App\Http\Requests\Califications\CreateCalification;
use App\Models\Califications\califications;

class CalificationsController extends Controller
{
    public function store(CreateCalification $request)
    {
        // Validar la request
        $validatedData = $request->validated();

        // Crear la nueva calificación
        califications::create([
            'id_usuarioPost' => $validatedData['id_usuarioPost'],
            'id_usuariodonado' => $validatedData['id_usuariodonado'],
            'id_post' => $validatedData['id_post']
        ]);

        return response()->json([
            'message' => 'Calificación registrada correctamente.'
        ], 201);
    }
}
