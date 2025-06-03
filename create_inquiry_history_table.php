<?php
require_once 'connection.php';

// Create business_inquiry_history table
$query = "CREATE TABLE IF NOT EXISTS business_inquiry_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inquiry_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inquiry_id) REFERENCES business_inquiries(id) ON DELETE CASCADE
)";

if ($conn->query($query)) {
    echo "Business inquiry history table created successfully";
    
    // Insert initial history records for existing inquiries
    $insert_query = "INSERT INTO business_inquiry_history (inquiry_id, status, created_at)
                    SELECT id, status, updated_at 
                    FROM business_inquiries";
    
    if ($conn->query($insert_query)) {
        echo "Initial history records created successfully";
    } else {
        echo "Error creating initial history records: " . $conn->error;
    }
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?> 