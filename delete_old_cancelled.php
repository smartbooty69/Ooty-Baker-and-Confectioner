<?php
require_once 'connection.php';

// Delete cancelled inquiries that have remained in cancelled status for 15 days
$query = "DELETE FROM business_inquiries 
          WHERE status = 'cancelled' 
          AND updated_at < DATE_SUB(NOW(), INTERVAL 15 DAY)
          AND NOT EXISTS (
              SELECT 1 
              FROM business_inquiry_history 
              WHERE business_inquiry_history.inquiry_id = business_inquiries.id 
              AND business_inquiry_history.status != 'cancelled'
              AND business_inquiry_history.created_at > business_inquiries.updated_at
          )";
$result = $conn->query($query);

if ($result) {
    echo "Successfully deleted old cancelled inquiries";
} else {
    echo "Error deleting old cancelled inquiries: " . $conn->error;
}

$conn->close();
?> 