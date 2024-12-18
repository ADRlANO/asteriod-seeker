# Asteroid Seeker

Hello!
Welcome to the `Asteroid Seeker` repo 

[App Demo](asteroid-seeker.adri.sh)

## Tech Stack
- Metaframework: [Solid Start](https://start.solidjs.com/)
    - Similar DX as React but with better performance and mental model (imo)
    - Signals-based State Management (Precursor to other frameworks that adopted signals like Preact, Angular, etc)
    - Runtime Reactivity
    - Routing
    - Bundling
    - Server Functions
- Styling: Tailwind
- DB: Xata
- Tanstack:
    - Query: Data Synchronization + Cache Library
        - Prevents new fetches when the requested date haven't passed `staleTime` and the `queryKey` (key for the internal cache) haven't changed
    - Table: Data Visualization Library
- Forms: @modular-forms/solid
- Contracts & Data validation: Valibot
    - Modular
    - Minimal bundle size usage per method

## Features
- Render Asteroids
    - FILTER BY Date
    - FILTER BY Favourite
    - SORTY By Name
    - ADD TO Favourite
- Auth
    - `/register`
    - `/login`

## To Do
- [ ] Improve UI
    - [x] `/asteroid/render` MeteorEffect
    - [ ] `/asteroid/render/:id` ShootingStarEffect
- [ ] Enhance Error Handling
- [ ] `/forgot-password`
- [ ] Info/Error Toasts
- [ ] Use Data Contracts
- [ ] FIX Reload ON Favourite Change
- [ ] Improve types
- [ ] Pagination
- [ ] REMOVE `token` WHEN isFalsy
