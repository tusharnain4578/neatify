<?php

namespace App\Services;

use App\Http\Requests\Api\V1\ProjectRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectService
{
    public function list(Request $request): Builder
    {
        $query = Project::query()
            ->with(['type:id,name,label', 'status:id,name,label']);

        return $query;
    }
    public function create(ProjectRequest $request): Project
    {
        return Project::create([
            ...$request->validated(),
            'project_type_id' => $request->type,
            'project_status_id' => $request->status
        ]);
    }
    public function update(ProjectRequest $request, Project $project): Project
    {
        $project->fill([
            ...$request->validated(),
            'project_type_id' => $request->type,
            'project_status_id' => $request->status
        ])->save();
        return $project;
    }
}