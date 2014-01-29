$(document).ready(function () {
	
	$.ajax({
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
	});
});