<?php
session_start();
header("Content-Type: application/json");
include "db_connect.php";

if(!isset($_SESSION['user_id'])){
    echo json_encode(["error"=>"Unauthorized"]);
    exit();
}

$uid  = intval($_SESSION['user_id']);
$role = $_SESSION['role'];

$limit = 8;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$page = max($page, 1);
$offset = ($page - 1) * $limit;


/* -------- TOTAL COUNT -------- */

if($role == 'admin'){

    $totalSql = "SELECT COUNT(*) as total FROM leads";

}else{

    $totalSql = "SELECT COUNT(*) as total 
                 FROM leads 
                 WHERE institute_id = $uid";
}

$totalRes = $conn->query($totalSql);
$total = $totalRes->fetch_assoc()['total'];


/* -------- DATA (JOIN FIXED) -------- */

if($role == 'admin'){

$sql = "
SELECT 
    l.id,
    l.name,
    l.email,
    l.phone,
    l.message,
    l.source,
    l.created_at,

    COALESCE(c.title, l.course) AS course_title,
    u.username AS institute_name

FROM leads l

LEFT JOIN courses c 
    ON l.course_id = c.id

LEFT JOIN users u
    ON l.institute_id = u.id

ORDER BY l.id DESC
LIMIT $limit OFFSET $offset
";

}else{

    $sql = "
    SELECT 
        l.id,
        l.name,
        l.email,
        l.phone,
        l.message,
        l.source,
        l.created_at,

        c.title AS course_title,
        u.username AS institute_name

    FROM leads l

    LEFT JOIN courses c 
        ON l.course_id = c.id

    LEFT JOIN users u
        ON l.institute_id = u.id

    WHERE l.institute_id = $uid

    ORDER BY l.id DESC
    LIMIT $limit OFFSET $offset
    ";
}

$result = $conn->query($sql);

$leads = [];

while ($row = $result->fetch_assoc()) {
    $leads[] = $row;
}

echo json_encode([
    "leads" => $leads,
    "total" => (int)$total
]);