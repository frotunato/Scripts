var server = require("./servidorWeb.js");
var router = require("./router.js");
var requestHandler = require("./requestHandler.js");
var handle = {}

handle["/newWorld"] = requestHandler.newWorld;
handle["/storeInDB"] = requestHandler.storeInDB;
handle["/create"] = requestHandler.create;
handle["/getWorldList"] = requestHandler.getWorldList;
handle["/panel"] = requestHandler.panel;
handle["/info"] = requestHandler.info;
handle["/modifyWorld"] = requestHandler.modifyWorld;

server.iniciar(router.route, handle);
