<?php

use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\User;
use App\Models\UserHabit;

beforeEach(function () {
    $this->seed();
    $this->user = User::factory()->create();
    $this->habit = Habit::firstOrFail();
    $this->actingAs($this->user);
});

it('muestra el listado de mis habitos y el explorador', function () {
    $this->get(route('dashboard.myhabits'))->assertOk();
    $this->get(route('dashboard.habits.explore'))->assertOk();
});

it('adopta un habito y valida el objetivo semanal', function () {
    $this->post(route('dashboard.habits.adopt', $this->habit), [])
        ->assertSessionHasErrors('weekly_target');

    $this->post(route('dashboard.habits.adopt', $this->habit), ['weekly_target' => 3])
        ->assertRedirect(route('dashboard.myhabits'))
        ->assertSessionHas('status', 'Hábito adoptado con exito');

    $this->assertDatabaseHas('user_habits', [
        'user_id' => $this->user->id,
        'habit_id' => $this->habit->id,
        'weekly_target' => 3,
    ]);
});

it('impide adoptar dos veces el mismo habito', function () {
    $data = ['weekly_target' => 3];

    $this->post(route('dashboard.habits.adopt', $this->habit), $data)
        ->assertSessionHas('status', 'Hábito adoptado con exito');

    $this->post(route('dashboard.habits.adopt', $this->habit), $data)
        ->assertSessionHas('error', 'Ya adoptaste ese habito, selecciona otro.');

    expect(UserHabit::where('user_id', $this->user->id)
        ->where('habit_id', $this->habit->id)->count())->toBe(1);
});

it('actualiza el objetivo semanal de un habito adoptado', function () {
    $userHabit = UserHabit::create([
        'user_id' => $this->user->id,
        'habit_id' => $this->habit->id,
        'status' => 'active',
        'weekly_target' => 3,
        'adopted_at' => now()->subDay(),
    ]);

    $this->patch(route('dashboard.myhabit.update', $userHabit), ['weekly_target' => 5])
        ->assertSessionHas('status', 'Objetivo actualizado con exito');

    expect((float) $userHabit->fresh()->weekly_target)->toBe(5.0);
});

it('pausa y reanuda un habito adoptado', function () {
    $userHabit = UserHabit::create([
        'user_id' => $this->user->id,
        'habit_id' => $this->habit->id,
        'status' => 'active',
        'weekly_target' => 3,
        'adopted_at' => now()->subDay(),
    ]);

    $this->patch(route('dashboard.myhabit.update', $userHabit), ['action' => 'pause'])
        ->assertSessionHas('status', 'Hábito pausado con exito.');
    expect($userHabit->fresh()->status)->toBe('paused');

    $this->patch(route('dashboard.myhabit.update', $userHabit), ['action' => 'resume'])
        ->assertSessionHas('status', 'Hábito reanudado con exito.');
    expect($userHabit->fresh()->status)->toBe('active');
});

it('impide ver un habito adoptado por otro usuario', function () {
    $otro = User::factory()->create();
    $userHabit = UserHabit::create([
        'user_id' => $otro->id,
        'habit_id' => $this->habit->id,
        'status' => 'active',
        'weekly_target' => 3,
        'adopted_at' => now()->subDay(),
    ]);

    $this->get(route('dashboard.myhabit.show', $userHabit))->assertForbidden();
});

it('registra, actualiza y elimina un avance de habito', function () {
    $userHabit = UserHabit::create([
        'user_id' => $this->user->id,
        'habit_id' => $this->habit->id,
        'status' => 'active',
        'weekly_target' => 3,
        'adopted_at' => now()->subDay(),
    ]);

    $data = ['recorded_at' => now()->toDateString(), 'notes' => 'Avance de prueba'];
    if ($this->habit->tracking_type === 'quantity') {
        $data['quantity'] = 2;
    }

    $this->get(route('dashboard.habits.recordProgress', $userHabit))->assertOk();

    $this->post(route('dashboard.habits.recordProgressStore', $userHabit), $data)
        ->assertSessionHas('status', 'Avance registrado con exito');

    $log = HabitLog::where('user_habit_id', $userHabit->id)->firstOrFail();

    $this->put(route('dashboard.habits.updateLog', [$userHabit, $log]), $data)
        ->assertSessionHas('status', 'Registro actualizado con exito');

    $this->delete(route('dashboard.habits.destroyLog', [$userHabit, $log]))
        ->assertSessionHas('status', 'Registro eliminado con exito');

    $this->assertDatabaseMissing('habit_logs', ['id' => $log->id]);
});

it('impide registrar dos avances para el mismo habito en la misma fecha', function () {
    $userHabit = UserHabit::create([
        'user_id' => $this->user->id,
        'habit_id' => $this->habit->id,
        'status' => 'active',
        'weekly_target' => 3,
        'adopted_at' => now()->subDay(),
    ]);

    $data = ['recorded_at' => now()->toDateString()];
    if ($this->habit->tracking_type === 'quantity') {
        $data['quantity'] = 1;
    }

    $this->post(route('dashboard.habits.recordProgressStore', $userHabit), $data)
        ->assertSessionHas('status', 'Avance registrado con exito');

    $this->post(route('dashboard.habits.recordProgressStore', $userHabit), $data)
        ->assertSessionHas('error', 'Ya registraste un avance para este hábito en la fecha seleccionada.');

    expect(HabitLog::where('user_habit_id', $userHabit->id)->count())->toBe(1);
});
