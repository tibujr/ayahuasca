$(document).ready(function () {

	var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
	var envmail = 0;
	var envres = 0;
	/*$(document).bind('deviceready', function(){
		//Phonegap ready
		onDeviceReady();
	});*/

	/*$.ajax({
		type: 'POST',
		dataType: 'json', 
		url : "https://roinet.pe/facebook/app_ayahuasca/reserva/index.php/mobile_controller/prueba",
		success : function(data) {
			//var objA = '[{"id":"1355946938","usu":"MAYCOL TO"},{"id":"684848144","usu":"ALEX CUSIHUAMAN QUISPE"}]';
			var obj = jQuery.parseJSON(JSON.stringify(data));
			var str = "";

			for(var i=0; i < obj.length; i++){
				str = str+" <li> <img src='http://graph.facebook.com/"+obj[i].id+"/picture?type=square'/></li>";
				str = str+" <li>"+obj[i].usu+"</li>";
			}

			$("#thelist").html(str);
		},
		error: function(data){
			console.log(data);
        }
	});*/

	$.ajax({
		type: 'POST',
		dataType: 'json', 
		url : "https://roinet.pe/facebook/app_ayahuasca/reserva/index.php/mobile_controller/get_datosinicio",
		success : function(data) {
			document.getElementById('fecha').value = data['fecha'];
			document.getElementById('f_hoy').value = data['fecha'];
		},
		error: function(data){
			console.log(data);
        }
	});


	$("body").on('click', '#btn_entrar_dni', function(e){

		if(envmail == 0){
			console.log(envmail)
			var correo = $("#mail").val();
			if( correo == "" || !emailreg.test(correo)){
				$("#mail").focus().after("<span class='menError'>Ingresa un E-mail válido</span>");
				return false;
			}else{
				envmail++;
				$.ajax({
					type: 'POST',
					dataType: 'json', 
					data: {correo : correo},
					beforeSend : function (){
		                $(".main").css({display: 'inline-block'});
		            },
					url: "https://roinet.pe/facebook/app_ayahuasca/reserva/index.php/mobile_controller/verificar_correo",
					success : function(data) {
						document.getElementById('nombre').value = data['usu'];

						$(".main").css({display: 'none'});
						envmail = 0;

						$.mobile.changePage("#datos");
					},
					error: function(data){
						console.log(data);
			        }
				});
			}
		}
	});

	$("#mail").keyup(function(){
		if( $(this).val() != "" && emailreg.test($(this).val())){
			$(".menError").fadeOut();			
			return false;
		}		
	});

	$("body").on('click', '#btn_reservar', function(e){
		
		if(envres == 0){
			var nom = $('#nombre').val();
			var mail = $('#mail').val();
			var cant = $('#cantidad').val();
			var fecha = $('#fecha').val();
			var hora = $('#hora').val();

			if( nom == "" ){
				$("#nombre").focus().after("<span class='menError'>Ingresa tu nombre</span>");
				return false;
			}else if( fecha < $('#f_hoy').val()){
				$("#fecha").focus().after("<span class='menError'>Verificar fecha</span>");
				return false;
			}else if( hora == 0){
				$("#hora").focus().after("<span class='menError'>Indicar hora de reserva</span>");
				return false;
			}else{
				envres++;
				$.ajax({
					type: 'POST',
					dataType: 'json', 
					data: {nom : nom, mail : mail, cant : cant, fecha : fecha, hora : hora},
					beforeSend : function (){
		                $(".main").css({display: 'inline-block'});
		            },
					url: "https://roinet.pe/facebook/app_ayahuasca/reserva/index.php/mobile_controller/guardar_reserva_sf",
					success : function(data) {
						$('#name_ok').html(nom);
						$('#cantidad_ok').html(cant);
						$('#fecha_ok').html(fecha);
						$('#hora_ok').html(hora);

						$(".main").css({display: 'none'});
						envres = 0;

						$.mobile.changePage("#datos_listo");
					},
					error: function(data){
						console.log(data);
			        }
				});
			}
		}
	});

	$("#nombre").keyup(function(){
		if( $(this).val() != "" ){
			$(".menError").fadeOut();			
			return false;
		}		
	});

	$("body").on('change', '#fecha', function(e){
		$(".menError").fadeOut();			
		return false;
	});

	$("body").on('change', '#hora', function(e){
		$(".menError").fadeOut();			
		return false;
	});

	$("body").on('click', '#btn_listo', function(e){
		var mail = $('#mail').val();
		document.getElementById('mail').value = mail;
		$.mobile.changePage("#inicio");
	});
});

