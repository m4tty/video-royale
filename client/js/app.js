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
			},{
				startTime: 11000,
				contentHtml: "The End."
			}],
			notes: [ ],
			comments: [ ]
		}

		var contentFrameSelectedCallback = function(contentFrame, index) {
			popcorn.currentTime(contentFrame.startTime / 1000).play();
		};


//		$.get("/videos/" + videoId + "/royale", function(data){

			$("#videoSrc").attr("src", data.video.url);

			// Create a popcorn instance by calling Popcorn("#id-of-my-video")
			var popcorn = Popcorn("#video");

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
				})(i);
			}

			//Load the Content
			var contentFrameMgr = new ContentFrameMgr(data.contentFrames, "contentFrameReveal", "contentFrameThumbnailReveal", contentFrameSelectedCallback);
			contentFrameMgr.show(0);

			if(data.video.autoStart) {
				// play the video right away
				popcorn.play();
			}

//		});
	};

};
