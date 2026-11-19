<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StoreDetailResource;
use App\Http\Resources\StoreResource;
use App\Services\StoreService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function __construct(private readonly StoreService $storeService) {}

    public function index(Request $request): JsonResponse
    {
        $stores = $this->storeService->list(
            $request->query('search'),
            $request->query('category'),
        );

        return ApiResponse::ok(StoreResource::collection($stores)->resolve());
    }

    public function show(string $slug): JsonResponse
    {
        $store = $this->storeService->getBySlug($slug);

        return ApiResponse::ok(StoreDetailResource::make($store)->resolve());
    }
}
