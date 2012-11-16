var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('royaledb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'royaledb' database");
        db.collection('actions', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'actions' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.findByVideoId = function(req, res) {
    var id = req.params.videoid;
    console.log('Retrieving actions: ' + id);
    db.collection('actions', function(err, collection) {
        collection.find({'videoId':new BSON.ObjectID(id)}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findById = function(req, res) {
    var actionid = req.params.actionid;
    var videoid = req.params.videoid;

    console.log('Retrieving action: ' + actionid);
    db.collection('actions', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(actionid)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('actions', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addAction = function(req, res) {
    var action = req.body;
    var videoid = req.params.videoid;
    action.videoId = new BSON.ObjectID(videoid);

    console.log('Adding action: ' + JSON.stringify(action));
    db.collection('actions', function(err, collection) {
        collection.insert(action, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateAction = function(req, res) {
    var id = req.params.id;
    var action = req.body;
    console.log('Updating action: ' + id);
    console.log(JSON.stringify(action));
    db.collection('actions', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, action, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating action: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(action);
            }
        });
    });
}

exports.deleteAction = function(req, res) {
    var id = req.params.id;
    console.log('Deleting action: ' + id);
    db.collection('actions', function(err, collection) {
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
