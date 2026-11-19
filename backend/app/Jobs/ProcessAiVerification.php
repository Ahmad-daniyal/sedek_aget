<?php

namespace App\Jobs;

use App\Contracts\AiVerificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Throwable;

class ProcessAiVerification implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public int $tries = 3;

    public array $backoff = [10, 30, 60];

    /**
     * @param  array<string, mixed>  $payload
     */
    public function __construct(public readonly array $payload) {}

    public function handle(AiVerificationService $verification): void
    {
        try {
            $result = $verification->verify($this->payload);

            Log::info('Verifikasi AI selesai', [
                'decision' => $result['decision'] ?? null,
                'provider' => $result['provider'] ?? null,
            ]);
        } catch (Throwable $exception) {
            // Kegagalan teknis bukan indikasi penipuan: catat dan biarkan
            // Laravel Queue melakukan retry sesuai $tries/$backoff.
            Log::warning('Verifikasi AI gagal secara teknis', [
                'message' => $exception->getMessage(),
            ]);

            throw $exception;
        }
    }

    public function fail(Throwable $exception): void
    {
        Log::error('Job verifikasi AI gagal setelah retry', [
            'message' => $exception->getMessage(),
        ]);
    }
}
