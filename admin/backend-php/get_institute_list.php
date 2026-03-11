<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "db_connect.php";

/*
  Ye API:
  - Approved institutes laayegi
  - Courses + students count karegi
  - Profile image + bio + location degi
*/

$sql = "
SELECT 
    u.id,
    u.username AS institute_name,
    u.bio,
    u.location,
    u.profile_image,
    
    GROUP_CONCAT(DISTINCT c.language) AS categories,

    COUNT(DISTINCT c.id) AS total_courses,
    COALESCE(SUM(c.total_students),0) AS total_students

FROM users u

LEFT JOIN courses c 
ON u.username = c.institute_name

WHERE u.is_approved = 1

GROUP BY u.id

ORDER BY u.id DESC
";

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        'status' => false,
        'error' => mysqli_error($conn)
    ]);
    exit;
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode([
    'status' => true,
    'data' => $data
]);