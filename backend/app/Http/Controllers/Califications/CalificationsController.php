<?php

namespace App\Http\Controllers\Califications;

use App\Http\Controllers\Controller;
use App\Http\Requests\Califications\CreateCalification;
use App\Http\Requests\Califications\UpdateCalification;
use App\Mail\PendingCalificationMail;
use App\Models\Califications\califications;
use App\Models\Usuarios\Usuario;
use Illuminate\Support\Facades\Mail;

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

        // Buscar el usuario donado por id
        $userDonado = Usuario::find($validatedData['id_usuariodonado']);

        if ($userDonado) {
            // Enviar el correo
            //dd($userDonado->email);
            Mail::to($userDonado->email)->send(new PendingCalificationMail($userDonado));
        }

        return response()->json([
            'message' => 'Calificación registrada correctamente y correo enviado.'
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

    public function getAllCalifications()
    {
        // Obtener todas las calificaciones junto con las relaciones
        $calificaciones = califications::with(['usuarioPost', 'usuarioDonado', 'post'])->get();

        return  $calificaciones;
    }
}
