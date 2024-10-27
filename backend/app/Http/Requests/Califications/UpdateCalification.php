<?php

namespace App\Http\Requests\Califications;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCalification extends FormRequest
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
            'calification' => [ 'integer', 'between:1,5'],
        ];
    }

    public function messages()
    {
        return [
            'calification.integer' => 'debe ser un numero.',
        ];
    }
}
