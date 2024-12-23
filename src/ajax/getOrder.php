<?php
include "./db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

function sendResponse($success, $message, $data = null, $error = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'error' => $error,
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['user_id']) || !is_numeric($_GET['user_id'])) {
        sendResponse(false, 'Invalid or missing user ID');
    }

    $user_id = intval($_GET['user_id']);

    try {
        $stmt = $con->prepare("
            SELECT 
                o.order_id,
                o.order_date,
                o.status,
                o.total_amount,
                o.shipping_address,
                o.payment_status,
                o.payment_method,
                GROUP_CONCAT(
                    CONCAT(
                        p.name, '|', oi.quantity, '|', p.product_id
                    ) SEPARATOR ';'
                ) AS products
            FROM orders o
            LEFT JOIN order_items oi ON o.order_id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.product_id
            WHERE o.user_id = ?
            GROUP BY o.order_id
            ORDER BY o.order_date DESC
        ");

        if (!$stmt) {
            sendResponse(false, "Failed to prepare statement", null, $con->error);
        }

        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            sendResponse(false, "No orders found for this user ID");
        }

        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $products = [];
            if (!empty($row['products'])) {
                foreach (explode(';', $row['products']) as $product) {
                    list($product_name, $quantity, $product_id) = explode('|', $product);
                    $products[] = [
                        'product_name' => $product_name,
                        'quantity' => intval($quantity),
                        'product_id' => intval($product_id),
                    ];
                }
            }

            $orders[] = [
                'order_id' => $row['order_id'],
                'date' => $row['order_date'],
                'status' => $row['status'],
                'total_amount' => $row['total_amount'],
                'shipping_address' => $row['shipping_address'],
                'payment_status' => $row['payment_status'],
                'payment_method' => $row['payment_method'],
                'products' => $products,
            ];
        }

        sendResponse(true, 'Orders fetched successfully', $orders);
    } catch (Exception $e) {
        error_log("Error occurred: " . $e->getMessage());
        sendResponse(false, 'Error fetching orders', null, $e->getMessage());
    }
} else {
    sendResponse(false, 'Invalid request method');
}
?>
