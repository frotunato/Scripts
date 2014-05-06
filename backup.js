var MongoClient = require('mongodb').MongoClient, format = require('util').format;

function tar(source,destination){
	var fs = require('fs');
	var archiver = require('archiver');
	var output = fs.createWriteStream(source + '.tar');
	var tarArchive = archiver('tar');

	output.on('close', function() {
	    console.log('done with the tar, created at', destination);
	});

	tarArchive.pipe(output);

	tarArchive.bulk([
	    { src: [ '**/*' ], cwd: source, expand: true }
	]);

	tarArchive.finalize(function(err, bytes) {
	   	if(err) {
	   	   throw err;
	   	}
    	console.log('done:', base, bytes);
	});
	return source + '.tar';
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

   	var output = day + "-" + month + "-" + year + "_" + hour + "." + min + "." + sec;
    
    return output; 

}
//	getDateTime();
function compress(input){
	var path = require('path');
	var fs = require('fs');
	var lz4 = require('lz4');
	
	// Input/Output files
	var inputFile = input
	var outputFile = inputFile + lz4.extension
	var encoder = lz4.createEncoderStream({ highCompression: true })
	var input = fs.createReadStream(inputFile)
	var output = fs.createWriteStream(outputFile)

	// Timing
	encoder.on('end', function () {
	var delta = Date.now() - startTime
	var fileSize = fs.statSync(inputFile).size
	var outfileSize = fs.statSync(outputFile).size
	insertToDB({fileName:outputFile, inputFileSize:fileSize, outputFileSize:outfileSize, timeSpent:delta},'backup','mongoDB');

	console.log(
		'lz4 compressed %d bytes into %d bytes in %dms (%dMb/s)'
	,	fileSize
	,	outfileSize
	,	delta
	,	Math.round( 100 * fileSize / ( delta * (1 << 20) ) * 1000 ) / 100
	)
})

	console.log('Compressing %s to %s...', inputFile, outputFile)
	var startTime = Date.now()
	input.pipe(encoder).pipe(output)

}

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
