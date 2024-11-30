<?php

namespace Database\Seeders;

use App\Models\ProjectStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            'on_hold' => 'On Hold',
            'active' => 'Active',
            'completed' => 'Completed',
        ];

        foreach ($statuses as $name => $label) {
            ProjectStatus::create([
                'name' => $name,
                'label' => $label
            ]);
        }
    }
}
