<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Never seed accounts outside local development. This database holds
        // privileged client and matter data, and a seeded account has a known
        // password — running this in production would create a back door.
        // Production accounts are created with `php artisan app:create-user`.
        if (! app()->environment('local')) {
            $this->command->warn('Skipping user seeding: only runs in the local environment.');

            return;
        }

        User::factory()->create([
            'name' => 'Local Dev',
            'email' => 'dev@omwenga.test',
        ]);
    }
}
