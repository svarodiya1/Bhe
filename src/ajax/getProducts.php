<?php

include "./db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, OPTIONS, GET"); // Include GET if you're making a GET request
header("Access-Control-Allow-Headers: Authorization, Content-Type");



if ($_SERVER['REQUEST_METHOD'] == 'GET') {





    if (isset($_GET['mainCatId'])) {

        $mainCatId = $_GET['mainCatId'];



        $query = "SELECT distinct a.* , b.category_name
         FROM products a 
         JOIN categories b ON a.category_id = b.parent_id  
         JOIN main_category c ON b.parent_id = c.id
         WHERE c.id =$mainCatId
        order by product_id desc;";
    } elseif(isset($_GET['product'])){

        
        $product = $_GET['product'];

        $query = "SELECT distinct a.*, d.price, d.size, b.category_name FROM products a 
            join categories b on a.category_id = b.parent_id  
            join main_category c on b.parent_id = c.id
            join product_price d on a.product_id = d.product_id
        where a.product_id= $product
        order by product_id desc;";

    }
    
    
    
    else {

        $query = "SELECT distinct* FROM products a 
            join categories b on a.category_id = b.category_id  

            join main_category c on b.category_id = c.id

            order by product_id desc;";
    }




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



    $response['products'] = $data;
    echo json_encode($response);
}