<?php
// Allow requests from all origins
header("Access-Control-Allow-Origin: *");

// Allow specific methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Database connection details
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
} else {
    error_log("Database connection established successfully.");
}

// Retrieve user_id from GET parameter
$user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

if ($user_id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
    exit;
}

$response = [
    'success' => true,
    'data' => [
        'totalOrders' => 0,
        'totalSpend' => 0,
        'pendingOrders' => 0,
        'recentOrders' => [],
    ]
];

// Query 1: Fetch user statistics
$query = "SELECT COUNT(*) AS totalOrders, 
                 SUM(total_amount) AS totalSpend,
                 SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pendingOrders
          FROM orders 
          WHERE user_id = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    error_log("Failed to prepare statement: " . $conn->error);
} else {
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $stmt->bind_result($totalOrders, $totalSpend, $pendingOrders);
    $stmt->fetch();
    $stmt->close();
    
    $response['data']['totalOrders'] = $totalOrders;
    $response['data']['totalSpend'] = $totalSpend;
    $response['data']['pendingOrders'] = $pendingOrders;
}

// Query 2: Fetch recent orders
$query = "SELECT order_id, order_date, total_amount 
          FROM orders 
          WHERE user_id = ? 
          ORDER BY order_id DESC 
          LIMIT 5";
$stmt = $conn->prepare($query);

if (!$stmt) {
    error_log("Failed to prepare statement: " . $conn->error);
} else {
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc()) {
        $response['data']['recentOrders'][] = [
            'order_id' => $row['order_id'],
            'date' => $row['order_date'],
            'amount' => $row['total_amount']
        ];
    }
    $stmt->close();
}

echo json_encode($response);
?>
