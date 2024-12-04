<?php
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");



// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    $response['success'] = false;
    $response['message'] = "User not authenticated";
} else {
    $response['success'] = true;
    $response['message'] = "User authenticated";
    $response['user'] = [
        "user_id" => $_SESSION['user_id'],
        "username" => $_SESSION['username'],
        "email" => $_SESSION['email']
    ];
}

echo json_encode($response);
