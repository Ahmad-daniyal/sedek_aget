<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());

        Auth::login($user);
        $request->session()->regenerate();

        return ApiResponse::ok(['user' => UserResource::make($user)->resolve()], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->authService->login($request->validated());

        if (! $user) {
            return ApiResponse::fail('Email atau password salah', 401);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return ApiResponse::ok(['user' => UserResource::make($user)->resolve()]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return ApiResponse::ok(['message' => 'Berhasil keluar']);
    }

    public function me(Request $request): JsonResponse
    {
        return ApiResponse::ok(['user' => UserResource::make($request->user())->resolve()]);
    }
}
