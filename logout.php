<?php
// Start the session if it hasn't been started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Debug: Log session state before clearing
error_log("Before logout - Session ID: " . session_id());
error_log("Before logout - Session data: " . print_r($_SESSION, true));

// Clear all session variables
$_SESSION = array();

// Destroy the session cookie
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Destroy the session
session_destroy();

// Debug: Log session state after destroying
error_log("After logout - Session ID: " . session_id());
error_log("After logout - Session data: " . print_r($_SESSION, true));

// Force clear any remaining session data
session_write_close();

// Clear any output buffering
while (ob_get_level()) {
    ob_end_clean();
}

// Set cache control headers
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Redirect to login page with a cache-busting parameter
header('Location: auth.php?logout=' . time());
exit;
?>