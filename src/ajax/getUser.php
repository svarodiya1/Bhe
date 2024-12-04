<?php
session_start();
include './db.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

require './vendor/autoload.php'; // Include Composer's autoload file

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;


// Your secret key (store securely)
$secretKey = 'algo123'; // Change this to your secret key
$hash = "HS256";




try {

    $jwt = $_GET['token'];



    $decodedToken = JWT::decode($jwt, new key('algo123', 'HS256'));

    $response['success'] =  true;

    $user = $decodedToken;
    $response["user"] = $decodedToken;

    $user_id = $decodedToken->user_id;


    $sql = "select * from users where user_id = $user_id";


    $result = mysqli_query($con, $sql);

    $row = mysqli_fetch_assoc($result);



    $response['ver_user'] = $row;    




    
} catch (ExpiredException $e) {

    $response =  ["success" => false, "message" => "Token expired"];
    // exit();
} catch (Exception $e) {

    $response =  [
        "success" => false,
        "message" => "Invalid token",

    ];
    // exit();
}

















// echo "KFEIO";



// Call the authenticate function when the script runs

echo json_encode($response);

// Further processing can be done with $decodedToken
