<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ContactTest extends TestCase
{
    private function validEnquiry(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Prospective Client',
            'email' => 'someone@example.com',
            'phone' => '',
            'practice_area' => 'conveyancing',
            'message' => 'I would like advice on transferring title to a property in Eldoret.',
        ], $overrides);
    }

    public function test_the_contact_page_renders(): void
    {
        $this->get('/contact')
            ->assertOk()
            ->assertInertia(
                fn (Assert $page) => $page
                    ->component('Public/Contact')
                    ->has('office.hours')
                    ->has('practice_areas', 7)
            );
    }

    public function test_an_enquiry_can_be_submitted(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validEnquiry())
            ->assertRedirect('/contact')
            ->assertSessionHas('success');
    }

    public function test_name_and_message_are_required(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validEnquiry([
                'name' => '',
                'message' => '',
            ]))
            ->assertSessionHasErrors(['name', 'message']);
    }

    public function test_a_phone_number_alone_is_enough(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validEnquiry([
                'email' => '',
                'phone' => '+254 712 345 678',
            ]))
            ->assertSessionHasNoErrors()
            ->assertSessionHas('success');
    }

    public function test_an_email_alone_is_enough(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validEnquiry([
                'email' => 'someone@example.com',
                'phone' => '',
            ]))
            ->assertSessionHasNoErrors();
    }

    public function test_at_least_one_contact_method_is_required(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validEnquiry([
                'email' => '',
                'phone' => '',
            ]))
            ->assertSessionHasErrors(['email', 'phone']);
    }

    public function test_the_practice_area_must_be_one_the_firm_offers(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validEnquiry([
                'practice_area' => 'maritime-law',
            ]))
            ->assertSessionHasErrors('practice_area');
    }

    public function test_no_practice_area_is_acceptable(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validEnquiry([
                'practice_area' => '',
            ]))
            ->assertSessionHasNoErrors();
    }

    public function test_the_endpoint_is_rate_limited(): void
    {
        // A public write endpoint. Six posts in a minute; the sixth is refused.
        for ($attempt = 1; $attempt <= 5; $attempt++) {
            $this->post('/contact', $this->validEnquiry())
                ->assertRedirect();
        }

        $this->post('/contact', $this->validEnquiry())
            ->assertStatus(429);
    }
}
