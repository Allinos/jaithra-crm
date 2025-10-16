-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: realEstateDemo
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bhk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `budget` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (4,'pankaj das','9401069337','lachit nagar','2','200000','4','2025-02-12'),(5,'name hear','9401069337','ulubari ','8','220000','4',NULL),(6,'name here','9876543210','SIXMILE','2','220000','4','2025-02-12');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (1,'Kumar Das','9999999999','Guwahati'),(4,'Amrit kumar das','9401069337','Beltola');
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prop_images`
--

DROP TABLE IF EXISTS `prop_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prop_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prop_id` int DEFAULT NULL,
  `pref` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prop_id` (`prop_id`),
  CONSTRAINT `prop_images_ibfk_1` FOREIGN KEY (`prop_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prop_images`
--

LOCK TABLES `prop_images` WRITE;
/*!40000 ALTER TABLE `prop_images` DISABLE KEYS */;
INSERT INTO `prop_images` VALUES (213,73,'dan-7th-vGNVhp3HyCY-unsplash.jpg','1740570792565-333948625-dan-7th-vGNVhp3HyCY-unsplash.jpg'),(214,73,'manja-vitolic-7tOV35hnkao-unsplash.jpg','1740570792578-477445677-manja-vitolic-7tOV35hnkao-unsplash.jpg'),(215,73,'avery-klein-C_dRtsnBOQA-unsplash.jpg','1740570792603-585872379-avery-klein-C_dRtsnBOQA-unsplash.jpg'),(216,73,'david-van-dijk-3LTht2nxd34-unsplash.jpg','1740570792614-44504511-david-van-dijk-3LTht2nxd34-unsplash.jpg'),(217,73,'alexandra-gorn-W5dsm9n6e3g-unsplash.jpg','1740570792666-816090859-alexandra-gorn-W5dsm9n6e3g-unsplash.jpg'),(218,73,'tu-tu-QZGQO3NvsLo-unsplash.jpg','1740570792687-536982891-tu-tu-QZGQO3NvsLo-unsplash.jpg'),(219,74,'dan-7th-vGNVhp3HyCY-unsplash.jpg','1740570965423-641846582-dan-7th-vGNVhp3HyCY-unsplash.jpg'),(220,74,'manja-vitolic-7tOV35hnkao-unsplash.jpg','1740570965433-92285230-manja-vitolic-7tOV35hnkao-unsplash.jpg'),(221,74,'avery-klein-C_dRtsnBOQA-unsplash.jpg','1740570965438-578099862-avery-klein-C_dRtsnBOQA-unsplash.jpg'),(222,74,'david-van-dijk-3LTht2nxd34-unsplash.jpg','1740570965450-92969963-david-van-dijk-3LTht2nxd34-unsplash.jpg'),(223,75,'WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy (2).jpg','1740636335713-683260782-WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy (2).jpg'),(224,75,'WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy (3).jpg','1740636335783-90246310-WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy (3).jpg'),(225,75,'WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy.jpg','1740636335823-775775492-WhatsApp Image 2025-02-05 at 11.42.31_3080d87b - Copy.jpg'),(226,75,'WhatsApp Image 2025-02-05 at 11.42.31_3080d87b.jpg','1740636335844-527431648-WhatsApp Image 2025-02-05 at 11.42.31_3080d87b.jpg'),(227,75,'img5.jpg','1740636335859-189465933-img5.jpg'),(228,76,'navbar.png','1741669670397-79961108-navbar.png');
/*!40000 ALTER TABLE `prop_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bhk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `floor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `map_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `owner_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `owner_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (73,'Abhilash Bay ','7577895645','nagaon','4','8','','Mintu Sharma','2147483647','Commercial','75758'),(74,'Abhilash Bay ','9401069337','Nabin Nagar ,Guwahati','2','3','','Referred Das','9999999999','Commercial','5300'),(75,'Panchanan Dekarrree','9999999999','','3','4','singia\r\netrwrebhe','Raju nandan','9999999999','CommercialRent','50000'),(76,'Panchanan Dekarrree','9999999999','','3','4','ooijoijiogte','Raju nandan','9999999999','Residential','50000');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'admin',
  `number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `job_role` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastLoginAt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastLogoutAt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Admin User','realestate@gmail.com','b95ab2dcee3e5f987834e0eb3188ec3e73e4c065bbee645c222e1330535b382e','admin','9401069337','Founder','2025-05-24 16:55:47','2025-03-01 14:11:50','active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-05  6:56:53
