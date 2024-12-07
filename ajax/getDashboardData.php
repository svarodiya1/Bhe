<?php

// Allow requests from all origins
header("Access-Control-Allow-Origin: *");

// Allow specific methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Continue with your existing PHP code

// Step 1: Establish database connection
$servername = "localhost";  // Your database server
$username = "root";         // Your database username
$password = "123456";       // Your database password
$dbname = "mydb";           // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Initialize variables
$total_sales = 0;
$total_income = 0;
$new_orders = 0;
$pending_orders = 0;
$recent_orders = [];

// Step 3: Query to get total sales and income
$sql = "SELECT SUM(total_amount) as total_sales, COUNT(order_id) as new_orders FROM orders WHERE status = 'completed'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch the result and store in variables
    $row = $result->fetch_assoc();
    $total_sales = $row['total_sales'];
    $new_orders = $row['new_orders'];
}

// Step 4: Query to get total income (completed orders)
$sql_income = "SELECT SUM(total_amount) as total_income FROM orders WHERE payment_status = 'completed'";
$result_income = $conn->query($sql_income);

if ($result_income->num_rows > 0) {
    // Fetch the result for total income
    $row_income = $result_income->fetch_assoc();
    $total_income = $row_income['total_income'];
}

// Step 5: Query to get pending orders
$sql_pending = "SELECT COUNT(order_id) as pending_orders FROM orders";
$result_pending = $conn->query($sql_pending);

if ($result_pending->num_rows > 0) {
    // Fetch the result for pending orders
    $row_pending = $result_pending->fetch_assoc();
    $pending_orders = $row_pending['pending_orders'];
}

// Step 6: Query to get recent orders (last 5 orders)
$sql_recent_orders = "SELECT order_id, user_id, order_date, total_amount, status FROM orders ORDER BY order_id DESC ";
$result_recent_orders = $conn->query($sql_recent_orders);

if ($result_recent_orders->num_rows > 0) {
    // Fetch recent orders and store them in the $recent_orders array
    while ($row_recent = $result_recent_orders->fetch_assoc()) {
        $recent_orders[] = $row_recent;
    }
}

// Step 7: Create an array with the data to send as a response
$response = array(
    'success' => true,
    'data' => array(
        'total_sales' => $total_sales,
        'total_income' => $total_income,
        'new_orders' => $new_orders,
        'pending_orders' => $pending_orders,
        'recent_orders' => $recent_orders // Include recent orders in the response
    )
);

// Step 8: Send the response as a JSON
echo json_encode($response);

// Step 9: Close the database connection
$conn->close();
?>
