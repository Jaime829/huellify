<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class EnergyActivityRequest extends FormRequest
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
            'energy_source_id' => ['exists:energy_sources,id', 'required'],
            'quantity' => ['numeric', 'required', 'min:1'],
            'measurement_unit_id' => ['exists:measurement_units,id', 'required'],
            'activity_date' => ['date', 'required'],
            'description' => 'max:255'
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            'energy_source_id.exists' => "Esa fuente de energia no existe en nuestros registros.",
            'energy_source_id.required' => 'La fuente de energia es obligatoria',
            'quantity.numeric' => 'La distancia recorrida debe ser un numero',
            'quantity.required' => 'La distancia recorrida es obligatoria',
            'quantity.min' => 'La distancia minima es :min',
            'measurement_unit_id.exists' => 'Ese tipo de medida no esta en nuestros registros',
            'measurement_unit_id.required' => 'El tipo de medida es obligatorio',
            'activity_date.date' => "La fecha de la actividad debe se una fecha",
            'activity_date.required' => 'La fecha de la actividad es obligatoria',
            'description.max' => 'El maximo de caracteres permitidos para la descripcion es de :max'
        ];
    }
}
