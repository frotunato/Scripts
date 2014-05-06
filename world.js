var MongoClient = require('mongodb').MongoClient, format = require('util').format;

function world(worldName, worldLocation) {
  this.worldName = worldName;
  this.worldLocation = worldLocation;
  autoBackup = false;
  
  getServerProperties(worldLocation, function(data){
    insertToDB({ worldLocation : worldLocation, autoBackupStatus : autoBackup, serverProperties : data },'worldList','mongoDB');
 });
    
  this.setAutoBackup = function(logicValue) {
  		if (logicValue == false){ this.autoBackup = false }
 		else { this.autoBackup = true };
 		}
 
  function getServerProperties(location, callback){
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
      callback(json);
    });
    
}

}

var world1 = new world('Mundo 1','/home/pi/worlds/world1/');
var world2 = new world('Mundo 1','/home/pi/worlds/world2/');
var world3 = new world('Mundo 1','/home/pi/worlds/world3/');


function insertToDB(value,collection,database){
	//connect 
	MongoClient.connect('mongodb://127.0.0.1:27017/' + database, function(err, db) {
    if (err) throw err;
    console.log("Connected to database");
	//insert 
	db.collection(collection).insert(value, function(err, records) {
		if (err) throw err;
		console.log("Record added as " + records[0]._id);
		db.close();
	});
});

}
