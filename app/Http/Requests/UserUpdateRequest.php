<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class UserUpdateRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:80'],
            'description' => ['string', 'max:80', 'nullable']
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            'name.max' => "El maximo de caracteres del nombre es :max",
            'name.required' => "El nombre es obligatorio",
            'name.string' => "El nombre de ser una cadena de texto",
            'description.max' => "El maximo de caracteres de la descripcion es :max",
            'description.string' => "La descripcion debe ser una cadena de caracteres."
        ];
    }
}
