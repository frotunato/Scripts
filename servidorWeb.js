var http = require('http');
var fs = require('fs');
var url = require('url');
var router = require('./router.js');
var requestHandler = require('./requestHandler.js');
var qs = require('querystring');

/*
var handle = {};

handler['/startJob'] = requestHandler.startJob;
handler['/stopJob'] = requestHandler.stoptJob;
handler['/newWorld'] = requestHandler.newWorld(); 
*/
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
/*
  http.createServer(function (request, response) {
  router.route(handler,pathname,response);



    fs.readFile('pagina.html',function (err, data){
        response.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        response.write(data);
        response.end();
    });

}).listen(8000);


*/

/* var pathname = url.parse(request.url).pathname;
    var body ='';
  	request.on('data', function (data){
    body += data;
  });

    request.on('end', function () {
            var POST = qs.parse(body);
            json_info = JSON.stringify(POST);
            console.log("Datos recibidos:"+ json_info);
          });
*/
