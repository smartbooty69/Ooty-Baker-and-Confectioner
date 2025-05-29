<!DOCTYPE html>
<html lang="en">
<head>
    <title>Authentication - Ooty Baker</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/login/style.css">
    <style>
        .form-container {
            display: none;
        }
        .form-container.active {
            display: block;
        }
        .form-description {
            color: #666;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .error-message {
            color: #ff3860;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
    </style>
</head>
<body>
    <!-- Login Form -->
    <div id="loginForm" class="form-container active">
        <form onsubmit="return handleLogin(event)">
            <h3>Login Here</h3>

            <label for="username">Username</label>
            <input type="text" placeholder="Email or Phone" id="username" required>
            <div class="error-message" id="loginError"></div>

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" required>

            <div class="form-footer">
                <a href="#" onclick="showForm('forgotPasswordForm')" class="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit">Log In</button>
        </form>
    </div>

    <!-- Forgot Password Form -->
    <div id="forgotPasswordForm" class="form-container">
        <form onsubmit="return handleForgotPassword(event)">
            <h3>Forgot Password</h3>
            <p class="form-description">Enter your email address and we'll send you a OTP to reset your password.</p>

            <label for="email">Email Address</label>
            <input type="email" placeholder="Enter your email" id="email" required>
            <div class="error-message" id="forgotPasswordError"></div>

            <button type="submit">Send OTP</button>

            <div class="form-footer">
                <a href="#" onclick="showForm('loginForm')" class="back-to-login">Back to Login</a>
            </div>
        </form>
    </div>

    <!-- Reset Password Form -->
    <div id="resetPasswordForm" class="form-container">
        <form onsubmit="return handleResetPassword(event)">
            <h3>Reset Password</h3>
            <p class="form-description">Please enter your new password below.</p>

            <label for="new-password">New Password</label>
            <input type="password" placeholder="Enter new password" id="new-password" required>
            <div class="error-message" id="passwordError"></div>

            <label for="confirm-password">Confirm Password</label>
            <input type="password" placeholder="Confirm new password" id="confirm-password" required>
            <div class="error-message" id="confirmPasswordError"></div>

            <button type="submit">Reset Password</button>

            <div class="form-footer">
                <a href="#" onclick="showForm('loginForm')" class="back-to-login">Back to Login</a>
            </div>
        </form>
    </div>

    <!-- OTP Verification Form -->
    <div id="otpForm" class="form-container">
        <form onsubmit="return verifyOtp(event)">
            <h3>Enter OTP</h3>
            <p class="form-description">Please enter the 6-digit OTP sent to your email.</p>
            
            <label for="otp">OTP</label>
            <input type="text" placeholder="Enter 6-digit OTP" id="otp" required>
            <div class="error-message" id="otpError"></div>

            <button type="submit">Verify OTP</button>

            <div class="form-footer">
                <a href="#" onclick="showForm('loginForm')" class="back-to-login">Back to Login</a>
            </div>
        </form>
    </div>

    <script>
        // Function to switch between forms
        function showForm(formId) {
            // Hide all forms
            document.querySelectorAll('.form-container').forEach(form => {
                form.classList.remove('active');
            });
            // Show the selected form
            document.getElementById(formId).classList.add('active');
            // Clear any error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
        }

        // Handle login form submission
        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('loginError');

            if (!username || !password) {
                errorElement.textContent = 'Please fill in all fields';
                errorElement.style.display = 'block';
                return false;
            }

            // Make API call to verify credentials
            fetch('login-handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to dashboard on successful login
                    window.location.href = 'dashboard.php';
                } else {
                    errorElement.textContent = data.error || 'Invalid credentials';
                    errorElement.style.display = 'block';
                }
            })
            .catch(error => {
                errorElement.textContent = 'An error occurred during login';
                errorElement.style.display = 'block';
            });

            return false;
        }

        // Handle forgot password form submission
        async function handleForgotPassword(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const errorElement = document.getElementById('forgotPasswordError');

            try {
                const res = await fetch('otp-handler.php?action=send-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const result = await res.json();
                if (!res.ok) throw new Error(result.error);
                alert("OTP sent to your email.");
                showForm('otpForm');
            } catch (err) {
                errorElement.textContent = err.message;
                errorElement.style.display = 'block';
            }
        }

        // Handle OTP verification
        async function verifyOtp(event) {
            event.preventDefault();
            const otp = document.getElementById('otp').value;
            const error = document.getElementById('otpError');
            error.style.display = 'none';

            try {
                const res = await fetch('otp-handler.php?action=verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ otp })
                });
                const result = await res.json();
                if (!res.ok) throw new Error(result.error);
                alert("OTP verified");
                showForm('resetPasswordForm');
            } catch (err) {
                error.textContent = err.message;
                error.style.display = 'block';
            }
        }

        // Handle reset password form submission
        async function handleResetPassword(event) {
            event.preventDefault();
            const password = document.getElementById('new-password').value;
            const confirm = document.getElementById('confirm-password').value;
            const err1 = document.getElementById('passwordError');
            const err2 = document.getElementById('confirmPasswordError');

            err1.style.display = 'none';
            err2.style.display = 'none';

            if (password.length < 8) {
                err1.textContent = "Password must be at least 8 characters";
                err1.style.display = 'block';
                return;
            }

            if (password !== confirm) {
                err2.textContent = "Passwords do not match";
                err2.style.display = 'block';
                return;
            }

            try {
                const res = await fetch('otp-handler.php?action=reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                const result = await res.json();
                if (!res.ok) throw new Error(result.error);
                alert("Password reset successful!");
                showForm('loginForm');
            } catch (err) {
                err1.textContent = err.message;
                err1.style.display = 'block';
            }
        }
    </script>
</body>
</html> 