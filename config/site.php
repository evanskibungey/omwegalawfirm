<?php

/*
|--------------------------------------------------------------------------
| Site configuration
|--------------------------------------------------------------------------
|
| Static content that the site header and footer need on every page, shared
| with every Inertia response by HandleInertiaRequests::share().
|
| This lives on the server rather than in resources/js/data because it is not
| dummy data — it is the real, permanent home for these values. Only entities
| that will become database queries (clients, matters, enquiries, gallery,
| advocates) are mocked client-side during Phases 1-2.
|
| Shapes are defined in docs/data-shapes.md.
|
*/

return [

    'office' => [
        'name' => 'Omwenga & Company Advocates',
        'tagline' => 'Advocates, Commissioners for Oaths & Notaries Public',

        // Building, street and town come from the firm's letterhead.
        'address' => [
            'building' => 'Daima Towers',
            'street' => 'Uganda Road',
            'town' => 'Eldoret',
            'county' => 'Uasin Gishu',
            'postal' => 'P.O. Box 0000-30100', // PLACEHOLDER — firm to supply
            'country' => 'Kenya',
        ],

        // PLACEHOLDER — firm to supply. Kept in +254 form for tel: links.
        'phone' => ['+254 7XX XXX XXX', '+254 7XX XXX XXX'],

        'email' => 'info@example.com', // PLACEHOLDER — firm to supply

        'hours' => [
            ['days' => 'Monday – Friday', 'opens' => '08:00', 'closes' => '17:00'],
            ['days' => 'Saturday', 'opens' => '09:00', 'closes' => '13:00'],
            ['days' => 'Sunday & public holidays', 'opens' => null, 'closes' => null],
        ],

        'map_embed_url' => null, // PLACEHOLDER — once the firm confirms the pin
    ],

    /*
    | The seven areas from proposal section 2. Slugs are URLs — do not rename
    | one after launch. `summary` is draft copy; the firm supplies final wording
    | and the body for each page.
    */
    'practice_areas' => [
        [
            'slug' => 'conveyancing',
            'name' => 'Conveyancing',
            'summary' => 'Transfers, charges, leases and searches — handled end to end, from instructions through to registration.',
            'body_html' => null,
            'icon' => 'deed',
        ],
        [
            'slug' => 'real-estate',
            'name' => 'Real Estate & Property Development',
            'summary' => 'Acquisitions, disposals, joint ventures and development agreements for owners, buyers and developers.',
            'body_html' => null,
            'icon' => 'building',
        ],
        [
            'slug' => 'civil-litigation',
            'name' => 'Civil Litigation & Dispute Resolution',
            'summary' => 'Representation before the courts and tribunals, and negotiated settlement where that serves you better.',
            'body_html' => null,
            'icon' => 'scales',
        ],
        [
            'slug' => 'insurance-law',
            'name' => 'Insurance Law',
            'summary' => 'Claims, coverage disputes and regulatory advice for insurers, brokers and policyholders.',
            'body_html' => null,
            'icon' => 'shield',
        ],
        [
            'slug' => 'environment-land',
            'name' => 'Environment & Land Laws',
            'summary' => 'Land tenure, boundary and succession disputes, and compliance under the environmental statutes.',
            'body_html' => null,
            'icon' => 'terrain',
        ],
        [
            'slug' => 'commercial-corporate',
            'name' => 'Commercial & Corporate Law',
            'summary' => 'Company formation, governance, commercial agreements and the day-to-day counsel a growing business needs.',
            'body_html' => null,
            'icon' => 'briefcase',
        ],
        [
            'slug' => 'banking-finance',
            'name' => 'Banking & Finance',
            'summary' => 'Security documentation, facility agreements and recovery work for lenders and borrowers alike.',
            'body_html' => null,
            'icon' => 'bank',
        ],
    ],

];
