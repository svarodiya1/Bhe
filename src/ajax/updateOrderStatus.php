<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include your database connection
include "./db.php"; 
// Get JSON input from the request
$data = json_decode(file_get_contents("php://input"), true);

// Check if required data is provided
if (isset($data['order_id']) && isset($data['status'])) {
    $order_id = $con->real_escape_string($data['order_id']);
    $status = $con->real_escape_string($data['status']);

    // Update the order status in the database
    $sql = "UPDATE orders SET status = '$status' WHERE order_id = '$order_id'";
    if ($con->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Order status updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update order status: " . $con->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input. Please provide order_id and status."]);
}

// Close the database connection
$con->close();
?>
