var server = require("./servidorWeb.js");
var router = require("./router.js");
var requestHandler = require("./requestHandler.js");
var handle = {}

handle["/newWorld"] = requestHandler.newWorld;
handle["/storeInDB"] = requestHandler.storeInDB;
handle["/start"] = requestHandler.start;


server.iniciar(router.route, handle);
