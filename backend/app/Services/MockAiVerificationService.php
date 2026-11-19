<?php

namespace App\Services;

use App\Contracts\AiVerificationService;

final class MockAiVerificationService implements AiVerificationService
{
    public function verify(array $payload): array
    {
        return [
            'provider' => 'mock',
            'decision' => 'needs_review',
            'verificationScore' => null,
            'riskScore' => null,
            'reason' => 'Layanan AI belum dikonfigurasi; hasil ini bukan penilaian akhir.',
        ];
    }
}
