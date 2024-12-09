<?php

header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow React frontend to access
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies, tokens, etc.)

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond with HTTP 200 OK for OPTIONS request
    http_response_code(200);
    exit();
}

include("./db.php"); // Include your database connection
$conn = $con;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $subcategory_id = isset($_POST['sub_category_id']) ? (int) $_POST['sub_category_id'] : 0;
    $size = isset($_POST['size']) ? trim($_POST['size']) : '';

    if ($subcategory_id <= 0 || empty($size)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Subcategory ID and size are required."]);
        exit;
    }

    $sql = "INSERT INTO product_size (sub_category_id, size) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error preparing SQL statement: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("is", $subcategory_id, $size);
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["status" => "success", "message" => "Size added successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error executing query: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
