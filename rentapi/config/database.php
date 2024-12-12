<?php
// config/database.php

class Database {
    private $host = 'localhost';
    private $db_name = 'rental_db'; // Ensure this matches your database name
    private $username = 'root'; // Default XAMPP MySQL username
    private $password = ''; // Default XAMPP MySQL password (empty by default)
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->db_name", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
