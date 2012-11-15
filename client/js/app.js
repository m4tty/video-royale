var App = function() {

	this.initialize = function(videoId) {
		$.get("/videos/" + videoId + "/royale", function(data){

			$("#videoSrc").attr("src", data.video.url);

			// Create a popcorn instance by calling Popcorn("#id-of-my-video")
			var popcorn = Popcorn("#video");

			for(var i=0; i<data.contentFrames.length; i++) {
				var contentFrame = data.contentFrames[i];
				
				(function(index) {
					popcorn.code({
						start: Math.floor((contentFrame.startTime / 1000)),
						end: 1000,
						onStart: function(options) {
							contentFrameMgr.show(index);
						}
					});
				}(i));
			}

			// play the video right away
			pop.play();


			var contentFrameMgr = new ContentFrameMgr(data.contentFrames, "contentFrameReveal", "contentFrameThumbnailReveal");
			contentFrameMgr.show(0);
		});
	};

};
