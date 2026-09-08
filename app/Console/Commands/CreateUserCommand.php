<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class CreateUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-user
                            {--name= : The staff member\'s full name}
                            {--email= : The email address used to sign in}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a staff account for the admin dashboard';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $name = $this->option('name') ?: $this->ask('Full name');
        $email = $this->option('email') ?: $this->ask('Email address');
        $password = $this->secret('Password');
        $confirmation = $this->secret('Confirm password');

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $confirmation,
        ], [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->components->error($error);
            }

            return self::FAILURE;
        }

        // Accounts created here are provisioned by an administrator, so the address is
        // already trusted. Marking it verified keeps these accounts working if the
        // MustVerifyEmail contract is enabled on the User model later.
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        // email_verified_at is not mass assignable on the User model, so set it directly.
        $user->forceFill(['email_verified_at' => now()])->save();

        $this->components->info("Created staff account for {$user->email}.");

        return self::SUCCESS;
    }
}
