<?php
/**
 * @author Leonard Cuenca <cuenca623@gmail.com>
 * @company Talento
 * @deprecated Esta clase me permite generalizar y conectar con distintas bases de datos
 * @access public
 *
 */
class Pendum_Db_DbFactory
{
	const ORACLE = 'oracle';
	
	public function __construct(){}
	
	public static function factory($manejador)
	{
		switch($manejador) {

			case 'dbmysql':
			    return Pendum_Db_Mysql::getInstance();
				break;

		}
	}
	
	static protected $instance = null;
	
	public static function getInstance()
	{
		if (!isset(self::$instance)) {
			self::$instance = new self();
		}
		
		return self::$instance;
	}

	

}
?>