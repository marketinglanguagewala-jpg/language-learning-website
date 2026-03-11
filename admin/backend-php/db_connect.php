<?php
$host = "srv1988.hstgr.io";
$user = "u133277183_development";
$pass = "Langaugewala@2026";
$dbname = "u133277183_langaugewala";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_errno) {
    echo json_encode([
        "status" => "error",
        "message" => "Database Connection Failed: " . $conn->connect_error
    ]);
    exit;
}

// Don't echo this in live API
// echo "CONNECTED SUCCESSFULLY";
?>
