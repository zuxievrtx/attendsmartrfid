@extends('layouts.custom-app1')

@section('styles')
@endsection

@section('content')
    <div class="page-content">
        <div class="container text-center text-dark">
            <div class="row">
                <div class="col-lg-4 d-block mx-auto">
                    <div class="row">
                        <div class="col-xl-12 col-md-12 col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="text-center mb-2">
                                        <a class="header-brand1" href="{{ url('index') }}">
                                            <img src="{{ asset('build/assets/images/brand/logo.png') }}"
                                                class="header-brand-img main-logo" alt="Sparic logo">
                                            <img src="{{ asset('build/assets/images/brand/logo-light.png') }}"
                                                class="header-brand-img darklogo" alt="Sparic logo">
                                        </a>
                                    </div>
                                    <h3>Login</h3>
                                    <p class="text-muted">Sign In to your account</p>
                                    <div id="error-message" class="alert alert-danger" style="display: none;"></div>
                                    <div id="success-message" class="alert alert-success" style="display: none;"></div>
                                    <form id="login-form">
                                        <div class="input-group mb-3">
                                            <span class="input-group-addon bg-white"><i
                                                    class="fa fa-user text-dark"></i></span>
                                            <input type="email" class="form-control" id="email" placeholder="Email"
                                                required>
                                        </div>
                                        <div class="input-group mb-4">
                                            <span class="input-group-addon bg-white"><i
                                                    class="fa fa-unlock-alt text-dark"></i></span>
                                            <input type="password" class="form-control" id="password"
                                                placeholder="Password" required>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <button type="submit" class="btn btn-primary btn-block">Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $('#login-form').submit(function(e) {
                e.preventDefault();

                $.ajax({
                    url: '/api/login',
                    type: 'POST',
                    data: {
                        email: $('#email').val(),
                        password: $('#password').val()
                    },
                    success: function(response) {
                        if (response.success) {
                            localStorage.setItem('auth_token', response.data.token);
                            $('#success-message').text(response.message).show();
                            $('#error-message').hide();
                            window.location.href = '/admin/dashboard'; // Redirect ke dashboard
                        } else {
                            $('#error-message').text(response.message).show();
                            $('#success-message').hide();
                        }
                    },
                    error: function(xhr) {
                        var errorMessage = xhr.responseJSON?.message ||
                            'An unexpected error occurred. Please try again.';
                        $('#error-message').text(errorMessage).show();
                        $('#success-message').hide();
                    }
                });
            });
        });
    </script>
@endsection
