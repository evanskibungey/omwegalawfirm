<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Self-service registration is deliberately disabled — this application holds
     * privileged client and matter data, so accounts are provisioned by an
     * administrator. These tests exist to stop the route being reintroduced.
     */
    public function test_registration_screen_is_not_available(): void
    {
        $this->get('/register')->assertNotFound();
    }

    public function test_users_cannot_register_themselves(): void
    {
        $response = $this->post('/register', [
            'name' => 'Intruder',
            'email' => 'intruder@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertNotFound();
        $this->assertGuest();
        $this->assertDatabaseMissing('users', ['email' => 'intruder@example.com']);
        $this->assertSame(0, User::count());
    }

    public function test_no_named_register_route_is_registered(): void
    {
        $this->assertFalse(Route::has('register'));
    }
}
