<?php
// Include database connection and rental model
include_once '../../config/database.php';
include_once '../../models/Rental.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Initialize Rental object
$rental = new Rental($db);

// Get rental data from POST
$data = json_decode(file_get_contents("php://input"));

$rental->user_id = $data->user_id;
$rental->product_id = $data->product_id;
$rental->status = $data->status;
$rental->rental_date = $data->rental_date;
$rental->return_date = $data->return_date;

// Create rental
if ($rental->create()) {
    echo json_encode(array("message" => "Rental created successfully."));
} else {
    echo json_encode(array("message" => "Failed to create rental."));
}
?>
