-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 11, 2025 at 05:14 AM
-- Server version: 8.0.40
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jaithradbv2`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `other` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(155) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gst` varchar(155) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `number`, `location`, `category`, `other`, `address`, `gst`, `status`, `date`) VALUES
(18, 'Mintu Sharma', '9401069337', 'nagaon', 'Walk in customer', 'construction', 'AT road, near haibargaon SBI', '53838gtfbhj', 'Followed Up', '2025-09-02');

-- --------------------------------------------------------

--
-- Table structure for table `client_payments`
--

CREATE TABLE `client_payments` (
  `id` int NOT NULL,
  `client_id` int DEFAULT NULL,
  `amount` varchar(155) DEFAULT NULL,
  `mode` varchar(155) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `recievedby` varchar(155) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client_payments`
--

INSERT INTO `client_payments` (`id`, `client_id`, `amount`, `mode`, `date`, `remark`, `recievedby`) VALUES
(7, 18, '100', 'CreditCard', '12/08/2025', 'adad', 'Utpal nath'),
(8, 18, '5000', 'NetBanking', '12/08/2025', 'adad', 'Rajib'),
(9, 18, '5000', 'NetBanking', '12/08/2025', 'adad', 'Utpal nath'),
(10, 18, '50000', 'UPI', '12/05/2025', 'adad', 'Utpal nath');

-- --------------------------------------------------------

--
-- Table structure for table `indiamart_leads`
--

CREATE TABLE `indiamart_leads` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `indiamart_leads`
--

INSERT INTO `indiamart_leads` (`id`, `name`, `number`, `location`) VALUES
(1, 'Kumar Das', '9999999999', 'Guwahati'),
(4, 'Amrit kumar das', '9401069337', 'Beltola');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int NOT NULL,
  `client_id` int DEFAULT NULL,
  `invoice_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mode` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `invoice_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `due_date` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sales_by` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sales_return` varchar(155) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `client_id`, `invoice_id`, `amount`, `mode`, `invoice_date`, `due_date`, `status`, `sales_by`, `category`, `sales_return`) VALUES
(73, NULL, 'Abhilash Bay ', '7577895645', NULL, 'nagaon', '4', '8', '', 'Commercial', NULL),
(74, NULL, 'Abhilash Bay ', '9401069337', NULL, 'Nabin Nagar ,Guwahati', '2', '3', '', 'Commercial', NULL),
(75, NULL, 'Panchanan Dekarrree', '9999999999', NULL, '', '3', '4', 'singia\r\netrwrebhe', 'CommercialRent', NULL),
(76, NULL, 'Panchanan Dekarrree', '9999', NULL, '', '3', '4', 'ooijoijiogte', 'Residential', NULL),
(80, NULL, 'fddfg45854411', '5000', 'Cheque', '2025-08-27', '2025-08-31', NULL, 'ResidentialSale', 'ResidentialSale', NULL),
(82, 18, 'ADHEOS00045', '50000', 'CreditCard', '2025-08-27', '2025-08-28', NULL, 'ResidentialRent', 'ResidentialRent', NULL),
(83, 18, 'ADHEOS00045', '222', 'NetBanking', '2025-08-27', '2025-08-27', NULL, 'ResidentialSale', 'ResidentialSale', NULL),
(84, 18, 'ADHEOS00045', '100', 'CreditCard', '2025-08-27', '2025-09-19', NULL, 'ResidentialSale', 'Commercial', NULL),
(85, 18, 'mintu sharma', '5000', 'UPI', '2025-09-01', '2025-09-10', NULL, 'ResidentialRent', 'Commercial', NULL),
(86, 18, 'ADHEOS00045', '50000', 'BankTransfer', '2025-09-01', '2025-09-03', NULL, 'ResidentialRent', 'ResidentialSale', NULL),
(87, 18, 'ADHEOS00045', '5000', 'Cheque', '2025-09-05', '2025-09-10', NULL, 'Munin Da', 'Hardware', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `inquery` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `oth` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `name`, `number`, `location`, `inquery`, `oth`, `status`, `date`) VALUES
(17, 'Mintu Sharma', '8794563231', 'nagaon', 'product', 'n/a', '1', '2025-08-31');

