<?php

include "./db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, OPTIONS, GET"); // Include GET if you're making a GET request
header("Access-Control-Allow-Headers: Authorization, Content-Type");



if ($_SERVER['REQUEST_METHOD'] == 'GET') {



    $query = "SELECT a.*,b.category_name as main_category_name FROM ecommerce_model.categories a join  ecommerce_model.main_category b ON a.main_cat_id =b.id;;";

    $result = $con->query($query);


    $data = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
            $response["success"] = true;
        }
    } else {
        $response["success"] = false;
        $response["message"] = "Product not found";
    }



    $response['data'] = $data;
    echo json_encode($response);
}
