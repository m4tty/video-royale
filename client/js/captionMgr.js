
var CaptionMgr = function(captionDivId) {
	var captionDiv = $('#' + captionDivId);

	this.show = function(caption) {
		captionDiv.css("opacity", 1);
		captionDiv.html(caption.text);

/*		var i = 0;
		var intervalId = setInterval(function() {
			captionDiv.html(caption.text.substr(0, i++));

			if(i > caption.text.length) {
				clearInterval(intervalId);
			}	
		}, 15);
*/
	};
	
	this.hide = function() {
		captionDiv.css("opacity", 0);
	};
};
