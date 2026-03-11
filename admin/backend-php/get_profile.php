<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include "db_connect.php";

if(!isset($_SESSION['user_id'])){
    echo json_encode(["error"=>"Unauthorized"]);
    exit();
}

$uid = $_SESSION['user_id'];

$sql = "SELECT username, email, first_name, last_name, role 
        FROM users 
        WHERE id='$uid' 
        LIMIT 1";

$result = $conn->query($sql);

if($result->num_rows == 0){
    echo json_encode(["error"=>"User not found"]);
    exit();
}

$user = $result->fetch_assoc();

echo json_encode($user);