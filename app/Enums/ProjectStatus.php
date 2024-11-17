<?php

namespace App\Enums;

use App\Traits\EnumSupport;

enum ProjectStatus: string
{
    use EnumSupport;

    case ACTIVE = 'active';
    case COMPLETED = 'completed';
    case ON_HOLD = 'on-hold';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::COMPLETED => 'Completed',
            self::ON_HOLD => 'On Hold',
        };
    }
}
