var fs = require('fs');
var qs = require('querystring');
var database = require('./database.js');

function init(POST, callback){
	var serverProperties = qs.parse(POST);
	directory = serverProperties['level-name'];
	fs.mkdir(directory,function(){
			createFileFromJson(directory,serverProperties,function(message){
			console.log(message); 
        encodeJSON(serverProperties, function(data){
        database.insertToDB(data,'worldList','mongoDB');
      });
    });
    console.log('Directorio ' + directory + ' creado');
    callback('Mundo creado');
  });
}


function getWorldList(callback){
  database.queryAll('worldList','mongoDB', function(data){
     decodeJSON(data, function(decodedData){
           //console.log("DECODED DATA " + decodedData)
           callback(decodedData);
     })
  });
}

function getWorldInfo(id, callback){
  value = id.substring(3);
  //rawValue = JSON.parse(ids);
  // value = rawValue['id'];
  database.querySingleValue(value,'worldList','mongoDB',function(data){
    decodeJSON(data,function(decodedData){
      callback(decodedData);
    })
  })
}


function getWorldFields(value, callback){
  database.queryValues(value,'worldList', 'mongoDB', function(data){
    decodeJSON(data,function(decodedData){
      callback(decodedData);
    });
  });
}

function encodeJSON(json, callback){
    var rawJson = JSON.stringify(json);
    var modifiedJson = rawJson.replace(/\./g,'^');
    var finalJson = JSON.parse(modifiedJson);
    callback(finalJson);
}

function decodeJSON(jsonArray, callback){
    res = [];
    //console.dir(jsonArray);
    for (var i = jsonArray.length - 1; i >= 0; i--) {
      rawJson = JSON.stringify(jsonArray[i]);
      var modifiedJson = rawJson.replace(/\^/g,'.');
      var finalJson = JSON.parse(modifiedJson);
      res.push(finalJson);
    };
   // var rawJson = json.stringify(json);
    //JSON.parse(res);
    callback(res);
}

function readJson(worldLocation, callback){
    
    //imports
    var fs = require('fs');
    var readline = require('readline');
    var stream = require('stream');
   
    //variables
    var instream = fs.createReadStream(worldLocation + 'server.properties');
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    var json = {};

    //body
    rl.on('line', function(line) {
      var lineSplitted = line.split('=');
      if (lineSplitted.length == 2) { json[lineSplitted[0]] = lineSplitted[1]; }
    });
    rl.on('close',function(data){
      callback(message);
    });
    
}

function createFileFromJson(directory, data, callback){
	var outputFilename = directory + '/server.properties';
	var properties = JSON.stringify(data,'\n');
	prop1 = properties.replace(/"/g,'');
	prop2 = prop1.replace(/:/g,'=');
	prop3 = prop2.replace(/,/g,'\n');
	prop4 = prop3.replace(/[{}]/g, '');
	fs.writeFile(outputFilename, prop4, function(err) {
   		if(err) {
   			console.log(err);
  		} else {
    		console.log("JSON saved to " + outputFilename);
      		callback('file created');
   		}
	}); 
}

exports.init = init;
exports.getWorldList = getWorldList;
exports.getWorldFields = getWorldFields;
exports.getWorldInfo = getWorldInfo;
