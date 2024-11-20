<?php

namespace App\Http\Middleware;

use App\GlobalVariable;
use Auth;
use Closure;
use App\User;
use Illuminate\Support\Facades\Session;


class StudentMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (User::checkAuth() == false || User::checkAuth() == null) {
            return redirect()->route('system.config');
        }

        session_start();
        $role_id = Session::get('role_id');
        if ($role_id == 2) {
            return $next($request);
        } else if($role_id == GlobalVariable::isAlumni()) {
            return redirect('alumni-dashboard');
        }
         elseif ($role_id != "") {
            return redirect('student-dashboard');
        } else {
            return redirect('login');
        }
    }
}
