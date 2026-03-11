<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_connect.php";

/*
 Example:
 get_instructor_dashboard.php?institute=Linguapol
*/

$institute = $_GET['institute'] ?? '';

if (!$institute) {
  echo json_encode(["error" => "Institute name missing"]);
  exit;
}

$institute = mysqli_real_escape_string($conn, $institute);

$userData = mysqli_fetch_assoc(
  mysqli_query($conn,
    "SELECT profile_image 
     FROM users 
     WHERE username = '$institute'")
);

$profile_image = $userData['profile_image'] ?? '';


/* Total Courses */
$totalCourse = mysqli_fetch_assoc(
  mysqli_query($conn,
    "SELECT COUNT(*) as total 
     FROM courses 
     WHERE institute_name = '$institute'")
)['total'];


/* Total Students */
$students = mysqli_fetch_assoc(
  mysqli_query($conn,
    "SELECT SUM(total_students) as total 
     FROM courses
     WHERE institute_name = '$institute'")
)['total'];


/* Published (Future use) */
$published = $totalCourse;


/* Pending (Future use) */
$pending = 0;


echo json_encode([
  "institute"     => $institute,
  "total_courses"=> (int)$totalCourse,
  "published"    => (int)$published,
  "pending"      => (int)$pending,
  "students"     => (int)($students ?? 0),
  "profile_image" => $profile_image
]);

$conn->close();
