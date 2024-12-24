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

    // Retrieve the sub_category_id from the request
    $sub_category_id = isset($_GET['sub_category_id']) ? intval($_GET['sub_category_id']) : null;

    // Validate sub_category_id
    if (!$sub_category_id) {
        throw new Exception("Invalid or missing sub_category_id");
    }

    // Query to fetch sizes dynamically for the given sub_category_id
    $query = "SELECT id, main_category_id, sub_category_id, size FROM product_size WHERE sub_category_id = ?";

    if ($stmt = $conn->prepare($query)) {
        // Bind the sub_category_id parameter to the query
        $stmt->bind_param("i", $sub_category_id);

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
            $response['message'] = "No sizes found for the given sub_category_id.";
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

