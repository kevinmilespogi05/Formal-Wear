<?php
// Include the necessary files
include_once '../../config/database.php';  // Adjust the path as necessary
include_once '../../models/User.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Initialize the User object
$user = new User($db);

// Get the user ID from the request
$data = json_decode(file_get_contents("php://input"));
$user_id = $data->id;

// Fetch user by ID
$stmt = $user->getUserById($user_id);
$num = $stmt->rowCount();

// Check if user found
if ($num > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);
    $user_item = array(
        'id' => $id,
        'username' => $username,
        'first_name' => $first_name,
        'last_name' => $last_name
    );
    echo json_encode($user_item);
} else {
    echo json_encode(array("message" => "User not found"));
}
?>