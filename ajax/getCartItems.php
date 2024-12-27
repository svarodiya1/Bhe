<?php
// Include your database connection
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
include 'db.php';
$conn = $con;

// Function to get cart items by cart_id
function getCartItems($cart_id) {
    global $conn; // Use the global connection variable

    // Prepare the SQL statement
    $query = "SELECT a.*,b.img_path,b.name FROM cart_items a join products b ON a.product_id = b.product_id  
              WHERE a.cart_id = ?";

    $stmt = $conn->prepare($query);
    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]);
        exit();
    }

    // Bind parameters and execute
    $stmt->bind_param("i", $cart_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if there are any items in the cart
    if ($result->num_rows > 0) {
        $cart_items = [];
        while ($row = $result->fetch_assoc()) {
            $cart_items[] = $row; // Append each item to the array
        }
        echo json_encode(["status" => "success", "data" => $cart_items]);
    } else {
        echo json_encode(["status" => "success", "message" => "No items found in the cart."]);
    }

    // Close the statement
    $stmt->close();
}

// Check if cart_id is provided
if (isset($_GET['cart_id'])) {
    $cart_id = intval($_GET['cart_id']);
    getCartItems($cart_id);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input. Please provide cart_id."]);
}

// Close the database connection
$conn->close();
?>
