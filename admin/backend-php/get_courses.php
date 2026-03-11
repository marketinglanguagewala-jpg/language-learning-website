<?php

/* ------------ CORS (DEV + LIVE) ------------ */

// Local + Staging dono allow
$allowedOrigins = [
    "http://localhost:5173",
    "https://staging.languagewala.in",
    "https://languagewala.in"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

header("Content-Type: application/json; charset=UTF-8");
include "db_connect.php";

$type        = $_GET['type'] ?? '';
$instituteId = $_GET['institute_id'] ?? '';


/* ------------ ROLE DETECT ------------ */

$uid  = $_SESSION['user_id'] ?? null;
$role = $_SESSION['role'] ?? 'guest';


/* ------------ ADMIN ------------ */

if ($role === 'admin') {

    $sql = "
    SELECT 
        c.id,
        c.title,
        c.institute_name,
        c.slug,
        c.image,
        c.price,
        c.duration,
        c.lectures,
        c.total_students,
        c.language,
        c.medium,
        c.level,
        c.created_at,
        i.name AS instructor_name,
        l.name AS location
    FROM courses c
    LEFT JOIN instructors i ON c.instructor_id = i.id
    LEFT JOIN locations l ON c.location_id = l.id
    ORDER BY c.id DESC
    ";

    $result = $conn->query($sql);
}


/* ------------ USER ------------ */

else if ($role === 'user' && $uid) {

    $stmt = $conn->prepare("
        SELECT 
            c.id,
            c.title,
            c.institute_name,
            c.slug,
            c.image,
            c.price,
            c.duration,
            c.lectures,
            c.total_students,
            c.language,
            c.medium,
            c.level,
            c.created_at,
            i.name AS instructor_name
        FROM courses c
        LEFT JOIN instructors i ON c.instructor_id = i.id
        WHERE c.institute_id = ?
        ORDER BY c.id DESC
    ");

    $stmt->bind_param("i", $uid);
    $stmt->execute();

    $result = $stmt->get_result();
}


/* ------------ GUEST (PUBLIC WEBSITE) ------------ */

else {
    $institute_id = $_GET['institute_id'] ?? null;
    $type = $_GET['type'] ?? null;


    /* HOME PAGE → Languages */
if ($type === "languages") {

    $sql = "
    SELECT DISTINCT language
    FROM courses
    WHERE language IS NOT NULL
    AND language != ''
    ORDER BY language ASC
    ";

    $result = $conn->query($sql);

    $languages = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $languages[] = [
                "language" => $row['language']
            ];
        }
    }

    echo json_encode($languages);
    exit;
}


    /* COURSE PAGE → Institute Courses */
    else if($institute_id){

        $stmt = $conn->prepare("
        SELECT 
            c.id,
            c.title,
            c.institute_name,
            c.slug,
            c.image,
            c.price,
            c.duration,
            c.lectures,
            c.language,
            c.medium,
            c.level,
            l.name AS location
        FROM courses c
        LEFT JOIN locations l ON c.location_id = l.id
        WHERE c.institute_id = ?
        ORDER BY c.id DESC
        ");

        $stmt->bind_param("i", $institute_id);
        $stmt->execute();

        $result = $stmt->get_result();
    }


    /* NORMAL PUBLIC PAGE → All Courses */
    else {

        $sql = "
        SELECT 
            c.id,
            c.title,
            c.institute_name,
            c.image,
            c.slug,
            c.price,
            c.duration,
            c.lectures,
            c.language,
            c.medium,
            c.level,
            l.name AS location
        FROM courses c
        LEFT JOIN locations l ON c.location_id = l.id
        ORDER BY c.id DESC
        ";

        $result = $conn->query($sql);
    }
    
    // HOME PAGE → Only Languages
    // if ($type === "languages") {

    //     $sql = "
    //       SELECT DISTINCT language
    //       FROM courses
    //       WHERE language IS NOT NULL
    //       AND language != ''
    //       ORDER BY language
    //     ";

    //     $result = $conn->query($sql);
    // }

    // // COURSE / INSTITUTE PAGE → Filter
    // else if (!empty($instituteId)) {

    //     $stmt = $conn->prepare("
    //       SELECT 
    //         c.id,
    //         c.title,
    //         c.institute_name,
    //         c.image,
    //         c.price,
    //         c.duration,
    //         c.lectures,
    //         c.language,
    //         c.medium,
    //         c.level
    //       FROM courses c
    //       WHERE c.institute_id = ?
    //       ORDER BY c.id DESC
    //     ");

    //     $stmt->bind_param("i", $instituteId);
    //     $stmt->execute();

    //     $result = $stmt->get_result();
    // }

    // // DEFAULT → All Courses
    // else {

    //     $sql = "
    //       SELECT 
    //         c.id,
    //         c.title,
    //         c.institute_name,
    //         c.image,
    //         c.price,
    //         c.duration,
    //         c.lectures,
    //         c.language,
    //         c.medium,
    //         c.level
    //       FROM courses c
    //       ORDER BY c.id DESC
    //     ";

    //     $result = $conn->query($sql);
    // }

    // $sql = "
    // SELECT 
    //     c.id,
    //     c.title,
    //     c.institute_name,
    //     c.image,
    //     c.price,
    //     c.duration,
    //     c.lectures,
    //     c.language,
    //     c.medium,
    //     c.level,
    //     l.name AS location
    // FROM courses c
    // LEFT JOIN locations l ON c.location_id = l.id
    // ORDER BY c.id DESC
    // ";

    // $result = $conn->query($sql);
}


/* ------------ OUTPUT ------------ */

$courses = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

echo json_encode($courses);