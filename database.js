var MongoClient = require('mongodb').MongoClient, format = require('util').format;

function insertToDB(value,collection,database){
	//connect 
	MongoClient.connect('mongodb://127.0.0.1:27017/' + database, function(err, db) {
    if (err) throw err;
    console.log("Connected to " + database);
	//insert 
	db.collection(collection).insert(value, function(err, records) {
		if (err) throw err;
		console.log("Record added as " + records[0]._id);
		db.close();
	});
});

}

function modifyDocument(oldValue,newValue,collection,database){
  //connect
  MongoClient.connect('mongodb://127.0.0.1:27017/' + database, function(err, db) {
    if(err) throw err;
    console.log("Connected to " + database);
    
  db.collection(collection).update(oldValue, newValue, {w:1}, function(err) {
  if(err) throw err;
  db.close();
    });
  });
}

function queryAll(collection,database){
  //connect
  MongoClient.connect('mongodb://127.0.0.1:27017/' + database, function(err, db) {
    data = [];
    if(err) throw err;
    console.log("Connected to " + database);
  	db.collection(collection).find({}).toArray(function(err,docs){
  		if(err){
  			throw err;
  		}
  		for (var i = docs.length - 1; i >= 0; i--) {
  			data.push(docs[i])
  		};
  		  	console.log(data);

  		db.close();
  	});
  	return data;
	}	
)};
 
exports.insert = insertToDB;
exports.modify = modifyDocument;
exports.queryAll = queryAll;

