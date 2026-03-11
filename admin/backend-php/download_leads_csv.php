<?php
include "db_connect.php";

// Filters
$from  = isset($_GET['from']) ? $_GET['from'] : null;
$to    = isset($_GET['to']) ? $_GET['to'] : null;
$limit = isset($_GET['limit']) ? $_GET['limit'] : '25';

// Headers
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=leads_' . date('Y-m-d') . '.csv');

$output = fopen('php://output', 'w');

// CSV columns
fputcsv($output, [
    'ID', 'Name', 'Email', 'Phone',
    'Course', 'Message', 'Source', 'Created At'
]);

// Base query
$sql = "SELECT id, name, email, phone, course, message, source, created_at
        FROM leads WHERE 1=1";

// Date filter
if ($from) {
    $sql .= " AND DATE(created_at) >= '" . $conn->real_escape_string($from) . "'";
}
if ($to) {
    $sql .= " AND DATE(created_at) <= '" . $conn->real_escape_string($to) . "'";
}

// Order
$sql .= " ORDER BY created_at DESC";

// Limit
if ($limit !== 'all') {
    $sql .= " LIMIT " . intval($limit);
}

$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    fputcsv($output, [
        $row['id'],
        $row['name'],
        $row['email'],
        $row['phone'],
        $row['course'],
        $row['message'],
        $row['source'],
        $row['created_at']
    ]);
}

fclose($output);
exit;
