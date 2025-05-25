<?php
require_once 'connection.php';

// Get form inputs
$business_name = $_POST['business_name'];
$contact_person_name = $_POST['contact_person_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$estimated_quantity = $_POST['estimated_quantity'];
$delivery_frequency = $_POST['delivery_frequency'];
$address = $_POST['address'];
$additional_notes = $_POST['additional_notes'];
$business_nature = $_POST['business_nature'];
$product_ids = isset($_POST['product_interest']) ? $_POST['product_interest'] : [];

// Insert into main table
$stmt = $conn->prepare("INSERT INTO business_inquiries (
    business_name, contact_person_name, email, phone, estimated_quantity,
    delivery_frequency, address, additional_notes, business_nature
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssssss", $business_name, $contact_person_name, $email, $phone, $estimated_quantity, $delivery_frequency, $address, $additional_notes, $business_nature);

if ($stmt->execute()) {
    $inquiry_id = $stmt->insert_id;

    // Insert into junction table
    $prod_stmt = $conn->prepare("INSERT INTO business_inquiry_products (inquiry_id, product_id) VALUES (?, ?)");
    foreach ($product_ids as $pid) {
        $prod_stmt->bind_param("ii", $inquiry_id, $pid);
        $prod_stmt->execute();
    }

    echo "<script>alert('Inquiry submitted successfully.'); window.location.href='index.php';</script>";
} else {
    echo "Error: " . $stmt->error;
}

$conn->close();
?>
