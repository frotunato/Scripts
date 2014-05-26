var http = require('http');
var fs = require('fs');
var url = require('url');
var router = require('./router.js');
var requestHandler = require('./requestHandler.js');
var qs = require('querystring');

  function iniciar(route, handle) {
  function onRequest(request, response) {
        var dataPosteada = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Peticion para " + pathname + " recibida.");

        request.setEncoding("utf8");

        request.addListener("data", function(trozoPosteado) {
          dataPosteada += trozoPosteado;
          console.log("Recibido trozo POST '" + trozoPosteado + "'.");
  		});

	    request.addListener("end", function() {
	      router.route(handle, pathname, response, dataPosteada);
	    });

  }


  http.createServer(onRequest).listen(4000);
  console.log("Servidor Iniciado");
}

exports.iniciar = iniciar;
