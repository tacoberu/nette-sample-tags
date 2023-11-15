-- --------------------------------------------
-- Schema
-- Created: 2023-11-15T02:20:09+00:00
-- Schema manage version: 0.11.44
-- Database: sportisimo
-- --------------------------------------------

SET NAMES utf8;
SET foreign_key_checks = 0;
SET time_zone = 'SYSTEM';
SET sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';


CREATE TABLE `tag` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(63) COLLATE utf8_czech_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

ALTER TABLE tag
	ADD CONSTRAINT tag_UN UNIQUE KEY (name);
