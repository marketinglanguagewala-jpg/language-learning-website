<?php

session_start();
include "db_connect.php";

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if(empty($email) || empty($password)){
    echo "Missing fields";
    exit();
}

$stmt = $conn->prepare("SELECT id, email, password, role, is_active FROM users WHERE email=? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();

/* ✅ BIND RESULT */
$stmt->bind_result($id, $db_email, $db_password, $role, $is_active);


if ($stmt->fetch()) {
    
    if ($is_active == 0) {
        echo "You are deactivated by Admin";
        exit();
    }

    // Plain password (abhi ke liye)
    if ($db_password == $password) {

        $_SESSION['user_id'] = $id;
        $_SESSION['role']    = $role;
        $_SESSION['email']   = $db_email;

        echo $role; // admin / user
        exit();

    } else {
        echo "Incorrect password";
        exit();
    }

} else {
    echo "User not found";
    exit();
}

$stmt->close();
$conn->close();