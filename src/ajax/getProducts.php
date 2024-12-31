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
                   SELECT DISTINCT a.*, b.category_name
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
                   SELECT DISTINCT 
    a.*, 
    b.category_name, 
    GROUP_CONCAT(d.price ORDER BY d.size ASC) AS prices, 
    GROUP_CONCAT(d.size ORDER BY d.size ASC) AS sizes,
    GROUP_CONCAT(d.is_available) AS availability  
FROM 
    products a
LEFT JOIN 
    categories b ON a.category_id = b.category_id  
LEFT JOIN 
    main_category c ON b.parent_id = c.id
LEFT JOIN 
    product_price d ON a.product_id = d.product_id
WHERE 
    a.product_id = ?
GROUP BY 
    a.product_id;
                ";

                $stmt = $con->prepare($query);
                $stmt->bind_param("i", $product);
            } else {
                // Default query to fetch all products
                $query = "
                       SELECT DISTINCT a.*, b.category_name, d.price, d.size, d.is_available
                    FROM products a
                    LEFT JOIN categories b ON a.category_id = b.category_id  
                    LEFT JOIN main_category c ON b.parent_id = c.id
                    LEFT JOIN product_price d ON a.product_id = d.product_id
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

            if (!empty($data)) {
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

    ?>