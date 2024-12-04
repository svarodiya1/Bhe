<?php



$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "ecommerce";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully <br>";



header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$response["success"] = true;
$response["message"] = "Backend server connected successfully";

// $response['requested data'] = $_GET;



$firstname=$_GET['firstname'];
$lastname=$_GET['lastname'];
$email=$_GET['email'];
$mobileNo=$_GET['phone'];
$password=$_GET['password'];
$confirm_password=$_GET['confirm_passowrd'];



// $response['firstname']= $firstname;
// $response['lastname']= $lastname;
// $response['email']= $email;
// $response['mobile_No']= $mobileNo;
// $response['password']= $password;
// $response['confirmPassowrd']= $confirm_password;



$sql = "INSERT INTO signup (firstname, lastname, email, mobileNo, password, confirm_password) 
VALUES ('$firstname', '$lastname', '$email', '$mobileNo', '$password', '$confirm_password')";


if ($conn->query($sql) === TRUE) {
    $response['success']=true;
    $response['message']="Form Submited Success Fully";
} else {
    $response['success']=false;
    $response['message']="Form Not Submited";
}


echo json_encode($response);

?>