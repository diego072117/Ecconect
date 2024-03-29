<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class CreateUser extends FormRequest
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
            'name' => ['required', 'string'],
            'lastName' => ['required', 'string'],
            'email' =>  ['required', 'email', 'unique:usuarios'],
            'telefono' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages()
    {

        return [
            'name.required' => 'El nombre es requerido.',
            'name.string' => 'El nombre debe ser una cadena de texto.',

            'lastName.required' => 'El apellido es requerido.',
            'lastName.string' => 'El apellido debe ser una cadena de texto.',

            'email.required' => 'El correo es requerido.',
            'email.email' => 'El correo debe tener un formato válido.',
            'email.unique' => 'El correo ya está registrado en la base de datos.',

            'telefono.required' => 'El teléfono es requerido.',
            'telefono.string' => 'El teléfono debe ser una cadena de texto.',

            'password.required' => 'La contraseña es requerida.',
            'password.string' => 'La contraseña debe ser una cadena de texto.',

        ];
    }
}
