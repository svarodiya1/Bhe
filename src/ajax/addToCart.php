<?php
// Enable detailed error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
session_start();

// Set headers for JSON response and CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");

include 'db.php';
$conn = $con;

// Validate POST data
if (!isset($_POST['product_id']) || !isset($_POST['cart_id'])) {
    echo json_encode(["status" => "error", "message" => "Missing required parameters."]);
    exit();
}

// Retrieve and sanitize inputs
$user_id = intval($_POST['user_id']);
$product_id = intval($_POST['product_id']);
// $cart_id = intval($_POST['cart_id']);
$sizes = isset($_POST['sizes']) ? json_decode($_POST['sizes'], true) : [];
$quantities = isset($_POST['quantities']) ? json_decode($_POST['quantities'], true) : [];
$total = isset($_POST['total']) ? floatval($_POST['total']) : 0;

if (empty($sizes) || empty($quantities) || count($sizes) !== count($quantities)) {
    echo json_encode(["status" => "error", "message" => "Invalid sizes or quantities data."]);
    exit();
}

try {

    $cart_query = "SELECT cart_id FROM shopping_cart WHERE user_id = ?";
    $cart_stmt = $conn->prepare($cart_query);
    $cart_stmt->bind_param("i", $user_id);
    $cart_stmt->execute();
    $cart_result = $cart_stmt->get_result();
    
    if ($cart_result->num_rows > 0) {
        // If an active cart exists
        $cart_row = $cart_result->fetch_assoc();
        $cart_id = $cart_row['cart_id'];
    } else {
        $response['sucess'] = false;
        $response['message'] = 'Cart Id is Missing';
        exit();
    }

    // Retrieve product price
    $price_query = "SELECT price FROM product_price WHERE product_id = ?";
    $price_stmt = $conn->prepare($price_query);
    $price_stmt->bind_param("i", $product_id);
    $price_stmt->execute();
    $price_result = $price_stmt->get_result();

    if ($price_result->num_rows > 0) {
        $price_row = $price_result->fetch_assoc();
        $price = floatval($price_row['price']);

        foreach ($sizes as $index => $size) {
            // Trim and sanitize size
            $size = trim($size);
            $qty = intval($quantities[$index]);

            if ($qty <= 0) {
                echo json_encode(["status" => "error", "message" => "Invalid quantity for size $size."]);
                exit();
            }

            $item_total = $price * $qty;


            $status = "OPEN";

            // Check if the item exists in the cart
            $check_query = "SELECT product_id FROM cart_items WHERE cart_id = ? AND product_id = ? AND size = ? AND status = ?";
            $check_stmt = $conn->prepare($check_query);
            $check_stmt->bind_param("iiss", $cart_id, $product_id, $size, $status);
            $check_stmt->execute();
            $check_result = $check_stmt->get_result();

            if ($check_result->num_rows > 0) {
                // Update existing cart item
                $update_query = "UPDATE cart_items SET quantity = quantity + ?, total = total + ? WHERE cart_id = ? AND product_id = ? AND size = ? AND status = ?";
                $update_stmt = $conn->prepare($update_query);
                $update_stmt->bind_param("idisss", $qty, $item_total, $cart_id, $product_id, $size, $status);
                $update_stmt->execute();
            } else {
                // Insert new cart item
                $insert_query = "INSERT INTO cart_items (cart_id, product_id, size, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?)";
                $insert_stmt = $conn->prepare($insert_query);
                $insert_stmt->bind_param("iisidd", $cart_id, $product_id, $size, $qty, $price, $item_total);
                $insert_stmt->execute();
            }
        }

        echo json_encode(["status" => "success", "message" => "Products added to cart successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Product not found."]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
?>
