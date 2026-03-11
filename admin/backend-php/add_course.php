<?php


session_start();

if(!isset($_SESSION['user_id'])){
   echo json_encode(["error"=>"Not Logged In"]);
   exit;
}

$instructor_id = $_SESSION['user_id'];



ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "db_connect.php";

/* ================= IMAGE UPLOAD ================= */
/* ================= COURSE IMAGE UPLOAD ================= */
$imageName = null;

if (!empty($_FILES['image']['name'])) {

  $uploadDir = "../uploads/courses/";
  if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
  }

  $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
  $imageName = time() . "_course_" . uniqid() . "." . $ext;

  move_uploaded_file(
    $_FILES['image']['tmp_name'],
    $uploadDir . $imageName
  );
}


/* ================= INSTRUCTOR IMAGE UPLOAD ================= */
$instructorImageName = null;

if (!empty($_FILES['instructor_image']['name'])) {

  $uploadDir2 = "../uploads/instructors/";
  if (!is_dir($uploadDir2)) {
    mkdir($uploadDir2, 0777, true);
  }

  $ext2 = pathinfo($_FILES['instructor_image']['name'], PATHINFO_EXTENSION);
  $instructorImageName = time() . "_instructor_" . uniqid() . "." . $ext2;

  move_uploaded_file(
    $_FILES['instructor_image']['tmp_name'],
    $uploadDir2 . $instructorImageName
  );
}

/* ================= BASIC FIELDS ================= */
$title = $_POST['title'] ?? '';

if ($title === '') {
  echo json_encode(["status"=>"error","message"=>"Title is required"]);
  exit;
}
$institute_name = trim($_POST['institute_name'] ?? '');

$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));

$short_description = $_POST['short_description'] ?? '';
$about_course      = $_POST['about_course'] ?? '';

$video_link = trim($_POST['video_link'] ?? '');

$price    = (float)($_POST['price'] ?? 0);
$duration = $_POST['duration'] ?? '';
$lectures = (int)($_POST['lectures'] ?? 0);

$language = trim($_POST['language'] ?? '');
$medium   = trim($_POST['medium'] ?? '');
$level    = trim($_POST['level'] ?? '');

$institute_id = $_SESSION['user_id'];
$instructor_id = (int)$_POST['instructor_id'];
$location_id    = (int)($_POST['location_id'] ?? 0);
$total_students = (int)($_POST['total_students'] ?? 0);

/* ================= REQUIRED FIELD VALIDATION ================= */

if($institute_name == ''){
   echo json_encode(["status"=>"error","message"=>"Institute name is required"]);
   exit;
}

if($language == ''){
   echo json_encode(["status"=>"error","message"=>"Course language is required"]);
   exit;
}

if($medium == ''){
   echo json_encode(["status"=>"error","message"=>"Medium of instruction is required"]);
   exit;
}

if($level == ''){
   echo json_encode(["status"=>"error","message"=>"Course level is required"]);
   exit;
}

if(empty($_POST['instructor_id'])){
   echo json_encode(["status"=>"error","message"=>"Instructor is required"]);
   exit;
}

if ($location_id === 0) {
  echo json_encode([
    "status"=>"error",
    "message"=>"Location is required"
  ]);
  exit;
}

if(!$institute_id){
   echo json_encode(["status"=>"error","message"=>"Invalid Session"]);
   exit;
}

/* ================= JSON STRINGS ================= */
$what_you_learn = $_POST['what_you_learn'] ?? '[]';
$requirements   = $_POST['requirements'] ?? '[]';
$course_content = $_POST['course_content'] ?? '[]';

/* ================= SQL ================= */
$sql = "INSERT INTO courses (
  institute_id, title, institute_name, slug, short_description, about_course, image, instructor_image,
  price, duration, lectures,
  language, medium, level,
  instructor_id, location_id, total_students,
  what_you_learn, requirements, course_content, video_link
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
  "isssssssdisssiiisssss",
  $institute_id,
  $title,
  $institute_name,
  $slug,
  $short_description,
  $about_course,
  $imageName,
  $instructorImageName,
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
);

if ($stmt->execute()) {
  echo json_encode([
    "status"=>"success",
    "message"=>"Course Added Successfully"
  ]);
} else {
  echo json_encode([
    "status"=>"error",
    "message"=>$stmt->error
  ]);
}
