<?php
include "db_connect.php";

$email = $_GET['email'] ?? '';

if (!$email) {
    die("Invalid request");
}

$update = $conn->prepare("UPDATE users SET is_approved = 1 WHERE email = ?");
$update->bind_param("s", $email);

if ($update->execute()) {
    echo "<h2 style='color:green'>User Approved Successfully!</h2>";
    echo "<p>The instructor can now create new courses.</p>";
} else {
    echo "<h3 style='color:red'>Approval Failed!</h3>";
}

$conn->close();
?>
