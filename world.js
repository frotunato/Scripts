var fs = require('fs');
var qs = require('querystring');

function init(serverProperties, callback){
	var POST = qs.parse(serverProperties);
	json2 = JSON.parse(json);
	directory = json2['level-name'];
	fs.mkdir(directory,function(){
			createFileFromJson(directory,json2,function(message){
			console.log(message);
			})
		console.log('Directorio' + directory + ' creado');
	})
}



function readJson(worldLocation, callback){
    //imports
    var fs = require('fs');
    var readline = require('readline');
    var stream = require('stream');
    var result;
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
