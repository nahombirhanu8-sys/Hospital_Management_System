-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 26, 2025 at 08:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `name` varchar(30) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `disease` varchar(30) DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL,
  `time` varchar(30) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `patientId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`name`, `address`, `phone`, `disease`, `date`, `time`, `doctorId`, `patientId`) VALUES
('amanuel', 'los', '1234', NULL, '23', '24', NULL, 2),
('amanuel', 'los', '1234', NULL, '23', '24', NULL, 3),
('Amanuel Tesfaye', 'USA', '0929507525', 'flu', '2025-05-14', '09:46', NULL, 6),
('Amanuel Tesfaye', 'USA', '0929507525', 'flu', '2025-05-14', '09:46', NULL, 7),
('Amanuel Tesfaye', 'USA', '0929507525', 'flu', '2025-05-14', '09:46', NULL, 9),
('Amanuel Tesfaye', 'USA', '0929507525', 'flu', '2025-05-14', '09:46', NULL, 11),
('Amanuel Tesfaye', 'USA', '0929507525', 'flu', '2025-05-14', '09:46', 2, 13),
('Amanuel Tesfaye', 'Debre markos', '0925856545', 'flu', '2025-05-14', '09:51', 2, 15),
('amanuel', 'los', '1234', NULL, '23', '24', NULL, 19),
('Amanuel Tesfaye', 'asdfasdf', '0925856545', 'flu', '2025-05-22', '07:56', 1, 26);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patientId`),
  ADD KEY `doctorId` (`doctorId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patientId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`doctorId`) REFERENCES `doctor` (`doctorId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
