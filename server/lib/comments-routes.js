var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('royaledb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'royaledb' database");
        db.collection('comments', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'comments' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.findByVideoId = function(req, res) {
    var id = req.params.videoid;
    console.log('Retrieving comments: ' + id);
    db.collection('comments', function(err, collection) {
        collection.find({'videoId':new BSON.ObjectID(id)}).toArray(function(err, item) {
            res.send(item);
        });
    });
};


exports.findById = function(req, res) {
    var id = req.params.commentid;
    var videoid = req.params.videoid;

    console.log('Retrieving comment: ' + id);
    db.collection('comments', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('comments', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addComment = function(req, res) {
    var comment = req.body;
   var videoid = req.params.videoid;
    comment.videoId = new BSON.ObjectID(videoid);

    console.log('comment', comment);

    console.log('Adding comment: ' + JSON.stringify(comment));
    db.collection('comments', function(err, collection) {
        collection.insert(comment, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateComment = function(req, res) {
    var id = req.params.id;
    var comment = req.body;
    console.log('Updating comment: ' + id);
    console.log(JSON.stringify(comment));
    db.collection('comments', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, comment, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating comment: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(comment);
            }
        });
    });
}

exports.deleteComment = function(req, res) {
    var id = req.params.id;
    console.log('Deleting comment: ' + id);
    db.collection('comments', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
	process.nextTick(function() {

	db.collection('videos', function(err, collection) {

        collection.find().toArray(function(err, items) {
        	console.log('err', err);

        	for (var i = items.length - 1; i >= 0; i--) {
			    var comments = [
			    {
			        "videoId": items[i]._id,
			        "startTime": 1000,
			    	"commentText": "blah blah hooray",
			    	"userId":12345,
			    	"userFullName": "Nikola Tesla",
			    	"avatarUrl": "http://persona.ecollege.com/blah"
			    },
			    {
			        "videoId": items[i]._id,
			        "startTime": 3000,
			    	"commentText": "blah blah hooray",
			    	"userId":12345,
			    	"userFullName": "Nikola Tesla",
			    	"avatarUrl": "http://persona.ecollege.com/blah"
			    }];

			    db.collection('comments', function(err, collection) {
			        collection.insert(comments, {safe:true}, function(err, result) {});
			    });
        	};

        });
    });
});


};
