<?php
include_once '../../config/database.php';
include_once '../../models/Product.php';

$database = new Database();
$db = $database->getConnection();
$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->name) && !empty($data->price) && !empty($data->description)) {
    $product->id = $data->id;
    $product->name = $data->name;
    $product->price = $data->price;
    $product->description = $data->description;
    
    if ($product->update()) {
        echo json_encode(["message" => "Product updated successfully"]);
    } else {
        echo json_encode(["message" => "Unable to update product"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
