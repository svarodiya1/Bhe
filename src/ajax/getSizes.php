<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

// Handle OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Return OK status for preflight requests
    exit;
}

// Include the database connection file
include './db.php';
$conn = $con;

$response = array();

try {
    // Ensure the database connection is established
    if (!$conn) {
        throw new Exception("Database connection failed.");
    }

    // Query to fetch sizes dynamically
    $query = "SELECT id, main_category_id, sub_category_id, size FROM product_size";

    if ($stmt = $conn->prepare($query)) {
        // Execute the statement
        $stmt->execute();
        $result = $stmt->get_result();

        $sizes = [];
        while ($row = $result->fetch_assoc()) {
            $sizes[] = $row;
        }

        if ($sizes) {
            $response['success'] = true;
            $response['data'] = $sizes;
        } else {
            $response['success'] = false;
            $response['message'] = "No sizes found.";
        }

        // Close the statement
        $stmt->close();
    } else {
        throw new Exception("Failed to prepare SQL statement.");
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "Error: " . $e->getMessage();
}

// Output the response as JSON
echo json_encode($response);

// Close the database connection
$conn->close();
?>
