// ejemplo url para login o registro:  http://localhost:3000/login/?name=hugo&pass=1111

var http = require('http');
var url = require('url');

var puerto = 3000;

var Modulo = require('./Modulos');
	
	
http.createServer(function (req, res) {
	
	var my_msjs;
	var i=1, a=1;
	
	var query = url.parse(req.url,true).query;
	
    res.writeHead(200, {'Content-Type': 'text/html'});
    //console.log(req.url);
	
	if(req.url.indexOf("/registro") > -1 ){ //si la URL comienza con /registro
		
        res.write(Modulo.registro(query.name, query.pass));
    }
	
	if(req.url.indexOf("/login") > -1 ){ //si la URL comienza con /login 
		
		console.log("entró en Login");
		
		var result;
		result = Modulo.login(query.name,query.pass); // modulo.login resuelve si el usuario existe. 	
		
		if (result == 0) //si result es 0 entonces el usuario no existe
			
			res.write('<p style="color:#3339ff";>El usuario: ' + query.name + ' no esta registrado.</p>');
			
		else if (result == 1 ) //si modulo.login retorna 1 es porque la conmtraseña es incorrecta. muesto msj.
			{
				res.write('<body><p style="color:#FF0000";>La contrasenia ingresada no es valida.</p></body>');
			}
		else // usuario existe
			{ 
			
				res.write('<p style="color:#008000";>' + query.name + ' logueado correctamente!</p>');
				
				my_msjs = Modulo.mensajes(query.name); // modulo.mensajes trae los mensajes del usuario logueado. 
				
				if (my_msjs === undefined || my_msjs.length == 0) // array vacio o no existe
				
					res.write('<p style="color:#3339ff";>No hay mensajes para mostrar...</p>');
					
				else 
					
					res.write('<body><p style="color:#3339ff";>Mis mensajes:</p>');
					
					for( i in my_msjs) //recorro el array de los mensajes para mostrarlos.
					{
						if (a == 1)
						{
							a++;
							res.write('<p style="color:#3339ff";>Contacto: ' + my_msjs[i] + '<br/>'); 
						}	
						else if(a == 2)
						{
							a++;
							res.write('Mensaje: ' + my_msjs[i] + '<br/>');
						}
						else if (a == 3)
						{
							a = 1;
							res.write('Fecha: ' + my_msjs[i] + '</p></body>');
							
						}
						
					}
		
			}
		
    }
	
	if(req.url.indexOf("/enviar") > -1 ){ //si la URL comienza con /enviar
		
		res.write(Modulo.enviar(query.emisor, query.receptor, query.msj));
		//URL de ejemplo para /enviar: http://localhost:3000/enviar/?emisor=hugo&receptor=elimer&msj=mensaje%20de%20prueba
    }
	
    res.end();

}).listen(puerto, function () {

  console.log( "Escuchando en el puerto " + puerto );

});
