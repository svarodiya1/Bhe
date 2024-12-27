<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

include("./db.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Directory where image will be saved
    $currentTimeAndDate = time();
    $targetDir = "images/";

    // Create unique file name using current time and original file extension
    $file_name = $currentTimeAndDate . "_" . basename($_FILES["image"]["name"]);
    $targetFile = $targetDir . $currentTimeAndDate . "_" . basename($_FILES["image"]["name"]);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Validate the image file
    if (isset($_FILES["image"])) {
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check === false) {
            echo json_encode(["status" => "error", "message" => "File is not an image."]);
            exit;
        }

        // Check file size (limit to 2MB)
        if ($_FILES["image"]["size"] > 2000000) {
            echo json_encode(["status" => "error", "message" => "File is too large."]);
            exit;
        }

        // Allow only certain file formats
        if (!in_array($imageFileType, ["jpg", "jpeg", "png", "gif"])) {
            echo json_encode(["status" => "error", "message" => "Only JPG, JPEG, PNG & GIF files are allowed."]);
            exit;
        }

        // Move the uploaded file to the target directory
        if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            echo json_encode(["status" => "error", "message" => "Error uploading file."]);
            exit;
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No image file provided."]);
        exit;
    }

    // Get other form data
    $productName = $_POST['productName'];
    $productPrice = $_POST['productPrice'];
    $description = $_POST['description'];
    $size = $_POST['size'];
    $brand = $_POST['brand'];
    $currentCategoryId = $_POST['currentCategoryId'];
    $stockQuantity = $_POST['stock_quantity'];
    $productStatus = "active";
    $img_path = $file_name;

    // Prepare and execute SQL statement
    $stmt = $con->prepare("INSERT INTO products (name, price, description, size, brand, category_id, stock_quantity, product_status, img_path) VALUES (?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("sdsssisss", $productName, $productPrice, $description, $size, $brand, $currentCategoryId, $stockQuantity, $productStatus, $img_path);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Product added successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
