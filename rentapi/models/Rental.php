<?php
class Rental {
    private $conn;
    private $table_name = "rentals";

    public $id;
    public $user_id;
    public $product_id;
    public $status;
    public $rental_date;
    public $return_date;
    public $payment_status; // Add payment_status property


    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET user_id=:user_id, product_id=:product_id, status=:status, rental_date=:rental_date, return_date=:return_date";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":rental_date", $this->rental_date);
        $stmt->bindParam(":return_date", $this->return_date);

        return $stmt->execute();
    }

    public function confirm() {
        $query = "UPDATE " . $this->table_name . " SET status = 'confirmed' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }

    public function decline() {
        $query = "UPDATE " . $this->table_name . " SET status = 'declined' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }

    public function cancel() {
        $query = "UPDATE " . $this->table_name . " SET status = 'cancelled' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }

    public function getUserRentals() {
        $query = "SELECT id, product_id, status, rental_date, return_date FROM " . $this->table_name . " WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();
        return $stmt;
    }

    public function getAllRentals() {
        $query = "SELECT id, user_id, product_id, status, rental_date, return_date FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Method to update rental status and payment status
    public function updateRentalStatus() {
        $query = "UPDATE " . $this->table_name . " 
                  SET status = :status, payment_status = :payment_status
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Bind the parameters
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':payment_status', $this->payment_status);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
