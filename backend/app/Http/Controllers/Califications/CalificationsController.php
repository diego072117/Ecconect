<?php

namespace App\Http\Controllers\Califications;

use App\Http\Controllers\Controller;
use App\Http\Requests\Califications\CreateCalification;
use App\Http\Requests\Califications\UpdateCalification;
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

    public function getByUsuarioDonado($id)
    {
        // Obtener todas las calificaciones de un usuario específico junto con las relaciones
        $calificaciones = califications::with(['usuarioPost', 'usuarioDonado', 'post'])
            ->where('id_usuariodonado', $id)
            ->get();

        return $calificaciones;
    }

    public function updateCalification($id, UpdateCalification $request)
    {
        // Validar los datos de entrada usando la request UpdateCalification
        $validatedData = $request->validated();

        // Buscar la calificación por id
        $calificacion = califications::findOrFail($id);

        // Actualizar los campos 'calification' y 'calificado'
        $calificacion->update([
            'calification' => $validatedData['calification'],
            'calificado' => 1, // Cambiar a true (1)
        ]);

        return response()->json([
            'message' => 'Calificación actualizada correctamente.',
            'data' => $calificacion
        ], 200);
    }
}
