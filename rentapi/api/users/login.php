<?php
// rentapi/api/users/login.php

require_once '../../config/database.php';
require_once '../../models/User.php';

header("Content-Type: application/json");

// Initialize database connection
$database = new Database();
$db = $database->getConnection();

$user = new User($db);

// Get input data (JSON request body)
$data = json_decode(file_get_contents("php://input"));

// Check if username and password are provided
if (isset($data->username) && isset($data->password)) {
    $user->username = $data->username;
    $user->password = $data->password;

    // Get the user by username
    $stmt = $user->readByUsername();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $password_hash = $row['password'];

        // Verify password
        if (password_verify($user->password, $password_hash)) {
            // User is authenticated, send user details including their role
            echo json_encode([
                "message" => "Login successful.",
                "user_id" => $row['id'],
                "role" => $row['role']
            ]);
        } else {
            echo json_encode(["message" => "Invalid password."]);
        }
    } else {
        echo json_encode(["message" => "User not found."]);
    }
} else {
    echo json_encode(["message" => "Please provide username and password."]);
}
?>