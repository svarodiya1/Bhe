<?php
// getUsers.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// Include your database connection
include "./db.php"; 


$sql = "SELECT * FROM users";  // Changed table name from 'username' to 'users'
$result = $con->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;  // Add each user to the users array
    }
}

echo json_encode($users);  // Send users data as JSON

$con->close();
?>
