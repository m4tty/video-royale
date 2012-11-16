var App = function() {
	var popcorn;

	this.initialize = function(videoId) {
		var data = {
			video: {
				name: "test2",
				duration: 113000,
				//url: "http://www.808.dk/pics/video/gizmo.mp4",
				url: "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/blob_full.mp4",
				autoStart: true,
				_id: "50a5736b4af16cb849000004"
			},
			actions: [{
				time: 3000,
				action: "pause"
			}],
			captions: [{
				startTime: 13000,
				endTime: 16000,
				text: "This is a caption"
			}, {
				startTime: 16000,
				endTime: 19000,
				text: "Yet another caption"
			}],
			contentFrames: [{
				startTime: 50,
				contentHtml: "This is a bear."
			},{
				startTime: 3000,
				contentHtml: "Is he looking for food? <br/> <a href='javascript:videoroyale.navigate(6000);'>Yes</a> or <a href='javascript:videoroyale.navigate(9000);'>No</a>"
			},{
				startTime: 6000,
				contentHtml: "But since he is lazy,"
			},{
				startTime: 9000,
				contentHtml: "he is not catching much."
			}],
			notes: [ {
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 1000,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000001"
		    },
		    {
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 3000,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000002"
		    },
			{
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 6521,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000004"
		    },
			{
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 8956,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000006"
		    },
			{
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 10956,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000007"
		    },
			{
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 11980,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000008"
		    }
		    ],
			comments: [
				{
					startTime: 2000,
					commentText: "whoo hoo",
					userFullName: "Nikola Tesla",
					userId: 1234,
					_id: "1324fsdgsdfg",
					avatarUrl: "http://img1.jurko.net/avatar_14053.jpg"
				},
				{
					startTime: 7000,
					commentText: "whoo hoo again",
					userFullName: "Crazy Guy",
					userId: 12345,
					_id: "1324fsdgsdfg3faf",
					avatarUrl: "http://img1.jurko.net/avatar_12535.jpg"
				}
			]
		}



		var contentFrameSelectedCallback = function(contentFrame, index) {
			popcorn.currentTime(contentFrame.startTime / 1000);
		};

		var noteSelectedCallback = function(note) {
			popcorn.currentTime(note.startTime / 1000);
		};

		// var noteAddedCallback = function(note) {
		// 	popcorn.code({
		// 		start: (note.startTime / 1000),
		// 		end: (note.startTime / 1000) + 10,
		// 		onStart: function(options) {
		// 			noteMgr.highlight(note);
		// 		},
		// 		onEnd: function(options) {
		// 			noteMgr.unhighlight(note);
		// 		}
		// 	});
		// };

		var getFormattedTime = function(seconds) {
			var minutes = Math.floor(seconds/60);
			if (minutes < 10) {
				minutes = "0" + minutes;
			}

			var seconds = Math.floor(seconds%60);
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			return minutes + ":" + seconds;
		}



//		$.get("/videos/" + videoId + "/royale", function(data){
	
			//Set the video source
			$('<source/>', {src: data.video.url, type: "video/mp4"}).appendTo("#video");

			// Create a popcorn instance
			popcorn = Popcorn("#video");

			//// Actions

			//Load all of the actions into popcorn
			for(var i=0; i<data.actions.length; i++) {
				var action = data.actions[i];
				if(action.action === "pause") {
					popcorn.code({
						start: (action.time / 1000),
						end: (action.time / 1000) + 1,
						onStart: function(options) {
							popcorn.pause();
						}
					});
				}
			}

			//// Captions
			var captionMgr = new CaptionMgr("caption");

			//Load all of the actions into popcorn
			for(var i=0; i<data.captions.length; i++) {
				(function(caption) {
					popcorn.code({
						start: (caption.startTime / 1000),
						end: (caption.endTime / 1000),
						onStart: function(options) {
							captionMgr.show(caption);
						},
						onEnd: function(options) {
							captionMgr.hide();
						}
					});
				}(data.captions[i]));
			}


			//// Content Frames

			//Load all of the content frames into popcorn
			for(var i=0; i<data.contentFrames.length; i++) {
				var contentFrame = data.contentFrames[i];
				
				(function(index) {
					popcorn.code({
						start: (contentFrame.startTime / 1000),
						end: (contentFrame.startTime / 1000) + 1,
						onStart: function(options) {
							contentFrameMgr.show(index);
						}
					});
				}(i));
			}

			for(var i=0; i<data.comments.length; i++) {
				
				(function(index) {
					var comment = data.comments[index];
					popcorn.code({
						start: (comment.startTime / 1000),
						end: (comment.startTime / 1000) + 10,
						onStart: function(options) {
							commentsMgr.show(comment._id);
						},
						onEnd: function(options) {
							commentsMgr.hide(comment._id);
						}
					});
				}(i));
			}

			//Load the Content
			var contentFrameMgr = new ContentFrameMgr(data.contentFrames, "contentFrameReveal", "contentFrameThumbnailReveal", contentFrameSelectedCallback);
			contentFrameMgr.show(0);

			var commentsMgr = new CommentsMgr(data.comments, "comments", videoId);

			//// Notes
			data.notes.sort(function(a,b) { return a.startTime - b.startTime } );

			//Load the notes into the UI
			
			//Load all of the notes into popcorn
			for(var i=0; i<data.notes.length; i++) {
				var note = data.notes[i];
				var nextNote;

				if (i+1 < data.notes.length) {
					nextNote = data.notes[i+1];
				} else {
					nextNote = null;
				}

				(function(note, nextNote) {
					var endTime = null;
					if (nextNote) {
						endTime = (note.startTime / 1000) + (nextNote.startTime / 1000 - note.startTime / 1000);
					} else {
						endTime = (note.startTime / 1000) + 10;
					}
					popcorn.code({
						start: (note.startTime / 1000),
						end: endTime,
						onStart: function(options) {
							noteMgr.highlight(note);
						},
						onEnd: function(options) {
							noteMgr.unhighlight(note);
						}
					});

					

				})(note, nextNote);
			}

			var noteMgr = new NoteMgr(data.video, data.notes, "notes", noteSelectedCallback);

			for(var i=0; i<data.notes.length; i++) {

				var note = data.notes[i];
				(function(note)  {
					noteMgr.bindClick(note);
				})(note);
			}

			if(data.video.autoStart) {
				// play the video right away
				popcorn.play();
			}


			$("#addCommentButton").click(function() {
				$("#addCommentTime").html("@ " + getFormattedTime(popcorn.currentTime()));
				$("#addCommentTime").attr("data-time" + Math.floor(popcorn.currentTime()) * 1000);
				$("#addCommentForm").slideDown();
			});

//		});
	};

	this.navigate = function(milliseconds) {
		popcorn.currentTime(milliseconds / 1000).play();
	};
};
