<?php
require_once '../../config/database.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (isset($data->product_name) && isset($data->product_price) && isset($data->product_description) && isset($data->image)) {
    $product_name = $data->product_name;
    $product_price = $data->product_price;
    $product_description = $data->product_description;
    $image = $data->image;

    // Create a unique name for the image to avoid conflict
    $image_name = time() . "_" . basename($image['name']);
    $image_target = "../../uploads/" . $image_name;

    // Move the uploaded image to the desired directory
    if (move_uploaded_file($image['tmp_name'], $image_target)) {
        // Insert product details into database
        $query = "INSERT INTO products (name, price, description, image, availability) 
                  VALUES (:product_name, :product_price, :product_description, :image_path, 1)";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':product_name', $product_name);
        $stmt->bindParam(':product_price', $product_price);
        $stmt->bindParam(':product_description', $product_description);
        $stmt->bindParam(':image_path', $image_target);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Product added successfully."]);
        } else {
            echo json_encode(["message" => "Failed to add product."]);
        }
    } else {
        echo json_encode(["message" => "Failed to upload image."]);
    }
} else {
    echo json_encode(["message" => "Missing required product data."]);
}
?>
