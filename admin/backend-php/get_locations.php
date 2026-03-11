<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_connect.php";

$q = mysqli_query($conn, "SELECT id, name FROM locations WHERE status = 1");

$locations = [];
while ($row = mysqli_fetch_assoc($q)) {
  $locations[] = $row;
}

echo json_encode($locations);
