<?php

include "db_connect.php";

header("Content-Type: application/json; charset=UTF-8");

/* ---------------- CHECK PARAM ---------------- */

$id   = $_GET['id']   ?? null;
$slug = $_GET['slug'] ?? null;

if (!$id && !$slug) {
    http_response_code(400);
    echo json_encode(["error" => "ID or Slug required"]);
    exit;
}

/* ---------------- QUERY ---------------- */

$sql = "
SELECT 
    c.*,
    l.name AS locationName
FROM courses c
LEFT JOIN locations l ON c.location_id = l.id
WHERE
";

if ($id) {
    $sql .= " c.id = ? ";
} else {
    $sql .= " c.slug = ? ";
}

$sql .= " LIMIT 1";


$stmt = $conn->prepare($sql);


/* ---------------- BIND ---------------- */

if ($id) {
    $stmt->bind_param("i", $id);   // integer
} else {
    $stmt->bind_param("s", $slug); // string
}


/* ---------------- EXECUTE ---------------- */

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {

    http_response_code(404);

    echo json_encode([
        "error" => "Course not found"
    ]);

    exit;
}


/* ---------------- RESPONSE ---------------- */

echo json_encode($result->fetch_assoc());

$stmt->close();
$conn->close();