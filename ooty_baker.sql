-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2025 at 07:00 PM
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_inquiries`
--

INSERT INTO `business_inquiries` (`id`, `business_name`, `contact_person_name`, `email`, `phone`, `estimated_quantity`, `delivery_frequency`, `address`, `additional_notes`, `business_nature`, `created_at`) VALUES
(1, 'Sweet Shop Bangalore', 'Rajesh Kumar', 'rajesh@sweetshopbangalore.com', '9876543210', '50-100 kg monthly', 'Weekly', '123 MG Road, Bangalore, Karnataka', 'Looking for bulk discounts', 'Retail Store', '2025-05-10 03:30:00'),
(2, 'Ooty Gift Center', 'Priya Menon', 'priya@ootygifts.com', '8765432109', '20-30 kg monthly', 'Bi-weekly', '45 Commercial Road, Ooty, Tamil Nadu', 'Need attractive packaging for tourists', 'Gift Shop', '2025-05-12 06:00:00'),
(3, 'Chennai Supermarket', 'Vikram Singh', 'purchases@chennaismart.com', '7654321098', '200-300 kg monthly', 'Daily', '78 Anna Salai, Chennai, Tamil Nadu', 'Require consistent quality and supply', 'Supermarket Chain', '2025-05-15 09:15:00'),
(4, 'Kochi Confectioneries', 'Anjali Nair', 'orders@kochiconfec.com', '6543210987', '100-150 kg monthly', 'Twice a week', '32 Marine Drive, Kochi, Kerala', 'Interested in exclusive flavors', 'Wholesale Distributor', '2025-05-18 10:50:00'),
(5, 'Hyderabad Snacks', 'Arjun Reddy', 'arjun@hydsnacks.in', '9432109876', '30-50 kg monthly', 'Weekly', '56 Banjara Hills, Hyderabad, Telangana', 'Looking for long-term partnership', 'Specialty Food Store', '2025-05-20 04:45:00');

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
(1, 1, 1),
(2, 1, 3),
(3, 1, 5),
(4, 1, 7),
(5, 1, 12),
(6, 2, 2),
(7, 2, 4),
(8, 2, 6),
(9, 2, 9),
(10, 2, 10),
(11, 2, 15),
(12, 2, 20),
(13, 2, 21),
(14, 3, 1),
(15, 3, 2),
(16, 3, 3),
(17, 3, 4),
(18, 3, 5),
(19, 3, 6),
(20, 3, 7),
(21, 3, 8),
(22, 3, 9),
(23, 3, 10),
(24, 3, 11),
(25, 3, 12),
(26, 3, 13),
(27, 3, 14),
(28, 3, 15),
(29, 3, 16),
(30, 3, 17),
(31, 3, 18),
(32, 3, 19),
(33, 3, 20),
(34, 3, 21),
(35, 4, 12),
(36, 4, 13),
(37, 4, 14),
(38, 4, 15),
(39, 4, 16),
(40, 4, 17),
(41, 4, 18),
(42, 4, 19),
(43, 4, 20),
(44, 4, 21),
(45, 5, 1),
(46, 5, 3),
(47, 5, 5),
(48, 5, 7),
(49, 5, 9),
(50, 5, 10);

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
(1, 'Almond Delight', NULL, 'uploadsimagescandy1.jpg', 80.00, 'Container (100 Gms)', 0.80, 'Veg', '2025-05-26 16:45:39'),
(2, 'Peanut Sweet', NULL, 'uploadsimagescandy1.jpg', 28.00, 'Pouch (100 grams)', 0.28, 'Veg', '2025-05-26 16:45:39'),
(3, 'SUGAR DOTS', NULL, 'uploadsimagescandy1.jpg', 175.00, 'null (200 GRAMS)', 0.88, 'Veg', '2025-05-26 16:45:39'),
(4, 'Jelly Jems', NULL, 'uploadsimagescandy1.jpg', 70.00, 'Container (200 Gms)', 0.35, 'Veg', '2025-05-26 16:45:39'),
(5, 'Jelly Jems', NULL, 'uploadsimagescandy1.jpg', 30.00, 'Pouch (100 Gms)', 0.30, 'Veg', '2025-05-26 16:45:39'),
(6, 'Jelly Cubes', NULL, 'uploadsimagescandy1.jpg', 15.00, 'Pouch (50 Gms)', 0.30, 'Veg', '2025-05-26 16:45:39'),
(7, 'Jelly Curles', NULL, 'uploadsimagescandy1.jpg', 15.00, 'Pouch (50 Gms)', 0.30, 'Veg', '2025-05-26 16:45:39'),
(8, 'Jelly Diamond', NULL, 'uploadsimagescandy1.jpg', 15.00, 'Pouch (50 Gms)', 0.30, 'Veg', '2025-05-26 16:45:39'),
(9, 'Jelly Fingers', NULL, 'uploadsimagescandy1.jpg', 45.00, 'Container (100 Gms)', 0.45, 'Veg', '2025-05-26 16:45:39'),
(10, 'Jelly Fingers', NULL, 'uploadsimagescandy1.jpg', 15.00, 'Pouch (50 Gms)', 0.30, 'Veg', '2025-05-26 16:45:39'),
(11, 'Jelly Orange Delight', NULL, 'uploadsimagescandy1.jpg', 42.00, 'Container (100 Gms)', 0.42, 'Veg', '2025-05-26 16:45:39'),
(12, 'Jelly Rounds', NULL, 'uploadsimagescandy1.jpg', 35.00, 'Pouch (100 Gms)', 0.35, 'Veg', '2025-05-26 16:45:39'),
(13, 'Jelly Rounds with ring', NULL, 'uploadsimagescandy1.jpg', 35.00, 'Pouch (100 Gms)', 0.35, 'Veg', '2025-05-26 16:45:39'),
(14, 'Ginger Candy', NULL, 'uploadsimagescandy1.jpg', 50.00, 'Container (100 Gms)', 0.50, 'Veg', '2025-05-26 16:45:39'),
(15, 'Ginger Candy', NULL, 'uploadsimagescandy1.jpg', 20.00, 'Pouch (50 Gms)', 0.40, 'Veg', '2025-05-26 16:45:39'),
(16, 'Jelly Sweet Hearts', NULL, 'uploadsimagescandy1.jpg', 42.00, 'Container (100 Gms)', 0.42, 'Veg', '2025-05-26 16:45:39'),
(17, 'Jeera Sweet', NULL, 'uploadsimagescandy1.jpg', 35.00, 'Container (100 Gms)', 0.35, 'Veg', '2025-05-26 16:45:39'),
(18, 'Jeera Sweet', NULL, 'uploadsimagescandy1.jpg', 28.00, 'Pouch (100 Gms)', 0.28, 'Veg', '2025-05-26 16:45:39'),
(19, 'Lemon Candy', NULL, 'uploadsimagescandy1.jpg', 35.00, 'Container (100 Gms)', 0.35, 'Veg', '2025-05-26 16:45:39'),
(20, 'Lemon Candy', NULL, 'uploadsimagescandy1.jpg', 25.00, 'Pouch (100 Gms)', 0.25, 'Veg', '2025-05-26 16:45:39'),
(21, 'Orange Candy', NULL, 'uploadsimagescandy1.jpg', 35.00, 'Container (100 Gms)', 0.35, 'Veg', '2025-05-26 16:45:39'),
(22, 'Orange Candy', NULL, 'uploadsimagescandy1.jpg', 25.00, 'Pouch (100 Gms)', 0.25, 'Veg', '2025-05-26 16:45:39'),
(23, 'Sweet Pearl', NULL, 'uploadsimagescandy1.jpg', 35.00, 'Container (100 Gms)', 0.35, 'Veg', '2025-05-26 16:45:39'),
(24, 'Sweet Pearl', NULL, 'uploadsimagescandy1.jpg', 25.00, 'Pouch (100 Gms)', 0.25, 'Veg', '2025-05-26 16:45:39'),
(25, 'Melon Dews', NULL, 'uploadsimagescandy1.jpg', 15.00, 'Pouch (50 Gms)', 0.30, 'Veg', '2025-05-26 16:45:39'),
(26, 'Rainbow Sticks', NULL, 'uploadsimagescandy1.jpg', 30.00, 'Box (100 Gms)', 0.30, 'Veg', '2025-05-26 16:45:39'),
(27, 'Almond Delight', 'Delicious almond-based candy in container packaging', 'uploads/images/candy1.jpg', 80.00, 'Coated Candy', 0.80, 'Veg', '2025-05-01 04:30:00'),
(28, 'Ginger Candy', 'Spicy ginger flavored candy available in multiple pack sizes', 'uploads/images/candy1.jpg', 50.00, 'Candy', 0.50, 'Veg', '2025-05-01 04:35:00'),
(29, 'Ginger Candy', 'Spicy ginger flavored candy available in multiple pack sizes', 'uploads/images/candy1.jpg', 20.00, 'Candy', 0.40, 'Veg', '2025-05-01 04:36:00'),
(30, 'Jeera Sweet', 'Cumin flavored traditional sweet', 'uploads/images/candy1.jpg', 35.00, 'Candy', 0.35, 'Veg', '2025-05-01 04:40:00'),
(31, 'Jeera Sweet', 'Cumin flavored traditional sweet', 'uploads/images/candy1.jpg', 28.00, 'Candy', 0.28, 'Veg', '2025-05-01 04:41:00'),
(32, 'Lemon Candy', 'Tangy lemon flavored candy', 'uploads/images/candy1.jpg', 35.00, 'Candy', 0.35, 'Veg', '2025-05-01 04:45:00'),
(33, 'Lemon Candy', 'Tangy lemon flavored candy', 'uploads/images/candy1.jpg', 25.00, 'Candy', 0.25, 'Veg', '2025-05-01 04:46:00'),
(34, 'Orange Candy', 'Sweet orange flavored candy', 'uploads/images/candy1.jpg', 35.00, 'Candy', 0.35, 'Veg', '2025-05-01 04:50:00'),
(35, 'Orange Candy', 'Sweet orange flavored candy', 'uploads/images/candy1.jpg', 25.00, 'Candy', 0.25, 'Veg', '2025-05-01 04:51:00'),
(36, 'Sweet Pearl', 'Classic pearl-shaped candies', 'uploads/images/candy1.jpg', 35.00, 'Coated Candy', 0.35, 'Veg', '2025-05-01 04:55:00'),
(37, 'Sweet Pearl', 'Classic pearl-shaped candies', 'uploads/images/candy1.jpg', 25.00, 'Coated Candy', 0.25, 'Veg', '2025-05-01 04:56:00'),
(38, 'Melon Dews', 'Refreshing melon flavored candy', 'uploads/images/candy1.jpg', 15.00, 'Candy', 0.30, 'Veg', '2025-05-01 05:00:00'),
(39, 'Rainbow Sticks', 'Colorful stick candies in a box', 'uploads/images/candy1.jpg', 30.00, 'Candy', 0.30, 'Veg', '2025-05-01 05:05:00'),
(40, 'Peanut Sweet', 'Sweet peanut-based confectionery', 'uploads/images/candy1.jpg', 28.00, 'Coated Candy', 0.28, 'Veg', '2025-05-01 05:10:00'),
(41, 'Sugar Dots', 'Colorful sugar dot candies', 'uploads/images/candy1.jpg', 175.00, 'Coated Candy', 0.88, 'Veg', '2025-05-01 05:15:00'),
(42, 'Jelly Jems', 'Assorted jelly candies', 'uploads/images/candy1.jpg', 70.00, 'Jelly', 0.35, 'Veg', '2025-05-01 05:30:00'),
(43, 'Jelly Jems', 'Assorted jelly candies', 'uploads/images/candy1.jpg', 30.00, 'Jelly', 0.30, 'Veg', '2025-05-01 05:31:00'),
(44, 'Jelly Cubes', 'Cube-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 05:35:00'),
(45, 'Jelly Curles', 'Curly shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 05:40:00'),
(46, 'Jelly Diamond', 'Diamond-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 05:45:00'),
(47, 'Jelly Fingers', 'Finger-shaped jelly candies', 'uploads/images/candy1.jpg', 45.00, 'Jelly', 0.45, 'Veg', '2025-05-01 05:50:00'),
(48, 'Jelly Fingers', 'Finger-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 05:51:00'),
(49, 'Jelly Orange Delight', 'Orange flavored jelly delight', 'uploads/images/candy1.jpg', 42.00, 'Jelly', 0.42, 'Veg', '2025-05-01 05:55:00'),
(50, 'Jelly Rounds', 'Round jelly candies', 'uploads/images/candy1.jpg', 35.00, 'Jelly', 0.35, 'Veg', '2025-05-01 06:00:00'),
(51, 'Jelly Rounds with ring', 'Round jelly candies with rings', 'uploads/images/candy1.jpg', 35.00, 'Jelly', 0.35, 'Veg', '2025-05-01 06:05:00'),
(52, 'Jelly Sweet Hearts', 'Heart-shaped jelly candies', 'uploads/images/candy1.jpg', 42.00, 'Jelly', 0.42, 'Veg', '2025-05-01 06:10:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business_inquiries`
--
ALTER TABLE `business_inquiries`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business_inquiries`
--
ALTER TABLE `business_inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `business_inquiry_products`
--
ALTER TABLE `business_inquiry_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

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
