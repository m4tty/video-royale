var App = function() {

	this.initialize = function(videoId) {
		var data = {
			video: {
				name: "test2",
				duration: 113000,
				url: "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/blob_full.mp4",
				autoStart: true,
				_id: "50a5736b4af16cb849000004"
			},
			contentFrames: [{
				startTime: 50,
				contentHtml: "This is a bear."
			},{
				startTime: 3000,
				contentHtml: "He is looking for food."
			},{
				startTime: 6000,
				contentHtml: "But since he is lazy,"
			},{
				startTime: 9000,
				contentHtml: "he is not catching much."
			}],
			notes: [ ],
			comments: [ ]
		}

		var contentFrameSelectedCallback = function(contentFrame, index) {
			popcorn.currentTime(contentFrame.startTime / 1000);
		};

		var noteSelectedCallback = function(note) {
			popcorn.currentTime(note.startTime / 1000);
		};

		var noteAddedCallback = function(note) {
			popcorn.code({
				start: (note.startTime / 1000),
				end: (note.startTime / 1000) + 10,
				onStart: function(options) {
					noteMgr.highlight(note);
				},
				onEnd: function(options) {
					noteMgr.unhighlight(note);
				}
			});
		};



//		$.get("/videos/" + videoId + "/royale", function(data){
	
			//Set the video source
			$('<source/>', {src: data.video.url, type: "video/mp4"}).appendTo("#video");

			// Create a popcorn instance
			var popcorn = Popcorn("#video");

			//// Content Frames

			//Load all of the content frames into popcorn
			for(var i=0; i<data.contentFrames.length; i++) {
				var contentFrame = data.contentFrames[i];
				
				(function(index) {
					popcorn.code({
						start: (contentFrame.startTime / 1000),
						end: 10,
						onStart: function(options) {
							contentFrameMgr.show(index);
						}
					});
				}(i));
			}

			//Load the content frames into the UI
			var contentFrameMgr = new ContentFrameMgr(data.contentFrames, "contentFrameReveal", "contentFrameThumbnailReveal", contentFrameSelectedCallback);
			contentFrameMgr.show(0);

			//// Notes

			//Load all of the notes into popcorn
			for(var i=0; i<data.notes.length; i++) {
				var note = data.notes[i];
				
				(function(note) {
					popcorn.code({
						start: (note.startTime / 1000),
						end: (note.startTime / 1000) + 10,
						onStart: function(options) {
							noteMgr.highlight(note);
						},
						onEnd: function(options) {
							noteMgr.unhighlight(note);
						}
					});
				})(note);
			}

			//Load the notes into the UI
			var noteMgr = new NoteMgr(data.notes, "notes", noteSelectedCallback, noteAddedCallback);


			if(data.video.autoStart) {
				// play the video right away
				popcorn.play();
			}

//		});
	};

};
