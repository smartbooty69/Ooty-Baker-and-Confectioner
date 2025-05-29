<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

function sendResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        sendResponse(false, 'Please fill in all fields');
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            sendResponse(true, 'Login successful', ['redirect' => 'dashboard.php']);
        } else {
            sendResponse(false, 'Invalid username or password');
        }
    } catch(PDOException $e) {
        sendResponse(false, 'Database error: ' . $e->getMessage());
    }
}

// Handle forgot password
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'forgot_password') {
    $email = $_POST['email'] ?? '';

    if (empty($email)) {
        sendResponse(false, 'Please enter your email address');
    }

    try {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user) {
            // Generate reset token
            $token = bin2hex(random_bytes(32));
            $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

            $stmt = $pdo->prepare("UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?");
            $stmt->execute([$token, $expires, $user['id']]);

            // In a real application, you would send an email with the reset link
            // For now, we'll just return the token
            sendResponse(true, 'Password reset link sent to your email', ['token' => $token]);
        } else {
            sendResponse(false, 'Email not found');
        }
    } catch(PDOException $e) {
        sendResponse(false, 'Database error: ' . $e->getMessage());
    }
}

// Handle reset password
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'reset_password') {
    $token = $_POST['token'] ?? '';
    $new_password = $_POST['new_password'] ?? '';

    if (empty($token) || empty($new_password)) {
        sendResponse(false, 'Invalid request');
    }

    try {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW()");
        $stmt->execute([$token]);
        $user = $stmt->fetch();

        if ($user) {
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?");
            $stmt->execute([$hashed_password, $user['id']]);
            sendResponse(true, 'Password reset successful');
        } else {
            sendResponse(false, 'Invalid or expired reset token');
        }
    } catch(PDOException $e) {
        sendResponse(false, 'Database error: ' . $e->getMessage());
    }
}

sendResponse(false, 'Invalid request');
?> 