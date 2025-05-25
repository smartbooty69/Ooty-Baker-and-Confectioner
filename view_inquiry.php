<?php
require_once 'connection.php';

// Check if ID parameter exists
if (!isset($_GET['id'])) {
    die("Error: No inquiry ID specified.");
}

$inquiry_id = intval($_GET['id']);

// Fetch the main inquiry details
$inquiry_query = "SELECT * FROM business_inquiries WHERE id = ?";
$inquiry_stmt = $conn->prepare($inquiry_query);
$inquiry_stmt->bind_param("i", $inquiry_id);
$inquiry_stmt->execute();
$inquiry_result = $inquiry_stmt->get_result();

if ($inquiry_result->num_rows === 0) {
    die("Error: No inquiry found with that ID.");
}

$inquiry = $inquiry_result->fetch_assoc();

// Fetch the products associated with this inquiry
$products_query = "SELECT p.id, p.name 
                   FROM products p
                   JOIN business_inquiry_products bip ON p.id = bip.product_id
                   WHERE bip.inquiry_id = ?";
$products_stmt = $conn->prepare($products_query);
$products_stmt->bind_param("i", $inquiry_id);
$products_stmt->execute();
$products_result = $products_stmt->get_result();

$interested_products = [];
while ($row = $products_result->fetch_assoc()) {
    $interested_products[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Inquiry - Ooty Baker</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Roboto', sans-serif;
        }
        .card {
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        .card-header {
            background-color: #4ca050;
            color: white;
            border-radius: 10px 10px 0 0 !important;
            padding: 15px 20px;
        }
        .detail-row {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .detail-label {
            font-weight: 600;
            color: #555;
        }
        .detail-value {
            color: #333;
        }
        .product-badge {
            background-color: #e9ecef;
            color: #495057;
            padding: 5px 10px;
            border-radius: 20px;
            margin-right: 8px;
            margin-bottom: 8px;
            display: inline-block;
        }
        .back-btn {
            background-color: #6c757d;
            color: white;
        }
        .back-btn:hover {
            background-color: #5a6268;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">Business Inquiry Details</h4>
                        <a href="dashboard.php" class="btn btn-sm back-btn">
                            <i class="fas fa-arrow-left me-1"></i> Back to Dashboard
                        </a>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="detail-row">
                                    <div class="detail-label">Business Name</div>
                                    <div class="detail-value"><?= htmlspecialchars($inquiry['business_name']) ?></div>
                                </div>
                                
                                <div class="detail-row">
                                    <div class="detail-label">Contact Person</div>
                                    <div class="detail-value"><?= htmlspecialchars($inquiry['contact_person_name']) ?></div>
                                </div>
                                
                                <div class="detail-row">
                                    <div class="detail-label">Email</div>
                                    <div class="detail-value">
                                        <a href="mailto:<?= htmlspecialchars($inquiry['email']) ?>">
                                            <?= htmlspecialchars($inquiry['email']) ?>
                                        </a>
                                    </div>
                                </div>
                                
                                <div class="detail-row">
                                    <div class="detail-label">Phone</div>
                                    <div class="detail-value">
                                        <a href="tel:<?= htmlspecialchars($inquiry['phone']) ?>">
                                            <?= htmlspecialchars($inquiry['phone']) ?>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="detail-row">
                                    <div class="detail-label">Estimated Quantity</div>
                                    <div class="detail-value"><?= htmlspecialchars($inquiry['estimated_quantity']) ?></div>
                                </div>
                                
                                <div class="detail-row">
                                    <div class="detail-label">Delivery Frequency</div>
                                    <div class="detail-value"><?= htmlspecialchars($inquiry['delivery_frequency']) ?></div>
                                </div>
                                
                                <div class="detail-row">
                                    <div class="detail-label">Nature of Business</div>
                                    <div class="detail-value"><?= htmlspecialchars($inquiry['business_nature']) ?></div>
                                </div>
                                
                                <div class="detail-row">
                                    <div class="detail-label">Inquiry Date</div>
                                    <div class="detail-value">
                                        <?= date('F j, Y, g:i a', strtotime($inquiry['created_at'])) ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="detail-row">
                                    <div class="detail-label">Address</div>
                                    <div class="detail-value"><?= htmlspecialchars($inquiry['address']) ?></div>
                                </div>
                            </div>
                        </div>
                        
                        <?php if (!empty($inquiry['additional_notes'])): ?>
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="detail-row">
                                    <div class="detail-label">Additional Notes</div>
                                    <div class="detail-value"><?= htmlspecialchars($inquiry['additional_notes']) ?></div>
                                </div>
                            </div>
                        </div>
                        <?php endif; ?>
                        
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="detail-row">
                                    <div class="detail-label">Interested Products</div>
                                    <div class="detail-value">
                                        <?php if (count($interested_products) > 0): ?>
                                            <?php foreach ($interested_products as $product): ?>
                                                <span class="product-badge">
                                                    <?= htmlspecialchars($product['name']) ?>
                                                </span>
                                            <?php endforeach; ?>
                                        <?php else: ?>
                                            <span class="text-muted">No products selected</span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <a href="mailto:<?= htmlspecialchars($inquiry['email']) ?>" class="btn btn-primary me-2">
                            <i class="fas fa-envelope me-1"></i> Email Contact
                        </a>
                        <a href="tel:<?= htmlspecialchars($inquiry['phone']) ?>" class="btn btn-success">
                            <i class="fas fa-phone me-1"></i> Call Contact
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
<?php
$conn->close();
?>