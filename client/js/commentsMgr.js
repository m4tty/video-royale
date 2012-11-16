
var CommentsMgr = function(comments, commentsDivId) {

	var commentsById = {}, tempStr;
	var commentsContainer = $("#" + commentsDivId);
	for (var i =0; i < comments.length; i++) {
		commentsById[comments[i]._id] = comments[i];
		templStr = _.template($("#commentsTemplate").html(), comments[i]);
		commentsContainer.prepend(templStr);
		$("#" + comments[i]._id).hide();
	}

	

	this.show = function(commentId) {
		$("#" + commentId).fadeIn();
	};

	this.hide = function(commentId) {
		$("#" + commentId).fadeOut();
	};
	
};
