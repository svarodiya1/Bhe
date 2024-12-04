<?php
header("Access-Control-Allow-Origin: *"); // Allow all domains (adjust for production)
header("Access-Control-Allow-Methods: POST, OPTIONS, GET"); // Allow POST requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

header("Content-Type: application/json");
require_once 'db.php'; // Include your database connection file



$conn = $con;


// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Check if cart_item_id is provided
if (isset($data['cart_item_id'])) {
    $cart_item_id = $data['cart_item_id'];

    // Prepare the DELETE statement
    $sql = "DELETE FROM cart_items WHERE cart_item_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $cart_item_id);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Item removed successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to remove item']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No cart item ID provided']);
}
?>
