
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('royaledb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'royaledb' database");
        populateDB();
    }
});


var populateDB = function() {


    db.collection('videos', function(err, collection) {

        // collection.insert(videos, {safe:true}, function(err, result) {


        	process.nextTick(function() {

			var bsonId = new BSON.ObjectID('50a67ed6df92132e38000001');

			    db.collection('videos', function(err, collection) {
			        collection.findOne({'_id':bsonId}, function(err, item) {
			            if (!item) {

						var id = new BSON.ObjectID('50a67ed6df92132e38000001');
					    var videos = [
					    {
					    		"_id" : id,
					    		"name": "Physics of the Blob Jump",
					    		"duration": 113000,
					    		"url": "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/blob_full.mp4",
					    		"autoStart": false
					    }];

			            	collection.insert(videos, {safe:true}, function(err, result) {
			            		console.log('inserted blob vid');
							});
			            }
			        });
			    });

			var bsonId = new BSON.ObjectID('50a67ed6df92132e38000002');

			    db.collection('videos', function(err, collection) {
			        collection.findOne({'_id':bsonId}, function(err, item) {
			            if (!item) {
							var id = new BSON.ObjectID('50a67ed6df92132e38000002');
						    var videos = [
						    {
						    		"_id" : id,
						    		"name": 'Intro',
						    		"duration": 113000,
						    		"url": "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/Intro.m4v",
						    		"autoStart": false
						    }];


			            	collection.insert(videos, {safe:true}, function(err, result) {
			            		console.log('inserted intro vid');
							});
			            }
			        });
			    });

			    var bsonId = new BSON.ObjectID('50a67ed6df92132e38000003');

			    db.collection('videos', function(err, collection) {
			        collection.findOne({'_id':bsonId}, function(err, item) {
			            if (!item) {
							var id = new BSON.ObjectID('50a67ed6df92132e38000003');
						    var videos = [
						    {
						    		"_id" : id,
						    		"name": 'Outro',
						    		"duration": 113000,
						    		"url": "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/Outro.m4v",
						    		"autoStart": false
						    }];


			            	collection.insert(videos, {safe:true}, function(err, result) {
			            		console.log('inserted outro vid');
							});
			            }
			        });
			    });

				var bsonId = new BSON.ObjectID('50a694a45d7bd6325dcd9ca2');

			    db.collection('videos', function(err, collection) {
			        collection.findOne({'_id':bsonId}, function(err, item) {
			            if (!item) {
							var id = new BSON.ObjectID('50a694a45d7bd6325dcd9ca2');
						    var videos = [
						    {
						    		"_id" : id,
						    		"name": 'Adaptive',
						    		"duration": 113000,
						    		"url": "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/Adaptive.m4v",
						    		"autoStart": false
						    }];


			            	collection.insert(videos, {safe:true}, function(err, result) {
			            		console.log('inserted adaptive vid');
							});
			            }
			        });
			    });


			collection.find().toArray(function(err, items) {
	        	console.log('err', err);
	        		
		        	for (var i = items.length - 1; i >= 0; i--) {
		        		console.log('item', items[i]);
		        		var contentFrames = [];
		        		if (items[i].name == 'Physics of the Blob Jump') {
		        			var bsonId = new BSON.ObjectID('50a67ed6df92132e38000001');
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
						    	"contentHtml": "<p class='MsoNormal' style='margin: 0cm 0cm 0pt; text-align: justify;'><span style='font-size: small;'>Blob Jumping is an outdoor water activity in which a participant sits on the end of a partially inflated air bag (known as a water trampoline or blob) and is then launched into the water after another participant jumps onto the air bag from a platform on the opposite side. The activity is popular at summer camps in North America. Various tricks may be performed while the participant is in the air. The air bag is approximately 10 meters long (33 feet) by 2 meters wide (6 feet). The recommended height for the tower is 15 feet above the water surface, or 10 feet above the air bag.</span></p>"
						    },
						    {
						    	"videoId": items[i]._id,
						        "startTime": 25000,
						    	"contentHtml": "<p class='MsoNormal' style='margin: 0cm 0cm 0pt; text-align: justify;'><span style='font-size: small;'>Distance, in order to calculate the velocity of a falling object.</span></p> <image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/jumpingPlatformHeight.jpg'/>"
						    },						    
						    {
						    	"videoId": items[i]._id,
						        "startTime": 30000,
						    	"contentHtml": "Average velocity v of a falling object that has travelled distance d (averaged over time):<br><image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/fallingVelocity.png'/>"
			   				 },
						    {
						    	"videoId": items[i]._id,
						        "startTime": 38000,
						    	"contentHtml": "<p class='MsoNormal' style='margin: 0cm 0cm 0pt; text-align: justify;'><span style='font-size: small;'>To calculate the work energy principle, we need the positions of the objects at rest. </span></p><image src='http://ec2-174-129-109-6.compute-1.amazonaws.com/images/jumpOffandLaunchHeights.jpg'></image>"
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
							//
							
						 //    actions = [
						 //    {
						 //    	videoId: bsonId,
							// 	startTime: 1000,
							// 	endTime: 16000,
							// 	action: "skip",
							// 	skipToTime: 16000
							// },
							// {
							// 	videoId: bsonId,
							// 	startTime: 91000,
							// 	endTime: 92000,
							// 	action: "pause"
							// }
							// ]
							// db.collection('actions', function(err, collection) {
						 //        collection.insert(actions, {safe:true}, function(err, result) {});
						 //    });

		        		}

		        		
						if (items[i].name == 'Intro') {
		        			console.log('inserting intro data');
		        			var bsonId = new BSON.ObjectID('50a67ed6df92132e38000002');
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
						        "startTime": 25000,
						    	"contentHtml": "Video Royale: Enhancing video, by connecting authored content, comments, and student notes."
						    },
						    {
						    	"videoId": items[i]._id,
						        "startTime": 20000,
						    	"contentHtml": "<p class='MsoNormal' style='margin: 0cm 0cm 0pt; text-align: justify;'><span style='font-size: small;'></span></p>"
						    },
						    {
						    	"videoId": items[i]._id,
						        "startTime": 25000,
						    	"contentHtml": ""
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
							//
							
						    actions = [
						    {
								startTime: 1000,
								endTime: 16000,
								action: "skip",
								skipToTime: 16000
							},
							{
								startTime: 91000,
								endTime: 92000,
								action: "pause"
							}
							]
							db.collection('actions', function(err, collection) {
						        collection.insert(actions, {safe:true}, function(err, result) {});
						    });



		        		}
					    


				    // var notes = [
					   //  {
					   //      "videoId": items[i]._id,
					   //      "startTime": 3000,
					   //  	"noteText": "Awesome blob-jumping video",
					   //  	"userId": 12345
					   //  }];

					   //  db.collection('notes', function(err, collection) {
					   //      collection.insert(notes, {safe:true}, function(err, result) {});
					   //  });

					   //  var comments = [
					   //  {
					   //      "videoId": items[i]._id,
					   //      "startTime": 30000,
					   //  	"commentText": "Woo hoo",
					   //  	"userId":12345,
					   //  	"userFullName": "Nikola Tesla"
					   //  },
					   //  {
					   //      "videoId": items[i]._id,
					   //      "startTime": 3000,
					   //  	"commentText": "Looks like fun",
					   //  	"userId":12345,
					   //  	"userFullName": "Albert Einstein"
					   //  }];

					   //  db.collection('comments', function(err, collection) {
					   //      collection.insert(comments, {safe:true}, function(err, result) {});
					   //  });


		        	};

		        });
		    });

		});


	//});
};