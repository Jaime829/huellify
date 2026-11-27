<?php

it('muestra las paginas publicas', function () {
    foreach (['landing', 'about', 'terms', 'privacy'] as $route) {
        $this->get(route($route))->assertOk();
    }
});

it('la landing enlaza las paginas institucionales', function () {
    $this->get(route('landing'))
        ->assertOk()
        ->assertSee(route('about'))
        ->assertSee(route('terms'))
        ->assertSee(route('privacy'));
});

it('las paginas legales muestran la advertencia de borrador', function () {
    foreach (['terms', 'privacy'] as $route) {
        $this->get(route($route))
            ->assertOk()
            ->assertSee('borrador', false)
            ->assertSee('asesoría legal', false);
    }
});

it('las paginas legales muestran marcadores pendientes', function () {
    $this->get(route('privacy'))
        ->assertOk()
        ->assertSee('[POR COMPLETAR:', false);
});
