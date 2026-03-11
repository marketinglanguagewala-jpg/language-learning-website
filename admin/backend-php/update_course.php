<?php
session_start();

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["status"=>"error","message"=>"Not Logged In"]);
  exit;
}

$user_id = $_SESSION['user_id'];

include "db_connect.php";

$roleQuery = $conn->prepare("SELECT role FROM users WHERE id=?");
$roleQuery->bind_param("i", $user_id);
$roleQuery->execute();
$roleResult = $roleQuery->get_result();
$user = $roleResult->fetch_assoc();

$role = $user['role'] ?? 'user';


$id = (int)$_POST['id'];

/* Check ownership */

if($role != "admin"){
    
    $check = $conn->prepare("SELECT id FROM courses WHERE id=? AND institute_id=?");
    $check->bind_param("ii", $id, $user_id);
    $check->execute();
    
    if ($check->get_result()->num_rows == 0) {
       echo json_encode(["status"=>"error","message"=>"Unauthorized"]);
       exit;
    }
}

/* ================= DATA ================= */

$title = $_POST['title'] ?? '';
$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));

$short_description = $_POST['short_description'] ?? '';
$about_course = $_POST['about_course'] ?? '';

$price = (float)$_POST['price'];
$duration = $_POST['duration'];
$lectures = (int)$_POST['lectures'];

$language = $_POST['language'] ?? '';
$medium = $_POST['medium'] ?? '';
$level = $_POST['level'] ?? '';

$instructor_id = (int)$_POST['instructor_id'];
$location_id = (int)$_POST['location_id'];
$total_students = (int)$_POST['total_students'];



$what_you_learn  = $_POST['what_you_learn'] ?? '[]';
$requirements    = $_POST['requirements'] ?? '[]';
$course_content  = $_POST['course_content'] ?? '[]';
$video_link = trim($_POST['video_link'] ?? '');

/* ================= REQUIRED FIELD VALIDATION ================= */

if(trim($language) == ''){
   echo json_encode([
      "status"=>"error",
      "message"=>"Course language is required"
   ]);
   exit;
}

if(trim($medium) == ''){
   echo json_encode([
      "status"=>"error",
      "message"=>"Medium of instruction is required"
   ]);
   exit;
}

if(trim($level) == ''){
   echo json_encode([
      "status"=>"error",
      "message"=>"Course level is required"
   ]);
   exit;
}

if(empty($instructor_id)){
   echo json_encode([
      "status"=>"error",
      "message"=>"Instructor is required"
   ]);
   exit;
}

/* ================= COURSE IMAGE ================= */

$imageSql = "";
$imageName = null;

if (!empty($_FILES['image']['name'])) {

  $uploadDir = "../uploads/courses/";
  if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

  $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
  $imageName = time() . "_course_" . uniqid() . "." . $ext;

  move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $imageName);

  $imageSql = ", image=?";
}

/* ================= INSTRUCTOR IMAGE ================= */

$instructorImageSql = "";
$instructorImageName = null;

if (!empty($_FILES['instructor_image']['name'])) {

  $uploadDir2 = "../uploads/instructors/";
  if (!is_dir($uploadDir2)) mkdir($uploadDir2, 0777, true);

  $ext2 = pathinfo($_FILES['instructor_image']['name'], PATHINFO_EXTENSION);
  $instructorImageName = time() . "_instructor_" . uniqid() . "." . $ext2;

  move_uploaded_file($_FILES['instructor_image']['tmp_name'], $uploadDir2 . $instructorImageName);

  $instructorImageSql = ", instructor_image=?";
}

/* ================= SQL ================= */

$sql = "UPDATE courses SET
  title=?,
  slug=?,
  short_description=?,
  about_course=?,
  price=?,
  duration=?,
  lectures=?,
  language=?,
  medium=?,
  level=?,
  instructor_id=?,
  location_id=?,
  total_students=?,
  what_you_learn=?,
  requirements=?,
  course_content=?,
  video_link=?
  $imageSql
  $instructorImageSql
WHERE id=?";

$stmt = $conn->prepare($sql);

/* ================= BIND PARAM ================= */

$params = [
  $title,
  $slug,
  $short_description,
  $about_course,
  $price,
  $duration,
  $lectures,
  $language,
  $medium,
  $level,
  $instructor_id,
  $location_id,
  $total_students,
  $what_you_learn,
  $requirements,
  $course_content,
  $video_link
];

$types = "ssssdsisssiiissss";

if ($imageSql) {
  $types .= "s";
  $params[] = $imageName;
}

if ($instructorImageSql) {
  $types .= "s";
  $params[] = $instructorImageName;
}

$types .= "i";
$params[] = $id;

$stmt->bind_param($types, ...$params);

$stmt->execute();

/* ================= RESPONSE ================= */

if ($stmt->affected_rows >= 0) {
  echo json_encode([
    "status" => "success",
    "message" => "Course updated successfully"
  ]);
} else {
  echo json_encode([
    "status" => "error",
    "message" => $stmt->error
  ]);
}