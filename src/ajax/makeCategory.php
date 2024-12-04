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


    // Check if 'category_name' is provided and not empty
    if (isset($_POST['category_name']) && !empty(trim($_POST['category_name']))) {









        // Directory where image will be saved
        $currentTimeAndDate = time();
        $targetDir = "images/";

        $file_name = $currentTimeAndDate . "_" . basename($_FILES["image"]["name"]);

        // Create unique file name using current time and original file extension
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


























        // Sanitize the input
        $category_name = trim($_POST['category_name']);
        $image_path = $file_name;

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
        // $sql = "INSERT INTO `categories` (`category_name`) VALUES (?)";
        $sql = "INSERT INTO `main_category` (`category_name`, `sample_image`) VALUES (?, ?);";

        if ($stmt = $conn->prepare($sql)) {
            // Bind the parameters
            $stmt->bind_param("ss", $category_name, $image_path);

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
