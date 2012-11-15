var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('royaledb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'royaledb' database");
        db.collection('notes', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'notes' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.findByVideoId = function(req, res) {
    var id = req.params.videoid;
    console.log('Retrieving notes: ' + id);
    db.collection('notes', function(err, collection) {
        collection.find({'videoId':new BSON.ObjectID(id)}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findById = function(req, res) {
    var noteid = req.params.noteid;
    var videoid = req.params.videoid;

    console.log('Retrieving note: ' + noteid);
    db.collection('notes', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(noteid)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('notes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addNote = function(req, res) {
    var note = req.body;
    console.log('Adding note: ' + JSON.stringify(note));
    db.collection('notes', function(err, collection) {
        collection.insert(note, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateNote = function(req, res) {
    var id = req.params.id;
    var note = req.body;
    console.log('Updating note: ' + id);
    console.log(JSON.stringify(note));
    db.collection('notes', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, note, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating note: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(note);
            }
        });
    });
}

exports.deleteNote = function(req, res) {
    var id = req.params.id;
    console.log('Deleting note: ' + id);
    db.collection('notes', function(err, collection) {
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
			    var notes = [
			    {
			        "videoId": items[i]._id,
			        "startTime": 3000,
			    	"noteText": "blah blah hooray",
			    	"userId": 12345
			    },
			    {
			        "videoId": items[i]._id,
			        "startTime": 3000,
			    	"noteText": "blah blah hooray",
			    	"userId": 12345
			    }];

			    db.collection('notes', function(err, collection) {
			        collection.insert(notes, {safe:true}, function(err, result) {});
			    });
        	};

        });
    });
});


};