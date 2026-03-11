<?php 

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Content-Type: application/json"); 

include "db_connect.php"; 

// ===== Pagination values ===== 

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1; $limit = 8; 

// users per page 

$offset = ($page - 1) * $limit; 

// ===== Total users ===== 

$totalQuery = mysqli_query($conn, "SELECT COUNT(*) AS total FROM users"); 

$totalRow = mysqli_fetch_assoc($totalQuery); 

$total = $totalRow['total']; 

// ===== Paginated users ===== 

$query = mysqli_query( $conn, "SELECT * FROM users ORDER BY id DESC LIMIT $limit OFFSET $offset" ); 

$data = []; 

while ($row = mysqli_fetch_assoc($query)) { 
    $data[] = $row; 
    
} 

// ===== Final response ===== 

echo json_encode(
    [ "users" => $data, "total" => $total, "page" => $page, "limit" => $limit ]
);