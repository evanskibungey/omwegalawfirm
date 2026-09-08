<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Coverage for the public pages that carry no server-side data of their own.
 *
 * About and Gallery receive `advocates` and `images` from the client-side dummy
 * provider during Phases 1-2, so there is nothing server-side to assert about
 * them yet. These tests check the route, the component and the shared props —
 * and in Phase 3 they grow assertions on the real props.
 */
class PublicPagesTest extends TestCase
{
    public static function pageProvider(): array
    {
        return [
            'home' => ['/', 'Public/Home'],
            'about' => ['/about', 'Public/About'],
            'gallery' => ['/gallery', 'Public/Gallery'],
            'contact' => ['/contact', 'Public/Contact'],
            'practice areas' => ['/practice-areas', 'Public/PracticeAreas'],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('pageProvider')]
    public function test_the_page_renders_with_shared_props(string $url, string $component): void
    {
        $this->get($url)
            ->assertOk()
            ->assertInertia(
                fn (Assert $page) => $page
                    ->component($component)
                    ->has('office.address.building')
                    ->has('practice_areas', 7)
            );
    }

    public function test_the_placeholder_page_is_gone(): void
    {
        // Every public route now renders a real page. If this file comes back,
        // something regressed.
        $this->assertFileDoesNotExist(
            resource_path('js/Pages/Public/Placeholder.jsx'),
        );
    }

    public function test_the_stock_laravel_welcome_page_is_gone(): void
    {
        $this->assertFileDoesNotExist(
            resource_path('js/Pages/Welcome.jsx'),
        );
    }
}
