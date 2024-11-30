<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ProjectType extends Model
{
    protected $fillable = [
        'name',
        'label'
    ];

    public function scopeWhereActive(Builder $query): void
    {
        $query->where('status', true);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
