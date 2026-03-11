<?php

session_start();
include "db_connect.php";

header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];

/* CHECK USER ROLE */

$roleQuery = $conn->prepare("SELECT role FROM users WHERE id=?");
$roleQuery->bind_param("i",$user_id);
$roleQuery->execute();
$roleResult = $roleQuery->get_result();
$user = $roleResult->fetch_assoc();

$role = $user['role'] ?? 'user';


/* ADMIN → SHOW ALL INSTRUCTORS */

if($role == "admin"){

    $stmt = $conn->prepare("
        SELECT id,name
        FROM instructors
        WHERE status=1
    ");

}else{

/* USER → OWN INSTRUCTORS */

    $stmt = $conn->prepare("
        SELECT id,name
        FROM instructors
        WHERE status=1 AND user_id=?
    ");

    $stmt->bind_param("i",$user_id);
}

$stmt->execute();
$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);