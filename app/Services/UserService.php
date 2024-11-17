<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function getByEmail(string $email): User|null
    {
        return User::where('email', $email)->first();
    }

    public function verifyPassword(User $user, string $plainPassword): bool
    {
        return Hash::check($plainPassword, $user->password);
    }
}