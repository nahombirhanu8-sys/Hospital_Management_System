-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 26, 2025 at 08:53 AM
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
-- Table structure for table `reception`
--

CREATE TABLE `reception` (
  `receptionId` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `salary` float DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reception`
--

INSERT INTO `reception` (`receptionId`, `name`, `address`, `email`, `salary`, `phone`, `password`) VALUES
(1, 'dagi', 'abcd', 'aman@gmail.com', 2000, 'aldfsdf', 'dagmawi'),
(2, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(3, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(4, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(5, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(6, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(7, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(8, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(9, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(10, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(11, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(12, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(13, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(14, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(15, NULL, NULL, NULL, NULL, NULL, 'sdfa'),
(16, NULL, 'Debre markos', NULL, NULL, NULL, NULL),
(17, NULL, NULL, 'dafsasdf@adf', NULL, NULL, NULL),
(18, 'asdf', NULL, NULL, NULL, NULL, NULL),
(19, NULL, NULL, NULL, 444, NULL, NULL),
(20, NULL, NULL, NULL, 4545, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reception`
--
ALTER TABLE `reception`
  ADD PRIMARY KEY (`receptionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reception`
--
ALTER TABLE `reception`
  MODIFY `receptionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
