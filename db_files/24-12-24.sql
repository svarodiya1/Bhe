-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart` (`cart_id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `parent_id` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`category_id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (184,'dsfgdsg',4,0),(185,'sdjisdj',4,1),(186,'kffvklsjdfkl',4,1),(187,'wsfdg',4,1),(188,'wskhg',5,1),(189,'jhgkj',5,1),(190,'Katil',6,1),(191,'Anuo',6,1),(192,'Katil',7,1),(193,'Kamal',7,1),(194,'chuchu',8,1),(195,'bubu',8,1);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_address`
--

DROP TABLE IF EXISTS `customer_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `locality_town` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_address`
--

LOCK TABLES `customer_address` WRITE;
/*!40000 ALTER TABLE `customer_address` DISABLE KEYS */;
INSERT INTO `customer_address` VALUES (1,37,'Palam','Delhi','123','New Delhi','New Delhi','Delhi','9876543987','shubhamvarodiya2004@gmail.com',1356.00,'2024-12-06 09:42:15'),(2,37,'Palam','Delhi','123','New Delhi','New Delhi','Delhi','9876543987','shubhamvarodiya2004@gmail.com',1356.00,'2024-12-06 09:42:36'),(3,37,'Palam','Delhi','123','New Delhi','New Delhi','Delhi','9876543987','shubhamvarodiya2004@gmail.com',1356.00,'2024-12-06 09:42:46'),(4,37,'Palam','Delhi','123','New Delhi','New Delhi','Delhi','9876543987','shubhamvarodiya2004@gmail.com',1356.00,'2024-12-06 09:43:19'),(17,37,'Palam','Delhi','123','New Delhi','Delhi','Delhi','9876543987','shubhamvarodiyad2004@gmail.com',1356.00,'2024-12-06 11:38:02'),(18,37,'Palam','Delhi','123','New Delhi','Delhi','Delhi','9876543987','shubhamvarodiyad2004@gmail.com',1356.00,'2024-12-06 11:51:36'),(19,37,'Palam','Delhi','123','New Delhi','Delhi','Delhi','9876543987','shubhamvarodiyad2004@gmail.com',1356.00,'2024-12-06 12:12:30');
/*!40000 ALTER TABLE `customer_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_category`
--

DROP TABLE IF EXISTS `main_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  `created_date` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `updated_date` varchar(45) DEFAULT NULL,
  `updated_by` varchar(45) DEFAULT NULL,
  `sample_image` varchar(450) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_category`
--

LOCK TABLES `main_category` WRITE;
/*!40000 ALTER TABLE `main_category` DISABLE KEYS */;
INSERT INTO `main_category` VALUES (7,'panda',NULL,NULL,NULL,NULL,'1734782401_game-2.jpg'),(8,'Anuo',NULL,NULL,NULL,NULL,'1735029310_b1image.png');
/*!40000 ALTER TABLE `main_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','shipped','completed','canceled') NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `shipping_address` text,
  `payment_status` enum('pending','completed','failed') DEFAULT 'pending',
  `payment_method` enum('credit_card','paypal','cod') DEFAULT 'cod',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `cart_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,101,'2023-11-15 05:00:00','pending',1500.00,'123 Main St, City, Country','completed','credit_card','2024-12-07 06:50:45',NULL),(2,102,'2023-11-16 08:30:00','pending',300.00,'456 Oak St, City, Country','pending','paypal','2024-12-07 06:50:45',NULL),(3,103,'2023-11-17 02:30:00','pending',2100.00,'789 Pine St, City, Country','completed','cod','2024-12-07 06:50:45',NULL),(4,104,'2023-11-18 06:00:00','pending',0.00,'321 Birch St, City, Country','failed','credit_card','2024-12-07 06:50:45',NULL),(5,105,'2023-11-19 11:15:00','completed',1200.00,'654 Maple St, City, Country','completed','paypal','2024-12-07 06:50:45',NULL),(6,106,'2023-11-25 13:00:00','completed',1600.00,'123 Main , City, Country','completed','credit_card','2024-12-07 06:50:45',NULL),(7,107,'2023-12-15 05:00:00','completed',1500.00,'23 Main St, City, Country','completed','credit_card','2024-12-07 06:50:45',NULL),(8,108,'2023-12-16 08:30:00','completed',300.00,'56 Oak St, City, Country','pending','paypal','2024-12-07 06:50:45',NULL),(9,109,'2023-12-17 02:30:00','completed',2100.00,'89 Pine St, City, Country','completed','cod','2024-12-07 06:50:45',NULL),(10,110,'2023-12-18 06:00:00','completed',0.00,'32 Birch St, City, Country','failed','credit_card','2024-12-07 06:50:45',NULL),(11,111,'2023-12-19 11:15:00','completed',1200.00,'651 Maple St, City, Country','completed','paypal','2024-12-07 06:50:45',NULL),(12,112,'2021-12-15 05:00:00','completed',1500.00,'23 Man St, City, Country','completed','credit_card','2024-12-07 06:50:45',NULL),(13,113,'2021-12-16 08:30:00','completed',300.00,'56 Oa St, City, Country','pending','paypal','2024-12-07 06:50:45',NULL),(14,114,'2021-12-17 02:30:00','completed',2100.00,'89 Pne St, City, Country','completed','cod','2024-12-07 06:50:45',NULL),(15,115,'2021-12-18 06:00:00','completed',0.00,'32 Birh St, City, Country','failed','credit_card','2024-12-07 06:50:45',NULL),(16,116,'2021-12-19 11:15:00','completed',1200.00,'651 Mple St, City, Country','completed','paypal','2024-12-07 06:50:45',NULL),(20,37,'2024-11-30 18:30:00','completed',1200.00,NULL,'pending','cod','2024-12-07 06:50:45',NULL),(30,37,'2024-12-01 18:30:00','completed',800.00,NULL,'pending','cod','2024-12-07 06:50:45',NULL),(40,37,'2024-12-02 18:30:00','completed',450.00,NULL,'pending','cod','2024-12-07 06:50:45',NULL),(50,37,'2024-12-03 18:30:00','completed',620.00,NULL,'pending','cod','2024-12-07 06:50:45',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_status` enum('pending','completed','failed') DEFAULT 'pending',
  `payment_method` enum('credit_card','paypal','cod') DEFAULT 'cod',
  `transaction_id` varchar(255) DEFAULT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_price`
--

DROP TABLE IF EXISTS `product_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `main_category_id` int DEFAULT NULL,
  `sub_category_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `size` varchar(50) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_price_ibfk_1` (`main_category_id`),
  KEY `product_price_ibfk_2` (`sub_category_id`),
  KEY `product_price_ibfk_3` (`product_id`),
  CONSTRAINT `product_price_ibfk_1` FOREIGN KEY (`main_category_id`) REFERENCES `main_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_price_ibfk_2` FOREIGN KEY (`sub_category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE,
  CONSTRAINT `product_price_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_price`
--

LOCK TABLES `product_price` WRITE;
/*!40000 ALTER TABLE `product_price` DISABLE KEYS */;
INSERT INTO `product_price` VALUES (122,8,194,144,'bb',23.00,'2024-12-24 13:50:38','2024-12-24 13:50:38'),(123,8,194,144,'cc',45.00,'2024-12-24 13:50:38','2024-12-24 13:50:38'),(124,8,194,144,'ll',67.00,'2024-12-24 13:50:38','2024-12-24 13:50:38'),(125,8,194,145,'bb',60.00,'2024-12-24 14:00:29','2024-12-24 14:00:29'),(126,8,194,146,'bb',60.00,'2024-12-24 14:06:51','2024-12-24 14:06:51');
/*!40000 ALTER TABLE `product_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `main_category_id` int DEFAULT NULL,
  `sub_category_id` int DEFAULT NULL,
  `size` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (38,7,193,'small'),(39,7,193,'sjubhm'),(40,7,193,'123*23'),(41,8,194,'ll'),(42,8,194,'bb'),(43,8,194,'cc'),(44,8,195,'aa'),(45,8,195,'ee'),(46,8,195,'oo');
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `size` varchar(60) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `category_id` varchar(45) DEFAULT NULL,
  `sub_category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_status` varchar(45) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `size_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`sub_category_id`),
  KEY `fk_size_id` (`size_id`),
  CONSTRAINT `fk_size_id` FOREIGN KEY (`size_id`) REFERENCES `product_size` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`sub_category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (144,'shubham','',NULL,NULL,'eef',NULL,'8',194,'2024-12-24 13:50:38','2024-12-24 13:50:38',NULL,'676abc2e016ec_b3image.png',NULL),(145,'shubham','',NULL,NULL,'eef',NULL,'8',194,'2024-12-24 14:00:29','2024-12-24 14:00:29',NULL,'676abe7d033b7_b2image.png',NULL),(146,'shubham','',NULL,NULL,'eef',NULL,'8',194,'2024-12-24 14:06:51','2024-12-24 14:06:51',NULL,'676abffb4fa7f_b2image.png',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,37,'2024-12-03 05:26:03'),(2,102,'2024-12-06 05:59:00');
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `phoneNo` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` bigint NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (18,'bob_brown','bob@example.com','$2y$10$MZFlSHV3wzOipWlTDp4UeOk4g3Bg8b1hl03lIf0gWUB1w5plG1vMe','2024-09-29 18:30:56','2024-10-03 18:00:59',62563,'bob_brown','bob_brown'),(19,'alice_johnson','alice@example.com','$2y$10$Y3.nG1Bx79b2dJqbe1cOeeA8uhP3cVrZxS/cq72d9jbNlU8edHtFS','2024-09-29 18:30:56','2024-10-03 18:00:59',3653,'alice_johnson','alice_johnson'),(20,'charlie_adams','charlie@example.com','$2y$10$yH1ZpQu.Mi1phBlL1x8CpeBRdbTu4b7W4CLPUSuU6zAcFn5cf9NU6','2024-09-29 18:30:56','2024-10-03 18:00:59',565737,'charlie_adams','charlie_adams'),(21,'emily_davis','emily@example.com','$2y$10$4h8ZqN.SspW6TQhgj4OfB.Kz31soReE62D4AtgUnISgL/8MvqPf6O','2024-09-29 18:30:56','2024-10-03 18:00:59',735365,'emily_davis','emily_davis'),(22,'frank_lee','frank@example.com','$2y$10$ZmFg4Z4pl1DiyBc7Mwb9MeG94N1TAqSw7wF/D48d8Aa3KjH43iPIW','2024-09-29 18:30:56','2024-10-03 18:00:59',6357,'frank_lee','frank_lee'),(23,'grace_kim','grace@example.com','$2y$10$J9l/5Zl.m4F.MiEmx3zVzeFgPaGpD0vm8QFmP4cT6V3HgH8LqD2hW','2024-09-29 18:30:56','2024-10-03 18:00:59',76353,'grace_kim','grace_kim'),(24,'hannah_moore','hannah@example.com','$2y$10$7MJWg7v7lsJ2ZTwcM2IlF.pW.FU5Ir5gf8yD.ek.gYVQ/GP5q1b/a','2024-09-29 18:30:56','2024-10-03 18:00:59',73673,'hannah_moore','hannah_moore'),(25,'isaac_wilson','isaac@example.com','$2y$10$6pq.FvLxOaE4o2z1/c8WfOQU0IlO1m2n.nOtnRz4TKmGfZl0rLBmG','2024-09-29 18:30:56','2024-10-03 18:00:59',256,'isaac_wilson','isaac_wilson'),(26,'fnejfn','fjioj@jekfe.com','$2y$10$dw/o3bq02nb11Ps0W6u9r.DpuuWcFN3iIElmN9xuqUybfuOVLgtTG','2024-09-30 14:28:36','2024-10-03 18:00:59',73,'fnejfn','fnejfn'),(37,'antosh','antoijhos2h@gmail.com','Antosh@123','2024-10-03 17:54:55','2024-10-03 18:00:59',9876543987,'antosh','antosh'),(39,'manish79','manish@gmail.com','manish@123','2024-10-03 18:08:21','2024-10-03 18:08:21',8882568627,'manish','kundra'),(101,'John Doe','john@example.com','password123','2024-12-04 07:31:28','2024-12-04 07:31:28',9876543210,NULL,NULL),(102,'Jane Smith','janee@example.com','password456','2024-12-04 07:31:28','2024-12-04 07:31:28',8765432109,NULL,NULL),(103,'Alice Brown','alicee@example.com','password789','2024-12-04 07:31:28','2024-12-04 07:31:28',7654321098,NULL,NULL),(104,'Bob White','bobe@example.com','password101','2024-12-04 07:31:28','2024-12-04 07:31:28',6543210987,NULL,NULL),(105,'Charlie Black','charliee@example.com','password102','2024-12-04 07:31:28','2024-12-04 07:31:28',5432109876,NULL,NULL),(106,'John Do','johyn@example.com','password128','2024-12-04 09:04:34','2024-12-04 09:04:34',9876573210,NULL,NULL),(107,'Jhn Doe','jhn@example.com','password123','2024-12-04 12:13:05','2024-12-04 12:13:05',9876544210,NULL,NULL),(108,'Jan Smith','jnee@example.com','password456','2024-12-04 12:13:05','2024-12-04 12:13:05',8765732109,NULL,NULL),(109,'Alie Brown','aicee@example.com','password789','2024-12-04 12:13:05','2024-12-04 12:13:05',7658321098,NULL,NULL),(110,'Bobe White','bbe@example.com','password101','2024-12-04 12:13:05','2024-12-04 12:13:05',6543280987,NULL,NULL),(111,'Charli Black','chaliee@example.com','password102','2024-12-04 12:13:05','2024-12-04 12:13:05',1432109876,NULL,NULL),(112,'Jhn Do','jh@example.com','password123','2024-12-05 07:09:03','2024-12-05 07:09:03',9876542210,NULL,NULL),(113,'Jan Smth','jne@example.com','password456','2024-12-05 07:09:03','2024-12-05 07:09:03',8762732109,NULL,NULL),(114,'Alie Bown','aiee@example.com','password789','2024-12-05 07:09:03','2024-12-05 07:09:03',7258321098,NULL,NULL),(115,'Bobe Wite','be@example.com','password101','2024-12-05 07:09:03','2024-12-05 07:09:03',6523280987,NULL,NULL),(116,'Charli Back','chliee@example.com','password102','2024-12-05 07:09:03','2024-12-05 07:09:03',2432109876,NULL,NULL);
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

-- Dump completed on 2024-12-24 19:58:45
