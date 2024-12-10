<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

// Include your database connection
include "./db.php"; 

// Check connection
if ($con->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $con->connect_error]);
    exit();
}

// Decode the incoming JSON data
$input_data = json_decode(file_get_contents('php://input'), true);

if (!$input_data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Extract address and order details
$user_id = $input_data['user_id'] ?? null; // Assuming you will provide `user_id`
$first_name = $input_data['firstName'] ?? '';
$last_name = $input_data['lastName'] ?? '';
$phone = $input_data['phone'] ?? '';
$email = $input_data['email'] ?? '';
$address_line1 = $input_data['addressLine1'] ?? '';
$address_line2 = $input_data['addressLine2'] ?? '';
$landmark = $input_data['landmark'] ?? '';
$locality = $input_data['locality'] ?? '';
$city = $input_data['city'] ?? '';
$state = $input_data['state'] ?? '';
$total_amount = $input_data['totalAmount'] ?? 0.0;
$items = $input_data['items'] ?? [];

// Validate required fields
if (!$user_id || !$first_name || !$last_name || !$phone || !$email || !$address_line1 || !$locality || !$city || !$state) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Initialize the statement variable
$stmt = null;

try {
    // Start transaction
    if (!$con->query("START TRANSACTION")) {
        throw new Exception("Failed to start transaction: " . $con->error);
    }

    // Insert data into `customer_address` table
    $stmt = $con->prepare("
        INSERT INTO customer_address
        (user_id, first_name, last_name, phone, email, address_line1, address_line2, landmark, locality, city, state, total_amount, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");
    
    if (!$stmt) {
        throw new Exception("Prepared statement failed: " . $con->error);
    }

    // Bind parameters
    $stmt->bind_param(
        "issssssssssd",
        $user_id,
        $first_name,
        $last_name,
        $phone,
        $email,
        $address_line1,
        $address_line2,
        $landmark,
        $locality,
        $city,
        $state,
        $total_amount
    );

    // Execute the statement
    if (!$stmt->execute()) {
        throw new Exception("Error inserting into customer_address table: " . $stmt->error);
    }

    // Fetch the inserted address ID
    $address_id = $stmt->insert_id;

    // Insert data into `orders` table
    $stmt = $con->prepare("
        INSERT INTO orders (user_id,  total_amount, created_at) 
        VALUES (?, ?, NOW())
    ");
    
    if (!$stmt) {
        throw new Exception("Prepared statement failed: " . $con->error);
    }

    $stmt->bind_param("iid", $user_id, $address_id, $total_amount);

    if (!$stmt->execute()) {
        throw new Exception("Error inserting into orders table: " . $stmt->error);
    }

    // Fetch the inserted order ID
    $order_id = $stmt->insert_id;

    // Insert data into `order_items` table
    $itemStmt = $con->prepare("
        INSERT INTO order_items (order_id, product_id, quantity, price) 
        VALUES (?, ?, ?, ?)
    ");
    
    if (!$itemStmt) {
        throw new Exception("Prepared statement failed: " . $con->error);
    }

    foreach ($items as $item) {
        $product_id = $item['product_id'];
        $quantity = $item['quantity'];
        $price = $item['price'];

        $itemStmt->bind_param("iiid", $order_id, $product_id, $quantity, $price);

        if (!$itemStmt->execute()) {
            throw new Exception("Error inserting into order_items table: " . $itemStmt->error);
        }
    }

    // Commit transaction
    if (!$con->query("COMMIT")) {
        throw new Exception("Failed to commit transaction: " . $con->error);
    }

    // Return success response
    echo json_encode(['success' => true, 'message' => 'Order created successfully', 'order_id' => $order_id]);
} catch (Exception $e) {
    // Rollback transaction in case of error
    $con->query("ROLLBACK");

    // Log error details for debugging
    file_put_contents("error.log", "Error: " . $e->getMessage() . PHP_EOL, FILE_APPEND);

    // Return failure response
    echo json_encode(['success' => false, 'message' => 'Failed to create order', 'error' => $e->getMessage()]);
} finally {
    // Close the statement if initialized
    if ($stmt) {
        $stmt->close();
    }
    $con->close();
}
?>
