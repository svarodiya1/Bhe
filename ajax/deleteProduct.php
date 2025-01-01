<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include your database connection
include "./db.php"; 

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['product_id'])) {
    $productId = $data['product_id'];

    // Prepare and execute the delete query
    $stmt = $con->prepare("DELETE FROM products WHERE product_id = ?");
    $stmt->bind_param("i", $productId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product deleted successfully"]);
    } else {
        error_log("MySQL Error: " . $stmt->error); // Logs the error
        echo json_encode(["success" => false, "message" => "Failed to delete product"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid product ID"]);
}

$con->close();
?>
