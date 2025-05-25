<?php
require_once 'connection.php';

// Set headers for Excel file download
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="business_inquiries_' . date('Y-m-d') . '.xlsx"');
header('Cache-Control: max-age=0');
header('Pragma: public');

// Include PhpSpreadsheet library
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

try {
    // Create new Spreadsheet object
    $spreadsheet = new Spreadsheet();

    // Set document properties
    $spreadsheet->getProperties()
        ->setCreator("Ooty Baker")
        ->setLastModifiedBy("Ooty Baker")
        ->setTitle("Business Inquiries")
        ->setSubject("Business Inquiries")
        ->setDescription("Export of business inquiries from the system.");

    // Create the worksheet
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setTitle('Business Inquiries');

    // Add headers
    $sheet->setCellValue('A1', 'Business Name')
          ->setCellValue('B1', 'Contact Person')
          ->setCellValue('C1', 'Email')
          ->setCellValue('D1', 'Phone')
          ->setCellValue('E1', 'Estimated Quantity')
          ->setCellValue('F1', 'Delivery Frequency')
          ->setCellValue('G1', 'Business Nature')
          ->setCellValue('H1', 'Address')
          ->setCellValue('I1', 'Additional Notes')
          ->setCellValue('J1', 'Inquiry Date');

    // Style for headers
    $headerStyle = [
        'font' => ['bold' => true],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]],
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'startColor' => ['rgb' => 'E6E6E6']
        ]
    ];
    $sheet->getStyle('A1:J1')->applyFromArray($headerStyle);

    // Fetch data from database
    $query = "SELECT * FROM business_inquiries ORDER BY created_at DESC";
    $result = $con->query($query);

    // Populate data rows
    $row = 2;
    while ($inquiry = $result->fetch_assoc()) {
        $sheet->setCellValue('A'.$row, $inquiry['business_name'])
              ->setCellValue('B'.$row, $inquiry['contact_person_name'])
              ->setCellValue('C'.$row, $inquiry['email'])
              ->setCellValue('D'.$row, $inquiry['phone'])
              ->setCellValue('E'.$row, $inquiry['estimated_quantity'])
              ->setCellValue('F'.$row, $inquiry['delivery_frequency'])
              ->setCellValue('G'.$row, $inquiry['business_nature'])
              ->setCellValue('H'.$row, $inquiry['address'])
              ->setCellValue('I'.$row, $inquiry['additional_notes'])
              ->setCellValue('J'.$row, $inquiry['created_at']);
        
        $row++;
    }

    // Auto-size columns
    foreach(range('A','J') as $columnID) {
        $sheet->getColumnDimension($columnID)->setAutoSize(true);
    }

    // Create Excel file
    $writer = new Xlsx($spreadsheet);
    
    // Clear any previous output
    if (ob_get_length()) {
        ob_end_clean();
    }
    
    // Save to output
    $writer->save('php://output');
    exit;

} catch (Exception $e) {
    // Handle errors gracefully
    header('Content-Type: text/plain');
    echo "Error generating Excel file: " . $e->getMessage();
    exit;
}
?>