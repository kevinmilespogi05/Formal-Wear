<?php
include_once '../../config/database.php';
include_once '../../models/Rental.php';

$database = new Database();
$db = $database->getConnection();
$rental = new Rental($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->rental_id)) {
    $rental->id = $data->rental_id;
    if ($rental->confirm()) {
        echo json_encode(["message" => "Rental confirmed"]);
    } else {
        echo json_encode(["message" => "Unable to confirm rental"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
