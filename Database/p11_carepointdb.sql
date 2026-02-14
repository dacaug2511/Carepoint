-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: p11_carepointdb
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `appointment_date` date NOT NULL,
  `slot_time` time NOT NULL,
  `status` enum('SCHEDULED','COMPLETED','CANCELLED','RESCHEDULED') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appointment_id`),
  UNIQUE KEY `doctor_id` (`doctor_id`,`appointment_date`,`slot_time`),
  KEY `fk_appointment_patient` (`patient_id`),
  CONSTRAINT `fk_appointment_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_appointment_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,1,'2026-02-01','10:00:00','SCHEDULED','2026-01-20 10:16:05'),(2,2,2,'2026-02-01','11:00:00','COMPLETED','2026-01-20 10:16:05'),(3,3,1,'2026-02-02','10:30:00','COMPLETED','2026-01-20 10:16:05'),(4,4,2,'2026-02-02','11:30:00','COMPLETED','2026-01-20 10:16:05'),(5,5,1,'2026-02-03','09:30:00','COMPLETED','2026-01-20 10:16:05'),(6,5,1,'2026-02-04','09:30:00','COMPLETED','2026-01-21 10:16:05'),(21,1,1,'2026-02-02','12:30:00','CANCELLED','2026-01-30 16:18:16'),(22,1,1,'2026-02-02','09:00:00','CANCELLED','2026-02-01 10:33:52'),(23,1,1,'2026-02-02','14:00:00','CANCELLED','2026-02-01 15:37:45'),(24,1,2,'2026-02-03','12:00:00','CANCELLED','2026-02-02 04:47:32'),(25,1,1,'2026-02-09','15:30:00','CANCELLED','2026-02-02 08:19:24'),(26,1,1,'2026-02-09','13:00:00','RESCHEDULED','2026-02-02 08:24:04'),(27,1,1,'2026-02-04','12:30:00','CANCELLED','2026-02-03 03:12:24'),(28,1,1,'2026-02-09','10:30:00','CANCELLED','2026-02-03 06:44:02'),(29,1,1,'2026-02-09','11:00:00','CANCELLED','2026-02-03 15:08:47'),(30,1,1,'2026-02-09','13:30:00','SCHEDULED','2026-02-04 03:20:51'),(31,8,1,'2026-02-09','10:00:00','SCHEDULED','2026-02-04 04:27:14'),(32,1,2,'2026-02-07','10:00:00','SCHEDULED','2026-02-05 02:36:41'),(33,1,2,'2026-02-05','12:30:00','SCHEDULED','2026-02-05 07:04:14'),(34,1,2,'2026-02-07','11:00:00','SCHEDULED','2026-02-05 09:27:27');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `billing_date` date NOT NULL,
  `transaction_id` varchar(20) NOT NULL,
  `payment_mode` varchar(20) NOT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `fk_bill_appointment` (`appointment_id`),
  CONSTRAINT `fk_bill_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (1,1,750.00,'2026-01-20','2001','UPI'),(2,2,650.00,'2026-01-20','2002','CREDIT_CARD'),(3,3,750.00,'2026-01-20','2003','DEBIT_CARD'),(4,4,650.00,'2026-01-20','2004','NET_BANKING'),(5,5,750.00,'2026-01-20','2005','UPI'),(6,21,700.00,'2026-01-30','TXN1769789895601','UPI'),(7,22,700.00,'2026-02-01','TXN1769942032077','UPI'),(8,23,700.00,'2026-02-01','TXN1769960264914','UPI'),(9,24,600.00,'2026-02-02','TXN1770007651474','UPI'),(10,25,700.00,'2026-02-02','TXN1770020363656','UPI'),(11,26,700.00,'2026-02-02','TXN1770020644121','UPI'),(12,27,700.00,'2026-02-03','TXN1770088344022','UPI'),(13,28,700.00,'2026-02-03','TXN1770101041181','UPI'),(14,29,700.00,'2026-02-03','TXN1770131326444','UPI'),(15,30,700.00,'2026-02-04','TXN1770175250556','UPI'),(16,31,700.00,'2026-02-04','TXN1770179233622','UPI'),(17,32,600.00,'2026-02-05','TXN1770259000429','UPI'),(18,33,600.00,'2026-02-05','TXN1770275053301','UPI'),(19,34,600.00,'2026-02-05','TXN1770283646230','UPI');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `specialization_id` int NOT NULL,
  `base_qualification` varchar(100) NOT NULL,
  `post_qualification` varchar(100) DEFAULT NULL,
  `experience` int DEFAULT NULL COMMENT 'Years',
  `consultation_fee` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`doctor_id`),
  KEY `fk_doctor_user` (`uid`),
  KEY `fk_doctor_specialization` (`specialization_id`),
  CONSTRAINT `fk_doctor_specialization` FOREIGN KEY (`specialization_id`) REFERENCES `specialization` (`specialization_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_doctor_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,7,1,'MBBS','MD Cardiology',12,700.00,'ACTIVE'),(2,8,4,'MBBS','MD Dermatology',8,600.00,'ACTIVE'),(3,23,1,'','',2,100.00,'INACTIVE'),(4,24,2,'MBBS','MD Pediatrics',20,700.00,'INACTIVE'),(5,25,1,'MBBS','MD Cardiology',12,500.00,'ACTIVE'),(6,26,1,'MBBS','MD Cardiology',10,100.00,'ACTIVE'),(7,29,1,'MBBS','MD Cardiology',10,500.00,'ACTIVE');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_availability`
--

DROP TABLE IF EXISTS `doctor_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_availability` (
  `doctor_id` int NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `available_from` time NOT NULL,
  `available_to` time NOT NULL,
  PRIMARY KEY (`doctor_id`,`day`),
  CONSTRAINT `fk_availability_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_availability`
--

LOCK TABLES `doctor_availability` WRITE;
/*!40000 ALTER TABLE `doctor_availability` DISABLE KEYS */;
INSERT INTO `doctor_availability` VALUES (1,'Monday','10:00:00','15:00:00'),(2,'Tuesday','10:00:00','16:00:00'),(2,'Thursday','10:00:00','16:00:00'),(2,'Saturday','10:00:00','14:00:00');
/*!40000 ALTER TABLE `doctor_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `comments` text,
  `feedback_date` date NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `fk_feedback_appointment` (`appointment_id`),
  CONSTRAINT `fk_feedback_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedback_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,1,5,'Excellent care','2026-01-20'),(2,2,4,'Good treatment','2026-01-20'),(3,3,5,'Very satisfied','2026-01-20'),(4,4,4,'Helpful doctor','2026-01-20'),(5,5,5,'Great experience','2026-01-20');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `disease_name` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `fk_history_patient` (`patient_id`),
  CONSTRAINT `fk_history_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,1,'Heart Disease','2019-01-01'),(2,2,'Skin Allergy','2020-05-10'),(3,3,'Heart Disease','2018-03-15'),(4,4,'Skin Allergy','2021-06-20'),(5,5,'Heart Disease','2022-09-01');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `emergency_contact` varchar(15) NOT NULL,
  `allergy` text,
  `disease` varchar(100) DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `fk_patient_users` (`uid`),
  CONSTRAINT `fk_patient_users` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,2,'Male','1985-05-10','2026-01-20','9111111111','None','Heart Disease','O+'),(2,3,'Female','1990-08-20','2026-01-20','9222222222','Dust','Skin Allergy','A+'),(3,4,'Male','1988-03-15','2026-01-20','9333333333','None','Heart Disease','B+'),(4,5,'Female','1995-12-01','2026-01-20','9444444444','Pollen','Skin Allergy','AB+'),(5,6,'Male','1992-09-18','2026-01-20','9555555555','None','Heart Disease','O-'),(6,17,'MALE','2000-12-02','2026-01-27','3741237981','polen','diabetis','o+'),(7,27,'MALE','2008-06-18','2026-02-03','8591081463','','','o+'),(8,28,'MALE','2000-06-12','2026-02-04','1111111111','polen','diabetis','O-');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int NOT NULL,
  `symptoms` text,
  `diagnosis` text,
  `prescription` text,
  `remarks` text NOT NULL,
  `report_date` date NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `fk_report_appointment` (`appointment_id`),
  CONSTRAINT `fk_report_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,1,'Chest pain','Heart Disease','Beta blockers','Stable','2026-01-20'),(2,2,'Skin rash','Skin Allergy','Antihistamine','Avoid allergens','2026-01-20'),(3,3,'Short breath','Heart Disease','ECG + meds','Follow up','2026-01-20'),(4,4,'Itching','Skin Allergy','Ointment','Improving','2026-01-20'),(5,5,'High BP','Heart Disease','BP meds','Monitor BP','2026-01-20');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(2,'PATIENT'),(3,'DOCTOR');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialization`
