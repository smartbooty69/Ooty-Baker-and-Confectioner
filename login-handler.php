<?php
session_start();
require_once 'connection.php';

// Get JSON data from request
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

// Validate input
if (empty($email)) {
    echo json_encode(['error' => 'Email is required']);
    exit;
}

if (empty($password)) {
    echo json_encode(['error' => 'Password is required']);
    exit;
}

// Check if user exists
$stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// Login successful - set session variables
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_email'] = $user['email'];
$_SESSION['logged_in'] = true;

echo json_encode(['success' => true]);
exit; 