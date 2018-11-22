

exports.registro = function(nomb,pass){ //Parametros del usuario y contrasenia
	var fs = require('fs'); // require para funcion readFile
	
	var usuarios; //array local para guardar los usuarios
	var json_users = fs.readFileSync('./Archivos/users.json'); //copio el archivo en formato string a una variable
	usuarios = JSON.parse(json_users); // paso los usuarios en formato json al array de usuarios local

	var reg=0; //subindice para recorrer.

   for (reg in usuarios) 
    {
		//console.log(usuarios[reg]);
		
        if ( (usuarios[reg].name).toUpperCase() == (nomb).toUpperCase() ) // si el usuario ya existe en el array no crea el usuario y muestra un mensaje. .toUpperCase()
        {
			//return "Usuario ya existe"; //texto sin color.
			//console.log(usuarios[reg].name + ' - ' + usuarios[reg].pass); // linea de debug
			return('<body><p style="color:#FF0000";>Usuario ya existe</p></body>'); //texto con color.

        }
    }
	// Si el for termina por completo quiere decir que no encontro nada en el archivo es decir que el usuario no existe, entonces lo ingresamos. 
	
	let NewUser = {  
    name: nomb,
    pass: pass
	};
	
	usuarios.push(NewUser);
		
	fs.writeFileSync('./Archivos/users.json', JSON.stringify(usuarios));  //write to json file

	
	//return "Usuario creado: " + nomb;//texto sin color
	return ('<body><p style="color:#008000";>Usuario creado: ' + nomb + '</p></body>'); //texto con color.
	//return "Usuario creado: " + usuarios[(usuarios.length)-1]; //si quiero mostrarlo del array
	
}

exports.login = function(nomb, pass){
	
	var fs = require('fs');

	var json_users = fs.readFileSync('./Archivos/users.json');
	var usuarios = JSON.parse(json_users);
	
	var reg=0; //subindice para recorrer.

	
    for (reg in usuarios) 
    {
		
        if((usuarios[reg].name) == nomb) // pongo en mayuscula para comparar.
        {	
			//si existe el usuario verifico contraseña
			
			if (usuarios[reg].pass == pass) // si contraseña concuerda con la registrada.
			{
				return 2; //usuario logueado correctamente.
			}
			else
			{
				return 1; // contraseña no es valida.
			}
			
        }
    }
	
	return 0 // si retorna 0 el usuario no existe en la base d datos.
	
}

exports.mensajes = function(name){ //la funcion retorna los mensajes del usuario pasado por parametro.
	
	var fs = require('fs');
	var json_msjs = fs.readFileSync('./Archivos/mensajes.json'); //copia del archivo json.
	var all_msjs = JSON.parse(json_msjs); // parseo el archivo json (copia ) para volcarlo al array.
	
	var my_msjs = []; //dimensiono otro array auxiliar para guardar los mensajes del usuario que quiero. (el usuario logueado)
	
	var reg=0; //subindice para recorrer.
	
    for (reg in all_msjs) 
    {
		if((all_msjs[reg].user).toUpperCase() == name.toUpperCase())
		{
			my_msjs.push(all_msjs[reg].emisor); // guardo contacto en array auxiliar.
			my_msjs.push(all_msjs[reg].msj); // guardo mensaje en array auxiliar.
			my_msjs.push(all_msjs[reg].date); // guardo mensaje en array auxiliar.
			
		}
		
	}
	
	return my_msjs;
}

exports.enviar = function(emisor, receptor, msj){

	var fs = require('fs');
	var json_msjs = fs.readFileSync('./Archivos/mensajes.json'); //copia del archivo json.
	var all_msjs = JSON.parse(json_msjs); // parseo el archivo json (copia) para volcarlo al array.
	
	
	let NewMsj = {  
    user: receptor,
    emisor: emisor,
	msj: msj,
	date: new Date()
	};

	all_msjs.push(NewMsj);
		
	fs.writeFileSync('./Archivos/mensajes.json', JSON.stringify(all_msjs));  //write to json file
	
	return ('<body><p style="color:#008000";>Mensaje nuevo enviado a ' + receptor + '</p></body>'); //texto con color.
}

exports.usuarios = function(){}

exports.contactos = function(){}





















