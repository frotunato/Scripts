var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var ObjectID = require('mongodb').ObjectID;

function insertToDB(value,collection,database){
	//connect 
	MongoClient.connect('mongodb://192.168.1.8:27017/' + database, function(err, db) {
    if (err) throw err;
    console.log("Connected to " + database + " to insert a document");
	//insert 
	db.collection(collection).insert(value, function(err, records) {
		if (err) throw err;
		console.log("Record added as " + records[0]._id);
		db.close();
    console.log("Closed connection to " + database);
	});
});

}

function modifyDocument(oldValue,newValue,collection,database){
  //connect
  MongoClient.connect('mongodb://192.168.1.8:27017/' + database, function(err, db) {
    if(err) throw err;
    console.log("Connected to " + database + " to modify a document");
    
    db.collection(collection).update(oldValue, newValue, {w:1}, function(err) {
      if(err) throw err;
      db.close();
      console.log("Closed connection to " + database);

    });
  });
}

function queryAll(collection,database,callback){
  //connect
  MongoClient.connect('mongodb://192.168.1.8:27017/' + database, function(err, db) {
    data = [];
    if(err) throw err;
    console.log("Connected to " + database + " to read a collection");
    db.collection(collection).find({}).toArray(function(err,docs){
      if(err){
        throw err;
      }
      for (var i = docs.length - 1; i >= 0; i--) {
        data.push(docs[i])
      };
      callback(data)
      db.close();
      console.log("Closed connection to " + database);
    });
  } 
)};
  
function queryValues(values, collection, database, callback){
   //connect
  MongoClient.connect('mongodb://192.168.1.8:27017/' + database, function(err, db) {
    data = [];
    if(err) throw err;
    console.log("Connected to " + database + " to read a certain documents fields");
    db.collection(collection).find({}, values).toArray(function(err,docs){
      if(err){
        throw err;
      }
      for (var i = docs.length - 1; i >= 0; i--) {
        data.push(docs[i])
      };
      callback(data)
      db.close();
      console.log("Closed connection to " + database);
    });
  });
};

function querySingleValue(value, collection, database, callback){
  // console.log("this" + JSON.parse(value));
   //connect
  MongoClient.connect('mongodb://192.168.1.8:27017/' + database, function(err, db) {
    data = [];
    if(err) throw err;
    console.log("Connected to " + database + " to read a certain document");
    db.collection(collection).find({_id:ObjectID.createFromHexString(value)}).toArray(function(err, doc) {
    callback(doc)
    console.log("Closed connection to " + database);
    db.close();
      });
    });
  }


/*
queryValues({'_id':''},'worldList','mongoDB', function(data){
  console.log(data);
});

querySingleValue('5380e27cdd7f1c64137cabf4','worldList','mongoDB',function(data){
  console.log(data);
})
*/

  exports.insertToDB = insertToDB;
  exports.modifyDocument = modifyDocument;
  exports.queryAll = queryAll;
  exports.queryValues = queryValues;
  exports.querySingleValue = querySingleValue;
/*
var datos = queryAll('backup','mongoDB', function(data){
  console.log(data);
});
*/

/*
values = {'gamemode':1,'difficulty':1,};
queryValues(values, 'worldList', 'mongoDB', function(data){
  console.log(data);
})
*/
