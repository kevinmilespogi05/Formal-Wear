<?php
include_once '../../config/database.php';
include_once '../../models/Product.php';

$database = new Database();
$db = $database->getConnection();
$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $product->id = $data->id;
    if ($product->delete()) {
        echo json_encode(["message" => "Product deleted successfully"]);
    } else {
        echo json_encode(["message" => "Unable to delete product"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
