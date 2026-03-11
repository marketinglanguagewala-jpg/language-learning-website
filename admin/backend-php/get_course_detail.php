<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db_connect.php";

if (!isset($_GET['slug']) || empty($_GET['slug'])) {
    echo json_encode(["error" => "Course slug is required"]);
    exit;
}

$slug = $_GET['slug'];

// normalize slug
$normalizedSlug = preg_replace('/-\d+$/', '', $slug);
$normalizedSlug = rtrim($normalizedSlug, '-');

// $sql = "
// SELECT 
//     c.id,
//     c.title,
//     c.slug,
//     c.short_description,
//     c.about_course,
//     c.what_you_learn,
//     c.requirements,
//     c.course_content,

//     c.price,
//     c.duration,
//     c.lectures,
//     c.language,
//     c.medium,
//     c.level,
//     c.total_students,
//     c.created_at,

//     i.id AS instructor_id,
//     i.name AS instructor_name,
//     i.designation AS instructor_designation,
//     i.bio AS instructor_bio,
//     i.image AS instructor_image

// FROM courses c
// LEFT JOIN instructors i ON c.instructor_id = i.id
// WHERE TRIM(TRAILING '-' FROM c.slug) = ?
// LIMIT 1
// ";
$sql = "
SELECT 
    c.id,
    c.title,
    c.slug,
    c.short_description,
    c.about_course,
    c.image,
    c.what_you_learn,
    c.requirements,
    c.course_content,

    c.price,
    c.duration,
    c.lectures,
    c.language,
    c.medium,
    c.level,
    c.total_students,
    c.created_at,
    c.video_link,
    
    
    c.institute_id,
    c.instructor_image AS course_instructor_image,

    u.username AS institute_name,

    i.id AS instructor_id,
    i.name AS instructor_name,
    i.designation AS instructor_designation,
    i.bio AS instructor_bio,
    i.image AS instructor_image,

    l.id AS location_id,
    l.name AS location_name

FROM courses c
LEFT JOIN users u ON c.institute_id = u.id
LEFT JOIN instructors i ON c.instructor_id = i.id
LEFT JOIN locations l ON c.location_id = l.id
WHERE TRIM(TRAILING '-' FROM c.slug) = ?
LIMIT 1
";


$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $normalizedSlug);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Course not found"]);
    exit;
}

$row = $result->fetch_assoc();

/*
 IMPORTANT:
 JSON columns ko yahin decode nahi kar rahe
 React side pe parse hoga
*/
echo json_encode($row);
