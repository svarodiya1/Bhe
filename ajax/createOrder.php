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

// Decode JSON data from the client
$input_data = json_decode(file_get_contents('php://input'), true);

if (!$input_data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Extract data from the input
$user_id = $input_data['user_id'] ?? 34; 
$phone = $input_data['phone'];
$email = $input_data['email'];
$address_line1 = $input_data['addressLine1'];
$address_line2 = $input_data['addressLine2'] ?? '';
$landmark = $input_data['landmark'] ?? '';
$locality = $input_data['locality'] ?? '';
$city = $input_data['city'] ?? '';
$state = $input_data['state'] ?? '';
$total_amount = $input_data['total_amount'] ?? '200';
$order_date = date('Y-m-d H:i:s');
$created_at = date('Y-m-d H:i:s');


// Initialize items array
$items = $input_data['items'] ?? [];

// Transaction start
$stmt = null;
try {
    $con->query("START TRANSACTION");

    // Insert into customer_address
    $stmt = $con->prepare("
        INSERT INTO customer_address
        (user_id, phone_number, email, address_line1, address_line2, landmark, locality_town, city, state, total_amount, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    if (!$stmt) throw new Exception("customer_address query failed: " . $con->error);

    $stmt->bind_param("issssssssis", $user_id, $phone, $email, $address_line1, $address_line2, $landmark, $locality, $city, $state, $total_amount, $created_at);
    if (!$stmt->execute()) throw new Exception("Insert customer_address failed: " . $stmt->error);

    $address_id = $stmt->insert_id;

    // Insert into orders
    $stmt = $con->prepare("
        INSERT INTO orders (user_id, order_date, status, shipping_address, total_amount, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    if (!$stmt) throw new Exception("orders query failed: " . $con->error);

    $status = 'Pending';
    $stmt->bind_param("issids", $user_id, $order_date, $status, $address_id, $total_amount, $created_at);
    if (!$stmt->execute()) throw new Exception("Insert orders failed: " . $stmt->error);

    $order_id = $stmt->insert_id;

    // Insert into order_items
    $itemStmt = $con->prepare("
        INSERT INTO order_items (order_id, product_id, quantity, price) 
        VALUES (?, ?, ?, ?)
    ");
    if (!$itemStmt) throw new Exception("order_items query failed: " . $con->error);

    foreach ($items as $item) {
        $product_id = (int)$item['product_id'];
        $quantity = (int)$item['quantity'];
        $price = (float)$item['price'];

        $itemStmt->bind_param("iiid", $order_id, $product_id, $quantity, $price);
        if (!$itemStmt->execute()) throw new Exception("Insert order_items failed: " . $itemStmt->error);
    }

    $con->query("COMMIT");
    echo json_encode(['success' => true, 'message' => 'Order created successfully!', 'order_id' => $order_id, 'total' => $total_amount]);
} catch (Exception $e) {
    $con->query("ROLLBACK");
    echo json_encode(['success' => false, 'message' => 'Order creation failed', 'error' => $e->getMessage()]);
}
 
finally {
    if ($stmt) {
        $stmt->close();
    }
    if (isset($itemStmt) && $itemStmt) {
        $itemStmt->close();
    }
    $con->close();
}
?>
