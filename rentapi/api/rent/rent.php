<?php
require_once '../../config/database.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (isset($data->user_id)) {
    $user_id = $data->user_id;

    // Get user role from the database
    $query = "SELECT role FROM users WHERE id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $role = $row['role'];

        // Check if the user is an admin or a regular user
        if ($role == 'admin') {
            // Admin access: Show all rented products
            echo json_encode(["message" => "Admin access granted."]);
        } else {
            // Regular user access: Show only user-specific rented products
            echo json_encode(["message" => "User access granted."]);
        }
    } else {
        echo json_encode(["message" => "User not found."]);
    }
}
?>
