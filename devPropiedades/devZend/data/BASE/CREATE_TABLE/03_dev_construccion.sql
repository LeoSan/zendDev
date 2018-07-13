
/*Table structure for table `dev_construccion` */

DROP TABLE IF EXISTS `dev_construccion`;

CREATE TABLE `dev_construccion` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave Primaria',
  `nom_const` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo nombre construccion',
  `clave_consts` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo clave construcci�n',
  `des_consts` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo descripci�n',
  `fecha_update` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Campo Fecha update',
  `co_user` int(11) DEFAULT NULL COMMENT 'Campo Clave foranea',
  `estatus` varchar(10) COLLATE utf8_spanish_ci DEFAULT 'ACTIVO' COMMENT 'Campo indica si esta activo o no',
  `delegacion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo indica delegacion',
  `colonia` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo indica la colonia',
  `calle` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo indica la calle',
  `latitud` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo latitud',
  `longitud` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo longitud',
  `icono` varbinary(20) DEFAULT 'construc.png' COMMENT 'Campo para el icono',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Permite administrar las construcciones ';
