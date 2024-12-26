<?php

include "./db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

$response = ["success" => false];

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $mainCatId = isset($_GET['mainCatId']) ? intval($_GET['mainCatId']) : null;
    $product = isset($_GET['product']) ? intval($_GET['product']) : null;

    try {
        if ($mainCatId) {
            // Query for fetching products by main category ID
            $query = "
                SELECT a.*, b.category_name
                FROM products a
                LEFT JOIN categories b ON a.sub_category_id = b.category_id  -- Use LEFT JOIN to include products without categories
                LEFT JOIN main_category c ON b.parent_id = c.id
                WHERE c.id = ?
                ORDER BY a.product_id DESC
            ";

            $stmt = $con->prepare($query);
            $stmt->bind_param("i", $mainCatId);
        } elseif ($product) {
            // Query for fetching a specific product
            $query = "
            SELECT a.*, d.price, d.size, b.category_name
            FROM products a
            LEFT JOIN categories b ON a.category_id = b.category_id
            LEFT JOIN main_category c ON b.parent_id = c.id
            LEFT JOIN product_price d ON a.product_id = d.product_id
            WHERE a.product_id = ?
            ORDER BY d.size;  -- Order by size if you want to group them
         ";
        
            $stmt = $con->prepare($query);
            $stmt->bind_param("i", $product); // Bind the product_id to the query
        }
        else {
            // Default query to fetch all products
            $query = "
                SELECT DISTINCT a.*, b.category_name
                FROM products a
                LEFT JOIN categories b ON a.category_id = b.category_id  -- Use LEFT JOIN to ensure we get products even without categories
                LEFT JOIN main_category c ON b.parent_id = c.id
                ORDER BY a.product_id DESC
            ";

            $stmt = $con->prepare($query);
        }

        // Execute query
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        if (count($data) > 0) {
            $response["success"] = true;
            $response["products"] = $data;
        } else {
            $response["message"] = "No products found";
        }

        $stmt->close();
    } catch (Exception $e) {
        $response["error"] = "An error occurred: " . $e->getMessage();
    }
} else {
    $response["message"] = "Invalid request method";
}

echo json_encode($response);
