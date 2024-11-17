<?php

namespace App\Http\Requests\Api\V1;

use App\Enums\ProjectStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:250', 'unique:projects'],
            'description' => ['nullable', 'string'],
            'website_url' => ['nullable', 'string', 'url'],
            'status' => ['required', Rule::in(ProjectStatus::array())],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
            'budget' => ['nullable', 'numeric', 'min:0']
        ];
    }
}
