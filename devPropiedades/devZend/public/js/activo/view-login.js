var procesoLogin = {
    //Declaracion Variables
    EstruturaMesajeExito: '<div class="alert alert-success alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4>   </div>',
    EstruturaMesajeInfo: '<div class="alert alert-info alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajePeligro: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajeAdvertencia: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    mensajeExito01:  '! Login exitoso ¡',
    mensajePeligro01:  '! valida tus credenciales ¡',
    mensajePeligro02:  '! Este usuario ya existe ¡',
    table:'',
    //Metodo Inicial
    init: function () {
        //eventos
        procesoLogin.procesoLogin();
        procesoLogin.procesoRegistroUsuario();
        procesoLogin.validaTeclado();

    },// fin init

    procesoLogin: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formLogin").validate({
                event: "blur",
                rules: {
                    inpUsuario: {
                        required: true,
                        email: true,
                    },
                    inpPass: {
                        required: true,
                    },
                },
                messages: {
                    inpUsuario: {
                        required: "Este campo es obligatorio.",
                        email: "Correo no valido",
                    },
                    inpPass: {
                        required: "Este campo es obligatorio.",
                    },
                }
                , debug: true
                , errorElement: "label"
                , submitHandler: function (form) {
                    var datosForm = $("#formLogin").serializeArray();
                     $.ajax({
                         type: "POST",
                         url: baseUrl + "/controlactivos/index/procesar-login",
                         processData: true,
                         data: datosForm,
                         dataType: "json",
                         success: function (data) {
                            if (data.valida == 'true'){
                                $.redirect( baseUrl + "/controlactivos/index/view-usuario", {'usu': $('#inpUsuario').val(), 'pass': $('#inpPass').val()});
                            }
                            if (data.valida == 'false'){
                                var str = procesoLogin.EstruturaMesajePeligro ;
                                var respHtml = str.replace("i_mensaje", procesoLogin.mensajePeligro01);
                                $("#info-login").html(respHtml);
                            }
                         }
                     });
                },
                errorPlacement: function (error, element) {
                    error.insertBefore(element.parent().next('div').children().first());
                },
                highlight: function (element) {
                    $(element).parent().next('div').show();
                    $(element).parent().next('div').addClass("error");
                    $(element).parent().find('span').addClass('glyphicon-red');
                },
                unhighlight: function (element) {
                    //$(element).parent().next('div').hide();
                    $(element).parent().find('span').removeClass('glyphicon-red');
                }
            })//fin del validate
        });//Esto permite transformar el validate en una funcion y encapsularla en la clase
    },
    procesoRegistroUsuario: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formRegistro").validate({
                event: "blur",
                rules: {
                    inpCorreo: {
                        required: true,
                        email: true,
                    },
                    inpNombre: {
                        required: true,
                    },
                    inpApellido: {
                        required: true,
                    },
                    inpPassReg: {
                        required: true,
                    },
                    inpPassReg2: {
                        equalTo: "#inpPassReg"
                    },
                },
                messages: {
                    inpCorreo: {
                        required: "Este campo es obligatorio.",
                        email: "Correo no valido",
                    },
                    inpNombre: {
                        required: "Este campo es obligatorio.",
                    },
                    inpApellido: {
                        required: "Este campo es obligatorio.",
                    },
                    inpPassReg: {
                        required: "Este campo es obligatorio.",
                    },
                    inpPassReg2: {
                        equalTo: "Las contraseñas deben ser iguales",
                    },
                }
                , debug: true
                , errorElement: "label"
                , submitHandler: function (form) {
                    var datosForm = $("#formRegistro").serializeArray();

                     $.ajax({
                         type: "POST",
                         url: baseUrl + "/controlactivos/index/procesar-usuario",
                         processData: true,
                         data: datosForm,
                         dataType: "json",
                         success: function (data) {
                            if (data.valida == 'true'){
                                alert("Se creo exitosamente la cuenta, por favor acceda");
                                $.redirect( baseUrl + "/controlactivos/index/view-login", {'inpCorreo': $('#inpCorreo').val()});
                            }
                            if (data.valida == 'false'){
                                var str = procesoLogin.EstruturaMesajePeligro ;
                                var respHtml = str.replace("i_mensaje", procesoLogin.mensajePeligro02);
                                $("#info-registro").html(respHtml);
                            }
                         }
                     });

                },
                errorPlacement: function (error, element) {
                    error.insertBefore( element.parent().next('div').children().first() );
                    //console.log("entro error");
                    //console.log(element);
                    console.log(error);
                },
                highlight: function (element) {
                    $(element).parent().next('div').show();
                    $(element).parent().next('div').addClass("error");
                    $(element).parent().find('span').addClass('glyphicon-red');
                },
                unhighlight: function (element) {
                    //$(element).parent().next('div').hide();
                    $(element).parent().find('span').removeClass('glyphicon-red');
                }
            })//fin del validate
        });//Esto permite transformar el validate en una funcion y encapsularla en la clase
    },
    validaDeshabilitar: function () {
        $(document).on("click", ".btnAccionDel", function () {
            var id = $(this).attr("data-id");
            procesoLogin.modalMensaje('Confirmación', '¿ Está seguro de deshabilitar ?', id, 'btnAccionDel');

        });
    },
    procesoDeshabilitar: function (valor) {
        $.ajax({
            type: "POST",
            url: baseUrl + "/controlactivos/index/procesar-proveedor",
            processData: true,
            dataType: 'json',
            data: {inptProceso: 'Deshabilitar', inpId: valor},
            success: function (data) {
                //Refresco Datatable
                procesoLogin.table.ajax.reload();

            }
        });

    },
    metodoMensaje: function (data, bonton, mensajeExito, mensajeFalse, divResp) {
        console.log(data);
        if (data.valida == 'true') {
            var str = procesoLogin.EstruturaMesajeExito;
            var respHtml = str.replace("i_mensaje", mensajeExito);
            $("." + divResp ).html(respHtml);
            $("#" + bonton).attr('disabled', 'disable');
            //Refresco Datatable
            procesoLogin.table.ajax.reload();
            $( ".md-close" ).trigger( "click" );

        }
        if (data.valida == 'false') {
            var str = procesoLogin.EstruturaMesajePeligro ;
            var respHtml = str.replace("i_mensaje", mensajeFalse);
            $("." + divResp).html(respHtml);
        }
    },
    validaTeclado: function () {
        var validaCamposTeclado = $(function () {
            $(".soloLetrasNum").keypress(function (e) {
                procesoLogin.metodoTeclado(e, "soloLetrasNum", this);
            });
        });

    },
    metodoTeclado: function (e, permitidos, fieldObj, upperCase) {

        if (fieldObj.readOnly) return false;
        upperCase = typeof(upperCase) != 'undefined' ? upperCase : true;
        e = e || event;

        charCode = e.keyCode; // || e.keyCode;

        if ((procesoLogin.is_nonChar(charCode)) && e.shiftKey == 0)
            return true;
        else if (charCode == '')
            charCode = e.charCode;

        if (fieldObj.value.length == fieldObj.maxLength) return false;

        var caracter = String.fromCharCode(charCode);

        // Variables que definen los caracteres permitidos
        var numeros = "0123456789";
        var float = "0123456789.";
        var caracteres = "  abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ";
        var car_especiales = ".-_()'\"/&";

        //Los valores de las llaves del array representan los posibles valores permitidos
        var selectArray = new Array();
        selectArray['all'] = '';
        selectArray['num'] = numeros;
        selectArray['float'] = float;
        selectArray['soloLetrasNum'] = caracteres + numeros;

        // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
        if ((selectArray[permitidos].indexOf(caracter) != -1) || (permitidos == 'all')) {
            return (true);
        }
        else {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        }
    },
    is_nonChar: function (charCode) {

        // 8 = BackSpace, 9 = tabulador, 13 = enter, 35 = fin, 36 = inicio, 37 = flecha izquierda, 38 = flecha arriba,
        // 39 = flecha derecha, 37 = flecha izquierda, 40 = flecha abajo 46 = delete.

        var teclas_especiales = [8, 9, 13, 35, 36, 37, 38, 39, 40, 46];
        // if ( jQuery.browser.msie) {
        //     return (false);
        // }
        for (var i in teclas_especiales) {

            if (charCode == teclas_especiales[i]) {
                return (true);
            }
        }
    },
    modalMensaje: function (titulo1, mensaje, valor, proceso) {

        BootstrapDialog.show({
            title: titulo1,
            message: mensaje,
            cssClass: 'prueba',
            type: 'type-danger',
            size: 'size-normal',
            closable: true,
            spinicon: 'glyphicon glyphicon-eur',
            buttons: [{
                id: 'btn-remove',
                icon: 'glyphicon glyphicon-remove',
                label: 'No',
                cssClass: 'btn-danger',
                action: function (dialog) {
                    dialog.close();
                }
            }, {
                id: 'btn-ok',
                icon: 'glyphicon glyphicon-check',
                label: 'Si',
                cssClass: 'btn-info',
                autospin: false,
                action: function (dialog) {
                    procesoLogin.procesoDeshabilitar(valor);
                    dialog.close();

                }
            }]
        });

    },
    procesoLimpiar: function () {
        $(document).on("click", "#btnRegistrar", function () {

            document.getElementById("formProveedor").reset();

            $("#btnGuardar").removeClass("btn-primary");
            $("#btnGuardar").addClass("btn-success");
            $("#form-bp1").removeClass("colored-header-primary");
            $("#form-bp1").addClass("colored-header-success");

            $("#spTitulomodalRegEdit").html("Registrar");
            $("#sTituloBoton").html("Registrar");
            $("#btnGuardar").removeAttr("disabled");
            $(".msjRespuesta").html(" ");

            $("#icoTitulo").removeClass("mdi-edit");
            $("#icoTitulo").addClass("mdi-collection-plus");

        });

    },


};
procesoLogin.init();