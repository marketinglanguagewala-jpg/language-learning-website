<?php
session_start();
include "db_connect.php";

// only POST allowed
if($_SERVER['REQUEST_METHOD'] !== "POST"){
    die("INVALID REQUEST");
}

$id = $_POST['id'];

// admin check
// if(!isset($_SESSION['admin'])){
//     die("UNAUTHORIZED");
// }

$stmt = $conn->prepare("DELETE FROM courses WHERE id = ?");
$stmt->bind_param("i", $id);

if($stmt->execute()){
    echo "Course deleted successfully!";
}else{
    echo "Failed to delete course!";
}
