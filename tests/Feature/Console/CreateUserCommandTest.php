<?php

namespace Tests\Feature\Console;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CreateUserCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_staff_account(): void
    {
        $this->artisan('app:create-user', [
            '--name' => 'Jane Advocate',
            '--email' => 'jane@omwenga.test',
        ])
            ->expectsQuestion('Password', 'Str0ng-Passw0rd!')
            ->expectsQuestion('Confirm password', 'Str0ng-Passw0rd!')
            ->assertSuccessful();

        $user = User::where('email', 'jane@omwenga.test')->firstOrFail();

        $this->assertSame('Jane Advocate', $user->name);
        $this->assertTrue(Hash::check('Str0ng-Passw0rd!', $user->password));
        $this->assertNotNull($user->email_verified_at);
    }

    public function test_it_rejects_a_mismatched_confirmation(): void
    {
        $this->artisan('app:create-user', [
            '--name' => 'Jane Advocate',
            '--email' => 'jane@omwenga.test',
        ])
            ->expectsQuestion('Password', 'Str0ng-Passw0rd!')
            ->expectsQuestion('Confirm password', 'something-else')
            ->assertFailed();

        $this->assertDatabaseMissing('users', ['email' => 'jane@omwenga.test']);
    }

    public function test_it_rejects_a_duplicate_email(): void
    {
        User::factory()->create(['email' => 'jane@omwenga.test']);

        $this->artisan('app:create-user', [
            '--name' => 'Impostor',
            '--email' => 'jane@omwenga.test',
        ])
            ->expectsQuestion('Password', 'Str0ng-Passw0rd!')
            ->expectsQuestion('Confirm password', 'Str0ng-Passw0rd!')
            ->assertFailed();

        $this->assertSame(1, User::where('email', 'jane@omwenga.test')->count());
    }
}
