<?php
// Include your database connection
include "./db.php"; // Adjust with your actual file for DB connection

// Allow requests from your frontend (React app)
header('Access-Control-Allow-Origin: http://localhost:3000');  // Allow from React app (adjust if needed)
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');   // Allow methods
header('Access-Control-Allow-Headers: Content-Type');         // Allow headers

// Set content type to JSON
header('Content-Type: application/json');

// If the request is a preflight OPTIONS request, respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the raw POST data (JSON)
$data = json_decode(file_get_contents('php://input'), true);

// Check if JSON is valid
// if (json_last_error() !== JSON_ERROR_NONE) {
//     echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input']);
//     exit;
// }

// $data['main_category_id'] = "11";
// $data['sub_category_id'] = "22";
// $data['size'] = "Smalls";

// Check if the required parameters are provided
if (!isset($data['main_category_id']) || !isset($data['sub_category_id']) || !isset($data['size'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

// Assign variables from the received data
$category_id = $data['main_category_id'];
$sub_category_id = $data['sub_category_id'];
$size = $data['size'];

// Validate the inputs (basic)
if (empty($category_id) || empty($sub_category_id) || empty($size)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

// Prepare SQL query to insert the size data into the `product_size` table
$query = "INSERT INTO product_size (main_category_id, sub_category_id, size) VALUES (?, ?, ?)";

// Prepare the statement
$stmt = $con->prepare($query);
$stmt->bind_param("iis", $category_id, $sub_category_id, $size); // i: integer, s: string (size is a string)

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Size added successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add size']);
}

// Close the statement and connection
$stmt->close();
$con->close();
?>
