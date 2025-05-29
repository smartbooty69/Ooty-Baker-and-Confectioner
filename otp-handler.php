<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

require_once 'connection.php';

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents("php://input"), true);

function json_error($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(["error" => $msg]);
    exit;
}
function json_success($extra = []) {
    echo json_encode(array_merge(["success" => true], $extra));
    exit;
}

// SEND OTP
if ($action === 'send-otp') {
    $email = trim($data['email'] ?? '');
    if (!$email) json_error("Email is required");

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows !== 1) json_error("Email not found");

    $otp = random_int(100000, 999999);
    $expiry = date("Y-m-d H:i:s", time() + 300); // 5 mins

    $stmt = $conn->prepare("UPDATE users SET otp_code = ?, otp_expiry = ? WHERE email = ?");
    $stmt->bind_param("sss", $otp, $expiry, $email);
    $stmt->execute();

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'clancymendonca@gmail.com';
        $mail->Password = 'ebxd gvru kmvy lspx';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('clancymendonca@gmail.com', 'Ooty Baker and Confectioner');
        $mail->addAddress($email);
        $mail->Subject = 'Password Reset Request - Ooty Baker and Confectioner';
        $mail->Body = "Dear Customer,

You have requested to reset your password for your Ooty Baker and Confectioner account.

Your One-Time Password (OTP) is: $otp

This OTP will expire in 5 minutes for security reasons.

If you did not request this password reset, please ignore this email or contact our support team.

Best regards,
Ooty Baker and Confectioner Team";

        $mail->send();
        $_SESSION['reset_email'] = $email;
        json_success();
    } catch (Exception $e) {
        json_error("Mailer Error: {$mail->ErrorInfo}", 500);
    }
}

// VERIFY OTP
elseif ($action === 'verify-otp') {
    $email = $_SESSION['reset_email'] ?? '';
    $otp = trim($data['otp'] ?? '');

    if (!$email || !$otp) json_error("Invalid session or OTP");

    $stmt = $conn->prepare("SELECT otp_code, otp_expiry FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();

    if (!$res || $res['otp_code'] !== $otp || strtotime($res['otp_expiry']) < time()) {
        json_error("Invalid or expired OTP");
    }

    $_SESSION['otp_verified'] = true;
    json_success();
}

// RESET PASSWORD
elseif ($action === 'reset-password') {
    $email = $_SESSION['reset_email'] ?? '';
    $verified = $_SESSION['otp_verified'] ?? false;
    $password = $data['password'] ?? '';

    if (!$email || !$verified || strlen($password) < 8) {
        json_error("Invalid session or password");
    }

    $hashed = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("UPDATE users SET password = ?, otp_code = NULL, otp_expiry = NULL WHERE email = ?");
    $stmt->bind_param("ss", $hashed, $email);
    $stmt->execute();

    session_destroy();
    json_success();
}
else {
    json_error("Invalid action", 404);
}
