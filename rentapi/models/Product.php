<?php
class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $price;
    public $description;
    public $image;
    public $availability;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Method to create a product
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (name, price, description, image, availability) 
                  VALUES (:name, :price, :description, :image, :availability)";
        
        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':availability', $this->availability);  // Bind availability

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Update Product
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET name = :name, price = :price, description = :description, image = :image, availability = :availability WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":availability", $this->availability);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete Product
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Get All Products
    public function getAll() {
        $query = "SELECT id, name, price, description, image, availability FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Get Available Products (New method)
    public function getAvailableProducts() {
        $query = "SELECT id, name, price, description, image FROM " . $this->table_name . " WHERE availability = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Get Product by ID
    public function getById() {
        $query = "SELECT id, name, price, description, image, availability FROM " . $this->table_name . " WHERE id = :id LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        return $stmt;
    }
}
?>
