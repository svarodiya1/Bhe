<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: authorization, GET, POST, OPTIONS");

// Include Composer's autoload file
require './vendor/autoload.php'; // Ensure the path is correct

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include "./db.php";

$conn = $con; // Use database connection
$response = [];
$secretKey = getenv('JWT_SECRET_KEY') ?: 'algo123'; // Use environment variable for secret key
$expirationTime = time() + 3600; // Token expiration time (1 hour)

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $mobileNo = trim($_POST['phone']);
    $password = trim($_POST['password']);

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE phone = ?");
    $stmt->bind_param("s", $mobileNo);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            // User found
            $row = $result->fetch_assoc();

            // Verify the password using password_verify
            if ($password=== $row['password']) {
                // Regenerate session ID to prevent session fixation attacks
                session_regenerate_id(true);

                // Check for existing cart or create a new cart
                $cart_id = null;
                $query = "SELECT cart_id FROM shopping_cart WHERE user_id = ?";
                $cart_stmt = $conn->prepare($query);
                $cart_stmt->bind_param("i", $row['user_id']);
                $cart_stmt->execute();
                $cart_result = $cart_stmt->get_result();

                if ($cart_result->num_rows > 0) {
                    // If an active cart exists
                    $cart_row = $cart_result->fetch_assoc();
                    $cart_id = $cart_row['cart_id'];
                } else {
                    // Create a new cart for the user
                    $insert_cart = "INSERT INTO shopping_cart (user_id) VALUES (?)";
                    $insert_cart_stmt = $conn->prepare($insert_cart);
                    $insert_cart_stmt->bind_param("i", $row['user_id']);
                    if ($insert_cart_stmt->execute()) {
                        $cart_id = $insert_cart_stmt->insert_id;
                    } else {
                        $response['success'] = false;
                        $response['message'] = "Error creating cart: " . $conn->error;
                        echo json_encode($response);
                        exit();
                    }
                }

                // Create the JWT payload
                $payload = [
                    'iss' => 'your_issuer', // Issuer
                    'iat' => time(), // Issued at
                    'exp' => $expirationTime, // Expiration time
                    'user_id' => $row['user_id'], // User ID
                    'username' => $row['username'], // Username
                    'email' => $row['email'], // Email
                    'cart_id' => $cart_id, // Cart ID
                ];

                // Generate JWT token
                $jwt = JWT::encode($payload, $secretKey, 'HS256');

                // Store session data
                $_SESSION['user_id'] = $row['user_id'];
                $_SESSION['username'] = $row['username'];
                $_SESSION['email'] = $row['email'];

                // Success response
                $response['success'] = true;
                $response['message'] = "Successfully Logged In";
                $response['token'] = $jwt; // Include token in response
                $response['cart_id'] = $cart_id; // Include token in response
                $response['session'] = $_SESSION;
            } else {
                // Invalid password
                $response['success'] = false;
                $response['message'] = "Invalid Password";
            }
        } else {
            // User not found
            $response['success'] = false;
            $response['message'] = "User not found";
        }
    } else {
        // Query execution failed
        $response['success'] = false;
        $response['message'] = "Database query error: " . $conn->error;
    }

    $stmt->close();
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request method";
}

echo json_encode($response);
?>