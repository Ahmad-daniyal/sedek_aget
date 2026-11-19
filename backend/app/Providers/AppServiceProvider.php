<?php

namespace App\Providers;

use App\Contracts\AiVerificationService;
use App\Services\MockAiVerificationService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Provider AI nyata dapat mengganti binding ini tanpa mengubah job.
        $this->app->bind(AiVerificationService::class, MockAiVerificationService::class);
    }

    public function boot(): void
    {
        //
    }
}
