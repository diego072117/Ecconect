<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class CreatePost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'descripcion' => ['nullable', 'string'],
            'publicacion' => ['required', /**'image', 'max:2048'*/],
            'like' => ['boolean'],
            'id_usuarioCreador' => ['required', 'exists:usuarios,id'],
        ];
    }

    public function messages()
    {
        return [
            'publicacion.required' => 'La imagen es requerida.',
            /**'publicacion.image' => 'El archivo debe ser una imagen.',
            'publicacion.max' => 'La imagen no debe superar los 2MB.',*/

            'like.boolean' => 'El campo "like" debe ser booleano.',

            'id_usuarioCreador.required' => 'El ID del usuario creador es requerido.',
            'id_usuarioCreador.exists' => 'El ID del usuario creador no es válido.', 
        ];
    }
}
