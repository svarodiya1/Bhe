<?php

include "./db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, OPTIONS, GET"); // Include GET if you're making a GET request
header("Access-Control-Allow-Headers: Authorization, Content-Type");



if ($_SERVER['REQUEST_METHOD'] == 'GET') {





    if(isset($_GET['mainCatId'])){

        $mainCatId = $_GET['mainCatId'];



        $query = "SELECT * FROM ecommerce_model.products a 
join ecommerce_model.categories b on a.category_id = b.category_id  

 join ecommerce_model.main_category c on b.main_cat_id = c.id
 
 where c.id=$mainCatId
order by product_id desc;";

    }else{

    $query = "SELECT * FROM ecommerce_model.products a 
join ecommerce_model.categories b on a.category_id = b.category_id  

 join ecommerce_model.main_category c on b.main_cat_id = c.id

order by product_id desc;;";
        
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
