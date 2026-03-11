<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db_connect.php'; // same folder

$data = json_decode(file_get_contents("php://input"), true);

$identifier = $data['identifier'] ?? '';
$password = $data['password'] ?? '';

if (empty($identifier) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Username/Email and password required."]);
    exit;
}

// ✅ Try to find user by either email or username (limit 1)
$stmt = $conn->prepare("SELECT id, username, email, password, is_approved FROM users 
                        WHERE email = ? OR username = ? LIMIT 1");

$stmt->bind_param("ss", $identifier, $identifier);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // ✅ Compare password (plain for testing OR hashed)
    if ($password === $row['password'] || password_verify($password, $row['password'])) {
        echo json_encode([
            "status" => "success",
            "user" => [
                "id" => $row['id'],
                "username" => $row['username'],
                "email" => $row['email'],
                "is_approved" => $row['is_approved']   // ⭐ MUST ADD
            ]

        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>
