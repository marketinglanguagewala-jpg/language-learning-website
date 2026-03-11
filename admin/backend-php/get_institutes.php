<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "db_connect.php";

/*
  Ye query:
  - institute_name ke basis par group karegi
  - kitne courses hain = COUNT
  - total students = SUM
*/

$sql = "
SELECT 
    TRIM(c.institute_name) AS institute_name,

    COUNT(c.id) AS total_courses,
    COALESCE(SUM(c.total_students), 0) AS total_students,

    u.profile_image

FROM courses c

LEFT JOIN users u 
ON c.institute_id = u.id

WHERE c.institute_name IS NOT NULL
  AND c.institute_name != ''

GROUP BY c.institute_id, TRIM(c.institute_name)

ORDER BY total_courses DESC
";


$result = mysqli_query($conn, $sql);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
