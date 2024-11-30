<?php

namespace App\Http\Requests\Api\V1;

use App\Enums\ProjectStatus;
use App\Enums\ProjectType;
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

        $project = $this->route('project');

        return [
            'title' => ['required', 'string', 'max:250', Rule::unique('projects')->ignore($project?->id)],
            'description' => ['nullable', 'string'],
            'type' => ['required', 'numeric', Rule::exists('project_types', 'id')],
            'website_url' => ['nullable', 'string', 'url'],
            'status' => ['required', 'numeric', Rule::exists('project_statuses', 'id')],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
            'budget' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
