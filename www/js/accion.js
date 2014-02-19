$(document).ready(function () {

	/*$(document).bind('deviceready', function(){
		//Phonegap ready
		onDeviceReady();
	});*/

	$.ajax({
		type: 'POST',
		url : "https://roinet.pe/facebook/app_ayahuasca/reserva/index.php/mobile_controller/leer_data_face",
		success : function(data) {
			var a = String(data);
			alert(a)
			if(a == "<iframe src='https://roinet.pe/facebook/app_ayahuasca/reserva/index.php/mobile_controller/login_face' id='chan'></iframe>"){
				$("#cont_face").html(a);
			}
			else if(a != 0){
				$.mobile.changePage("#datos");
			}
		},
		error: function(data){
			console.log(data);
        }
	});
	  
	
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

	$("body").on('click', '#facebook', function(e){
		/*var frame = document.getElementById('chan');
		var txt = frame.contentWindow.document.getElementById('idface').value;
		alert(txt);*/
		$.ajax({
			type: 'POST',
			url : "https://roinet.pe/facebook/app_ayahuasca/reserva/index.php/mobile_controller/login_face",
			success : function(data) {
				//var a = String(data);
				//top.location(a);
				alert(data);
	        }
		});
		//FB.login();
	});


	/*$("body").on('click', '#btn_entrar_dni', function(e){
		$.mobile.changePage("#datos");
	});

	$("body").on('click', '#btn_reservar', function(e){
		var nom = $('#nombre').val();
		var cant = $('#cantidad').val();
		var fecha = $('#fecha').val();
		var hora = $('#hora').val();
		
		$('#name_ok').html(nom);
		$('#cantidad_ok').html(cant);
		$('#fecha_ok').html(fecha);
		$('#hora_ok').html(hora);

		$.mobile.changePage("#datos_listo");
		
	});*/
});

/*
//funcion de login fb
function promptLogin() {
  FB.login(null, {scope: 'email'});
}*/
