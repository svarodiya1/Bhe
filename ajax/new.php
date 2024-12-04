<?php
// Include Composer's autoload file
require './vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;

// Your secret key (make sure to keep this secret!)
$secretKey = 'your_secret_key'; // Change this to your actual secret key
$expirationTime = time() + 3600; // Token expiration time (1 hour)

// Token Generation
function generateToken($userId, $username) {
    global $secretKey, $expirationTime;

    // Create the token payload
    $payload = [
        'iss' => 'your_issuer', // Issuer of the token
        'iat' => time(),         // Issued at (timestamp)
        'exp' => $expirationTime, // Expiration time (timestamp)
        'user_id' => $userId,    // User ID (or any unique identifier)
        'username' => $username,  // Username (or any other claims you want to include)
    ];

    // Generate the JWT token
    return JWT::encode($payload, $secretKey, 'HS256');
}

// Token Verification
function verifyToken($jwt) {
    global $secretKey;
    
    try {
        // Decode the JWT
        // $decoded = JWT::decode($jwt, $secretKey, ['HS256']); // Pass the algorithms as an array

        $decoded = JWT::decode($jwt, new key ($secretKey, 'HS256'));
        // Token is valid, access the claims
        return [
            'success' => true,
            'data' => (array) $decoded // Convert the decoded payload to an array for easier access
        ];
    } catch (ExpiredException $e) {
        // Token has expired
        return ['success' => false, 'message' => 'Token expired'];
    } catch (Exception $e) {
        // Token is invalid
        return ['success' => false, 'message' => 'Invalid token'];
    }
}

// Example usage
// Generate a token for a user (this should be done upon successful login)
$userId = 123; // Example user ID
$username = 'example_user'; // Example username
$token = generateToken($userId, $username);

// Output the generated token
echo json_encode(['token' => $token]);

// Verification part
// Assume you received the token via Authorization header or other means
// For example, from a query parameter or directly hardcoded here for testing
$jwt = $token; // In real use case, retrieve this from the request

// Verify the token
$verificationResult = verifyToken($jwt);

// Output the verification result
echo json_encode($verificationResult);
?>
