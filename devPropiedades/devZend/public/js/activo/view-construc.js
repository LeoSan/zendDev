var procesoConstruc = {
    //Declaracion Variables
    EstruturaMesajeExito: '<div class="alert alert-success alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4>   </div>',
    EstruturaMesajeInfo: '<div class="alert alert-info alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajePeligro: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajeAdvertencia: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    mensajeExito01:  '! Almacenamiento exitoso de datos ¡',
    mensajePeligro01:  '! Falla en el proceso ¡',
    table:'',
    //Metodo Inicial
    init: function () {
        procesoConstruc.cargaDatos();
        procesoConstruc.validaTeclado();
        procesoConstruc.procesoGuardado();
        procesoConstruc.validaDeshabilitar();
        procesoConstruc.procesoMuestra();
        procesoConstruc.btnFormulario();
        procesoConstruc.btnRegresar();
        procesoConstruc.btnSalir();
        procesoConstruc.btnMapa();
        procesoConstruc.btnOtro();
    },// fin init

    cargaDatos:function () {
        $(document).ready( function () {
            procesoConstruc.table =  $('#dt_proveedor').DataTable( {
                processing: false, // esto permite realizar busqueda conectado con el servidor
                serverSide: false, // esto permite realizar busqueda conectado con el servidor
                ajax: {
                    url: baseUrl + "/controlactivos/index/obtener-json-construc",
                    dataSrc: 'data',
                    type: "POST",
                },
                columns: [
                    { data: "CODIGO",orderable: true, "width": "5%" },
                    { data: "CLAVE",orderable: true, "width": "5%" },
                    { data: "NOM_CONSTRU",orderable: true, "width": "5%" },
                    { data: "NOMBRE",orderable: true, "width": "5%" },
                    { data: "ACCION",orderable: false, "width": "5%" },
                ],
                language: {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": [
                        {
                            "sFirst": "Primero",
                            "sLast": "Ultimo",
                            "sNext": "Siguiente",
                            "sPrevious": "Anterior"
                        }
                    ],
                    "oAria": [
                        {
                            "sSortAscending": "Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": "UltiActivar para ordenar la columna de manera descendentemo"
                        }
                    ]
                },
                aaSorting: [[ 0, "desc" ]]
            } );
            //Permite agregar los campos para ser filtrados
            $('#dt_proveedor thead th').each( function (i) {
                if (i <($('#dt_proveedor thead th').length - 1) ){
                    var title = $(this).text();
                    $(this).html( '<input type="text" placeholder=" '+title+'" />' );
                }
            });
            procesoConstruc.table.columns().every( function () {
                var that = this;
                $( 'input', this.header() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that.search( this.value ).draw();
                    }
                } );
            });
            //Permite agregar los campos para ser filtrados

        } );
    },
    procesoGuardado: function () {
        // $(document).on("click", "#btnGuardar", function () {
            var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion

                jQuery.validator.addMethod("patron", function(value, element) {
                    return this.optional(element) || /^([P]{1}[C]{1}[O]{1}[M]{1})-([A-Z]{3})\/(\d{2})$/.test(value);
                }, "No cumple con la regla, Ejemplo: PCOM-XXX/##");

                $("#formConstruccion").validate({
                    event: "blur",
                    rules: {
                        inpNombre: {
                            required: true
                        },
                        inpClave: {
                            required: true,
                            patron: true
                        },
                        inpDes: {
                            required: true
                        },
                        inpDelegacion: {
                            required: true
                        },
                        inpColonia: {
                            required: true
                        },
                        inpCalle: {
                            required: true
                        },
                        inpLat: {
                            required: true
                        },
                        inpLog: {
                            required: true
                        },
                    },
                    messages: {
                        inpNombre: {
                            required: "Este campo es obligatorio.",
                        },
                        inpClave: {
                            required: "Este campo es obligatorio.",
                            patron: "No cumple con la regla, Ejemplo: PCOM-XXX/##",
                        },
                        inpDes: {
                            required: "Este campo es obligatorio.",
                        },
                        inpDelegacion: {
                            required: "Este campo es obligatorio.",
                        },
                        inpColonia: {
                            required: "Este campo es obligatorio.",
                        },
                        inpCalle: {
                            required: "Este campo es obligatorio.",
                        },
                        inpLat: {
                            required: "Este campo es obligatorio.",
                        },
                        inpLog: {
                            required: "Este campo es obligatorio.",
                        },
                    }
                    , debug: true
                    , errorElement: "label"
                    , submitHandler: function (form) {
                        var datosForm = $("#formConstruccion").serializeArray();
                        $.ajax({
                            type: "POST",
                            url: baseUrl + "/controlactivos/index/procesar-construccion",
                            processData: true,
                            data: datosForm,
                            dataType: "json",
                            success: function (data) {
                                procesoConstruc.metodoMensaje(data, 'btnGuardar', procesoConstruc.mensajeExito01, procesoConstruc.mensajePeligro01, 'msjRespuesta');
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
        // });
    },
    procesoMuestra: function () {
        $(document).on("click", ".btnAccionEdit", function () {

            var inpId = $(this).attr("data-id");
            var inpNombre = $(this).attr("data-NOM_PROVEEDOR");
            var inpDes = $(this).attr("data-DES_PROVEEDOR");
            var inpDelegacion = $(this).attr("data-UBICACION");
            var inpColonia = $(this).attr("data-NUM_CREDITO");
            var inpCalle = $(this).attr("data-NUM_CREDITO");
            var inpLat = $(this).attr("data-NUM_CREDITO");
            var inpLog = $(this).attr("data-NUM_CREDITO");

            $("#inpId").val(inpId);
            $("#inpNombre").val(inpNombre);
            $("#inpDes").val(inpDes);
            $("#inpCredito").val(inpCredito);


            $("#inptProceso").val("Editar");
            $("#btnGuardar").removeClass("btn-success");
            $("#btnGuardar").addClass("btn-primary");
            $("#form-bp1").removeClass("colored-header-success");
            $("#form-bp1").addClass("colored-header-primary");

            $("#spTitulomodalRegEdit").html("Editar");
            $("#sTituloBoton").html("Editar");
            $("#btnGuardar").removeAttr("disabled");
            $(".msjRespuesta").html(" ");

            $("#icoTitulo").removeClass("mdi-collection-plus");
            $("#icoTitulo").addClass("mdi-edit");

        });
    },
    btnFormulario: function () {
        $(document).on("click", "#btnRegistrar", function () {
            $.redirect( baseUrl + "/controlactivos/index/view-map-construc", {'usu': 'acceso'});

        });
    },
    btnOtro: function () {
        $(document).on("click", "#btnCargarOtro", function () {
            $.redirect( baseUrl + "/controlactivos/index/view-map-construc", {'usu': 'acceso'});

        });
    },
    btnRegresar: function () {
        $(document).on("click", "#btnRegresar", function () {
            $.redirect( baseUrl + "/controlactivos/index/view-construc", {'usu': 'acceso'});
        });
    },
    btnSalir: function () {
        $(document).on("click", "#btnSalir", function () {
            $.redirect( baseUrl + "/controlactivos/index/view-login", {'usu': 'acceso'});

        });
    },
    btnMapa: function () {
        $(document).on("click", "#btnVerMapa", function () {
            $.redirect( baseUrl + "/controlactivos/index/view-map", {'usu': 'acceso'});

        });
    },
    validaDeshabilitar: function () {
        $(document).on("click", ".btnAccionDel", function () {
            var id = $(this).attr("data-id");
            procesoConstruc.modalMensaje('Confirmación', '¿ Está seguro de deshabilitar ?', id, 'btnAccionDel');

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
                procesoConstruc.table.ajax.reload();

            }
        });

    },
    metodoMensaje: function (data, bonton, mensajeExito, mensajeFalse, divResp) {
        console.log(data);
        if (data.valida == 'true') {
            var str = procesoConstruc.EstruturaMesajeExito;
            var respHtml = str.replace("i_mensaje", mensajeExito);
            $("." + divResp ).html(respHtml);
            $("#" + bonton).attr('disabled', 'disable');
            //Refresco Datatable
            procesoConstruc.table.ajax.reload();
            $( ".md-close" ).trigger( "click" );

        }
        if (data.valida == 'false' && data.msj.length == 0 ) {
            var str = procesoConstruc.EstruturaMesajePeligro ;
            var respHtml = str.replace("i_mensaje", mensajeFalse);
            $("." + divResp).html(respHtml);
        }
        if (data.valida == 'false' && data.msj.length > 1 ) {
            var str = procesoConstruc.EstruturaMesajePeligro ;
            var respHtml = str.replace("i_mensaje", data.msj);
            $("." + divResp).html(respHtml);
        }
        return false;
    },
    validaTeclado: function () {
        var validaCamposTeclado = $(function () {
            $(".soloLetrasNum").keypress(function (e) {
                procesoConstruc.metodoTeclado(e, "soloLetrasNum", this);
            });
            $(".soloLetras").keypress(function (e) {
                procesoConstruc.metodoTeclado(e, "soloLetras", this);
            });

            $(".soloLetrasNumCar").keypress(function (e) {
                procesoConstruc.metodoTeclado(e, "soloLetrasNumCar", this);
            });

        });

    },
    metodoTeclado: function (e, permitidos, fieldObj, upperCase) {

        if (fieldObj.readOnly) return false;
        upperCase = typeof(upperCase) != 'undefined' ? upperCase : true;
        e = e || event;

        charCode = e.keyCode; // || e.keyCode;

        if ((procesoConstruc.is_nonChar(charCode)) && e.shiftKey == 0)
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
        var car_dos = "-/";

        //Los valores de las llaves del array representan los posibles valores permitidos
        var selectArray = new Array();
        selectArray['all'] = '';
        selectArray['num'] = numeros;
        selectArray['float'] = float;
        selectArray['soloLetrasNum'] = caracteres + numeros;
        selectArray['soloLetras'] = caracteres;
        selectArray['soloLetrasNumCar'] = caracteres + numeros + car_dos;

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
                    procesoConstruc.procesoDeshabilitar(valor);
                    dialog.close();
                    //Refresco Datatable
                    procesoConstruc.table.ajax.reload();

                }
            }]
        });

    },
    procesoLimpiar: function () {
        $(document).on("click", "#btnRegistrar", function () {

            document.getElementById("formConstruccion").reset();
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
procesoConstruc.init();