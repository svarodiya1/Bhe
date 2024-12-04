<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connection to the database
$servername = "localhost";
$username = "root";
$password = "123456"; // Add your database password if required
$database = "mydb";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $userId = $data['id'];

    // Prepare and execute the delete query
    $stmt = $conn->prepare("DELETE FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User deleted successfully"]);
    } else {
        error_log("MySQL Error: " . $stmt->error); // Logs the error
        echo json_encode(["success" => false, "message" => "Failed to delete user"]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid user ID"]);
}

$conn->close();
?>
