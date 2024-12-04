<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
include 'db.php'; // Include your database connection file
$conn  = $con;
// Retrieve the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Validate the input data
if (!isset($data['user_id'], $data['address'], $data['items'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    exit();
}

$user_id = $data['user_id'];
$address = $data['address'];
$items = $data['items'];

// Prepare order data
$total_amount = 0; // Initialize total amount

// Calculate total amount and prepare SQL for order items
foreach ($items as $item) {
    $total_amount += $item['price'] * $item['quantity'];
}

// Insert into orders table
try {
    // $conn->beginTransaction();

    // Insert into orders table
    $stmt = $conn->prepare("INSERT INTO orders (user_id, address_line1, address_line2, landmark, locality_town, city, state, phone_number, email, total_amount, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([
        $user_id,
        $address['addressLine1'],
        $address['addressLine2'],
        $address['landmark'],
        $address['locality'],
        $address['city'],
        $address['state'],
        $address['phone'],
        $address['email'],
        $total_amount
    ]);

    // Get the last inserted order ID
    $order_id = mysqli_insert_id($conn);

    // Insert each order item
    foreach ($items as $item) {
        $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price,createdAt) VALUES (?, ?, ?, ?,NOW())");
        $stmt->execute([$order_id, $item['product_id'], $item['quantity'], $item['price']]);
    }

    $conn->commit();

    // Respond with success and the order ID
    echo json_encode(['success' => true, 'order_id' => $order_id]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(['success' => false, 'message' => 'Failed to create order: ' . $e->getMessage()]);
}
?>
