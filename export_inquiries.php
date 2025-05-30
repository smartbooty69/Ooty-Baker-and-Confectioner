<?php
require_once 'connection.php'; // uses $conn
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

try {
    // Clean output buffer to prevent corruption
    if (ob_get_length()) ob_end_clean();
    ini_set('display_errors', 0); // prevent error output in Excel stream

    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    // Add headers
    $sheet->fromArray([
        'Business Name', 'Contact Person', 'Email', 'Phone', 'Products Interested',
        'Estimated Quantity', 'Delivery Frequency', 'Address', 'Additional Notes',
        'Business Nature', 'Status', 'Staff Note', 'Created At'
    ], null, 'A1');

    // Query inquiries + joined products
    $query = "SELECT bi.*, GROUP_CONCAT(p.name SEPARATOR ', ') AS products
              FROM business_inquiries bi
              LEFT JOIN business_inquiry_products bip ON bi.id = bip.inquiry_id
              LEFT JOIN products p ON bip.product_id = p.id
              GROUP BY bi.id
              ORDER BY bi.created_at DESC";

    $result = $conn->query($query); // ✅ using $conn from connection.php

    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    // Populate rows
    $row = 2;
    while ($inquiry = $result->fetch_assoc()) {
        $sheet->fromArray([
            $inquiry['business_name'],
            $inquiry['contact_person_name'],
            $inquiry['email'],
            $inquiry['phone'],
            $inquiry['products'],
            $inquiry['estimated_quantity'],
            $inquiry['delivery_frequency'],
            $inquiry['address'],
            $inquiry['additional_notes'],
            $inquiry['business_nature'],
            $inquiry['status'],
            $inquiry['staff_note'],
            $inquiry['created_at']
        ], null, 'A' . $row);
        $row++;
    }

    // Auto-size all columns
    foreach (range('A', 'M') as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }

    // Final headers for download
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="business_inquiries_' . date('Y-m-d') . '.xlsx"');
    header('Cache-Control: max-age=0');
    header('Pragma: public');

    // Save to output
    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
    exit;

} catch (Exception $e) {
    // Clean buffer and return error
    if (ob_get_length()) ob_end_clean();
    http_response_code(500);
    echo "Export failed: " . $e->getMessage();
    exit;
}
