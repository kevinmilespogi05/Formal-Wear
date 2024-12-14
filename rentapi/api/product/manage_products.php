<?php
require_once '../../config/database.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

// Query to fetch only available products (where availability = 1)
$query = "SELECT id, name, price, description, image FROM products WHERE availability = 1";
$stmt = $db->prepare($query);
$stmt->execute();

// Check if any products are found
if ($stmt->rowCount() > 0) {
    $products_arr = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $product_item = [
            'id' => $row['id'],
            'product_name' => $row['name'],
            'product_price' => $row['price'],
            'product_description' => $row['description'],
            'image_path' => 'http://localhost/Formal-Wear/rentapi/uploads/' . $row['image'] // Updated image path
        ];
        $products_arr[] = $product_item;
    }
    echo json_encode($products_arr); // Return the product array as JSON
} else {
    echo json_encode(["message" => "No products found."]); // If no products found
}
?>
