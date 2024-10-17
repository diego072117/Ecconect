<?php

namespace App\Http\Requests\Califications;

use Illuminate\Foundation\Http\FormRequest;

class CreateCalification extends FormRequest
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
            'id_usuarioPost' => ['required'],
            'id_usuariodonado' => ['required'],
            'calification' => ['required', 'integer', 'between:1,5'],
        ];
    }

    public function messages()
    {
        return [
            'id_usuarioPost.required' => 'La imagen es requerida.',

            'id_usuariodonado.required' => 'La imagen es requerida.',

            'calification.required' => 'La imagen es requerida.',
        ];
    }
}
