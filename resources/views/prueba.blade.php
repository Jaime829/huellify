@extends('layouts.auth')

@section('auth-content')
    <form action={{ route('auth.logout') }} method="POST">
        @csrf

        <button type="submit"
            className="text-center text-gray-500 flex gap-1 items-center w-full text-[12px] hover:bg-gray-100 rounded-md p-2">
            Cerrar sesion
        </button>
    </form>
@endsection
