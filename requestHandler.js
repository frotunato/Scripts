var fs = require('fs');
var qs = require('querystring');
var world = require("./world.js");
var database = require("./database.js");

function newWorld(response, postData){
	console.log("Petición para newWorld realizada");
		fs.readFile('./worldForm.html', function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end();
		}
		else {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.end(content, 'utf-8');
		}
	});
    
}

function panel(response, postData){
console.log("Petición para panel realizada");
fs.readFile('./panel.html', function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end();
		}
		else {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.end(content, 'utf-8');
		}
	});

}

function info(response,postData){
	console.log("Petición para info realizada");
	world.getWorldInfo(postData, function(data){
		response.end(JSON.stringify(data));
	})
}

function create(response, postData){
	world.init(postData, function(message){
		console.log(message);
		response.end();
	});	
}

function modifyWorld(response, postData){
	console.log("Petición para modifyWorldForm realizada");
		fs.readFile('./modifyWorldForm.html', function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end();
		}
		else {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.end(content, 'utf-8');
		}
	});
}

function getWorldList(response){
	fields = {'level-name':''};
	world.getWorldFields(fields,function(data){
		response.end(JSON.stringify(data));
		//response.end(data);
	});
	console.log('Petición realizada');
}

	
/*
function getWorldList(response){
	database.queryAll('worldList','mongoDB', function(data){
	response.write(data);
	resposne.end();
	console.log('Petición realizada');
	})
}
*/
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




exports.info = info;
exports.panel = panel;
exports.newWorld = newWorld;
exports.create = create;
exports.getWorldList = getWorldList;
exports.modifyWorld = modifyWorld;
