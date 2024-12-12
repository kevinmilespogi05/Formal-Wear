<?php
include_once '../../config/database.php';
include_once '../../models/Rental.php';

$database = new Database();
$db = $database->getConnection();
$rental = new Rental($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_id)) {
    $rental->user_id = $data->user_id;
    $rentals = $rental->getUserRentals();

    if ($rentals) {
        echo json_encode($rentals);
    } else {
        echo json_encode(["message" => "No rentals found"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
