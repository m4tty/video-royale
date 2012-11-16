
var CaptionMgr = function(captionDivId) {
	var captionDiv = $('#' + captionDivId);

	this.show = function(caption) {
		captionDiv.css("opacity", 1);
		captionDiv.html(caption.text);
	};
	
	this.hide = function() {
		captionDiv.css("opacity", 0);
		captionDiv.html("");
	};
};
