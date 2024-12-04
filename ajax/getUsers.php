<?php
// getUsers.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


// Replace with your own database credentials
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "mydb";  // Replace with your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM users";  // Changed table name from 'username' to 'users'
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;  // Add each user to the users array
    }
}

echo json_encode($users);  // Send users data as JSON

$conn->close();
?>
