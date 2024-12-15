<?php
// processPayment.php
include_once '../../config/database.php';
include_once '../../models/Rental.php';

// Database connection
$database = new Database();
$db = $database->getConnection();

// Retrieve rental and payment data from POST request
$data = json_decode(file_get_contents("php://input"));

// Check if data is valid
if (isset($data->rental_id) && isset($data->payment_method)) {
    $rental_id = $data->rental_id;
    $payment_method = $data->payment_method; // e.g., "credit_card", "paypal", etc.

    // Simulate payment processing (this is where you'd integrate a real payment gateway)
    $payment_success = processPayment($payment_method);

    if ($payment_success) {
        // Update the rental status to 'confirmed' and payment status to 'completed'
        $rental = new Rental($db);
        $rental->id = $rental_id;
        $rental->payment_status = 'completed';
        $rental->status = 'confirmed'; // Update rental status

        // Update the rental in the database
        if ($rental->updateRentalStatus()) {
            echo json_encode(["message" => "Payment successful and rental confirmed."]);
        } else {
            echo json_encode(["message" => "Failed to update rental status."]);
        }
    } else {
        echo json_encode(["message" => "Payment failed. Please try again."]);
    }
} else {
    echo json_encode(["message" => "Invalid data provided."]);
}

// Simulate payment processing (for demonstration purposes)
function processPayment($payment_method) {
    // In a real application, this is where you would call a payment gateway API (like Stripe or PayPal)
    // For now, we'll simulate a successful payment
    if ($payment_method == "credit_card" || $payment_method == "paypal") {
        return true; // Simulate success
    }
    return false; // Simulate failure for unsupported payment methods
}
?>
