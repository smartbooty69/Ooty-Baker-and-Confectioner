-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2025 at 07:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ooty_baker`
--

-- --------------------------------------------------------

--
-- Table structure for table `business_inquiries`
--

CREATE TABLE `business_inquiries` (
  `id` int(11) NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `contact_person_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `estimated_quantity` varchar(100) DEFAULT NULL,
  `delivery_frequency` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `additional_notes` text DEFAULT NULL,
  `business_nature` varchar(100) DEFAULT NULL,
  `status` enum('new','in-progress','completed','cancelled') NOT NULL DEFAULT 'new',
  `staff_note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_inquiries`
--

INSERT INTO `business_inquiries` (`id`, `business_name`, `contact_person_name`, `email`, `phone`, `estimated_quantity`, `delivery_frequency`, `address`, `additional_notes`, `business_nature`, `status`, `staff_note`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES
(23, 'St Josephs University', 'CLANCY MENDONCA', 'clancy.mendonca@student.sju.edu.in', '7625025705', '20kg', 'Weekly', '36, Langford Rd', 'nopw', 'Consumer', 'in-progress', '', '2025-06-03 04:53:17', '2025-06-08 05:07:26', '2025-06-03 11:35:55', 1),
(24, 'St Joseph University', 'CLANCY MENDONCA', 'clancy.mendonca@student.sju.edu.in', '7625025705', '20kg', 'Weekly', '36, Langford Rd', 'nopw', 'Consumer', 'cancelled', '', '2025-06-03 06:15:18', '2025-06-03 06:15:59', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `business_inquiry_history`
--

CREATE TABLE `business_inquiry_history` (
  `id` int(11) NOT NULL,
  `inquiry_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_inquiry_history`
--

INSERT INTO `business_inquiry_history` (`id`, `inquiry_id`, `status`, `created_at`) VALUES
(1, 23, 'cancelled', '2025-06-03 06:10:09');

-- --------------------------------------------------------

--
-- Table structure for table `business_inquiry_products`
--

CREATE TABLE `business_inquiry_products` (
  `id` int(11) NOT NULL,
  `inquiry_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_inquiry_products`
--

INSERT INTO `business_inquiry_products` (`id`, `inquiry_id`, `product_id`) VALUES
(180, 23, 8),
(181, 23, 13),
(183, 23, 14),
(184, 23, 19),
(185, 23, 23),
(187, 24, 8);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(500) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `variety` varchar(255) DEFAULT NULL,
  `price_per_gram` decimal(10,2) DEFAULT NULL,
  `veg_status` enum('Veg','Non-Veg') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image_path`, `price`, `variety`, `price_per_gram`, `veg_status`, `created_at`) VALUES
(1, 'Almond Delight', 'Delicious almond-based candy in container packaging', 'uploads/images/candy1.jpg', 80.00, 'Coated Candy', 0.80, 'Veg', '2025-04-30 23:00:00'),
(3, 'Ginger Candy', 'Spicy ginger flavored candy', 'uploads/images/candy1.jpg', 20.00, 'Candy', 0.40, 'Veg', '2025-04-30 23:06:00'),
(5, 'Jeera Sweet', 'Cumin flavored traditional sweet', 'uploads/images/candy1.jpg', 28.00, 'Candy', 0.28, 'Veg', '2025-04-30 23:11:00'),
(6, 'Lemon Candy', 'Tangy lemon flavored candy', 'uploads/images/candy1.jpg', 35.00, 'Candy', 0.35, 'Veg', '2025-04-30 23:15:00'),
(8, 'Orange Candy', 'Sweet orange flavored candy', 'uploads/images/candy1.jpg', 35.00, 'Candy', 0.35, 'Non-Veg', '2025-04-30 23:20:00'),
(9, 'Orange Candy', 'Sweet orange flavored candy', 'uploads/images/candy1.jpg', 25.00, 'Candy', 0.25, 'Veg', '2025-04-30 23:21:00'),
(11, 'Sweet Pearl', 'Classic pearl-shaped candies', 'uploads/images/candy1.jpg', 25.00, 'Coated Candy', 0.25, 'Veg', '2025-04-30 23:26:00'),
(12, 'Melon Dews', 'Refreshing melon flavored candy', 'uploads/images/candy1.jpg', 15.00, 'Candy', 0.30, 'Veg', '2025-04-30 23:30:00'),
(13, 'Rainbow Sticks', 'Colorful stick candies in a box', 'uploads/images/candy1.jpg', 30.00, 'Candy', 0.30, 'Veg', '2025-04-30 23:35:00'),
(14, 'Peanut Sweet', 'Sweet peanut-based confectionery', 'uploads/images/candy1.jpg', 28.00, 'Coated Candy', 0.28, 'Non-Veg', '2025-04-30 23:40:00'),
(15, 'Sugar Dots', 'Colorful sugar dot candies', 'uploads/images/candy1.jpg', 175.00, 'Coated Candy', 0.88, 'Veg', '2025-04-30 23:45:00'),
(17, 'Jelly Jems', 'Assorted jelly candies', 'uploads/images/candy1.jpg', 30.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:01:00'),
(18, 'Jelly Cubes', 'Cube-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:05:00'),
(19, 'Jelly Curles', 'Curly shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:10:00'),
(20, 'Jelly Diamond', 'Diamond-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:15:00'),
(21, 'Jelly Fingers', 'Finger-shaped jelly candies', 'uploads/images/candy1.jpg', 45.00, 'Jelly', 0.45, 'Veg', '2025-05-01 00:20:00'),
(22, 'Jelly Fingers', 'Finger-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:21:00'),
(23, 'Jelly Orange Delight', 'Orange flavored jelly delight', 'uploads/images/candy1.jpg', 42.00, 'Jelly', 0.42, 'Veg', '2025-05-01 00:25:00'),
(24, 'Jelly Rounds', 'Round jelly candies', 'uploads/images/candy1.jpg', 35.00, 'Jelly', 0.35, 'Veg', '2025-05-01 00:30:00'),
(25, 'Jelly Rounds with ring', 'Round jelly candies with rings', 'uploads/images/candy1.jpg', 35.00, 'Jelly', 0.35, 'Veg', '2025-05-01 00:35:00'),
(26, 'Jelly Sweet Hearts', 'Heart-shaped jelly candies', 'uploads/images/candy1.jpg', 42.00, 'Coated Candy', 0.40, 'Non-Veg', '2025-05-01 00:40:00'),
(32, 'Dino Candy', 'fa', 'uploads/images/68450e5f34339_brand-logo-removebg-preview.png', 42.00, 'Jelly', 42.00, 'Non-Veg', '2025-06-08 04:15:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp_code` varchar(6) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `otp_code`, `otp_expiry`, `created_at`, `updated_at`) VALUES
(1, 'clancymendonca@gmail.com', '$2y$10$o2tZLhRycyCjp8YCoaamKOfMSExZZB/KtUedVr994hOYi5mhrmujm', NULL, NULL, '2025-05-29 13:46:38', '2025-06-01 18:37:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business_inquiries`
--
ALTER TABLE `business_inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `business_inquiry_history`
--
ALTER TABLE `business_inquiry_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inquiry_id` (`inquiry_id`);

--
-- Indexes for table `business_inquiry_products`
--
ALTER TABLE `business_inquiry_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inquiry_id` (`inquiry_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business_inquiries`
--
ALTER TABLE `business_inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `business_inquiry_history`
--
ALTER TABLE `business_inquiry_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `business_inquiry_products`
--
ALTER TABLE `business_inquiry_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=188;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `business_inquiry_history`
--
ALTER TABLE `business_inquiry_history`
  ADD CONSTRAINT `business_inquiry_history_ibfk_1` FOREIGN KEY (`inquiry_id`) REFERENCES `business_inquiries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_inquiry_products`
--
ALTER TABLE `business_inquiry_products`
  ADD CONSTRAINT `business_inquiry_products_ibfk_1` FOREIGN KEY (`inquiry_id`) REFERENCES `business_inquiries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `business_inquiry_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
