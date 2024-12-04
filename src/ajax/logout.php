<?php
session_start();
session_destroy(); // Destroy all session data

$response['success'] = true;
$response['message'] = "Successfully logged out";

echo json_encode($response);
?>
