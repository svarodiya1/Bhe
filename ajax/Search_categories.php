<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

include("./db.php");

if (!$con) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()]));
}

$conn = $con;

// Handle OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Return OK for preflight
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Decode JSON body
    $input = json_decode(file_get_contents("php://input"), true);
    $search_term = $input['query'] ?? ''; // Get search term

    if (!empty(trim($search_term))) {
        $sql = "SELECT id, category_name FROM main_category WHERE category_name LIKE ?";
        $search_term = "%" . $search_term . "%";

        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("s", $search_term);
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $categories = $result->fetch_all(MYSQLI_ASSOC);
                
                http_response_code(200); // OK
                echo json_encode(["status" => "success", "categories" => $categories]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Query execution failed."]);
            }
            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Search term is required."]);
    }
} else {
    http_response_code(405); // Method not allowed
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

$conn->close();

?>