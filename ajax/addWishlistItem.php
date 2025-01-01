<?php
// Database connection
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

require_once 'db.php'; // Include your database connection file

$conn = $con; // Assuming $con is your database connection

// Check for preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Exit for preflight requests
}

// Get the request payload
$data = json_decode(file_get_contents("php://input"));

// Validate input
if (!isset($data->user_id) || !isset($data->product_id)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid input: user_id and product_id are required']);
    exit;
}

$user_id = $data->user_id;
$product_id = $data->product_id;

// Check if the item is already in the wishlist
$checkSql = "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("ii", $user_id, $product_id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    http_response_code(409); // Conflict
    echo json_encode(['message' => 'Item already exists in wishlist']);
    exit;
}

// Prepare the SQL statement for insertion
$sql = "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ii", $user_id, $product_id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Item added to wishlist successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to add item to wishlist']);
    }

    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to prepare statement']);
}

// Close the database connection
$conn->close();
?>
