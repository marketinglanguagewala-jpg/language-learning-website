<?php

session_start();
include "db_connect.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];

/* IMAGE UPLOAD */

$imageName = null;

if (!empty($_FILES['image']['name'])) {

    $uploadDir = "../uploads/instructors/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

    $imageName = time() . "_" . uniqid() . "." . $ext;

    move_uploaded_file(
        $_FILES['image']['tmp_name'],
        $uploadDir . $imageName
    );
}

/* POST DATA */

$name = $_POST['name'] ?? '';
$designation = $_POST['designation'] ?? '';
$bio = $_POST['bio'] ?? '';
$status = $_POST['status'] ?? 1;

if ($name == "") {
    echo json_encode([
        "status" => "error",
        "message" => "Instructor name required"
    ]);
    exit;
}

/* INSERT */

$stmt = $conn->prepare("
INSERT INTO instructors
(user_id,name,designation,bio,image,status,created_at)
VALUES (?,?,?,?,?,?,NOW())
");

$stmt->bind_param(
    "issssi",
    $user_id,
    $name,
    $designation,
    $bio,
    $imageName,
    $status
);

if ($stmt->execute()) {

    echo json_encode([
        "status" => "success",
        "message" => "Instructor Added Successfully"
    ]);
} else {

    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}
