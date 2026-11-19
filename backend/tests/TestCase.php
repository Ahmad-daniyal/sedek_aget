<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Sanctum hanya memasang session middleware untuk request yang
        // berasal dari domain frontend. Simulasikan Origin SPA React.
        $this->withHeader('Origin', 'http://localhost:5173');
    }
}
