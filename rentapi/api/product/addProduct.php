<?php
include_once '../../config/database.php';
include_once '../../models/Product.php';

$database = new Database();
$db = $database->getConnection();
$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->price) && !empty($data->description) && !empty($data->image)) {
    $product->name = $data->name;
    $product->price = $data->price;
    $product->description = $data->description;
    $product->image = $data->image;

    if ($product->create()) {
        echo json_encode(["message" => "Product added successfully"]);
    } else {
        echo json_encode(["message" => "Unable to add product"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
