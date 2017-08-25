-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2017 at 09:43 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `antrian`
--

-- --------------------------------------------------------

--
-- Table structure for table `antrian_cs`
--

CREATE TABLE `antrian_cs` (
  `id_antrian` int(11) NOT NULL,
  `notelp_pengantri` int(15) NOT NULL,
  `pelayan` int(11) NOT NULL,
  `status_antrian` enum('belum','sementara','sudah','tidak dilayani') NOT NULL,
  `jam_mulai` time NOT NULL,
  `jam_kelar` time NOT NULL,
  `tanggal_antri` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `antrian_cs`
--

INSERT INTO `antrian_cs` (`id_antrian`, `notelp_pengantri`, `pelayan`, `status_antrian`, `jam_mulai`, `jam_kelar`, `tanggal_antri`) VALUES
(1, 67846789, 0, 'sementara', '00:00:00', '00:00:00', '2017-08-19 08:18:58'),
(2, 464373, 0, 'belum', '00:00:00', '00:00:00', '2017-08-19 08:20:02'),
(3, 554745747, 1, 'belum', '11:00:00', '00:00:00', '2017-08-19 15:05:24'),
(4, 4444, 0, 'belum', '00:00:00', '00:00:00', '2017-08-20 14:48:42');

-- --------------------------------------------------------

--
-- Table structure for table `antrian_teller`
--

CREATE TABLE `antrian_teller` (
  `id_antrian` int(11) NOT NULL,
  `notelp_pengantri` int(15) NOT NULL,
  `pelayan` int(11) NOT NULL,
  `status_antrian` enum('belum','sementara','sudah','tidak dilayani') NOT NULL,
  `jam_mulai` time NOT NULL,
  `jam_kelar` time NOT NULL,
  `tanggal_antri` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `antrian_teller`
--

INSERT INTO `antrian_teller` (`id_antrian`, `notelp_pengantri`, `pelayan`, `status_antrian`, `jam_mulai`, `jam_kelar`, `tanggal_antri`) VALUES
(1, 43676932, 0, 'belum', '00:00:00', '00:00:00', '2017-08-19 11:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `log_antrian`
--

CREATE TABLE `log_antrian` (
  `id_log` int(11) NOT NULL,
  `no_antrian` int(11) NOT NULL,
  `notelp_pengantri` int(15) NOT NULL,
  `pelayan` int(11) NOT NULL,
  `status_antrian` enum('belum','sementara','sudah','tidak dilayani') NOT NULL,
  `jam_mulai` time NOT NULL,
  `jam_kelar` time NOT NULL,
  `tanggal_antri` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`) VALUES
(2, 'admin', 'admin'),
(8, 'administrator', '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `antrian_cs`
--
ALTER TABLE `antrian_cs`
  ADD PRIMARY KEY (`id_antrian`);

--
-- Indexes for table `antrian_teller`
--
ALTER TABLE `antrian_teller`
  ADD PRIMARY KEY (`id_antrian`);

--
-- Indexes for table `log_antrian`
--
ALTER TABLE `log_antrian`
  ADD PRIMARY KEY (`id_log`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `antrian_cs`
--
ALTER TABLE `antrian_cs`
  MODIFY `id_antrian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `antrian_teller`
--
ALTER TABLE `antrian_teller`
  MODIFY `id_antrian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `log_antrian`
--
ALTER TABLE `log_antrian`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
