<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET,POST, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET"); // Include GET if you're making a GET request
header("Access-Control-Allow-Headers: Authorization, Content-Type");

include("./db.php");

require './vendor/autoload.php'; // Include Composer's autoload file

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;


// Your secret key (store securely)
$secretKey = 'algo123'; // Change this to your secret key
$hash = "HS256";



function authenticateJWT()
{
    global $secretKey;
    global $con;
    

    // Get the Authorization header
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        $jwt = str_replace('Bearer ', '', $authHeader);

        // $jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ5b3VyX2lzc3VlciIsImlhdCI6MTcyODEzMjQ1NSwiZXhwIjoxNzI4MTM2MDU1LCJ1c2VyX2lkIjozOSwidXNlcm5hbWUiOiJtYW5pc2g3OSIsImVtYWlsIjoibWFuaXNoQGdtYWlsLmNvbSJ9.AZxCPN33A7YOVnSZTduoGL5sPCWRMNL3yAwnJW7adPY";




        if ($jwt) {
            try {
                // Decode the JWT
                // $decoded = JWT::decode($jwt, $secretKey,$hash);
                $decoded = JWT::decode($jwt, new key('algo123', 'HS256'));

                // echo json_encode($decoded);        
                // echo json_encode(["success" => false, "data" => $decoded]);

                     


                return (array) $decoded; // Return the decoded payload


            } catch (ExpiredException $e) {
                // http_response_code(401);
                echo json_encode(["success" => false, "message" => "Token expired"]);
                exit();
            } catch (Exception $e) {
                // http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "message" => "Invalid token",
                    "jwt" => $jwt
                ]);
                exit();
            }
        }
    }

    // If the token was not present or invalid
    // http_response_code(401);
    echo json_encode(["success" => false, "message" => "Authorization header not found or invalid"]);
    exit();
}

// Call the authenticate function when the script runs
$decodedToken = authenticateJWT();




echo json_encode(["success" => true, "message" => $decodedToken]);

// Further processing can be done with $decodedToken
