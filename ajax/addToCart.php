<?php
// Include your database connection
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
include 'db.php';
$conn = $con;

// Parse the JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Check if required data exists
if (isset($input['product_id'], $input['cart_id'], $input['items'])) {
    $product_id = intval($input['product_id']);
    $cart_id = intval($input['cart_id']);
    // $items = $input['items'];

    foreach ($items as $item) {
        $size = $item['size'];
        $price = floatval($item['price']);
        $quantity = intval($item['quantity']);
        $total = floatval($item['total']);

        // Validate input
        if ($quantity <= 0 || $price < 0 || empty($size)) {
            echo json_encode([
                "status" => "error",
                "message" => "Quantity must be positive, price must be non-negative, and size must be provided."
            ]);
            exit();
        }

        // Check if the product with the specific size is already in the cart
        $query = "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ? AND size = ?";
        $stmt = $conn->prepare($query);

        if (!$stmt) {
            echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]);
            exit();
        }

        $stmt->bind_param("iis", $cart_id, $product_id, $size);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Product with the specific size is already in the cart, update the quantity and total
            $update_query = "UPDATE cart_items SET quantity = quantity + ?, price = ?, total = (quantity + ?) * price WHERE cart_id = ? AND product_id = ? AND size = ?";
            $update_stmt = $conn->prepare($update_query);

            if (!$update_stmt) {
                echo json_encode(["status" => "error", "message" => "Failed to prepare update statement."]);
                exit();
            }

            $update_stmt->bind_param("iddiis", $quantity, $price, $quantity, $cart_id, $product_id, $size);
            if ($update_stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Cart updated successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update cart."]);
            }

            $update_stmt->close();
        } else {
            // Product with the specific size is not in the cart, insert a new cart item
            $insert_query = "INSERT INTO cart_items (cart_id, product_id, size, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?)";
            $insert_stmt = $conn->prepare($insert_query);

            if (!$insert_stmt) {
                echo json_encode(["status" => "error", "message" => "Failed to prepare insert statement."]);
                exit();
            }

            $insert_stmt->bind_param("iisdid", $cart_id, $product_id, $size, $quantity, $price, $total);
            if ($insert_stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Product added to cart successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to add product to cart."]);
            }

            $insert_stmt->close();
        }

        $stmt->close();
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid input. Please provide product_id, cart_id, and items."
    ]);
    exit();
}

// Close the database connection
$conn->close();
?>
