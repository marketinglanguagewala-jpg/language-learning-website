<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_connect.php";

/*
Example:
get_instructor_courses.php?institute=Linguapol&page=1
*/

$institute = $_GET['institute'] ?? '';
$page = $_GET['page'] ?? 1;

if (!$institute) {
  echo json_encode(["error" => "Institute missing"]);
  exit;
}

$limit = 6; // ek page pe kitne courses
$page = max(1, (int)$page);
$offset = ($page - 1) * $limit;

$institute = mysqli_real_escape_string($conn, $institute);


/* TOTAL COUNT */
$totalRes = mysqli_query($conn,
  "SELECT COUNT(*) as total 
   FROM courses 
   WHERE institute_name='$institute'"
);

$total = mysqli_fetch_assoc($totalRes)['total'];


/* DATA */
$sql = "
SELECT id,title,image,lectures,duration,total_students
FROM courses
WHERE institute_name='$institute'
ORDER BY id DESC
LIMIT $limit OFFSET $offset
";

$result = mysqli_query($conn, $sql);

$courses = [];

while ($row = mysqli_fetch_assoc($result)) {

  $row['image'] = $row['image']
    ? "https://admin.languagewala.in/uploads/courses/" . $row['image']
    : "";

  $courses[] = $row;
}

echo json_encode([
  "courses" => $courses,
  "total" => (int)$total,
  "limit" => $limit,
  "page" => $page
]);

$conn->close();
