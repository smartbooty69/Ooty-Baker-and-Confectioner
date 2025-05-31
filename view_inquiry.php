<?php
require_once 'connection.php'; // Assuming 'connection.php' establishes $conn
session_start();

// Define allowed inquiry statuses as constants
define('STATUS_NEW', 'new');
define('STATUS_IN_PROGRESS', 'in-progress');
define('STATUS_COMPLETED', 'completed');
define('STATUS_CANCELLED', 'cancelled');

$allowed_statuses = [
    STATUS_NEW,
    STATUS_IN_PROGRESS,
    STATUS_COMPLETED,
    STATUS_CANCELLED
];

// Function to redirect with a session message
function redirect_with_message($location, $type, $message) {
    $_SESSION[$type] = $message;
    header("Location: " . $location);
    exit();
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    redirect_with_message('auth.php', 'error', 'You must be logged in to view this page.');
}

// Check if ID parameter exists and is valid
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    redirect_with_message('dashboard.php', 'error', 'Invalid inquiry ID provided.');
}

$inquiry_id = intval($_GET['id']); // Sanitize ID

// Handle status update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
    $new_status = $_POST['status'] ?? '';
    $staff_note = $_POST['staff_note'] ?? '';

    // Validate new status
    if (!in_array($new_status, $allowed_statuses)) {
        redirect_with_message("view_inquiry.php?id=" . $inquiry_id, 'error', 'Invalid status selected.');
    }

    // Sanitize staff note for database (prepared statement handles most, but extra layer for consistency)
    $staff_note = htmlspecialchars(trim($staff_note)); 

    $update_query = "UPDATE business_inquiries SET status = ?, staff_note = ?, updated_at = NOW() WHERE id = ?";
    $update_stmt = $conn->prepare($update_query);

    if ($update_stmt === false) {
        error_log("Failed to prepare update statement: " . $conn->error);
        redirect_with_message("view_inquiry.php?id=" . $inquiry_id, 'error', 'Database error during status update.');
    }

    $update_stmt->bind_param("ssi", $new_status, $staff_note, $inquiry_id);
    
    if ($update_stmt->execute()) {
        redirect_with_message("view_inquiry.php?id=" . $inquiry_id, 'success', 'Inquiry status updated successfully.');
    } else {
        error_log("Failed to execute update statement: " . $update_stmt->error);
        redirect_with_message("view_inquiry.php?id=" . $inquiry_id, 'error', 'Failed to update status.');
    }
    $update_stmt->close();
}

// Fetch the main inquiry details
$inquiry_query = "SELECT * FROM business_inquiries WHERE id = ?";
$inquiry_stmt = $conn->prepare($inquiry_query);

if ($inquiry_stmt === false) {
    error_log("Failed to prepare inquiry statement: " . $conn->error);
    redirect_with_message('dashboard.php', 'error', 'Database error fetching inquiry details.');
}

$inquiry_stmt->bind_param("i", $inquiry_id);
$inquiry_stmt->execute();
$inquiry_result = $inquiry_stmt->get_result();

if ($inquiry_result->num_rows === 0) {
    redirect_with_message('dashboard.php', 'error', 'No inquiry found with that ID.');
}

$inquiry = $inquiry_result->fetch_assoc();
$inquiry_stmt->close();

// Fetch the products associated with this inquiry
$products_query = "SELECT p.id, p.name, p.price 
                   FROM products p
                   JOIN business_inquiry_products bip ON p.id = bip.product_id
                   WHERE bip.inquiry_id = ?";
$products_stmt = $conn->prepare($products_query);

