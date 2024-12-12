<?php
require_once '../../config/database.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, product_name, product_price, product_description, image_path FROM products";
$stmt = $db->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $products_arr = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $product_item = [
            'id' => $row['id'],
            'product_name' => $row['product_name'],
            'product_price' => $row['product_price'],
            'product_description' => $row['product_description'],
            'image_path' => $row['image_path']
        ];
        $products_arr[] = $product_item;
    }
    echo json_encode($products_arr);
} else {
    echo json_encode(["message" => "No products found."]);
}
?>
