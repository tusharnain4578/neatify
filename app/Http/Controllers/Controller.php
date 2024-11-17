<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class Controller
{
    public function response(
        bool $success,
        ?string $message = null,
        Collection|array|Model|null $data = null,
    ): JsonResponse {
        $responseArray = array_filter(get_defined_vars(), fn($val) => !is_null($val));
        return response()->json($responseArray);
    }

    public function errorResponse(string $message, ?array $errors = null, int $statusCode = 422): JsonResponse
    {
        if ($errors && !empty($errors))
            $resArr['errors'] = $errors;
        return response()->json(['message' => $message, ...($resArr ?? [])])->setStatusCode($statusCode);
    }
}
