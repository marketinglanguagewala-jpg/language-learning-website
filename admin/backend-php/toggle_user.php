<?php

include "db_connect.php";

$id = $_GET['id'];
$status = $_GET['status'];

$newStatus = $status == 1 ? 0 : 1;

$stmt = $conn->prepare("UPDATE users SET is_active=? WHERE id=?");
$stmt->bind_param("ii",$newStatus,$id);
$stmt->execute();

echo json_encode(["success"=>true]);

?>