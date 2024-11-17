<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\Auth\UserRegistrationRequest;
use App\Http\Requests\Api\V1\Auth\UserLoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class AuthController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {
    }

    public function register(UserRegistrationRequest $request): JsonResponse
    {
        $user = User::create($request->validated());
        return $this->response(success: true, message: 'Account created!', data: $user)->setStatusCode(201);
    }

    public function login(UserLoginRequest $request): JsonResponse
    {
        $user = $this->userService->getByEmail($request->email);

        if (!$user || !$this->userService->verifyPassword(user: $user, plainPassword: $request->password)) {
            $errors['email'] = $errors['password'] = 'Invalid Credentials!';
            return $this->errorResponse(message: 'Invalid Credentials!', errors: $errors);
        }
        $token = $user->createToken($user->email);
        return $this->response(success: true, message: 'Logged In!', data: ['user' => $user, 'token' => $token->plainTextToken]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return $this->response(success: true, message: 'Logged out successfully!');
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        return $this->response(success: true, message: 'authenticated', data: [
            'user' => $user
        ]);
    }
}
