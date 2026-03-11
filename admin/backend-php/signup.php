<?php



// ✅ CORS FIX
header("Access-Control-Allow-Origin: https://staging.languagewala.in");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// ✅ Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");


include 'db_connect.php';

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$phone = $data['phone'] ?? '';
$location = $data['location'] ?? '';

$passwordHash = $password; // (later change to hash)

// Prevent duplicate email
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already exists!"]);
    exit;
}

// Insert new user with is_approved = 0
$stmt = $conn->prepare("INSERT INTO users (username, email, location, phone, password, is_approved, created_at) VALUES (?, ?, ?, ?, ?, 0, NOW())");

if (!$stmt) {
    die("MySQL Error: " . $conn->error);
}

// sssss = 5 strings
$stmt->bind_param("sssss", $username, $email, $location, $phone, $passwordHash);


if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Signup successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
