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
            if (err) {
            	console.log('err',err);
                console.log("The 'videos' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
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

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
    var videos = [
    {
    		"name": "Physics of the Blob Jump",
    		"duration": 113000,
    		"url": "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/blob_full.mp4",
    		"autoStart": false
    },
    {
    		"name": 'Intro',
    		"duration": 113000,
    		"url": "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/intro.mp4",
    		"autoStart": false
    },
    {
    		"name": 'Outro',
    		"duration": 113000,
    		"url": "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/outro.mp4",
    		"autoStart": false
    }];

    db.collection('videos', function(err, collection) {
        collection.insert(videos, {safe:true}, function(err, result) {

        	process.nextTick(function() {


			collection.find().toArray(function(err, items) {
	        	console.log('err', err);

		        	for (var i = items.length - 1; i >= 0; i--) {
		        		var contentFrames = [];
		        		if (items[i].name == 'Physics of the Blob Jump') {
		        			console.log('inserting blob jump data');
		     				//16 seconds start... for some material to fill intro
							// 30 seconds starts the blob jumping
							// 30 seconds falling velocity
							// 40 seconds guy at peek height
							// 46 seconds ends the best view of jump.  skip to 1.18.
							// 1.18 overlay
							// 1.22 time lapse pictures of falling and launch
							// 1.30 ends time lapse and good material. stop/pause.
			        		contentFrames = [
						    {
						    	"videoId": items[i]._id,
						        "startTime": 20000,
						    	"contentHtml": "Blob Jumping is an outdoor water activity in which a participant sits on the end of a partially inflated air bag (known as a water trampoline or blob) and is then launched into the water after another participant jumps onto the air bag from a platform on the opposite side. The activity is popular at summer camps in North America. Various tricks may be performed while the participant is in the air. The air bag is approximately 10 meters long (33 feet) by 2 meters wide (6 feet). The recommended height for the tower is 15 feet above the water surface, or 10 feet above the air bag."
						    },
						    {
						    	"videoId": items[i]._id,
						        "startTime": 25000,
						    	"contentHtml": "Distance, in order to calculate the velocity of a falling object.<br> <image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/jumpingPlatformHeight.jpg'/>"
						    },						    
						    {
						    	"videoId": items[i]._id,
						        "startTime": 30000,
						    	"contentHtml": "Average velocity v of a falling object that has travelled distance d (averaged over time):<br><image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/fallingVelocity.png'/>"
			   				 },
						    {
						    	"videoId": items[i]._id,
						        "startTime": 38000,
						    	"contentHtml": "To calculate the work energy principle, we need the positions of the objects at rest. <br><image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/jumpOffandLaunchHeights.jpg'></image>"
			   				 },{
						    	"videoId": items[i]._id,
						        "startTime": 45000,
						    	"contentHtml": "work energy principle <br><image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/workEnergyPrinciple-latex.jpg'></image>"
			   				 },{
						    	"videoId": items[i]._id,
						        "startTime": 82000,
						    	"contentHtml": "Vertical position vs time <br><image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/verticalPosVsTime.jpg'></image>"
			   				 },
			   				 {
						    	"videoId": items[i]._id,
						        "startTime": 90000,
						    	"contentHtml": "Final calculation <br><image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/InputsCalculation-latex.jpg'></image>"
			   				 }
			   				 ];

							db.collection('contentFrames', function(err, collection) {
						        collection.insert(contentFrames, {safe:true}, function(err, result) {});
						    });

		        		}

		        		

					    


				    var notes = [
					    {
					        "videoId": items[i]._id,
					        "startTime": 3000,
					    	"noteText": "Awesome blob-jumping video",
					    	"userId": 12345
					    }];

					    db.collection('notes', function(err, collection) {
					        collection.insert(notes, {safe:true}, function(err, result) {});
					    });

					    var comments = [
					    {
					        "videoId": items[i]._id,
					        "startTime": 30000,
					    	"commentText": "Woo hoo",
					    	"userId":12345,
					    	"userFullName": "Nikola Tesla"
					    },
					    {
					        "videoId": items[i]._id,
					        "startTime": 3000,
					    	"commentText": "Looks like fun",
					    	"userId":12345,
					    	"userFullName": "Albert Einstein"
					    }];

					    db.collection('comments', function(err, collection) {
					        collection.insert(comments, {safe:true}, function(err, result) {});
					    });


		        	};

		        });
		    });

		});


	});
};

