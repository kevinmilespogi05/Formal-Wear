<?php
// Include the necessary files
include_once '../../config/database.php';  // Move one level up to reach the config directory
include_once '../../models/User.php';  

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Initialize the User object
$user = new User($db);

// Get all users
$stmt = $user->getAllUsers();
$num = $stmt->rowCount();

// Check if there are users
if ($num > 0) {
    // Create an array to store the users
    $users_arr = array();
    $users_arr['users'] = array();

    // Fetch the users
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $user_item = array(
            'id' => $id,
            'username' => $username,
            'email' => $email,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'phone_number' => $phone_number,
            'role' => $role
        );
        array_push($users_arr['users'], $user_item);
    }

    // Return the users in JSON format
    echo json_encode($users_arr);
} else {
    // No users found
    echo json_encode(array("message" => "No users found."));
}
?>
