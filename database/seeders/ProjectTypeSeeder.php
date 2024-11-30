<?php

namespace Database\Seeders;

use App\Models\ProjectType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            'software_project' => 'Software Project',
            'digital_marketing' => 'Digital Marketing',
            'consulting' => 'Consulting',
            'research_and_development' => 'Research & Development',
            'product_design' => 'Product Design',
            'business_analysis' => 'Business Analysis',
            'project_management' => 'Project Management',
        ];

        foreach ($statuses as $name => $label) {
            ProjectType::create([
                'name' => $name,
                'label' => $label
            ]);
        }
    }
}
