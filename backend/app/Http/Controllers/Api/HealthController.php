<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Support\ApiResponse;

class HealthController extends Controller
{
    public function index()
    {
        return ApiResponse::ok([
            'status' => 'ok',
            'service' => 'sedek_aget-api',
            'timestamp' => now()->toISOString(),
        ]);
    }
}
