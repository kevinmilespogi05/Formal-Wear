<?php
// rentapi/api/users/update_profile.php

// Include database and User model
require_once '../../config/database.php';
require_once '../../models/User.php';

header("Content-Type: application/json");

// Initialize database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate the User object
$user = new User($db);

// Get the input data (JSON request body)
$data = json_decode(file_get_contents("php://input"));

// Check if the required fields are provided
if (
    !empty($data->user_id) &&
    !empty($data->username) &&
    !empty($data->email) &&
    !empty($data->first_name) &&
    !empty($data->last_name) &&
    !empty($data->phone_number)
) {
    $user->id = $data->user_id;
    $user->username = $data->username;
    $user->email = $data->email;
    $user->first_name = $data->first_name;
    $user->last_name = $data->last_name;
    $user->phone_number = $data->phone_number;

    // Try to update the user's profile
    if ($user->updateProfile()) {
        echo json_encode(array("message" => "User profile updated successfully."));
    } else {
        echo json_encode(array("message" => "User profile update failed."));
    }
} else {
    echo json_encode(array("message" => "Please fill in all required fields."));
}
?>
