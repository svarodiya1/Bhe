<?php
include 'db.php'; // Include database connection

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if all required fields are present
    if (isset($data['product_id'], $data['size'], $data['available'])) {
        $product_id = intval($data['product_id']);
        $size = $data['size'];
        $available = intval($data['available']); // Ensure binary value (0 or 1)

        // Update availability based on size
        $query = "UPDATE product_price SET is_available = ? WHERE product_id = ? AND size = ?";
        if ($stmt = $con->prepare($query)) {
            $stmt->bind_param('iis', $available, $product_id, $size);

            if ($stmt->execute()) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Product size availability updated successfully',
                    'data' => ['is_available' => $available]
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to update availability',
                    'error' => $stmt->error
                ]);
            }

            $stmt->close();
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to prepare statement',
                'error' => $con->error
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid input data - Missing required fields',
            'input_received' => $data
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}

$con->close();
?>
