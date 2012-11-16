var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('royaledb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'royaledb' database");
        db.collection('videos', {safe:true}, function(err, collection) {
            //if (err) {
            //	console.log('err',err);
            //    console.log("The 'videos' collection doesn't exist. Creating it with sample data...");
            //   populateDB();
            //}
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.videoid;
    console.log('Retrieving videos: ' + id);
    db.collection('videos', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
     db.collection('videos', function(err, collection) {
        collection.find().toArray(function(err, items) {
        	console.log('err', err);

            res.send(items);
        });
    });
};

exports.addVideo = function(req, res) {
    var video = req.body;

    //console.log('Adding video: ' + JSON.stringify(video));
    db.collection('videos', function(err, collection) {
        collection.insert(video, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateVideo = function(req, res) {
    var id = req.params.id;
    var video = req.body;
    console.log('Updating video: ' + id);
    console.log(JSON.stringify(video));
    db.collection('videos', function(err, collection) {
        collection.update({'_id': new BSON.ObjectID(id)}, video, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating video: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(video);
            }
        });
    });
}

exports.deleteVideo = function(req, res) {
    var id = req.params.id;
    console.log('Deleting video: ' + id);
    db.collection('videos', function(err, collection) {
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
