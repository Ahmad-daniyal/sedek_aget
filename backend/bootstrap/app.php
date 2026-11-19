<?php

use App\Http\Middleware\AuthenticateApi;
use App\Models\Store;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();
        $middleware->alias(['auth.api' => AuthenticateApi::class]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        $exceptions->render(function (ValidationException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return;
            }

            $details = collect($exception->errors())
                ->map(fn (array $messages, string $field) => [
                    'path' => $field,
                    'message' => $messages[0] ?? '',
                ])
                ->values()
                ->all();

            return ApiResponse::fail('Data tidak valid', 422, $details);
        });

        $exceptions->render(function (AuthenticationException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return;
            }

            return ApiResponse::fail('Silakan masuk terlebih dahulu', 401);
        });

        $exceptions->render(function (AuthorizationException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return;
            }

            return ApiResponse::fail('Akses ditolak', 403);
        });

        // ModelNotFoundException dinormalisasi Laravel menjadi
        // NotFoundHttpException sebelum render, jadi dibaca dari previous.
        $exceptions->render(function (NotFoundHttpException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return;
            }

            $previous = $exception->getPrevious();

            if ($previous instanceof ModelNotFoundException) {
                $message = match ($previous->getModel()) {
                    Store::class => 'Toko tidak ditemukan',
                    User::class => 'Pengguna tidak ditemukan',
                    default => 'Data tidak ditemukan',
                };

                return ApiResponse::fail($message, 404);
            }

            return ApiResponse::fail('Endpoint tidak ditemukan', 404);
        });

        $exceptions->render(function (MethodNotAllowedHttpException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return;
            }

            return ApiResponse::fail('Metode tidak diizinkan', 405);
        });
    })->create();
