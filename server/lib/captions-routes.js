var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('royaledb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'royaledb' database");
        db.collection('captions', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'captions' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.findByVideoId = function(req, res) {
    var id = req.params.videoid;
    console.log('Retrieving captions: ' + id);
    db.collection('captions', function(err, collection) {
        collection.find({'videoId':new BSON.ObjectID(id)}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findById = function(req, res) {
    var captionid = req.params.captionid;
    var videoid = req.params.videoid;

    console.log('Retrieving caption: ' + captionid);
    db.collection('captions', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(captionid)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('captions', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addCaption = function(req, res) {
    var caption = req.body;
    var videoid = req.params.videoid;
    caption.videoId = new BSON.ObjectID(videoid);

    console.log('Adding caption: ' + JSON.stringify(caption));
    db.collection('captions', function(err, collection) {
        collection.insert(caption, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateCaption = function(req, res) {
    var id = req.params.id;
    var caption = req.body;
    console.log('Updating caption: ' + id);
    console.log(JSON.stringify(caption));
    db.collection('captions', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, caption, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating caption: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(caption);
            }
        });
    });
}

exports.deleteCaption = function(req, res) {
    var id = req.params.id;
    console.log('Deleting caption: ' + id);
    db.collection('captions', function(err, collection) {
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

};
