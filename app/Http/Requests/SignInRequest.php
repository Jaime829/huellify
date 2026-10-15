<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class SignInRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['email', 'required', 'exists:users,email'],
            'password' => 'required',
        ];
    }

    #[Override]
    public function messages()
    {

        return [
            'email.exists' => "No encontramos una cuenta con ese email",
            'email.email' => "El formato del email no es correcto",
            'email.required' => "El email es obligatorio",
            'password.required' => "La contraseña es obligatoria"
        ];
    }
}
