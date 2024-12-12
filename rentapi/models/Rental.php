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

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create Rental
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET user_id=:user_id, product_id=:product_id, status=:status, rental_date=:rental_date, return_date=:return_date";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":rental_date", $this->rental_date);
        $stmt->bindParam(":return_date", $this->return_date);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Confirm Rental
    public function confirm() {
        $query = "UPDATE " . $this->table_name . " SET status = 'confirmed' WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Decline Rental
    public function decline() {
        $query = "UPDATE " . $this->table_name . " SET status = 'declined' WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Cancel Rental
    public function cancel() {
        $query = "UPDATE " . $this->table_name . " SET status = 'cancelled' WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Get All Rentals for a User
    public function getUserRentals() {
        $query = "SELECT id, product_id, status, rental_date, return_date FROM " . $this->table_name . " WHERE user_id = :user_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();

        return $stmt;
    }

    // Get All Rentals
    public function getAllRentals() {
        $query = "SELECT id, user_id, product_id, status, rental_date, return_date FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>