-- --------------------------------------------------------

--
-- Table structure for table `prop_images`
--

CREATE TABLE `prop_images` (
  `id` int NOT NULL,
  `prop_id` int DEFAULT NULL,
  `pref` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prop_images`
--

INSERT INTO `prop_images` (`id`, `prop_id`, `pref`, `location`) VALUES
(213, 73, 'dan-7th-vGNVhp3HyCY-unsplash.jpg', '1740570792565-333948625-dan-7th-vGNVhp3HyCY-unsplash.jpg'),
(214, 73, 'manja-vitolic-7tOV35hnkao-unsplash.jpg', '1740570792578-477445677-manja-vitolic-7tOV35hnkao-unsplash.jpg'),
(215, 73, 'avery-klein-C_dRtsnBOQA-unsplash.jpg', '1740570792603-585872379-avery-klein-C_dRtsnBOQA-unsplash.jpg'),
(216, 73, 'david-van-dijk-3LTht2nxd34-unsplash.jpg', '1740570792614-44504511-david-van-dijk-3LTht2nxd34-unsplash.jpg'),
(217, 73, 'alexandra-gorn-W5dsm9n6e3g-unsplash.jpg', '1740570792666-816090859-alexandra-gorn-W5dsm9n6e3g-unsplash.jpg'),
(218, 73, 'tu-tu-QZGQO3NvsLo-unsplash.jpg', '1740570792687-536982891-tu-tu-QZGQO3NvsLo-unsplash.jpg'),
(219, 74, 'dan-7th-vGNVhp3HyCY-unsplash.jpg', '1740570965423-641846582-dan-7th-vGNVhp3HyCY-unsplash.jpg'),
(220, 74, 'manja-vitolic-7tOV35hnkao-unsplash.jpg', '1740570965433-92285230-manja-vitolic-7tOV35hnkao-unsplash.jpg'),
(221, 74, 'avery-klein-C_dRtsnBOQA-unsplash.jpg', '1740570965438-578099862-avery-klein-C_dRtsnBOQA-unsplash.jpg'),
(222, 74, 'david-van-dijk-3LTht2nxd34-unsplash.jpg', '1740570965450-92969963-david-van-dijk-3LTht2nxd34-unsplash.jpg'),
(223, 75, 'WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy (2).jpg', '1740636335713-683260782-WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy (2).jpg'),
(224, 75, 'WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy (3).jpg', '1740636335783-90246310-WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy (3).jpg'),
(225, 75, 'WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy.jpg', '1740636335823-775775492-WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy.jpg'),
(226, 75, 'WhatsApp Image 2025-02-05 at 11.42.31_3080d87b.jpg', '1740636335844-527431648-WhatsApp Image 2025-02-05 at 11.42.31_3080d87b.jpg'),
(227, 75, 'img5.jpg', '1740636335859-189465933-img5.jpg'),
(228, 76, 'navbar.png', '1741669670397-79961108-navbar.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'admin',
  `number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `job_role` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastLoginAt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastLogoutAt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `number`, `job_role`, `lastLoginAt`, `lastLogoutAt`, `status`) VALUES
(4, 'Admin User', 'realestate@gmail.com', 'b95ab2dcee3e5f987834e0eb3188ec3e73e4c065bbee645c222e1330535b382e', 'admin', '9401069337', 'Founder', '2025-05-24 16:55:47', '2025-03-01 14:11:50', 'active'),
(8, 'msi', 'msi@gmail.com', 'b0a858af33fbccf6840afca4159ce84d9101f1086ee534a42031b9aae7dcb054', 'admin', NULL, NULL, '2025-09-05 23:06:27', NULL, 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_payments`
--
ALTER TABLE `client_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indiamart_leads`
--
ALTER TABLE `indiamart_leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prop_images`
--
ALTER TABLE `prop_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prop_id` (`prop_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `client_payments`
--
ALTER TABLE `client_payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `indiamart_leads`
--
ALTER TABLE `indiamart_leads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `prop_images`
--
ALTER TABLE `prop_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `prop_images`
--
ALTER TABLE `prop_images`
  ADD CONSTRAINT `prop_images_ibfk_1` FOREIGN KEY (`prop_id`) REFERENCES `invoices` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
