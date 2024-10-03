<?php

namespace App\Http\Requests\Followers;

use Illuminate\Foundation\Http\FormRequest;

class CreateFollower extends FormRequest
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
            'follower_id' => ['required'],
            'followed_id' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'follower_id.required' => 'requerido',
            'followed_id.required' => 'requerido',
        ];
    }
}
