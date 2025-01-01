<?php
// Database connection
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

require_once 'db.php';

$conn = $con;

// Check for preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Exit for preflight requests
}

// Get the JSON input
$data = json_decode(file_get_contents("php://input"));

// Validate input
if (!isset($data->user_id) || !isset($data->product_id)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid input']);
    exit;
}

$user_id = $data->user_id;
$product_id = $data->product_id;

// Prepare the SQL statement to remove an item from the wishlist
$sql = "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ii", $user_id, $product_id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Item removed from wishlist successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to remove item']);
    }

    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to prepare statement']);
}

$conn->close();
?>
