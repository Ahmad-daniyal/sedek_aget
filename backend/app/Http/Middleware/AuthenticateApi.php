<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate;

/**
 * Autentikasi untuk API: tidak pernah redirect ke route login web.
 * Request tanpa header Accept: application/json tetap mendapat envelope 401.
 */
class AuthenticateApi extends Authenticate
{
    protected function redirectTo($request): ?string
    {
        return null;
    }
}
