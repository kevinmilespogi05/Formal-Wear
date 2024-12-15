<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");

include_once '../../config/database.php';
include_once '../../models/User.php';
include_once '../../models/Product.php';
include_once '../../models/Rental.php';

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Initialize models
$userModel = new User($db);
$productModel = new Product($db);
$rentalModel = new Rental($db);

// Get counts
try {
    // Count users
    $userQuery = "SELECT COUNT(*) as user_count FROM users";
    $userStmt = $db->prepare($userQuery);
    $userStmt->execute();
    $userCount = $userStmt->fetch(PDO::FETCH_ASSOC)['user_count'];

    // Count rentals
    $rentalQuery = "SELECT COUNT(*) as rental_count FROM rentals";
    $rentalStmt = $db->prepare($rentalQuery);
    $rentalStmt->execute();
    $rentalCount = $rentalStmt->fetch(PDO::FETCH_ASSOC)['rental_count'];

    // Count products
    $productQuery = "SELECT COUNT(*) as product_count FROM products";
    $productStmt = $db->prepare($productQuery);
    $productStmt->execute();
    $productCount = $productStmt->fetch(PDO::FETCH_ASSOC)['product_count'];

    // Prepare response
    $response = [
        "users" => $userCount,
        "rentals" => $rentalCount,
        "products" => $productCount
    ];

    // Send response
    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode(["error" => "An error occurred: " . $e->getMessage()]);
}
?>
