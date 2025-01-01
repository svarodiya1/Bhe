<?php
header('Access-Control-Allow-Origin: *');  // Or your specific domain
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');


// Start the session to access session data
session_start();


    $cart_id = $_SESSION['cart_id'] ? $_SESSION['cart_id'] : 'Kamal';
    echo "The cart ID is: " . $cart_id;


?>
