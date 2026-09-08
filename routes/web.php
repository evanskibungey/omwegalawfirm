<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public site
|--------------------------------------------------------------------------
|
| Phase 1. Pages currently render from dummy props supplied client-side by
| resources/js/dev — see docs/data-shapes.md. In Phase 3 these closures become
| controllers returning props of exactly the same shape.
|
| Advocate profiles and gallery images still come from dummy props client-side;
| everything else on these pages is already served from config/site.php.
|
*/

Route::get('/', fn () => Inertia::render('Public/Home'))->name('home');

Route::get('/practice-areas', fn () => Inertia::render('Public/PracticeAreas'))
    ->name('practice-areas.index');

Route::get('/practice-areas/{slug}', function (string $slug) {
    $areas = collect(config('site.practice_areas'));
    $position = $areas->search(fn (array $area) => $area['slug'] === $slug);

    abort_if($position === false, 404);

    return Inertia::render('Public/PracticeArea', [
        'area' => $areas[$position],

        // The three areas following this one, wrapping around the list, so each
        // page suggests a different set rather than always the same three.
        'related' => $areas->concat($areas)
            ->slice($position + 1, 3)
            ->values()
            ->all(),
    ]);
})->name('practice-areas.show');

Route::get('/about', fn () => Inertia::render('Public/About'))->name('about');

Route::get('/gallery', fn () => Inertia::render('Public/Gallery'))->name('gallery');

Route::get('/contact', fn () => Inertia::render('Public/Contact'))->name('contact');

/*
| Consultation enquiries.
|
| Phase 1 validates and confirms. Phase 4 adds the rest of proposal section 4.5:
| persist to `enquiries`, queue a notification to the firm, and add honeypot
| spam protection. The throttle is here now rather than later because this is a
| public write endpoint the moment it exists.
*/
Route::post('/contact', function (Request $request) {
    $slugs = collect(config('site.practice_areas'))->pluck('slug')->all();

    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        // Either contact method is fine, but we need one of them.
        'email' => ['nullable', 'email', 'max:255', 'required_without:phone'],
        'phone' => ['nullable', 'string', 'max:30', 'required_without:email'],
        'practice_area' => ['nullable', Rule::in($slugs)],
        'message' => ['required', 'string', 'min:10', 'max:5000'],
    ], [
        'email.required_without' => 'Give us an email address or a phone number.',
        'phone.required_without' => 'Give us a phone number or an email address.',
        'message.min' => 'Please give us a little more detail so we can point you to the right advocate.',
    ]);

    // TODO Phase 4: Enquiry::create(...) and notify the firm.

    return back()->with(
        'success',
        'We aim to respond within one working day. If the matter is urgent, please call the office.',
    );
})->middleware('throttle:5,1')->name('contact.store');

/*
|--------------------------------------------------------------------------
| Staff area
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
