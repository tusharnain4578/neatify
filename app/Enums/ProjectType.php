<?php

namespace App\Enums;

use App\Traits\EnumSupport;

enum ProjectType: string
{
    use EnumSupport;

    case SOFTWARE_PROJECT = 'software_project';
    case MARKETING_PROJECT = 'marketing_project';
    case RESEARCH_PROJECT = 'research_project';
    case CONSULTING_PROJECT = 'consulting_project';
    case DESIGN_PROJECT = 'design_project';
    case ECOMMERCE_PROJECT = 'ecommerce_project';

    public function label(): string
    {
        return match ($this) {
            self::SOFTWARE_PROJECT => 'Software Project',
            self::MARKETING_PROJECT => 'Marketing Project',
            self::RESEARCH_PROJECT => 'Research Project',
            self::CONSULTING_PROJECT => 'Consulting Project',
            self::DESIGN_PROJECT => 'Design Project',
            self::ECOMMERCE_PROJECT => 'E-commerce Project',
        };
    }
}
