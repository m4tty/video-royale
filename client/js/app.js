var App = function() {

	this.initialize = function() {
		var contentFrames = [
			{"contentHtml": "Slide 1a"},
			{"contentHtml": "Slide 2"},
			{"contentHtml": "Slide 3"},
			{"contentHtml": "Slide 4"},
			{"contentHtml": "Slide 5"},
			{"contentHtml": "Slide 6"},
			{"contentHtml": "Slide 7"}
		];

		var contentFrameMgr = new ContentFrameMgr(contentFrames, "contentFrameReveal", "contentFrameThumbnailReveal");
		contentFrameMgr.show(0);
	};

};
