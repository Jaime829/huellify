<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class TransportActivityRequest extends FormRequest
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
        $inicioMes = Carbon::now()->startOfMonth()->toDateString();
        $finMes = Carbon::now()->endOfMonth()->toDateString();
        return [
            'transport_type_id' => ['exists:transport_types,id', 'required'],
            'fuel_type_id' => ['exists:fuel_types,id', 'required'],
            'quantity' => ['numeric', 'required', 'min:1'],
            'measurement_unit_id' => ['exists:measurement_units,id', 'required'],
            'activity_date' => [
                'date',
                'required',
                "after_or_equal:{$inicioMes}",
                "before_or_equal:{$finMes}",
            ],
            'description' => 'max:255'
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            'transport_type_id.exists' => "Ese medio de transporte no existe en nuestros registros.",
            'transport_type_id.required' => 'El medio de transporte es obligatorio',
            'fuel_type_id.exists' => "Ese tipo de combustible no existe en nuestros registros",
            'fuel_type_id.required' => "El tipo de combustible es obligatorio",
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
