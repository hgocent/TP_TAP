$(document).ready(function() {

	// When login button is clicked.
    $('#login').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
		
        if ($.trim(username).length > 0 && $.trim(password).length > 0) {
        	$.ajaxSetup({cache: false});
			
			//alert("hit the button");
			
			fetch('http://localhost:3000/login/?name=hugo&pass=1234') // esto le pega a la API ya que veo la respuesta en la consula de node.
			.then(response => response.json())
			.then(data => {
			
				alert(data); //no puedo corroborar si me esta devolviendo algo para despues manejarlo.
			});
		
			

        } else {
            $('#error').html('<span class="error">Error:</span> Ingrese Nombre de usuario y Password.');
        }
        return false;
    });
});
