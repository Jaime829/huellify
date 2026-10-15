<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Override;

class SignUpRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'email' => ['email', 'required', 'unique:users,email'],
            'password' => [
                'confirmed',
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->symbols()
                    ->numbers()
                    ->uncompromised()
            ],
            'terms' => ['accepted']
        ];
    }

    #[Override]
    public function messages(): array
    {
        return [
            'name.required' => "El nombre es obligatorio",
            'name.string' => "El nombre debe ser una cadena de texto",
            'email.email' => "Formato de email incorrecto",
            'email.required' => "El email es obligatorio",
            'email.unique' => "Ya existe un usuario registrado con ese email",
            'password.confirmed' => "Las contraseñas no coinciden",
            'password.required' => "La contraseña es obligatoria",
            'password.min' => "La contraseña debe tener como minimo :min caracteres",
            'password.letters' => "La contraseña debe contener al menos 1 letra",
            'password.mixed' => "La contraseña debe contener al menos 1 minuscula y 1 mayuscula",
            'password.symbols' => "La contraseña debe contener al menos 1 caracter especial (^@_-.*)",
            'password.uncompromised' => "La contraseña es insegura. Elige una mas segura",
            'terms.accepted' => "Debes aceptar los terminos y condiciones"
        ];
    }
}