if ($products_stmt === false) {
    error_log("Failed to prepare products statement: " . $conn->error);
    // Continue without products if there's a DB error here, or redirect
    $interested_products = [];
    $total_value = 0;
} else {
    $products_stmt->bind_param("i", $inquiry_id);
    $products_stmt->execute();
    $products_result = $products_stmt->get_result();

    $interested_products = [];
    $total_value = 0;
    
    // Extract numeric value from estimated_quantity if it contains units
    // Consider if this calculation is truly representative and accurate for all inputs
    $quantity_numeric = preg_replace('/[^0-9.]/', '', $inquiry['estimated_quantity']);
    $quantity_numeric = floatval($quantity_numeric); // Ensure it's a float

    while ($row = $products_result->fetch_assoc()) {
        $interested_products[] = $row;
        // Only add to total_value if quantity is greater than 0
        if ($quantity_numeric > 0) {
            $total_value += $row['price'] * $quantity_numeric;
        }
    }
    $products_stmt->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Inquiry - Ooty Baker</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Roboto', sans-serif;
        }
        .card {
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            border: none;
        }
        .card-header {
            background-color: #4ca050; /* A pleasant green */
            color: white;
            border-radius: 15px 15px 0 0 !important;
            padding: 20px;
        }
        .detail-row {
            margin-bottom: 20px;
            padding-bottom: 20px;
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
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .detail-value {
            color: #333;
            font-size: 1.1rem;
        }
        .product-badge {
            background-color: #e9ecef;
            color: #495057;
            padding: 8px 15px;
            border-radius: 25px;
            margin-right: 10px;
            margin-bottom: 10px;
            display: inline-block;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        .product-badge:hover {
            background-color: #4ca050;
            color: white;
            transform: translateY(-2px);
        }
        .back-btn {
            background-color: #6c757d; /* Gray */
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            transition: all 0.3s ease;
        }
        .back-btn:hover {
            background-color: #5a6268;
            color: white;
            transform: translateX(-5px);
        }
        .status-badge {
            padding: 8px 15px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 0.9rem;
        }
        .status-new { background-color: #ffd700; color: #000; } /* Gold */
        .status-in-progress { background-color: #17a2b8; color: #fff; } /* Info blue */
        .status-completed { background-color: #28a745; color: #fff; } /* Success green */
        .status-cancelled { background-color: #dc3545; color: #fff; } /* Danger red */
        .action-btn {
            padding: 10px 25px;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .action-btn:hover {
            transform: translateY(-2px);
        }
        .print-section {
            display: none;
        }
        @media print {
            .no-print {
                display: none !important;
            }
            .print-section {
                display: block !important;
            }
            .card {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            body {
                background-color: #fff !important;
            }
            .container {
                padding: 0 !important;
                margin: 0 !important;
                max-width: none !important;
            }
            .row {
                display: block !important; /* Stack columns in print */
            }
            .col-md-6, .col-12, .col-lg-10 {
                width: 100% !important;
                flex: none !important;
                max-width: 100% !important;
            }
            .detail-row {
                border-bottom: 1px solid #eee !important;
                padding-bottom: 10px !important;
                margin-bottom: 10px !important;
            }
            .detail-row:last-child {
                border-bottom: none !important;
                margin-bottom: 0 !important;
                padding-bottom: 0 !important;
            }
            .detail-label {
                font-size: 10pt !important;
                font-weight: bold !important;
                color: #000 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
            }
            .detail-value {
                font-size: 11pt !important;
                color: #333 !important;
            }
            .product-badge {
                border: 1px solid #ccc !important;
                background-color: #f8f8f8 !important;
                padding: 5px 8px !important;
                margin-right: 5px !important;
                margin-bottom: 5px !important;
                color: #000 !important;
            }
            h4, h5 {
                color: #000 !important;
            }
            .status-badge {
                border: 1px solid #000 !important;
                padding: 5px 8px !important;
                color: #000 !important; /* Ensure text is black */
                background-color: transparent !important; /* Remove background colors */
            }
            /* Specific status colors might not render well in print, fallback to black text */
            .status-new, .status-in-progress, .status-completed, .status-cancelled {
                background-color: transparent !important;
                color: #000 !important;
                border-color: #000 !important;
            }
            a {
                text-decoration: underline !important;
                color: #000 !important;
            }
            .btn-light {
                display: none !important; /* Hide print button in print */
            }
            .back-btn {
                display: none !important; /* Hide back to dashboard button in print */
            }
            /* Adjustments for the staff note textarea and status select for print */
            form[method="POST"] {
                display: none !important; /* Hide the update form in print */
            }
        }
        .alert {
            border-radius: 10px;
            margin-bottom: 20px;
        }
        /* Style for the update status form elements */
        .status-update-form .form-select,
        .status-update-form .form-control {
            border-radius: 8px; /* Slightly rounded corners */
            padding: 8px 12px;
        }
        .status-update-form .form-control {
            min-width: 200px; /* Ensure staff note textarea has decent width */
            vertical-align: top; /* Align with select box */
            resize: vertical; /* Allow vertical resizing */
            min-height: 40px; /* Minimum height */
            height: auto; /* Allow height to adjust */
        }

        /* New styles for the improved layout */
        .status-update-section {
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .status-update-form .form-label {
            font-size: 0.9rem;
            color: #6c757d;
            font-weight: 500;
        }

        .status-update-form .form-select,
        .status-update-form .form-control {
            border-radius: 6px;
            border: 1px solid #ced4da;
            padding: 0.5rem 0.75rem;
            font-size: 0.95rem;
            transition: all 0.2s ease;
        }

        .status-update-form .form-select:focus,
        .status-update-form .form-control:focus {
            border-color: #4ca050;
            box-shadow: 0 0 0 0.2rem rgba(76, 160, 80, 0.25);
        }

        .contact-actions-section {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #e9ecef;
        }

        .action-btn {
            padding: 0.5rem 1.25rem;
            font-size: 0.95rem;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
        }

        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .action-btn i {
            font-size: 1rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .status-update-section {
                padding: 0.75rem;
            }

            .status-update-form .form-label {
                margin-bottom: 0.25rem;
            }

            .action-btn {
                width: 100%;
                margin-top: 0.5rem;
            }
        }

        /* Adjustments for the new layout */
        .card-footer form {
            margin-bottom: 1rem; /* Space between the form and the buttons */
        }

        /* Ensure staff note textarea has a good size and flexibility */
        .card-footer textarea.form-control {
            min-height: 40px; /* Minimum height for the textarea */
            resize: vertical; /* Allow vertical resizing */
            border-radius: 6px;
            border: 1px solid #ced4da;
            padding: 0.5rem 0.75rem;
            font-size: 0.95rem;
            transition: all 0.2s ease;
        }

        .card-footer textarea.form-control:focus {
            border-color: #4ca050;
            box-shadow: 0 0 0 0.2rem rgba(76, 160, 80, 0.25);
        }

        /* Ensure buttons are nicely aligned and sized */
        .card-footer .action-btn {
            white-space: nowrap; /* Prevent button text from wrapping */
            padding: 10px 15px; /* Adjust padding for desired button size */
            border-radius: 25px; /* Maintain rounded corners */
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
        }

        .card-footer .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .card-footer .action-btn i {
            font-size: 1rem;
        }

        /* Ensure the select element doesn't take too much space but aligns */
        .card-footer .form-select.w-auto {
            width: auto !important; /* Keep the select compact */
            min-width: 150px; /* Ensure it's not too narrow */
        }

        /* Make text area responsive within its flex container */
        .card-footer .d-flex.flex-column.flex-md-row .flex-grow-1 {
            flex-grow: 1;
        }

        /* Hide the Internal Notes label on desktop */
        @media (min-width: 768px) {
            .card-footer label.d-block.d-md-none {
                display: none !important;
            }
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
            .card-footer .action-btn {
                width: 100%;
                margin-top: 0.5rem;
            }

            .card-footer .form-select.w-auto {
                width: 100% !important;
                min-width: 0;
            }

            .card-footer .d-flex.align-items-center {
                flex-direction: column;
                align-items: stretch !important;
            }

            .card-footer .form-label {
                margin-bottom: 0.25rem;
            }
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <?php if (isset($_SESSION['success'])): ?>
            <div class="alert alert-success alert-dismissible fade show no-print" role="alert">
                <?= htmlspecialchars($_SESSION['success']) ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php unset($_SESSION['success']); ?>
        <?php endif; ?>

        <?php if (isset($_SESSION['error'])): ?>
            <div class="alert alert-danger alert-dismissible fade show no-print" role="alert">
                <?= htmlspecialchars($_SESSION['error']) ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>

        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">Business Inquiry Details</h4>
                        <div class="d-flex gap-2 no-print"> <button onclick="window.print()" class="btn btn-sm btn-light me-2">
                                <i class="fas fa-print me-1"></i> Print
                            </button>
                            <a href="dashboard.php" class="btn btn-sm back-btn">
                                <i class="fas fa-arrow-left me-1"></i> Back to Dashboard
                            </a>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">Status: 
                                        <span class="status-badge status-<?= strtolower(htmlspecialchars($inquiry['status'] ?? 'new')) ?>">
                                            <?= ucfirst(htmlspecialchars($inquiry['status'] ?? 'New')) ?>
                                        </span>
                                    </h5>
                                    <div class="text-muted">
                                        Inquiry ID: #<?= str_pad(htmlspecialchars($inquiry_id), 6, '0', STR_PAD_LEFT) ?>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                        <a href="mailto:<?= htmlspecialchars($inquiry['email']) ?>" class="text-decoration-none">
                                            <?= htmlspecialchars($inquiry['email']) ?>
                                        </a>
                                    </div>
                                </div>

                                <div class="detail-row">
                                    <div class="detail-label">Phone</div>
                                    <div class="detail-value">
                                        <a href="tel:<?= htmlspecialchars($inquiry['phone']) ?>" class="text-decoration-none">
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
                                    <div class="detail-value"><?= nl2br(htmlspecialchars($inquiry['address'])) ?></div>
                                </div>
                            </div>
                        </div>

                        <?php if (!empty($inquiry['additional_notes'])): ?>
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="detail-row">
                                    <div class="detail-label">Additional Notes</div>
                                    <div class="detail-value"><?= nl2br(htmlspecialchars($inquiry['additional_notes'])) ?></div>
                                </div>
                            </div>
                        </div>
                        <?php endif; ?>

                        <?php if (!empty($inquiry['staff_note'])): ?>
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="detail-row">
                                    <div class="detail-label">Staff Notes (Internal)</div>
                                    <div class="detail-value"><?= nl2br(htmlspecialchars($inquiry['staff_note'])) ?></div>
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
                                                    <small class="ms-2">(₹<?= number_format($product['price'], 2) ?>)</small>
                                                </span>
                                            <?php endforeach; ?>
                                            <?php if ($total_value > 0): ?>
                                                <div class="mt-3">
                                                    <strong>Estimated Total Value:</strong>
                                                    ₹<?= number_format($total_value, 2) ?>
                                                </div>
                                            <?php endif; ?>
                                        <?php else: ?>
                                            <span class="text-muted">No products selected</span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer no-print">
                        <form method="POST" id="statusUpdateForm" class="d-block mb-3">
                            <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
                                <div class="d-flex align-items-center flex-grow-1 me-md-2 mb-2 mb-md-0">
                                    <label for="inquiryStatus" class="form-label mb-0 me-2 text-muted">Status:</label>
                                    <select name="status" id="inquiryStatus" class="form-select w-auto">
                                        <?php foreach ($allowed_statuses as $status_option): ?>
                                            <option value="<?= $status_option ?>" <?= (strtolower($inquiry['status'] ?? '') === $status_option) ? 'selected' : '' ?>>
                                                <?= ucfirst($status_option) ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div class="flex-grow-1">
                                    <label for="staffNote" class="form-label mb-0 me-2 text-muted d-block d-md-none">Internal Notes:</label>
                                    <textarea name="staff_note" id="staffNote" class="form-control" placeholder="Add internal staff note..." rows="1"><?= htmlspecialchars($inquiry['staff_note'] ?? '') ?></textarea>
                                </div>
                            </div>
                        </form>

                        <div class="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                            <button type="submit" form="statusUpdateForm" name="update_status" class="btn btn-primary action-btn flex-fill">
                                <i class="fas fa-save me-1"></i> Update Status
                            </button>
                            <a href="mailto:<?= htmlspecialchars($inquiry['email']) ?>" class="btn btn-dark action-btn flex-fill">
                                <i class="fas fa-envelope me-1"></i> Email Contact
                            </a>
                            <a href="tel:<?= htmlspecialchars($inquiry['phone']) ?>" class="btn btn-success action-btn flex-fill">
                                <i class="fas fa-phone me-1"></i> Call Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Auto-hide alerts after 5 seconds
        setTimeout(function() {
            document.querySelectorAll('.alert').forEach(function(alert) {
                const bsAlert = bootstrap.Alert.getInstance(alert);
                if (bsAlert) {
                    bsAlert.close();
                } else {
                    // Fallback for cases where instance might not be immediately available
                    const dismissButton = alert.querySelector('.btn-close');
                    if (dismissButton) {
                        dismissButton.click();
                    } else {
                        alert.remove();
                    }
                }
            });
        }, 5000);

        // Handle status change confirmation
        document.querySelector('.status-update-form').addEventListener('submit', function(e) {
            const statusSelect = document.getElementById('inquiryStatus');
            const newStatus = statusSelect.value;
            const currentStatus = '<?= strtolower($inquiry['status'] ?? 'new') ?>';
            
            // Only show confirmation for specific status changes
            if (newStatus === 'completed' || newStatus === 'cancelled') {
                e.preventDefault();
                
                const confirmMessage = newStatus === 'completed' 
                    ? 'Are you sure you want to mark this inquiry as completed? This action cannot be undone.'
                    : 'Are you sure you want to cancel this inquiry? This action cannot be undone.';
                
                if (confirm(confirmMessage)) {
                    this.submit();
                } else {
                    // Reset to previous status if user cancels
                    statusSelect.value = currentStatus;
                }
            }
        });

        // Auto-resize textarea based on content
        const staffNote = document.getElementById('staffNote');
        staffNote.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Initialize textarea height
        staffNote.dispatchEvent(new Event('input'));
    </script>
</body>
</html>
<?php
$conn->close();
?>