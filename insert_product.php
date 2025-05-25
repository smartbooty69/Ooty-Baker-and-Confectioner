<?php
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"]);
    $description = trim($_POST["description"]);
    $variety = $_POST["variety"]; // category renamed to variety
    $price = floatval($_POST["price"]);
    $price_per_gram = floatval($_POST["price_per_gram"]);
    $veg_status = $_POST["veg_status"]; // is_veg renamed to veg_status

    $upload_dir = "uploads/images/";
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $filename = uniqid() . "_" . basename($_FILES["imageUpload"]["name"]);
    $upload_file = $upload_dir . $filename;
    $imageType = strtolower(pathinfo($upload_file, PATHINFO_EXTENSION));
    $fileSize = $_FILES["imageUpload"]["size"];
    $upload_ok = 1;

    if ($fileSize === 0) {
        echo "Error: File size is 0. Please upload a valid image.";
        exit;
    } elseif (!in_array($imageType, ['jpg', 'jpeg', 'png', 'gif'])) {
        echo "Error: Only JPG, JPEG, PNG, and GIF formats are allowed.";
        exit;
    }

    if ($upload_ok) {
        if (move_uploaded_file($_FILES["imageUpload"]["tmp_name"], $upload_file)) {
            $sql = "INSERT INTO products (name, description, variety, price, price_per_gram, veg_status, image_path)
                    VALUES (?, ?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                echo "Error: " . $conn->error;
                exit;
            }

            $stmt->bind_param("sssddss", $name, $description, $variety, $price, $price_per_gram, $veg_status, $upload_file);

            if ($stmt->execute()) {
                echo "success";
            } else {
                echo "Error: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Error: Failed to move uploaded image.";
        }
    }
}
?>
