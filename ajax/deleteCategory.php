<?php
// Headers for Cross-Origin Resource Sharing (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include your database connection
include "./db.php";

// Ensure the request is POST and data is received
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve category_id from POST data
    $category_id = isset($_POST['category_id']) ? intval($_POST['category_id']) : null;

    // Validate category_id
    if ($category_id) {
        // Prepare the SQL query
        $query = "UPDATE categories SET is_active = 0 WHERE category_id = ?";
        $stmt = $con->prepare($query);

        if ($stmt) {
            // Bind parameters and execute
            $stmt->bind_param("i", $category_id);

            if ($stmt->execute()) {
                // Check if any rows were affected
                if ($stmt->affected_rows > 0) {
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Category marked as inactive.'
                    ]);
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'No matching category found or already inactive.'
                    ]);
                }
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Execution failed: ' . $stmt->error
                ]);
            }

            // Close the statement
            $stmt->close();
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to prepare the SQL statement: ' . $con->error
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid or missing category ID.'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method. Please use POST.'
    ]);
}

// Close the database connection
$con->close();
?>
