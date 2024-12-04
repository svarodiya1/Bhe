<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


// Database configuration
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "mydb";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Get JSON input from the request
$data = json_decode(file_get_contents("php://input"), true);

// Check if required data is provided
if (isset($data['order_id']) && isset($data['status'])) {
    $order_id = $conn->real_escape_string($data['order_id']);
    $status = $conn->real_escape_string($data['status']);

    // Update the order status in the database
    $sql = "UPDATE orders SET status = '$status' WHERE order_id = '$order_id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Order status updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update order status: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input. Please provide order_id and status."]);
}

// Close the database connection
$conn->close();
?>
