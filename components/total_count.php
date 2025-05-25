<?php
// Database connection
$con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
if (mysqli_connect_error()) {
    die("Connection failed: " . mysqli_connect_error());
}

// Query to get total number of business-inquiries
$query = "SELECT COUNT(*) AS total_business_inquiries FROM business_inquiries_details";
$result = $con->query($query);

if ($result) {
    $row = $result->fetch_assoc();
    $totalbusinessinquiries = $row['total_business_inquiries'];
    echo $totalbusinessinquiries;
} else {
    echo "Error fetching business-inquiries count: " . $con->error;
}

// Close database connection
$con->close();
?>
