<?php
// rentapi/models/User.php

class User
{
    private $conn;
    private $table_name = "users";

    public $id;
    public $username;
    public $email;
    public $password;
    public $first_name;
    public $last_name;
    public $phone_number;
    public $role;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Register a new user
    public function register()
    {
        $query = "INSERT INTO " . $this->table_name . " SET
                    username = :username, email = :email, password = :password, 
                    first_name = :first_name, last_name = :last_name, phone_number = :phone_number, 
                    role = :role";

        $stmt = $this->conn->prepare($query);

        // Bind the input values
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":phone_number", $this->phone_number);
        $stmt->bindParam(":role", $this->role); // Default role

        return $stmt->execute();
    }

    // Check if username exists
    public function usernameExists()
    {
        $query = "SELECT id FROM " . $this->table_name . " WHERE username = :username LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->execute();

        // If a user with the given username exists, return true
        if ($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    // Check if email exists
    public function emailExists()
    {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();

        // If a user with the given email exists, return true
        if ($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    // Read user by username for login
    public function readByUsername()
    {
        $query = "SELECT id, username, password, role FROM " . $this->table_name . " WHERE username = :username LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->execute();
        return $stmt;
    }

    // Get user profile by ID
    public function getProfile()
    {
        $query = "SELECT id, username, email, first_name, last_name, phone_number, role
                  FROM " . $this->table_name . " WHERE id = :id LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();
        return $stmt;
    }

    // Update user profile
    public function updateProfile()
    {
        $query = "UPDATE " . $this->table_name . " SET 
                    username = :username, email = :email, 
                    first_name = :first_name, last_name = :last_name, 
                    phone_number = :phone_number 
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Bind the new values
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":phone_number", $this->phone_number);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    // Add this method to the User class
public function getAllUsers()
{
    $query = "SELECT id, username, email, first_name, last_name, phone_number, role FROM " . $this->table_name;
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}
// User.php (in models directory)

public function getUserById($user_id) {
    $query = "SELECT id, username, first_name, last_name FROM users WHERE id = :id LIMIT 1";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $user_id);
    $stmt->execute();
    return $stmt;
}

}
?>