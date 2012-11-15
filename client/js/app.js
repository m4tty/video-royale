var App = function() {

	this.initialize = function(videoId) {
		$.get("/videos/" + videoId + "/royale", function(data){
			var contentFrameMgr = new ContentFrameMgr(data.contentFrames, "contentFrameReveal", "contentFrameThumbnailReveal");
			contentFrameMgr.show(0);
		});
	};

};
