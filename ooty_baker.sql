-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 08:04 PM
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_inquiries`
--

INSERT INTO `business_inquiries` (`id`, `business_name`, `contact_person_name`, `email`, `phone`, `estimated_quantity`, `delivery_frequency`, `address`, `additional_notes`, `business_nature`, `status`, `staff_note`, `created_at`, `updated_at`) VALUES
(6, 'Sweet Treats Wholesale', 'Anita Rao', 'anita@sweettreats.in', '9876543210', '50kg/month', 'Monthly', '123 MG Road, Bangalore, Karnataka', 'Interested in exclusive pricing for bulk orders.', 'Retail Distributor', 'in-progress', '', '2025-05-30 06:52:11', '2025-05-30 17:54:59'),
(7, 'Healthy Harvest Mart', 'Rakesh Menon', 'rakesh@hhmart.com', '9123456789', '25kg/week', 'Weekly', 'Plot 17, Industrial Area, Kochi, Kerala', 'Prefers products with no added colors.', 'Organic Retailer', 'new', NULL, '2025-05-30 06:52:11', '2025-05-30 17:33:25'),
(8, 'Candy World Co.', 'Shalini Iyer', 'shalini@candyworld.in', '9988776655', '100kg/month', 'Biweekly', 'Sector 14, Gurgaon, Haryana', 'Need custom branding options.', 'Supermarket Chain', 'new', NULL, '2025-05-30 06:52:11', '2025-05-30 17:33:25'),
(9, 'Urban Snacks Pvt Ltd', 'Amit Chawla', 'amit@urbansnacks.com', '8899776655', '10kg/day', 'Daily', '34 Church Street, Mumbai, Maharashtra', 'Will require delivery before 10am.', 'Café Chain', 'new', NULL, '2025-05-30 06:52:11', '2025-05-30 17:33:25'),
(10, 'Rainbow Delights', 'Priya Shah', 'priya@rainbowdelights.com', '9001122334', '75kg/month', 'Monthly', 'Banjara Hills, Hyderabad, Telangana', 'Looking for new jelly varieties.', 'Party Supply Store', 'new', NULL, '2025-05-30 06:52:11', '2025-05-30 17:33:25');

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
(57, 6, 1),
(58, 6, 10),
(59, 6, 15),
(60, 7, 2),
(61, 7, 6),
(62, 7, 12),
(63, 7, 18),
(64, 8, 4),
(65, 8, 5),
(66, 8, 13),
(67, 9, 7),
(68, 9, 14),
(69, 9, 21),
(70, 9, 24),
(71, 10, 16),
(72, 10, 23),
(73, 10, 25),
(74, 10, 26);

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
(2, 'Ginger Candy', 'Spicy ginger flavored candy available in multiple pack sizes', 'uploads/images/candy1.jpg', 50.00, 'Candy', 0.50, 'Veg', '2025-04-30 23:05:00'),
(3, 'Ginger Candy', 'Spicy ginger flavored candy available in multiple pack sizes', 'uploads/images/candy1.jpg', 20.00, 'Candy', 0.40, 'Veg', '2025-04-30 23:06:00'),
(4, 'Jeera Sweet', 'Cumin flavored traditional sweet', 'uploads/images/candy1.jpg', 35.00, 'Candy', 0.35, 'Veg', '2025-04-30 23:10:00'),
(5, 'Jeera Sweet', 'Cumin flavored traditional sweet', 'uploads/images/candy1.jpg', 28.00, 'Candy', 0.28, 'Veg', '2025-04-30 23:11:00'),
(6, 'Lemon Candy', 'Tangy lemon flavored candy', 'uploads/images/candy1.jpg', 35.00, 'Candy', 0.35, 'Veg', '2025-04-30 23:15:00'),
(7, 'Lemon Candy', 'Tangy lemon flavored candy', 'uploads/images/candy1.jpg', 25.00, 'Candy', 0.25, 'Veg', '2025-04-30 23:16:00'),
(8, 'Orange Candy', 'Sweet orange flavored candy', 'uploads/images/candy1.jpg', 35.00, 'Candy', 0.35, 'Veg', '2025-04-30 23:20:00'),
(9, 'Orange Candy', 'Sweet orange flavored candy', 'uploads/images/candy1.jpg', 25.00, 'Candy', 0.25, 'Veg', '2025-04-30 23:21:00'),
(10, 'Sweet Pearl', 'Classic pearl-shaped candies', 'uploads/images/candy1.jpg', 35.00, 'Coated Candy', 0.35, 'Veg', '2025-04-30 23:25:00'),
(11, 'Sweet Pearl', 'Classic pearl-shaped candies', 'uploads/images/candy1.jpg', 25.00, 'Coated Candy', 0.25, 'Veg', '2025-04-30 23:26:00'),
(12, 'Melon Dews', 'Refreshing melon flavored candy', 'uploads/images/candy1.jpg', 15.00, 'Candy', 0.30, 'Veg', '2025-04-30 23:30:00'),
(13, 'Rainbow Sticks', 'Colorful stick candies in a box', 'uploads/images/candy1.jpg', 30.00, 'Candy', 0.30, 'Veg', '2025-04-30 23:35:00'),
(14, 'Peanut Sweet', 'Sweet peanut-based confectionery', 'uploads/images/candy1.jpg', 28.00, 'Coated Candy', 0.28, 'Veg', '2025-04-30 23:40:00'),
(15, 'Sugar Dots', 'Colorful sugar dot candies', 'uploads/images/candy1.jpg', 175.00, 'Coated Candy', 0.88, 'Veg', '2025-04-30 23:45:00'),
(16, 'Jelly Jems', 'Assorted jelly candies', 'uploads/images/candy1.jpg', 70.00, 'Jelly', 0.35, 'Veg', '2025-05-01 00:00:00'),
(17, 'Jelly Jems', 'Assorted jelly candies', 'uploads/images/candy1.jpg', 30.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:01:00'),
(18, 'Jelly Cubes', 'Cube-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:05:00'),
(19, 'Jelly Curles', 'Curly shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:10:00'),
(20, 'Jelly Diamond', 'Diamond-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:15:00'),
(21, 'Jelly Fingers', 'Finger-shaped jelly candies', 'uploads/images/candy1.jpg', 45.00, 'Jelly', 0.45, 'Veg', '2025-05-01 00:20:00'),
(22, 'Jelly Fingers', 'Finger-shaped jelly candies', 'uploads/images/candy1.jpg', 15.00, 'Jelly', 0.30, 'Veg', '2025-05-01 00:21:00'),
(23, 'Jelly Orange Delight', 'Orange flavored jelly delight', 'uploads/images/candy1.jpg', 42.00, 'Jelly', 0.42, 'Veg', '2025-05-01 00:25:00'),
(24, 'Jelly Rounds', 'Round jelly candies', 'uploads/images/candy1.jpg', 35.00, 'Jelly', 0.35, 'Veg', '2025-05-01 00:30:00'),
(25, 'Jelly Rounds with ring', 'Round jelly candies with rings', 'uploads/images/candy1.jpg', 35.00, 'Jelly', 0.35, 'Veg', '2025-05-01 00:35:00'),
(26, 'Jelly Sweet Hearts', 'Heart-shaped jelly candies', 'uploads/images/candy1.jpg', 42.00, 'Jelly', 0.42, 'Veg', '2025-05-01 00:40:00');

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
(1, 'clancymendonca@gmail.com', '$2y$10$c/S5LP.rPgjuxy0JzQ2QHu10pvjz2BRwp8TrM.gdH2lJkfiKN9Ur.', '564114', '2025-05-30 09:14:52', '2025-05-29 13:46:38', '2025-05-30 07:09:52');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `business_inquiry_products`
--
ALTER TABLE `business_inquiry_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
