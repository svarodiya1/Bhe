<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

// Handle OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Return OK status for preflight requests
    exit;
}

include("./db.php");
$conn = $con;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $catnam = $_POST["category_name"];
    $main_category_id = (int) $_POST["main_category_id"];

    // Check if 'category_name' is provided and not empty
    if (isset($_POST['category_name']) && !empty(trim($_POST['category_name']))) {

        // Sanitize the input
        $category_name = trim($_POST['category_name']);

        // Validate that category name is not too short or too long
        if (strlen($category_name) < 3) {
            http_response_code(400); // Bad request
            echo json_encode(["status" => "error", "message" => "Category name must be at least 3 characters long."]);
            exit;
        } elseif (strlen($category_name) > 50) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Category name cannot be longer than 50 characters."]);
            exit;
        }

        // Prepare the SQL statement to prevent SQL injection
        $sql = "INSERT INTO `categories` (`category_name`, `category_id`) VALUES (?, ?);";

        if ($stmt = $conn->prepare($sql)) {
            // Bind the parameters
            $stmt->bind_param("si", $category_name, $main_category_id);

            // Execute the statement
            if ($stmt->execute()) {
                http_response_code(201); // Created
                echo json_encode(["status" => "success", "message" => "Category added successfully."]);
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(["status" => "error", "message" => "Error adding category: " . $stmt->error]);
            }

            // Close the statement
            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Category name is required.", "catname" => $_POST]);
    }

    // Close the database connection
    $conn->close();
} else {
    http_response_code(405); // Method not allowed
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);
}
