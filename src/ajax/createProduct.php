<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "./db.php"; // Assume db.php connects to your database

$response = ["success" => false, "message" => ""];

try {
    $productName = $_POST['productName'];
    $description = $_POST['description'];
    $brand = $_POST['brand'];
    $categoryId = $_POST['currentCategoryId'];
    $subCategoryId = $_POST['currentSubCategoryId'];
    $stockQuantity = $_POST['stock_quantity'];
    $sizes = isset($_POST['sizes']) ? $_POST['sizes'] : []; // Fetch sizes as an array
    $productPrice = isset($_POST['productPrice']) ? $_POST['productPrice'] : []; 
    $image = isset($_FILES['image']) ? $_FILES['image'] : null; // Ensure 'image' is set

    // Process sizes and their prices
    $sizes = $_POST['sizes']; // Array of sizes
    $prices = [];
    foreach ($sizes as $size) {
        $prices[$size] = isset($_POST["price_{$size}"]) ? (int) $_POST["price_{$size}"] : 0; // Price for each size
    }

    // Validate required fields
    if (empty($productName) || empty($productPrice) || empty($categoryId) || empty($sizes)) {
        $response["message"] = "Required fields are missing.";
        echo json_encode($response);
        exit;
    }

    // Handle file upload
    $uploadDir = "uploads/"; // Make sure this folder exists
    $imagePath = null;

    if ($image && $image['error'] === UPLOAD_ERR_OK) {
        $imageName = uniqid() . "_" . basename($image["name"]);
        $imagePath = $uploadDir . $imageName;

        // Check if uploads directory exists, create it if not
        if (!is_dir($uploadDir)) {
            if (!mkdir($uploadDir, 0777, true)) {
                $response["message"] = "Failed to create upload directory.";
                echo json_encode($response);
                exit;
            }
        }

        // Move uploaded file to the uploads directory
        if (!move_uploaded_file($image["tmp_name"], $imagePath)) {
            $response["message"] = "Image upload failed.";
            echo json_encode($response);
            exit;
        }
    }

    // Insert product details into the products table
    $stmt = $con->prepare("INSERT INTO products (name, description, brand, category_id, sub_category_id,  img_path) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "sssiis",
        $productName,
        $description,
        $brand,
        $categoryId,
        $subCategoryId,
        $imagePath
    );

    if (!$stmt->execute()) {
        $response["message"] = "Failed to insert product.";
        echo json_encode($response);
        exit;
    }

    // Get the ID of the inserted product
    $productId = $con->insert_id;

     error_log("Sizes array: " . print_r($sizes, true));
    error_log("Prices array: " . print_r($prices, true));

    // Insert product details into the products table
    // Assuming the insert query for the product table is here
    // Example: $stmt = $con->prepare("INSERT INTO products (product_name, product_price, description, brand, category_id, sub_category_id, stock_quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    // Insert sizes and prices into the product_price table
    $stmtSize = $con->prepare("INSERT INTO product_price (main_category_id, sub_category_id, product_id, size, price) VALUES (?, ?, ?, ?, ?)");

    foreach ($sizes as $index => $size) {
        // Ensure that $prices array has a corresponding price for each size
        if (isset($prices[$size])) {
            $sizePrice = $prices[$size]; // Get the corresponding price for the current size
            
            // Debugging the price and size
            error_log("Inserting Size: $size with Price: $sizePrice");

            // Bind parameters (consider size as a string 's' if it's not an integer)
            $stmtSize->bind_param("iiisi", $categoryId, $subCategoryId, $productId, $size, $sizePrice);

            if (!$stmtSize->execute()) {
                error_log("Error inserting size for product: " . $stmtSize->error);
                $response["message"] = "Failed to insert size for product.";
                echo json_encode($response);
                exit;
            }
        } else {
            error_log("No price found for size: $size");
        }
    }

    $response["success"] = true;
    $response["message"] = "Product added successfully with sizes.";
    echo json_encode($response);
} catch (Exception $e) {
    $response["message"] = "An error occurred: " . $e->getMessage();
    echo json_encode($response);
}
