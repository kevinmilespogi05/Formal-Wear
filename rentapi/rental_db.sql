-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2024 at 03:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Database: `rental_db`

-- --------------------------------------------------------

-- Table structure for table `products`
CREATE TABLE `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,  -- Set as auto-increment
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `availability` TINYINT(1) DEFAULT 1,
  PRIMARY KEY (`id`)  -- Define primary key on id
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `users`
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,  -- Set as auto-increment
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'user',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`)  -- Define primary key on id
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `rentals`
CREATE TABLE `rentals` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,  -- Set as auto-increment
  `user_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `status` ENUM('pending', 'confirmed', 'declined', 'cancelled') DEFAULT 'pending',
  `rental_date` DATETIME NOT NULL,
  `return_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),  -- Define primary key on id
  CONSTRAINT `fk_rental_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rental_product` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert dummy data for table `users`
INSERT INTO `users` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `phone_number`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2y$10$8DWgvfnL0w5Nf8FqSqTweuKqg8YEACTflRdN/IYVlpmUOkdnIMQRe', 'Admin', 'Administrator', '09926591335', 'admin', '2024-12-13 13:48:47', '2024-12-13 13:51:28');

-- --------------------------------------------------------

-- AUTO_INCREMENT for table `products`
ALTER TABLE `products`
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

-- AUTO_INCREMENT for table `rentals`
ALTER TABLE `rentals`
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

COMMIT;
