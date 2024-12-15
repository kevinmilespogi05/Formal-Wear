<?php
// rentapi/api/users/get_profile.php

// Include database and User model
require_once '../../config/database.php';
require_once '../../models/User.php';

header("Content-Type: application/json");

// Initialize database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate the User object
$user = new User($db);

// Get the user ID from the query parameters
$data = json_decode(file_get_contents("php://input"));

if (isset($data->user_id)) {
    $user->id = $data->user_id; // Set the user ID

    // Fetch user profile from the database
    $stmt = $user->getProfile();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Respond with user profile
        echo json_encode(array(
            "id" => $row['id'],
            "username" => $row['username'],
            "email" => $row['email'],
            "first_name" => $row['first_name'],
            "last_name" => $row['last_name'],
            "phone_number" => $row['phone_number'],
            "role" => $row['role']
        ));
    } else {
        echo json_encode(array("message" => "User not found."));
    }
} else {
    echo json_encode(array("message" => "User ID is required."));
}
?>