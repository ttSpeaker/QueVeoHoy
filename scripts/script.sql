CREATE DATABASE queVeoHoy;

USE queVeoHoy;

CREATE TABLE `pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `duracion` INT DEFAULT NULL,
  `director` varchar(400) DEFAULT NULL,
  `anio` INT DEFAULT NULL,
  `fecha_lanzamiento` DATE DEFAULT NULL,
  `puntuacion` INT DEFAULT NULL,
   `poster` varchar(300) DEFAULT NULL,
   `trama` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`id`)
);