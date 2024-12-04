    <?php
    session_start();
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: authorization, GET,POST, OPTIONS");

    // Include Composer's autoload file
    require './vendor/autoload.php'; // Update the path accordingly

    use Firebase\JWT\JWT;
    use Firebase\JWT\ExpiredException;

    include "./db.php";
    
    $conn = $con;
    $response = [];
    $secretKey = 'algo123'; // Consider storing this in an environment variable
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

                // Use password_verify to check the password if it’s hashed
                // if (password_verify($password, $row['password'])) {
                if ($password === $row['password']) { // For now, using plain text (not recommended)
                    // Regenerate session ID to prevent session fixation attacks
                    session_regenerate_id(true);

                    // Create a token payload
                    $payload = [
                        'iss' => 'your_issuer', // Issuer
                        'iat' => time(), // Issued at
                        'exp' => $expirationTime, // Expiration time
                        'user_id' => $row['user_id'], // User ID
                        'username' => $row['username'], // Username
                        'email' => $row['email'], // Username
                    ];

                    // Generate JWT token
                    $jwt = JWT::encode($payload, $secretKey,"HS256");

                    $_SESSION['user_id'] = $row['user_id']; // Storing user ID in session
                    $_SESSION['username'] = $row['username'];
                    $_SESSION['email'] = $row['email'];

                    $response['success'] = true;
                    $response['message'] = "Successfully Logged In";
                    $response['token'] = $jwt; // Include token in the response 
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