--

DROP TABLE IF EXISTS `specialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialization` (
  `specialization_id` int NOT NULL AUTO_INCREMENT,
  `specialization_name` varchar(100) NOT NULL,
  PRIMARY KEY (`specialization_id`),
  UNIQUE KEY `specialization_name` (`specialization_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialization`
--

LOCK TABLES `specialization` WRITE;
/*!40000 ALTER TABLE `specialization` DISABLE KEYS */;
INSERT INTO `specialization` VALUES (1,'Cardiology'),(4,'Dermatology'),(2,'Neurology'),(3,'Orthopedics'),(5,'Pediatrics');
/*!40000 ALTER TABLE `specialization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `rid` int DEFAULT NULL,
  `uname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text,
  `aadhaar` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uname` (`uname`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `adhaar` (`aadhaar`),
  KEY `fk_user_role` (`rid`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'admin01','System','Admin','admin@123','9000000001','admin@care.com','Admin Block','111122223333'),(2,2,'pat01','Amit','Shah','pat@123','9000000002','amit@care.com','Delhi','222233334444'),(3,2,'pat02','Neha','Verma','pat@123','9000000003','neha@care.com','Mumbai','333344445555'),(4,2,'pat03','Rahul','Mehta','pat@123','9000000004','rahul@care.com','Ahmedabad','444455556666'),(5,2,'pat04','Priya','Singh','pat@123','9000000005','priya@care.com','Jaipur','555566667777'),(6,2,'pat05','Karan','Patel','pat@123','9000000006','karan@care.com','Surat','666677778888'),(7,3,'doc01','Dr Ramesh','Kumar','doc@123','9000000007','ramesh@care.com','Doctor Qtr','777788889999'),(8,3,'doc02','Dr Sunita','Rao','doc@123','9000000008','sunita@care.com','Doctor Qtr','888899990000'),(9,2,'abc','a','z','abc','1234567890','abc@gmail.com','pune',NULL),(10,2,'def','d','z','123','1241454124','def@gmail.com','pune',NULL),(11,2,'ghi','g','i','ghi','1234561234','ghi@gmail.com','pune',NULL),(12,2,'jkl','j','l','Lkj@1234567','1234765412','jkl@gmail.com','pune',NULL),(13,3,'rajs','raj','sharma','Raj@123456','2222222222','raj@gmail.com','nashik','121212121212'),(14,2,'patient11','Akash','Patil','Akash@123','3333333333','akash@gmail.com','pune','222222222222'),(15,2,'patient12','sandeep','patil','Sandeep@123','4564561231','sandeep@gmail.com','pune','121212345678'),(16,2,'patient13','ramesh','shinde','Ramesh@123','2121212567','ramesh@gmail.com','pune','231456687864'),(17,2,'pat15','sai','patil','Sai@1234','2146572942','sai@gmail.com','nashik','157254980126'),(23,3,'doc17','rajas','dhake','Rajas@123','3333333312','rajas@gmail.com','','122756422421'),(24,3,'doc18','sham','patil','Pass@12345','6666666666','sham@gmail.com','pune','555555555555'),(25,3,'doctor20','abhijeeet','jadhav','Abhijeet@123','1234456789','abhi@gmail.com','nashik','123456789011'),(26,3,'doc05','Gaurav','Shiromani','Gaurav@123','1221234567','Gaurav@gmail.com','Mumbai','216534775534'),(27,2,'pat11','Gaurav','Shiroman','Sk@54321','8791081463','samarth@gmail.com','pune','774517939811'),(28,2,'digvijay','Digivjay','Lohar','Digvijay@123','9988776655','digvijay@gmail.com','Pune','120912091209'),(29,3,'Doc10','Rushi','Jadhav','Rushi@123','1234512345','Rushi@gmail.com','Nashik','121243456748');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-05 15:16:03
