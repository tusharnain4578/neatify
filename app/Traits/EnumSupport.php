<?php

namespace App\Traits;

use Illuminate\Support\Collection;

trait EnumSupport
{
    /**
     * Check if the enum contains a given value.
     *
     * @param string|int $value 
     * @return bool 
     */
    public static function contains(string|int $value): bool
    {
        return in_array($value, array_column(self::cases(), 'value'), true);
    }

    /**
     * Return an array of enum values if it's a backed enum, 
     * otherwise return an array of enum names.
     *
     * @return array 
     */
    public static function array(): array
    {
        $cases = self::cases();
        return array_column($cases, isset($cases[0]->value) ? 'value' : 'name');
    }

    /**
     * Return a collection of enum values if it's a backed enum,
     * otherwise return a collection of enum names.
     *
     * @return \Illuminate\Support\Collection
     */
    public static function all(): Collection
    {
        return collect(self::array());
    }
}