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
  PRIMARY KEY (`cart_item_id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart` (`cart_id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics',NULL),(2,'Books',NULL),(3,'Clothing',NULL),(4,'Electronics',NULL),(5,'Books',NULL),(6,'Clothing',NULL),(7,'Home & Garden',NULL),(8,'Sports & Outdoors',NULL),(9,'Toys & Games',NULL),(10,'Automotive',NULL),(11,'Health & Beauty',NULL),(24,'Alok',NULL),(25,'Kodif',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_category`
--

LOCK TABLES `main_category` WRITE;
/*!40000 ALTER TABLE `main_category` DISABLE KEYS */;
INSERT INTO `main_category` VALUES (24,'Shubham',NULL,NULL,NULL,NULL,'1733204221_Picsart_23-11-23_11-47-48-703.jpg'),(25,'Katil',NULL,NULL,NULL,NULL,'1733308056_image.jpg');
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
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,101,'2023-11-15 05:00:00','pending',1500.00,'123 Main St, City, Country','completed','credit_card'),(2,102,'2023-11-16 08:30:00','pending',300.00,'456 Oak St, City, Country','pending','paypal'),(3,103,'2023-11-17 02:30:00','pending',2100.00,'789 Pine St, City, Country','completed','cod'),(4,104,'2023-11-18 06:00:00','pending',0.00,'321 Birch St, City, Country','failed','credit_card'),(5,105,'2023-11-19 11:15:00','completed',1200.00,'654 Maple St, City, Country','completed','paypal'),(6,106,'2023-11-25 13:00:00','completed',1600.00,'123 Main , City, Country','completed','credit_card');
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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `size` int DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `stock_quantity` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_status` varchar(45) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (5,'Laptop','A powerful laptop',999.99,NULL,NULL,50,1,'2024-09-29 18:08:38','2024-09-29 18:08:38',NULL,NULL),(6,'Smartphone','Latest model smartphone',699.99,NULL,NULL,100,1,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(7,'Laptop','High-performance laptop',999.99,NULL,NULL,50,1,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(8,'Headphones','Noise-cancelling headphones',199.99,NULL,NULL,75,1,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(9,'Novel','Bestselling fiction novel',15.99,NULL,NULL,200,2,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(10,'Cookbook','Delicious recipes for everyone',25.99,NULL,NULL,150,2,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(11,'T-shirt','Cotton T-shirt with graphic print',19.99,NULL,NULL,120,3,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(12,'Jeans','Stylish denim jeans',49.99,NULL,NULL,80,3,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(13,'Lawn Mower','Gas-powered lawn mower',349.99,NULL,NULL,30,4,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(14,'Gardening Tools','Complete gardening tool set',99.99,NULL,NULL,40,4,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(15,'Basketball','Official size basketball',29.99,NULL,NULL,60,5,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(16,'Tennis Racket','Professional tennis racket',89.99,NULL,NULL,25,5,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(17,'Doll','Soft plush doll',29.99,NULL,NULL,100,6,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(18,'Board Game','Fun family board game',39.99,NULL,NULL,80,6,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(19,'Car Wax','High-quality car wax',19.99,NULL,NULL,90,7,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(20,'Engine Oil','Premium engine oil',49.99,NULL,NULL,100,7,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(21,'Vitamins','Daily multivitamins',19.99,NULL,NULL,150,8,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(22,'Skincare Set','Complete skincare routine',59.99,NULL,NULL,50,8,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(23,'Smartwatch','Wearable smartwatch with health tracking',199.99,NULL,NULL,60,1,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(24,'Tablet','10-inch tablet with high resolution',399.99,NULL,NULL,40,1,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(25,'E-reader','Digital e-reader for books',129.99,NULL,NULL,50,2,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(26,'Laptop Bag','Durable laptop carrying bag',49.99,NULL,NULL,70,3,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(27,'Action Figure','Collectible action figure',24.99,NULL,NULL,150,6,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(28,'Yoga Mat','Non-slip yoga mat',34.99,NULL,NULL,100,5,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(29,'Blender','High-speed kitchen blender',89.99,NULL,NULL,80,4,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(30,'Wrench Set','Complete wrench set',79.99,NULL,NULL,60,7,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(31,'Makeup Kit','Professional makeup kit',89.99,NULL,NULL,30,8,'2024-09-29 18:12:38','2024-09-29 18:12:38',NULL,NULL),(32,'Kovid','lorem',678.00,12,'pdfg',90,24,'2024-12-03 06:04:31','2024-12-03 06:04:31','active','1733205871_Picsart_23-11-23_11-47-48-703.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,37,'2024-12-03 05:26:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'jane_smith','jane@example.com','jane@123','2024-09-29 18:30:56','2024-10-03 18:00:59',58902,'jane_smith','jane_smith'),(18,'bob_brown','bob@example.com','$2y$10$MZFlSHV3wzOipWlTDp4UeOk4g3Bg8b1hl03lIf0gWUB1w5plG1vMe','2024-09-29 18:30:56','2024-10-03 18:00:59',62563,'bob_brown','bob_brown'),(19,'alice_johnson','alice@example.com','$2y$10$Y3.nG1Bx79b2dJqbe1cOeeA8uhP3cVrZxS/cq72d9jbNlU8edHtFS','2024-09-29 18:30:56','2024-10-03 18:00:59',3653,'alice_johnson','alice_johnson'),(20,'charlie_adams','charlie@example.com','$2y$10$yH1ZpQu.Mi1phBlL1x8CpeBRdbTu4b7W4CLPUSuU6zAcFn5cf9NU6','2024-09-29 18:30:56','2024-10-03 18:00:59',565737,'charlie_adams','charlie_adams'),(21,'emily_davis','emily@example.com','$2y$10$4h8ZqN.SspW6TQhgj4OfB.Kz31soReE62D4AtgUnISgL/8MvqPf6O','2024-09-29 18:30:56','2024-10-03 18:00:59',735365,'emily_davis','emily_davis'),(22,'frank_lee','frank@example.com','$2y$10$ZmFg4Z4pl1DiyBc7Mwb9MeG94N1TAqSw7wF/D48d8Aa3KjH43iPIW','2024-09-29 18:30:56','2024-10-03 18:00:59',6357,'frank_lee','frank_lee'),(23,'grace_kim','grace@example.com','$2y$10$J9l/5Zl.m4F.MiEmx3zVzeFgPaGpD0vm8QFmP4cT6V3HgH8LqD2hW','2024-09-29 18:30:56','2024-10-03 18:00:59',76353,'grace_kim','grace_kim'),(24,'hannah_moore','hannah@example.com','$2y$10$7MJWg7v7lsJ2ZTwcM2IlF.pW.FU5Ir5gf8yD.ek.gYVQ/GP5q1b/a','2024-09-29 18:30:56','2024-10-03 18:00:59',73673,'hannah_moore','hannah_moore'),(25,'isaac_wilson','isaac@example.com','$2y$10$6pq.FvLxOaE4o2z1/c8WfOQU0IlO1m2n.nOtnRz4TKmGfZl0rLBmG','2024-09-29 18:30:56','2024-10-03 18:00:59',256,'isaac_wilson','isaac_wilson'),(26,'fnejfn','fjioj@jekfe.com','$2y$10$dw/o3bq02nb11Ps0W6u9r.DpuuWcFN3iIElmN9xuqUybfuOVLgtTG','2024-09-30 14:28:36','2024-10-03 18:00:59',73,'fnejfn','fnejfn'),(37,'antosh','antoijhos2h@gmail.com','Antosh@123','2024-10-03 17:54:55','2024-10-03 18:00:59',9876543987,'antosh','antosh'),(39,'manish79','manish@gmail.com','manish@123','2024-10-03 18:08:21','2024-10-03 18:08:21',8882568627,'manish','kundra'),(101,'John Doe','john@example.com','password123','2024-12-04 07:31:28','2024-12-04 07:31:28',9876543210,NULL,NULL),(102,'Jane Smith','janee@example.com','password456','2024-12-04 07:31:28','2024-12-04 07:31:28',8765432109,NULL,NULL),(103,'Alice Brown','alicee@example.com','password789','2024-12-04 07:31:28','2024-12-04 07:31:28',7654321098,NULL,NULL),(104,'Bob White','bobe@example.com','password101','2024-12-04 07:31:28','2024-12-04 07:31:28',6543210987,NULL,NULL),(105,'Charlie Black','charliee@example.com','password102','2024-12-04 07:31:28','2024-12-04 07:31:28',5432109876,NULL,NULL),(106,'John Do','johyn@example.com','password128','2024-12-04 09:04:34','2024-12-04 09:04:34',9876573210,NULL,NULL);
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

-- Dump completed on 2024-12-04 17:01:18
