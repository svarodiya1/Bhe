<?php
// Database connection
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

require_once 'db.php'; // Include your database connection file

$conn = $con; // Assuming $con is your database connection

// Check for preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Exit for preflight requests
}

// Get the user_id from the query parameters
$user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;

// Validate input
if ($user_id === null) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid input: user_id is required']);
    exit;
}

// Prepare the SQL statement to retrieve wishlist items
$sql = "SELECT w.product_id, p.name, p.img_path,p.price,p.product_id FROM wishlist w 
        JOIN products p ON w.product_id = p.product_id 
        WHERE w.user_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch all wishlist items
    $wishlistItems = [];
    while ($row = $result->fetch_assoc()) {
        $wishlistItems[] = $row;
    }

    echo json_encode(['wishlist' => $wishlistItems]);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to prepare statement']);
}

// Close the database connection
$conn->close();
?>
