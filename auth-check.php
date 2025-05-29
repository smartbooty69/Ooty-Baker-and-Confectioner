<?php
// Set secure session settings before starting the session
ini_set('session.cookie_httponly', 1);
// Only enable secure cookies if using HTTPS
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
    ini_set('session.cookie_secure', 1);
}
ini_set('session.use_strict_mode', 1);

// Start the session after setting configuration
session_start();

// Debug: Log session state
error_log("Auth check - Session ID: " . session_id());
error_log("Auth check - Session data: " . print_r($_SESSION, true));

// Check if user is logged in
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    // Debug: Log why user is being redirected
    error_log("Auth check - User not logged in. Session data: " . print_r($_SESSION, true));
    // Redirect to login page if not logged in
    header('Location: auth.php');
    exit;
}

// Optional: Add session timeout check
$timeout = 1800; // 30 minutes
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $timeout)) {
    // Session has expired
    error_log("Auth check - Session expired");
    session_unset();
    session_destroy();
    header('Location: auth.php?error=timeout');
    exit;
}

// Update last activity time
$_SESSION['last_activity'] = time(); 