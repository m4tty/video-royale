var mongo = require('mongodb');
var async = require('async');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('royaledb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'royaledb' database");
        // db.collection('videos', {safe:true}, function(err, collection) {
        //     if (err) {
        //         console.log("The 'videos' collection doesn't exist. ");
                
        //     }
        // });
    }
});

exports.findById = function(req, res) {
    var videoid = req.params.videoid;
    console.log('Retrieving videos: ' + videoid);
    db.collection('videos', function(err, collection) {
    	console.log('videoid-', videoid);

    	(function(db, videoid) {
    		console.log('VIDEOID', videoid);
	        collection.findOne({'_id':new BSON.ObjectID(videoid)}, function(err, item) {
				async.parallel([
				    function(callback, videoid){
				    	console.log('videoid1', videoid);
						 db.collection('contentFrames', function(err, collection) {
						 	console.log('videoid2', videoid);
						        collection.find({'videoId':videoid}).toArray(function(err, item) {
									// if (err) {
									// 	return err;
									// }
									console.log('contentFrames', item);
									callback(null, item);;

						        });
						    });
				    },
				    function(callback, videoid){
	 					db.collection('notes', function(err, collection) {
						        collection.find({'videoId':videoid}).toArray(function(err, item) {
									// if (err) {
									// 	return err;
									// }
									console.log('notes', item);
									callback(null, item);

						        });
						    });
				    },
				    function(callback, videoid){
	 						db.collection('comments', function(err, collection) {
						        collection.find({'videoId':videoid}).toArray(function(err, item) {
									// if (err) {
									// 	return err;
									// }
									console.log('comments', item);
									callback(null, item);

						        });
						    });
				    }
				], function(err, data) {
					res.send(data);
				});
			})(db, videoid);

            
        });


    });
};


