var fs = require('fs');
var qs = require('querystring');
//var db = require('./database.js');
var gestor = require("./gestor.js");
function newWorld(response, postData){
	console.log("Petición para newWorld realizada");

	var body = '<html>'+
    '<head>'+
    '</head>'+
    '<body>'+
    '<form action="/start" method="post">'+
    '<input type="text" name="generator-settings" placeholder="Opciones de generación"> <br />'+
	'<input type="text" name="op-permission-level" placeholder="Nivel de permisos de usuarios OP"> <br />'+
	'<input type="text" name="allow-nether" placeholder="Permitir nether"><br />'+
	'<input type="text" name="level-name" placeholder="Nombre para el mundo"> <br />'+
	'<input type="text" name="enable-query" placeholder="Activar querys"> <br />'+
	'<input type="text" name="allow-flight" placeholder="Permitir vuelo"> <br />'+
	'<input type="text" name="announce-player-achievements" placeholder="Anunciar logros"> <br />'+
	'<input type="text" name="rcon.password" placeholder="Contraseña de Rcon"> <br />'+
	'<input type="text" name="server-port" placeholder="Puerto del servidor"> <br 	/>'+
	'<input type="text" name="query.port" placeholder="Puerto para querys"> <br />'+
	'<input type="text" name="level-type" placeholder="Tipo de mundo"> <br />'+
	'<input type="text" name="enable-rcon" placeholder="Activar rcon"> <br />'+
	'<input type="text" name="force-gamemode" placeholder="Forzar modo de juego"> <br />'+
	'<input type="text" name="level-seed" placeholder="Seed del mundo"> <br />'+
	'<input type="text" name="server-ip" placeholder="Ip del servidor"> <br />'+
	'<input type="text" name="max-build-height" placeholder="Nivel máximo de construccion"> <br />'+
	'<input type="text" name="spawn-npcs" placeholder="Activar spawn de NPCS"> <br />'+
	'<input type="text" name="debug" placeholder="Activar debug"> <br />'+
	'<input type="text" name="white-list" placeholder="Activar VIP"> <br />'+
	'<input type="text" name="spawn-animals" placeholder="Activar spawn de animales"> <br />'+
	'<input type="text" name="snooper-enabled" placeholder="Activar snooper"> <br />'+
	'<input type="text" name="hardcore" placeholder="Activar hardcore"> <br />'+
	'<input type="text" name="online-mode" placeholder="Activar online"> <br />'+
	'<input type="text" name="resource-pack" placeholder="Pack de texturas"> <br />'+
	'<input type="text" name="pvp" placeholder="Activar pvp"> <br />'+
	'<input type="text" name="difficulty" placeholder="Dificultad del mundo"> <br />'+
	'<input type="text" name="enable-command-block" placeholder="Activar bloque de comandos"> <br />'+
	'<input type="text" name="player-idle-timeout" placeholder="Tiempo máximo de inactividad para jugadores"> <br />'+
	'<input type="text" name="gamemode" placeholder="Modo de juego"> <br />'+
	'<input type="text" name="max-players" placeholder="Jugadores máximos"> <br />'+
	'<input type="text" name="rcon.port" placeholder="Puerto de Rcon"> <br /> '+
    '<input type="text" name="spawn-monsters" placeholder="Activar spawn de monstruos"> <br /> '+
	'<input type="text" name="view-distance" placeholder="Distancia de visión"> <br /> '+
	'<input type="text" name="generate-structures" placeholder="Activar generación de estructuras"> <br /> '+
	'<input type="text" name="motd" placeholder="Descripción del mundo"> <br /> '+

    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
 /*
   fs.readFile('pagina.html',function (err, data){
        response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        response.write(data);
        response.end();
    });
*/
}

function start(response, postData){
		console.log('Petición enviada al gestor');
	gestor.gestor('createWorld',postData, response, function(){
		response.end();
	})
	/*
	var server = spawn('java',['-Xmx1024M','-Xms1024M','-jar','minecraft_server.jar'])

	io.sockets.on('connection', function(socket){
		console.log('conectado')
	socket.on('data', function (){
		console.log('evento');
	})
	
	server.stdout.on('data', function (data) {
			if (data) {
				io.sockets.emit('console', ""+data);
				response.write(data);
				console.log(data);
			}
		});

	server.stderr.on('data', function (data) {
			if (data) {
				io.sockets.emit('console', ""+data);
				console.log(data);
			}
		});
	
})
	

	var conn = new Rcon('localhost', 25575, 'encore');
	conn.on('auth', function() {
	  console.log("Authed!");
	}).on('response', function(str) {
	console.log(str);

	}).on('end', function() {
	  console.log("Socket closed!");
	  process.exit();
	  response.end();
	}).on('data', function(data){
	    console.log(data);
	});

	conn.connect();


	response.end();
		*/

}


function storeInDB(response, postData){
	/*
	var POST = qs.parse(postData);
	json = JSON.stringify(POST);
	json2 = JSON.parse(json);
	console.log('Guardado en base de datos ' + json);
	db.insert(json2,'worldList','mongoDB');
	response.end();
	*/
}

exports.newWorld = newWorld;
exports.storeInDB = storeInDB;
exports.start = start;
