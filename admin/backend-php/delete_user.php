<?php

include "db_connect.php";

$id = $_GET['id'];

$stmt = $conn->prepare("DELETE FROM users WHERE id=?");
$stmt->bind_param("i",$id);
$stmt->execute();

echo json_encode(["success"=>true]);

?>