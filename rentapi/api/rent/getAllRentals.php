<?php
include_once '../../config/database.php';
include_once '../../models/Rental.php';

$database = new Database();
$db = $database->getConnection();
$rental = new Rental($db);

$rentals = $rental->getAllRentals();

if ($rentals) {
    $rentals_arr = array();
    while ($row = $rentals->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $rental_item = array(
            'id' => $id,
            'user_id' => $user_id,
            'product_id' => $product_id,
            'status' => $status,
            'rental_date' => $rental_date,
            'return_date' => $return_date
        );
        array_push($rentals_arr, $rental_item);
    }
    echo json_encode(["rentals" => $rentals_arr]);
} else {
    echo json_encode(["message" => "No rentals found"]);
}
?>
