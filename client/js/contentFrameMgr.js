
var ContentFrameMgr = function(contentFrames, contentFrameDivId, thumbnailDivId, contentFrameSelectedCallback) {

	var thumbnailSelectedCallback = function(horizontalIndex, verticalIndex) {
		//ensure both are pointing to the same slide
		contentFrameReveal.slide(horizontalIndex, verticalIndex);

		//Let the app know that a different frame was selected
		if(contentFrameSelectedCallback) {
			contentFrameSelectedCallback(contentFrames[horizontalIndex], horizontalIndex);
		}
	};

	var loadContentFrames = function(revealDiv, contentFrames) {
		for(var i=0; i<contentFrames.length; i++) {
			$('<section/>', {text: contentFrames[i].contentHtml}).appendTo(revealDiv);
		}
	}

	this.show = function(index) {
		contentFrameReveal.slide(index);
		thumbnailReveal.slide(index);
	};


	var revealOptions = {
		controls: false,
		progress: false,
		history: false,
		center: false,
		keyboard: false,
		mouseWheel: false,
		theme: 'simple', // available themes are in /css/theme
		transition: 'page'//, // default/cube/page/concave/zoom/linear/none
	};

	loadContentFrames($('#' + contentFrameDivId + ' .slides'), contentFrames);
	var contentFrameReveal = new Reveal("contentFrameReveal");
	contentFrameReveal.initialize(revealOptions);


	loadContentFrames($('#' + thumbnailDivId + ' .slides'), contentFrames);
	var thumbnailReveal = new Reveal("contentFrameThumbnailReveal", thumbnailSelectedCallback);
	revealOptions.keyboard = true;
	thumbnailReveal.initialize(revealOptions);

	setTimeout(thumbnailReveal.toggleOverview, 100);

	
};
