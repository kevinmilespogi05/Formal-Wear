<?php
include_once '../../config/database.php';
include_once '../../models/Rental.php';

$database = new Database();
$db = $database->getConnection();
$rental = new Rental($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->rental_id)) {
    $rental->id = $data->rental_id;
    if ($rental->cancel()) {
        echo json_encode(["message" => "Rental cancelled"]);
    } else {
        echo json_encode(["message" => "Unable to cancel rental"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
