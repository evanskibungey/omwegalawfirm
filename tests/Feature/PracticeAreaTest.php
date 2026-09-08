<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PracticeAreaTest extends TestCase
{
    /**
     * Deliberately hardcoded rather than read from config: these slugs are live
     * URLs, so renaming one should break a test, not pass silently.
     *
     * Data providers also run before the application boots, so config() is not
     * available here.
     */
    public static function slugProvider(): array
    {
        return [
            ['conveyancing', 'Conveyancing'],
            ['real-estate', 'Real Estate & Property Development'],
            ['civil-litigation', 'Civil Litigation & Dispute Resolution'],
            ['insurance-law', 'Insurance Law'],
            ['environment-land', 'Environment & Land Laws'],
            ['commercial-corporate', 'Commercial & Corporate Law'],
            ['banking-finance', 'Banking & Finance'],
        ];
    }

    public function test_the_index_lists_every_practice_area(): void
    {
        $this->get('/practice-areas')
            ->assertOk()
            ->assertInertia(
                fn (Assert $page) => $page
                    ->component('Public/PracticeAreas')
                    ->has('practice_areas', 7)
            );
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('slugProvider')]
    public function test_each_practice_area_page_renders(string $slug, string $name): void
    {
        $this->get("/practice-areas/{$slug}")
            ->assertOk()
            ->assertInertia(
                fn (Assert $page) => $page
                    ->component('Public/PracticeArea')
                    ->where('area.slug', $slug)
                    ->where('area.name', $name)
                    ->has('related', 3)
            );
    }

    public function test_an_unknown_practice_area_is_not_found(): void
    {
        $this->get('/practice-areas/not-a-real-area')->assertNotFound();
    }

    public function test_related_areas_never_include_the_current_one(): void
    {
        foreach (config('site.practice_areas') as $area) {
            $this->get("/practice-areas/{$area['slug']}")
                ->assertInertia(function (Assert $page) use ($area) {
                    $related = collect($page->toArray()['props']['related']);

                    $this->assertCount(3, $related);
                    $this->assertNotContains(
                        $area['slug'],
                        $related->pluck('slug')->all(),
                        "{$area['slug']} was listed as related to itself",
                    );
                });
        }
    }

    public function test_office_and_practice_areas_are_shared_with_every_page(): void
    {
        // The site header and footer read these through usePage() on every page,
        // so they have to be shared props rather than page props.
        $this->get('/')
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has('office.address.building')
                    ->has('office.phone')
                    ->has('practice_areas', 7)
            );
    }
}
