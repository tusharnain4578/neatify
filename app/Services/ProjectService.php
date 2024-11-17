<?php

namespace App\Services;

use App\Http\Requests\Api\V1\ProjectRequest;
use App\Models\Project;

class ProjectService
{
    public function create(ProjectRequest $request): Project
    {
        return Project::create($request->validated());
    }
}