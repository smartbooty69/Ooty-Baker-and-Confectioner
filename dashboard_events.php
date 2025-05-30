<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

require_once 'connection.php';

// Function to check for changes
function checkForChanges($con) {
    static $lastCheck = 0;
    
    // Get the latest update timestamp
    $result = $con->query("SELECT MAX(updated_at) as last_update FROM business_inquiries");
    $row = $result->fetch_assoc();
    $currentUpdate = strtotime($row['last_update']);
    
    // If there's a new update, send an event
    if ($currentUpdate > $lastCheck) {
        $lastCheck = $currentUpdate;
        return true;
    }
    
    return false;
}

// Keep the connection alive and check for changes
while (true) {
    if (checkForChanges($con)) {
        echo "data: update\n\n";
        ob_flush();
        flush();
    }
    
    // Sleep for a short time to prevent excessive CPU usage
    usleep(100000); // 100ms
}
?> 