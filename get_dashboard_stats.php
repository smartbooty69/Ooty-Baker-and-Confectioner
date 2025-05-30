<?php
require_once 'connection.php';

// Initialize response array
$response = array();

// Total Inquiries
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries");
$count = $result->fetch_assoc();
$response['total_inquiries'] = $count['total'];

// Last Month Inquiries
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 MONTH)");
$last_month = $result->fetch_assoc();
$response['last_month_inquiries'] = $last_month['total'];

// New Inquiries This Week
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND status = 'new'");
$new = $result->fetch_assoc();
$response['new_inquiries'] = $new['total'];

// Last Week New Inquiries
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY) AND status = 'new'");
$last_week_new = $result->fetch_assoc();
$response['last_week_new_inquiries'] = $last_week_new['total'];

// In Progress Inquiries
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'in-progress'");
$in_progress = $result->fetch_assoc();
$response['in_progress'] = $in_progress['total'];

// Updated This Week
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'in-progress' AND updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
$updated = $result->fetch_assoc();
$response['updated_this_week'] = $updated['total'];

// Completed This Week
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'completed' AND updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
$completed = $result->fetch_assoc();
$response['completed'] = $completed['total'];

// Completed vs Last Week
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'completed' AND updated_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND updated_at < DATE_SUB(NOW(), INTERVAL 7 DAY)");
$completed_last = $result->fetch_assoc();
$response['completed_vs_last_week'] = $completed_last['total'];

// Cancelled This Week
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'cancelled' AND updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
$cancelled = $result->fetch_assoc();
$response['cancelled'] = $cancelled['total'];

// Cancelled vs Last Week
$result = $con->query("SELECT COUNT(*) as total FROM business_inquiries WHERE status = 'cancelled' AND updated_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND updated_at < DATE_SUB(NOW(), INTERVAL 7 DAY)");
$cancelled_last = $result->fetch_assoc();
$response['cancelled_vs_last_week'] = $cancelled_last['total'];

// Average Response Time
$result = $con->query("SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, updated_at)) as avg_time FROM business_inquiries WHERE status != 'new'");
$avg_time = $result->fetch_assoc();
$response['avg_response_time'] = round($avg_time['avg_time'], 1);

// This Week Response Time
$result = $con->query("SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, updated_at)) as avg_time FROM business_inquiries WHERE status != 'new' AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
$this_week_time = $result->fetch_assoc();
$response['this_week_response_time'] = round($this_week_time['avg_time'], 1);

// Conversion Rate (30 days)
$result = $con->query("SELECT 
    (COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*)) as conversion_rate 
    FROM business_inquiries 
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
$conversion = $result->fetch_assoc();
$response['conversion_rate'] = round($conversion['conversion_rate'], 1);

// This Week Conversion Rate
$result = $con->query("SELECT 
    (COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*)) as conversion_rate 
    FROM business_inquiries 
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
$this_week_conversion = $result->fetch_assoc();
$response['this_week_conversion'] = round($this_week_conversion['conversion_rate'], 1);

// Estimated Value This Week
$result = $con->query("
    SELECT SUM(p.price) as total_value 
    FROM business_inquiries bi
    JOIN business_inquiry_products bip ON bi.id = bip.inquiry_id
    JOIN products p ON bip.product_id = p.id
    WHERE bi.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
");
$value = $result->fetch_assoc();
$response['estimated_value'] = number_format($value['total_value'], 0);

// Estimated Value vs Last Week
$result = $con->query("
    SELECT SUM(p.price) as total_value 
    FROM business_inquiries bi
    JOIN business_inquiry_products bip ON bi.id = bip.inquiry_id
    JOIN products p ON bip.product_id = p.id
    WHERE bi.created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) 
    AND bi.created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)
");
$last_week_value = $result->fetch_assoc();
$response['value_vs_last_week'] = number_format($last_week_value['total_value'], 0);

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);
?> 