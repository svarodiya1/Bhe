<?php

include "./db.php"; // Include your database connection file

// Set headers for CORS and content type
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET"); // Allow specified methods
header("Access-Control-Allow-Headers: Authorization, Content-Type");

// Response array to handle responses consistently
$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Check if `id` parameter is provided
    if (isset($_GET['category_id'])) {
        $mainCategoryId = intval($_GET['category_id']); // Sanitize and ensure ID is an integer

        // SQL query to fetch subcategories for the given main category ID
        $query = "SELECT category_name FROM categories WHERE parent_id = $mainCategoryId;";
    } else {
        // Fallback query to fetch all main categories
        $query = "SELECT category_name FROM categories WHERE parent_id IS NULL;";
    }

    // Execute the query
    $result = $con->query($query);

    // Prepare the data array to hold the results
    $data = [];

    if ($result && $result->num_rows > 0) {
        // Fetch rows and append to the data array
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Success response
        $response["success"] = true;
        $response["data"] = $data;
    } else {
        // No results found
        $response["success"] = false;
        $response["message"] = "No subcategories found.";
    }
} else {
    // Invalid request method
    $response["success"] = false;
    $response["message"] = "Invalid request method. Use GET.";
}

// Output the JSON response
echo json_encode($response);

?>
