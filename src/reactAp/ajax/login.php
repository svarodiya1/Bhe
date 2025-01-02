<?php

include './db.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully <br>";


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");



//  yaha get krke fir jaante hi ho kaise use krna hai 


$response["success"] = true;
$response["message"] = "Backend server connected successfully";


// $response['requested data'] = $_GET;




$mobileNo=$_GET['phone'];
$password=$_GET['password'];

// $response['mobile_No']= $mobileNo;
// $response['password']= $password;


$sql = "SELECT * FROM signup where mobileNo='$mobileNo' &&  password='$password'";


$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        // User found
        $response['success'] = true;
        $response['message'] = "Successfully Logged In";
    } else {
        // User not found
        $response['success'] = false;
        $response['message'] = "Invalid User";
    }
} else {
    // Query execution failed
    $response['success'] = false;
    $response['message'] = "Database query error: " . $conn->error;
}


echo json_encode($response);



?>