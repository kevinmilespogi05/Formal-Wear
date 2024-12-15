<?php
// getRentedProducts.php
include_once '../../config/database.php';
include_once '../../models/Rental.php';
include_once '../../models/Product.php'; // Assuming you have a Product model

$database = new Database();
$db = $database->getConnection();
$rental = new Rental($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id)) {
    $rental->user_id = $data->user_id; // Use user_id from request to fetch only their rentals
    $rentals = $rental->getUserRentals();

    $rentedProducts = [];
    while ($row = $rentals->fetch(PDO::FETCH_ASSOC)) {
        // Fetch product details for each rental
        $productQuery = "SELECT name, price, description FROM products WHERE id = :product_id";
        $stmt = $db->prepare($productQuery);
        $stmt->bindParam(":product_id", $row['product_id']);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        $row['product'] = $product; // Attach product details to the rental
        $rentedProducts[] = $row;
    }

    echo json_encode($rentedProducts);
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
