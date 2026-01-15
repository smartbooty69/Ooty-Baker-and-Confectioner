-- Quick Database Setup Script
-- Run this if you want to create a fresh database from scratch

-- Create database
CREATE DATABASE IF NOT EXISTS ooty_baker CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Use the database
USE ooty_baker;

-- Now import your ooty_baker.sql file using one of these methods:
-- Method 1: mysql -u root -p ooty_baker < ooty_baker.sql
-- Method 2: Use phpMyAdmin Import feature
-- Method 3: Copy and paste the contents of ooty_baker.sql here

-- After importing, run this to fix image paths:
UPDATE products 
SET image_path = CONCAT('/', image_path) 
WHERE image_path NOT LIKE '/%' AND image_path IS NOT NULL;

-- Verify tables exist
SHOW TABLES;

-- Check data
SELECT 'Products' as TableName, COUNT(*) as Count FROM products
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Business Inquiries', COUNT(*) FROM business_inquiries;
