<?php
require_once 'connection.php';

header('Content-Type: application/json');

if (!isset($_POST['update_product'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

$product_id = $_POST['product_id'];
$name = trim($_POST['name']);
$description = trim($_POST['description']);
$variety = $_POST['variety'];
$price = floatval($_POST['price']);
$price_per_gram = floatval($_POST['price_per_gram']);
$veg_status = $_POST['veg_status'];

// Validate required fields
if (empty($product_id) || empty($name) || empty($variety) || empty($price) || empty($price_per_gram) || empty($veg_status)) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

try {
    // Start transaction
    $conn->begin_transaction();

    // Check if a new image is uploaded
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $upload_dir = "uploads/images/";
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        $filename = uniqid() . "_" . basename($_FILES["image"]["name"]);
        $upload_file = $upload_dir . $filename;
        $imageType = strtolower(pathinfo($upload_file, PATHINFO_EXTENSION));
        
        // Validate image type
        if (!in_array($imageType, ['jpg', 'jpeg', 'png', 'gif'])) {
            throw new Exception("Invalid image type. Only JPG, JPEG, PNG, and GIF are allowed.");
        }

        // Move uploaded file
        if (!move_uploaded_file($_FILES["image"]["tmp_name"], $upload_file)) {
            throw new Exception("Failed to upload image.");
        }

        // Get old image path to delete it later
        $stmt = $conn->prepare("SELECT image_path FROM products WHERE id = ?");
        $stmt->bind_param("i", $product_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $old_image = $result->fetch_assoc()['image_path'];

        // Update with new image
        $stmt = $conn->prepare("UPDATE products SET name = ?, description = ?, variety = ?, price = ?, price_per_gram = ?, veg_status = ?, image_path = ? WHERE id = ?");
        $stmt->bind_param("sssddssi", $name, $description, $variety, $price, $price_per_gram, $veg_status, $upload_file, $product_id);
    } else {
        // Update without changing image
        $stmt = $conn->prepare("UPDATE products SET name = ?, description = ?, variety = ?, price = ?, price_per_gram = ?, veg_status = ? WHERE id = ?");
        $stmt->bind_param("sssddsi", $name, $description, $variety, $price, $price_per_gram, $veg_status, $product_id);
    }

    if (!$stmt->execute()) {
        throw new Exception("Error updating product: " . $stmt->error);
    }

    // If we uploaded a new image, delete the old one
    if (isset($old_image) && file_exists($old_image)) {
        unlink($old_image);
    }

    // Commit transaction
    $conn->commit();
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
