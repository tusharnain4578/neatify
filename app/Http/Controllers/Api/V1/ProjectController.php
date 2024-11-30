<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\ProjectRequest;
use App\Models\Project;
use App\Models\ProjectStatus;
use App\Models\ProjectType;
use App\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct(
        protected ProjectService $projectService
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->response(
            success: true,
            data: $this->projectService->list($request)->paginate()
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $project = $this->projectService->create($request);
        return $this->response(success: true, message: 'Project created!', data: $project);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return $this->response(success: true, data: $project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $project = $this->projectService->update($request, $project);
        return $this->response(success: true, message: 'Project Updated!', data: $project);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getProjectStatuses()
    {
        return $this->response(
            success: true,
            data: ProjectStatus::whereActive()->get(['id', 'label'])
        );
    }

    public function getProjectTypes()
    {
        return $this->response(
            success: true,
            data: ProjectType::whereActive()->get(['id', 'label'])
        );
    }

}
