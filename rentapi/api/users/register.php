<?php
// rentapi/api/users/register.php

// Include database and User model
require_once '../../config/database.php';
require_once '../../models/User.php';

// Initialize database connection
$database = new Database();
$db = $database->getConnection();

// Get the input data (JSON request body)
$data = json_decode(file_get_contents("php://input"));

// Check if required fields are provided
if (
    !empty($data->username) &&
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->first_name) &&
    !empty($data->last_name) &&
    !empty($data->phone_number)
) {
    // Create a new User model
    $user = new User($db);

    // Set user properties for checking
    $user->username = $data->username;
    $user->email = $data->email;

    // Check if the username already exists
    if ($user->usernameExists()) {
        echo json_encode(array("message" => "Username already exists."));
        exit;
    }

    // Check if the email already exists
    if ($user->emailExists()) {
        echo json_encode(array("message" => "Email already exists."));
        exit;
    }

    // Set user properties
    $user->username = $data->username;
    $user->email = $data->email;
    $user->password = password_hash($data->password, PASSWORD_BCRYPT); // Hash the password
    $user->first_name = $data->first_name;
    $user->last_name = $data->last_name;
    $user->phone_number = $data->phone_number;
    $user->role = 'user'; // Default role to 'user'

    // Try to register the user
    if ($user->register()) {
        echo json_encode(array("message" => "User registered successfully."));
    } else {
        echo json_encode(array("message" => "User registration failed."));
    }
} else {
    echo json_encode(array("message" => "Please fill in all required fields."));
}
?>
