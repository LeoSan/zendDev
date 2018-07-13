<?php

class Controlactivos_Model_Activos
{

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite obtener el Json o Arreglo de los datos del catalogo del proveedor
     * @access public
     *
     */
    public function parseoJsonUsuario($type){
        $query = "SELECT * FROM devtest.dev_user AS A ORDER BY codigo";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->query($query);

        if ($type == 'Json'){
            foreach ($result['data'] as $key => $filas){
                $generaData = " data-NOM_USER = '".$filas['nom_user']."'";
                $generaData .= "  data-APE_USER = '".$filas['ape_user']."'";
                $generaData .= "  data-CORREo_USER = '".$filas['correo_user']."'";
                $generaData .= "  data-TIPO_USER = '".$filas['tipo_user']."'";

                $result['data'][$key]['ACCION']  = ($this->metodoGeneraBoton($filas['codigo'], $generaData, $filas['tipo_user']));
                $result['data'][$key]['CODIGO']  = $filas['codigo'];
                $result['data'][$key]['NOM_USER']  = $filas['nom_user'];
                $result['data'][$key]['APE_USER']  = $filas['ape_user'];
                $result['data'][$key]['CORREO_USER']  = $filas['correo_user'];
                $result['data'][$key]['TIPO']  = $filas['tipo_user'];
            }
            return json_encode($result);
        }else{
            return $result;
        }

    }
    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite obtener el Json o Arreglo de los datos del catalogo del proveedor
     * @access public
     *
     */
    public function parseoJsonConstruc($type, $condicion = null){
        $query = "SELECT CONST.*, CONCAT(U.`ape_user`, '', U.`nom_user`) AS NOMBRE, U.`correo_user` FROM `devtest`.`dev_construccion` AS CONST 
                    INNER JOIN `devtest`.`dev_user` AS U ON U.codigo = CONST.`co_user`
                    ".$condicion." ORDER BY CONST.`fecha_update` ";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->query($query);

        if ($type == 'Json'){
            foreach ($result['data'] as $key => $filas){
                $generaData = " data-CODIGO = '".$filas['codigo']."'";
                $generaData .= "  data-CLAVE = '".$filas['clave_consts']."'";
                $generaData .= "  data-NOM_CONSTRU = '".$filas['nom_const']."'";
                $generaData .= "  data-DESC = '".$filas['des_consts']."'";
                $generaData .= "  data-NOMBRE = '".$filas['NOMBRE']."'";
                $generaData .= "  data-CORREO = '".$filas['correo_user']."'";
                $generaData .= "  data-ESTATUS = '".$filas['estatus']."'";

                $result['data'][$key]['CODIGO']  = $filas['codigo'];
                $result['data'][$key]['CLAVE']  = $filas['clave_consts'];
                $result['data'][$key]['NOM_CONSTRU']  = $filas['nom_const'];
                $result['data'][$key]['DESC']  = $filas['des_consts'];
                $result['data'][$key]['NOMBRE']  = $filas['NOMBRE'];
                $result['data'][$key]['CORREO']  = $filas['correo_user'];
                $result['data'][$key]['ACCION']  = ($this->metodoGeneraBoton($filas['codigo'], $generaData, $filas['estatus']));
            }
            return json_encode($result);
        }else{
            return $result;
        }

    }


//Insert - Edit - Deshabilitar ***** Metodos para procesar

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite insertar los valores en la tabla ->ACTPROVEEDOR
     * @access public
     *
     */
    public function procesarLogin($params){
        $query ="SELECT * FROM devtest.dev_user AS A WHERE A.correo_user = '".$this->limpiaValor($params['inpUsuario'])."' AND A.pass_user = '". md5($this->limpiaValor($params['inpPass'])) ."'";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $typeResponses = count($dbmysqlFactory->query($query));
        return $this->metodoResultado($typeResponses);
    }

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite insertar los valores en la tabla ->ACTPROVEEDOR
     * @access public
     *
     */
    public function procesarUsuario($params){
        $params2['inpUsuario']= $this->limpiaValor($params['inpCorreo']);
        $params2['inpPass']= $this->limpiaValor($params['inpPassReg2']);
        $respValida = $this->procesarLogin($params2);
        $respValida = json_decode($respValida);

        if ($respValida->valida == 'false' ){
            $query ="INSERT INTO `devtest`.`dev_user` (`nom_user`, `ape_user`, `pass_user`, `correo_user`, `tipo_user`) VALUES ('".$this->limpiaValor($params['inpNombre'])."', '".$this->limpiaValor($params['inpApellido'])."', '".md5($this->limpiaValor($params['inpPassReg2']))."', '".$this->limpiaValor($params['inpCorreo'])."', 'ADMIN'); ";
            $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
            $typeResponses = count($dbmysqlFactory->set($query));
            return $this->metodoResultado($typeResponses);
        }else{
            $result['valida'] = 'false';
            $result['msj'] = 'Este usuario ya existe';
            return json_encode($result);
        }

    }
    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite insertar los valores en la tabla ->ACTPROVEEDOR
     * @access public
     *
     */
    public function procesarConstruccion($params){
        $condicion = "WHERE CONST.`clave_consts` = '".$params['inpClave']."'";
        $respValida = $this->parseoJsonConstruc('arrays', $condicion);

        if ( count($respValida['data']) == 0 ){
             $query ="INSERT INTO `devtest`.`dev_construccion` ( `nom_const`, `clave_consts`, `des_consts`, `co_user`, `delegacion`, `colonia`, `calle`, `latitud`, `longitud`) 
                                                          VALUES ('".$this->limpiaValor($params['inpNombre'])."' , '".$params['inpClave']."' , '".$this->limpiaValor($params['inpDes'])."' , '1' , '".$this->limpiaValor($params['inpDelegacion'])."' , '".$this->limpiaValor($params['inpColonia'])."' , '".$this->limpiaValor($params['inpCalle'])."' , '".$this->limpiaValor($params['inpLat'])."' , '".$this->limpiaValor($params['inpLog'])."');";

            $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
            $typeResponses = count($dbmysqlFactory->set($query));
            return $this->metodoResultado($typeResponses);
        }else{
            $result['valida'] = 'false';
            $result['msj'] = 'Esta construcción ya existe';
            return json_encode($result);
        }

    }

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite insertar los valores en la tabla ->ACTPROVEEDOR
     * @access public
     *
     */
    public function createXmlMarker($ruta){
        try {
        $arreglo = $this->parseoJsonConstruc('Arrays', '');

        $xml = new DomDocument('1.0', 'UTF-8');
        $node = $xml->createElement("markers");
        $parnode = $xml->appendChild($node);

      //header("Content-type: text/xml");
      foreach ($arreglo['data'] as $filas){
            // Add to XML document node
            $node = $xml->createElement("marker");
            $newnode = $parnode->appendChild($node);
            $newnode->setAttribute("id",$filas['codigo']);
            $newnode->setAttribute("name",$filas['nom_const']);
            $newnode->setAttribute("calve",$filas['clave_consts']);
            $newnode->setAttribute("address", $filas['delegacion'].''.$filas['colonia'].''.$filas['calle']);
            $newnode->setAttribute("lat", $filas['latitud']);
            $newnode->setAttribute("lng", $filas['longitud']);
            $newnode->setAttribute("type", 'restaurant');
        }

            $xml->formatOutput = true;
            $strings_xml  = $xml->saveXML();
            print_r($strings_xml);
            exit;
            //Finalmente, guardarlo en un directorio:
            $xml->save("/xml/mapmarkers2.xml");

        } catch (SDO_Exception $e) {
            print($e->getMessage());
        }


    }
    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite insertar los valores en la tabla ->ACTPROVEEDOR
     * @access public
     *
     */
    public function obtenerJsonCoordenadas(){
        try {
            $arreglo = $this->parseoJsonConstruc('Arrays', '');
            $coordenadas = array();

            if ($arreglo['data'] > 0){
                foreach ($arreglo['data'] as $key => $filas){
                    $coordenadas[$key] = array($filas['codigo'],$filas['nom_const'],$filas['clave_consts'],"Delegacion: ".$filas['delegacion'].', Colonia: '.$filas['colonia'].', Calle :'.$filas['calle'], $filas['latitud'], $filas['longitud'], $filas['icono']);
                }
            }
            return json_encode($coordenadas);
        } catch (SDO_Exception $e) {
            print($e->getMessage());
        }


    }



//Metodos  - Metodos del Modelo para facilitar operaciones

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite generar una respuesta para Json
     * @access public
     *
     */
    public function metodoResultado($typeResponses){
        if($typeResponses >= 1){
            $result['valida'] = 'true';
            $result['msj'] = '';
        }else{
            $result['valida'] = 'false';
            $result['msj'] = '';
        }
        return json_encode($result);
    }

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite generar botones para el apoyo de la vista
     * @access public
     *
     */
    public function metodoGeneraBoton($id, $generaData, $status){

        if ($status != 'DELETE'){
            $string  = "<span class='glyphicon glyphicon-pencil btnAccionEdit' data-id='".$id."' title='Editar este registro' data-toggle='modal' data-target='#form-bp1' ".$generaData." ></span>";
            $string .= "<span class='glyphicon glyphicon-remove btnAccionDel'  data-id='".$id."' title='Deshabilitar este registro' ></span>";
        }else{
            $string = "<span class='glyphicon glyphicon-eye-close'  data-id='".$id."' title='Registro deshabilitado'></span>";
        }
        return $string;
    }

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite generar botones para el apoyo de la vista
     * @access public
     *
     */
    public function formarCeldas($arrays, $params){
        $string = '';
        foreach ($arrays as $filas){

            if ($filas['NOM_ESTATUS'] == 'RECHAZADA POR ADMIN' || $filas['NOM_ESTATUS'] == 'RECHAZADA POR  USUARIO' ){  $nomEstuloText = 'text-danger'; }else{ $nomEstuloText = 'text-success';}
            if ($filas['SEXO'] == 'M' ){  $nomAvatar = 'avatar4.png'; }else{ $nomAvatar = 'avatar6.png';}
            $string .= "<tr>
                            <td class='text-center user-avatar'><img src='".$params['url']."/images/assets/img/".$nomAvatar."' alt='Avatar'><h5>".ucwords(strtolower($filas['NOM_SOLICITANTE']))."</h5></td>
                            <td class='text-left'><h6>".$filas['COMENTARIO']."</h6></td>
                            <td>".$filas['FECHA_FORMATO']."</td>
                            <td><span class='".$nomEstuloText."'> ".$filas['NOM_ESTATUS']." </span></td>
                        </tr>";
        }
        return $string;
    }

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite formatear la fecha
     * @access public
     *
     */
    public function metodoFormateoFecha($fechaOriginal){
        $fechaDesfrag = explode('-', $fechaOriginal);
        $arrayMeses = array('01'=>'ENE', '02'=>'FEB', '03'=>'MAR', '04'=>'ABR', '05'=>'MAY', '06'=>'JUL', '07'=>'JUN', '08'=>'AUG', '09'=>'SEP', '10'=>'OCT', '11'=>'NOV', '12'=>'DIC');
        $fechaFinal = $fechaDesfrag[0]."-".$arrayMeses[$fechaDesfrag[1]]."-".$fechaDesfrag[2];
        return $fechaFinal;
    }
    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite Evitar las full inyecciones 
     * @access public
     *
     */
    public function limpiaValor($valor){

        $valor=strip_tags($valor);
        $valor=strtoupper($valor);//la paso a mayusculas necesito guardar todo en bases de datos en mayusculas
        //caracter especial
        $valor = str_replace(")", "", $valor);
        $valor = str_replace("(", "", $valor);
        $valor = str_replace("=", "", $valor);
        $valor = str_replace("+", "", $valor);
        $valor = str_replace("*", "", $valor);
        $valor = str_replace("&", "", $valor);
        $valor = str_replace("$", "", $valor);
        $valor = str_replace("%", "", $valor);
        $valor = str_replace("&&", "", $valor);
        $valor = str_replace("||", "", $valor);
        $valor = str_replace("AND", "", $valor);
        $valor = str_replace("OR", "", $valor);
        $valor = str_replace("DELETE", "", $valor);
        $valor = str_replace("SELECT", "", $valor);
        $valor = str_replace("DROP", "", $valor);
        $valor = str_replace("GRANT", "", $valor);
        $valor = str_replace("CREATE", "", $valor);
        $valor = str_replace("TRUNCATE", "", $valor);
        $valor = str_replace("UPDATE", "", $valor);
        $valor = str_replace("TABLE", "", $valor);
        $valor = htmlentities($valor);
        return $valor; 
    }

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company --
     * @description Permite dar formato a la moneda
     * @access public
     *
     */
    public function amoneda($numero, $moneda){
        $final = '';
        $sep   = '';
        $longitud = strlen($numero);
        $punto = substr($numero, -1,1);
        $punto2 = substr($numero, 0,1);
        $separador = ".";
        if($punto == "."){
            $numero = substr($numero, 0,$longitud-1);
            $longitud = strlen($numero);
        }
        if($punto2 == "."){
            $numero = "0".$numero;
            $longitud = strlen($numero);
        }
        $num_entero = strpos ($numero, $separador);
        $centavos = substr ($numero, ($num_entero));
        $l_cent = strlen($centavos);
        if($l_cent == 2){$centavos = $centavos."0";}
        elseif($l_cent == 3){$centavos = $centavos;}
        elseif($l_cent > 3){$centavos = substr($centavos, 0,3);}
        $entero = substr($numero, -$longitud,$longitud-$l_cent);
        if(!$num_entero){
            $num_entero = $longitud;
            $centavos = ".00";
            $entero = substr($numero, -$longitud,$longitud);
        }

        $start = floor($num_entero/3);
        $res = $num_entero-($start*3);
        if($res == 0){$coma = $start-1; $init = 0;}else{$coma = $start; $init = 3-$res;}
        $d= $init; $i = 0; $c = $coma;
        while($i <= $num_entero){
            if($d == 3 && $c > 0){$d = 0; $sep = ","; $c = $c-1;}else{$sep = "";}
            $final .=  $sep.$entero[$i];
            $i = $i+1; // todos los digitos
            $d = $d+1; // poner las comas
        }
        if($moneda == "pesos")  {$moneda = "$";
            return $moneda." ".$final.$centavos;
        }
        elseif($moneda == "dolares"){$moneda = "USD";
            return $moneda." ".$final.$centavos;
        }
        elseif($moneda == "euros")  {$moneda = "EUR";
            return $final.$centavos." ".$moneda;
        }
    }


}//fin del modelo
