<?php
error_reporting(E_ALL);  // Report all errors
ini_set('display_errors', 1);  // Display errors

include_once '../../config/database.php';
include_once '../../models/Rental.php';

$database = new Database();
$db = $database->getConnection();
$rental = new Rental($db);

// Modify the query to join the users table and get the username
$query = "
    SELECT rentals.id, rentals.user_id, rentals.product_id, rentals.status, rentals.rental_date, rentals.return_date, users.username
    FROM rentals
    JOIN users ON rentals.user_id = users.id
    WHERE rentals.status = 'pending'";

try {
    $stmt = $db->prepare($query);
    $stmt->execute();

    $rentals_arr = array();
    
    // Fetch each row and handle username
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $rental_item = array(
            'id' => $row['id'],
            'user_id' => $row['user_id'],
            'product_id' => $row['product_id'],
            'status' => $row['status'],
            'rental_date' => $row['rental_date'],
            'return_date' => $row['return_date'],
            'username' => $row['username'] // Directly using $row['username']
        );
        array_push($rentals_arr, $rental_item);
    }

    if (count($rentals_arr) > 0) {
        echo json_encode(["rentals" => $rentals_arr]); // Send JSON response
    } else {
        echo json_encode(["message" => "No rentals found"]);
    }

} catch (Exception $e) {
    // Handle any errors by sending an error message in JSON format
    echo json_encode(["error" => "An error occurred: " . $e->getMessage()]);
}
?>
