<?php
// Include your database connection
include "./db.php"; 
// Check connection
if ($con->connect_error) {
    die("Database connection failed: " . $con->connect_error);
} else {
    error_log("Database connection established successfully.");
}

// Set the response header to JSON
header('Content-Type: application/json');

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the posted data for product size insertion
    $categoryId = isset($_POST['main_category_id']) ? intval($_POST['main_category_id']) : 0;
    $subCategoryId = isset($_POST['sub_category_id']) ? intval($_POST['sub_category_id']) : 0;
    $size = isset($_POST['size']) ? trim($_POST['size']) : '';

    // Validate the input
    if ($categoryId <= 0 || $subCategoryId <= 0 || empty($size)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid input. Please provide a valid category, subcategory, and size.',
        ]);
        exit;
    }

    // Verify the relationship between category and subcategory
    $checkRelationQuery = "SELECT id FROM category_name";
    $stmtRelation = $con->prepare($checkRelationQuery);
    $stmtRelation->bind_param("ii", $subCategoryId, $categoryId);
    $stmtRelation->execute();
    $stmtRelation->store_result();

    if ($stmtRelation->num_rows === 0) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid subcategory for the selected category.',
        ]);
        $stmtRelation->close();
        exit;
    }
    $stmtRelation->close();

    // Check if the size already exists for the subcategory
    $queryCheck = "SELECT id FROM product_size WHERE sub_category_id = ? AND size = ?";
    $stmtCheck = $con->prepare($queryCheck);
    $stmtCheck->bind_param("is", $subCategoryId, $size);
    $stmtCheck->execute();
    $stmtCheck->store_result();

    if ($stmtCheck->num_rows > 0) {
        echo json_encode([
            'status' => 'error',
            'message' => 'This size already exists for the selected subcategory.',
        ]);
        $stmtCheck->close();
        exit;
    }
    $stmtCheck->close();

    // Insert the size into the product_size table
    $queryInsert = "INSERT INTO product_size (main_category_id, sub_category_id, size) VALUES (?, ?, ?)";
    $stmtInsert = $con->prepare($queryInsert);
    $stmtInsert->bind_param("iis", $categoryId, $subCategoryId, $size);

    if ($stmtInsert->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Size added successfully.',
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to add size. Please try again.',
        ]);
    }
    $stmtInsert->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['category_id'])) {
    // Fetch subcategories based on the category_id
    $categoryId = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;

    if ($categoryId <= 0) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid category ID.',
        ]);
        exit;
    }

    // Fetch the subcategories related to the selected category
    $query = "SELECT id, category_name FROM categories WHERE main_category_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $categoryId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Prepare subcategories data
    $subCategories = [];
    while ($row = $result->fetch_assoc()) {
        $subCategories[] = $row;
    }

    if (!empty($subCategories)) {
        echo json_encode([
            'status' => 'success',
            'subcategories' => $subCategories,
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'No subcategories found for this category.',
        ]);
    }

    $stmt->close();
} else {
    // Invalid request method
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.',
    ]);
}
?>
