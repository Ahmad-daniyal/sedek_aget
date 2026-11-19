<?php

namespace App\Contracts;

interface AiVerificationService
{
    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    public function verify(array $payload): array;
}
