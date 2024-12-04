-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_model
-- ------------------------------------------------------
-- Server version	9.0.1

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics',NULL),(2,'Books',NULL),(3,'Clothing',NULL),(4,'Electronics',NULL),(5,'Books',NULL),(6,'Clothing',NULL),(7,'Home & Garden',NULL),(8,'Sports & Outdoors',NULL),(9,'Toys & Games',NULL),(10,'Automotive',NULL),(11,'Health & Beauty',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
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
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
  `stock_quantity` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (5,'Laptop','A powerful laptop',999.99,50,1,'2024-09-29 18:08:38','2024-09-29 18:08:38'),(6,'Smartphone','Latest model smartphone',699.99,100,1,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(7,'Laptop','High-performance laptop',999.99,50,1,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(8,'Headphones','Noise-cancelling headphones',199.99,75,1,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(9,'Novel','Bestselling fiction novel',15.99,200,2,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(10,'Cookbook','Delicious recipes for everyone',25.99,150,2,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(11,'T-shirt','Cotton T-shirt with graphic print',19.99,120,3,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(12,'Jeans','Stylish denim jeans',49.99,80,3,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(13,'Lawn Mower','Gas-powered lawn mower',349.99,30,4,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(14,'Gardening Tools','Complete gardening tool set',99.99,40,4,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(15,'Basketball','Official size basketball',29.99,60,5,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(16,'Tennis Racket','Professional tennis racket',89.99,25,5,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(17,'Doll','Soft plush doll',29.99,100,6,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(18,'Board Game','Fun family board game',39.99,80,6,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(19,'Car Wax','High-quality car wax',19.99,90,7,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(20,'Engine Oil','Premium engine oil',49.99,100,7,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(21,'Vitamins','Daily multivitamins',19.99,150,8,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(22,'Skincare Set','Complete skincare routine',59.99,50,8,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(23,'Smartwatch','Wearable smartwatch with health tracking',199.99,60,1,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(24,'Tablet','10-inch tablet with high resolution',399.99,40,1,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(25,'E-reader','Digital e-reader for books',129.99,50,2,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(26,'Laptop Bag','Durable laptop carrying bag',49.99,70,3,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(27,'Action Figure','Collectible action figure',24.99,150,6,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(28,'Yoga Mat','Non-slip yoga mat',34.99,100,5,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(29,'Blender','High-speed kitchen blender',89.99,80,4,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(30,'Wrench Set','Complete wrench set',79.99,60,7,'2024-09-29 18:12:38','2024-09-29 18:12:38'),(31,'Makeup Kit','Professional makeup kit',89.99,30,8,'2024-09-29 18:12:38','2024-09-29 18:12:38');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'john_doe','john@example.com','john@123','2024-09-29 18:30:56','2024-10-03 18:00:59',12345,'john_doe','john_doe'),(17,'jane_smith','jane@example.com','jane@123','2024-09-29 18:30:56','2024-10-03 18:00:59',58902,'jane_smith','jane_smith'),(18,'bob_brown','bob@example.com','$2y$10$MZFlSHV3wzOipWlTDp4UeOk4g3Bg8b1hl03lIf0gWUB1w5plG1vMe','2024-09-29 18:30:56','2024-10-03 18:00:59',62563,'bob_brown','bob_brown'),(19,'alice_johnson','alice@example.com','$2y$10$Y3.nG1Bx79b2dJqbe1cOeeA8uhP3cVrZxS/cq72d9jbNlU8edHtFS','2024-09-29 18:30:56','2024-10-03 18:00:59',3653,'alice_johnson','alice_johnson'),(20,'charlie_adams','charlie@example.com','$2y$10$yH1ZpQu.Mi1phBlL1x8CpeBRdbTu4b7W4CLPUSuU6zAcFn5cf9NU6','2024-09-29 18:30:56','2024-10-03 18:00:59',565737,'charlie_adams','charlie_adams'),(21,'emily_davis','emily@example.com','$2y$10$4h8ZqN.SspW6TQhgj4OfB.Kz31soReE62D4AtgUnISgL/8MvqPf6O','2024-09-29 18:30:56','2024-10-03 18:00:59',735365,'emily_davis','emily_davis'),(22,'frank_lee','frank@example.com','$2y$10$ZmFg4Z4pl1DiyBc7Mwb9MeG94N1TAqSw7wF/D48d8Aa3KjH43iPIW','2024-09-29 18:30:56','2024-10-03 18:00:59',6357,'frank_lee','frank_lee'),(23,'grace_kim','grace@example.com','$2y$10$J9l/5Zl.m4F.MiEmx3zVzeFgPaGpD0vm8QFmP4cT6V3HgH8LqD2hW','2024-09-29 18:30:56','2024-10-03 18:00:59',76353,'grace_kim','grace_kim'),(24,'hannah_moore','hannah@example.com','$2y$10$7MJWg7v7lsJ2ZTwcM2IlF.pW.FU5Ir5gf8yD.ek.gYVQ/GP5q1b/a','2024-09-29 18:30:56','2024-10-03 18:00:59',73673,'hannah_moore','hannah_moore'),(25,'isaac_wilson','isaac@example.com','$2y$10$6pq.FvLxOaE4o2z1/c8WfOQU0IlO1m2n.nOtnRz4TKmGfZl0rLBmG','2024-09-29 18:30:56','2024-10-03 18:00:59',256,'isaac_wilson','isaac_wilson'),(26,'fnejfn','fjioj@jekfe.com','$2y$10$dw/o3bq02nb11Ps0W6u9r.DpuuWcFN3iIElmN9xuqUybfuOVLgtTG','2024-09-30 14:28:36','2024-10-03 18:00:59',73,'fnejfn','fnejfn'),(37,'antosh','antoijhos2h@gmail.com','Antosh@123','2024-10-03 17:54:55','2024-10-03 18:00:59',9876543987,'antosh','antosh'),(39,'manish79','manish@gmail.com','manish@123','2024-10-03 18:08:21','2024-10-03 18:08:21',8882568627,'manish','kundra');
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

-- Dump completed on 2024-10-04  0:14:37
