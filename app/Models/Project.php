<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Str;

class Project extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'project_type_id',
        'website_url',
        'project_status_id',
        'start_date',
        'end_date',
        'budget'
    ];

    public function status()
    {
        return $this->belongsTo(ProjectStatus::class, 'project_status_id');
    }

    public function type()
    {
        return $this->belongsTo(ProjectType::class, 'project_type_id');
    }
}
