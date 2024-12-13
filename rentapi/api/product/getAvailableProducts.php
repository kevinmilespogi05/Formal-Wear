<?php
// Include database connection and product model
include_once '../../config/database.php';
include_once '../../models/Product.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Initialize Product object
$product = new Product($db);

// Fetch all available products
$stmt = $product->getAvailableProducts();
$num = $stmt->rowCount();

if ($num > 0) {
    $products_arr = array();
    $products_arr['products'] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $product_item = array(
            'id' => $id,
            'name' => $name,
            'description' => $description,
            'price' => $price,
            'image_path' => $image_path
        );
        array_push($products_arr['products'], $product_item);
    }

    echo json_encode($products_arr);
} else {
    echo json_encode(array("message" => "No products found."));
}
?>
