<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Include the database connection
include "./db.php";

// Initialize the response array
$response = ["success" => false, "message" => ""];

// Check for valid POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize input data
    $firstname = mysqli_real_escape_string($con, $_POST['firstname'] ?? '');
    $username = mysqli_real_escape_string($con, $_POST['username'] ?? '');
    $lastname = mysqli_real_escape_string($con, $_POST['lastname'] ?? '');
    $email = mysqli_real_escape_string($con, $_POST['email'] ?? '');
    $phone = mysqli_real_escape_string($con, $_POST['phone'] ?? '');
    $password = mysqli_real_escape_string($con, $_POST['password'] ?? '');
    $confirm_password = mysqli_real_escape_string($con, $_POST['confirm_password'] ?? '');

    // Validate the data
    if (empty($firstname) || empty($username) || empty($lastname) || empty($email) || empty($phone) || empty($password) || empty($confirm_password)) {
        $response['message'] = "Please fill all the required fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "Invalid email format.";
    } elseif ($password !== $confirm_password) {
        $response['message'] = "Passwords do not match.";
    } else {
        // Prepare SQL query to insert the user
        $stmt = $con->prepare("INSERT INTO users (username,firstname, lastname, email, phone, password) VALUES (?,?, ?, ?, ?, ?)");
        
        // For now, passwords are not hashed, but this can be added later
        $stmt->bind_param("ssssis",$username , $firstname, $lastname, $email, $phone, $password);

        // Execute the query
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "User registered successfully.";
        } else {
            $response['message'] = "Error: " . $con->error;
        }
        
        // Close the statement
        $stmt->close();
    }
} else {
    $response['message'] = "Invalid request method.";
}

// Output the JSON response
echo json_encode($response);

// Close the database connection
$con->close();

?>
