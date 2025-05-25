<?php
require_once 'connection.php';

header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'No product ID provided']);
    exit;
}

$id = intval($_GET['id']);

// First get the image path to delete the file
$stmt = $conn->prepare("SELECT image_path FROM products WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$product = $result->fetch_assoc();

if ($product) {
    // Delete the image file if it exists
    if (!empty($product['image_path']) && file_exists($product['image_path'])) {
        unlink($product['image_path']);
    }

    // Delete the product from database
    $delete_stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $delete_stmt->bind_param("i", $id);
    
    if ($delete_stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error']);
    }
    $delete_stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Product not found']);
}

$stmt->close();
$conn->close();
?> 