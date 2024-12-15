<?php
require_once '../../config/database.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

// Update the column names in the query to match your table
$query = "SELECT id, name, price, description, image FROM products";
$stmt = $db->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $products_arr = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $product_item = [
            'id' => $row['id'],
            'product_name' => $row['name'],
            'product_price' => $row['price'],
            'product_description' => $row['description'],
            'image_path' => $row['image']
        ];
        $products_arr[] = $product_item;
    }
    echo json_encode($products_arr);
} else {
    echo json_encode(["message" => "No products found."]);
}
?>
