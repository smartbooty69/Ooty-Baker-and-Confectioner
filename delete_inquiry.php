<?php
require_once 'connection.php';

// Check if ID parameter exists
if (!isset($_GET['id'])) {
    echo "Error: No inquiry ID specified.";
    exit;
}

$inquiry_id = intval($_GET['id']);

// First delete associated products from the junction table
$delete_products_query = "DELETE FROM business_inquiry_products WHERE inquiry_id = ?";
$delete_products_stmt = $conn->prepare($delete_products_query);
$delete_products_stmt->bind_param("i", $inquiry_id);
$delete_products_stmt->execute();

// Then delete the main inquiry
$delete_inquiry_query = "DELETE FROM business_inquiries WHERE id = ?";
$delete_inquiry_stmt = $conn->prepare($delete_inquiry_query);
$delete_inquiry_stmt->bind_param("i", $inquiry_id);

if ($delete_inquiry_stmt->execute()) {
    echo "success";
} else {
    echo "Error: " . $delete_inquiry_stmt->error;
}

// Close the statements and connection
$delete_products_stmt->close();
$delete_inquiry_stmt->close();
$conn->close();
?> 