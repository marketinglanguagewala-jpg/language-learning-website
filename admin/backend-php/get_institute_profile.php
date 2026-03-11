<?php

// CORS FIX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json");

include "db_connect.php";

$institute = isset($_GET['name']) ? $_GET['name'] : '';

if (!$institute) {
    echo json_encode(["error" => "Institute name missing"]);
    exit;
}

$institute = mysqli_real_escape_string($conn, $institute);

/*
  Is institute ke saare courses nikaalega
*/

$sql = "
SELECT
    id,
    title,
    institute_name,
    image,
    price,
    duration,
    lectures,
    total_students,
    language,
    level,
    created_at
FROM courses
WHERE institute_name = '$institute'
ORDER BY id DESC
";

$result = mysqli_query($conn, $sql);

$courses = [];

while ($row = mysqli_fetch_assoc($result)) {
    $courses[] = $row;
}

echo json_encode([
    "institute" => $institute,
    "total_courses" => count($courses),
    "courses" => $courses
]);
