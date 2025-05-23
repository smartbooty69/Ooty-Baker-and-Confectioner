<?php
// Database connection
$con = new mysqli("localhost","u480014807_horizon_admin","Adminpassword0","u480014807_horizon_gym");
if (mysqli_connect_error()) {
    die("Connection failed: " . mysqli_connect_error());
}

// Query to get total number of members
$query = "SELECT COUNT(*) AS total_members FROM member_details";
$result = $con->query($query);

if ($result) {
    $row = $result->fetch_assoc();
    $totalMembers = $row['total_members'];
    echo $totalMembers;
} else {
    echo "Error fetching member count: " . $con->error;
}

// Close database connection
$con->close();
?>
