<?php
require_once 'connection.php';

// Start transaction
$conn->begin_transaction();

try {
    // First delete all records from the junction table
    $delete_products_query = "DELETE FROM business_inquiry_products";
    $delete_products_stmt = $conn->prepare($delete_products_query);
    $delete_products_stmt->execute();

    // Then delete all records from the main inquiries table
    $delete_inquiries_query = "DELETE FROM business_inquiries";
    $delete_inquiries_stmt = $conn->prepare($delete_inquiries_query);
    $delete_inquiries_stmt->execute();

    // If everything went well, commit the transaction
    $conn->commit();
    echo "success";
} catch (Exception $e) {
    // If there was an error, rollback the transaction
    $conn->rollback();
    echo "Error: " . $e->getMessage();
}

// Close the statements and connection
$delete_products_stmt->close();
$delete_inquiries_stmt->close();
$conn->close();
?> 