<?php
require_once '../../config/database.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();

// Example function to list all products
$query = "SELECT * FROM products";
$stmt = $db->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
} else {
    echo json_encode(["message" => "No products found."]);
}
?>
