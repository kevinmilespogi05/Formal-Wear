<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Include database and product model
include_once '../../config/database.php';
include_once '../../models/Product.php';

// Set the content type to JSON
header('Content-Type: application/json');

// Create a new database connection
$database = new Database();
$db = $database->getConnection();
$product = new Product($db);

// Check if all required fields are present
if (isset($_POST['product_name'], $_POST['product_price'], $_POST['product_description'], $_POST['availability'], $_FILES['image'])) {
    $product->name = $_POST['product_name'];
    $product->price = $_POST['product_price'];
    $product->description = $_POST['product_description'];
    $product->availability = $_POST['availability']; // Set availability from POST data

    // Handle the image upload
    $image = $_FILES['image'];
    $image_name = time() . "_" . basename($image['name']);
    $image_target = "../../uploads/" . $image_name;

    // Try to move the uploaded image and log errors if any
    if (move_uploaded_file($image['tmp_name'], $image_target)) {
        $product->image = $image_target;

        // Insert the product into the database
        if ($product->create()) {
            echo json_encode(["message" => "Product added successfully."]);
        } else {
            echo json_encode(["message" => "Failed to add product to database."]);
        }
    } else {
        echo json_encode(["message" => "Failed to upload image."]);
    }
} else {
    echo json_encode(["message" => "Missing required product data."]);
}
?>
