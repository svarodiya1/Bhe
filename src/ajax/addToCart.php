<?php
// Include your database connection
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
include 'db.php';
$conn = $con;

// Check if required POST data is available
if (isset($_POST['product_id'], $_POST['quantity'], $_POST['cart_id'])) {
    $product_id = intval($_POST['product_id']);
    $quantity = intval($_POST['quantity']);
    $cart_id = intval($_POST['cart_id']);

    // Retrieve the price from the database
    $price_query = "SELECT price FROM products WHERE product_id = ?"; // Assuming you have a products table
    $price_stmt = $conn->prepare($price_query);
    $price_stmt->bind_param("i", $product_id);
    $price_stmt->execute();
    $price_result = $price_stmt->get_result();

    if ($price_result->num_rows > 0) {
        $price_row = $price_result->fetch_assoc();
        $price = floatval($price_row['price']); // Get price from database
        $total = $price * $quantity; // Calculate total

        // Validate quantity and price
        if ($quantity <= 0 || $price < 0) {
            echo json_encode(["status" => "error", "message" => "Quantity must be a positive integer and price must be a non-negative number."]);
            exit();
        }

        // Check if the product is already in the cart
        $query = "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?";
        $stmt = $conn->prepare($query);

        if (!$stmt) {
            echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]);
            exit();
        }

        $stmt->bind_param("ii", $cart_id, $product_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Product is already in the cart, update the quantity and total
            $update_query = "UPDATE cart_items SET quantity = quantity + ?, price = ?, total = (quantity + ?) * price WHERE cart_id = ? AND product_id = ?";
            $update_stmt = $conn->prepare($update_query);

            if (!$update_stmt) {
                echo json_encode(["status" => "error", "message" => "Failed to prepare update statement."]);
                exit();
            }

            // Pass the quantity again for correct total calculation
            $update_stmt->bind_param("iddii", $quantity, $price, $quantity, $cart_id, $product_id); // Use "d" for double/float
            if ($update_stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Cart updated successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update cart."]);
            }

            $update_stmt->close();
        } else {
            // Product is not in the cart, insert a new cart item
            $insert_query = "INSERT INTO cart_items (cart_id, product_id, quantity, price, total) VALUES (?, ?, ?, ?, ?)";
            $insert_stmt = $conn->prepare($insert_query);

            if (!$insert_stmt) {
                echo json_encode(["status" => "error", "message" => "Failed to prepare insert statement."]);
                exit();
            }

            $insert_stmt->bind_param("iiidd", $cart_id, $product_id, $quantity, $price, $total); // Use "d" for double/float
            if ($insert_stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Product added to cart successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to add product to cart."]);
            }

            $insert_stmt->close();
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Product not found."]);
    }

    $price_stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input. Please provide product_id, quantity, and cart_id."]);
}

// Close the database connection
$conn->close();
?>
