$(document).ready(function() {

	// When login button is clicked.
    $('#login').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
		
        if ($.trim(username).length > 0 && $.trim(password).length > 0) {
        	$.ajaxSetup({cache: false});
			
			alert("button hit
			
			//var posting = $.post('http://localhost:3000/login', {'username': username, 'password': password});

        } else {
            $('#error').html('<span class="error">Error:</span> Ingrese Nombre de usuario y Password.');
        }
        return false;
    });
});
