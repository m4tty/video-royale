
var CommentsMgr = function(comments, commentsDivId, videoId) {

	var commentsById = {}, tempStr;
	var commentsContainer = $("#" + commentsDivId);
	var lastDisplayedCommentId = null;
	for (var i =0; i < comments.length; i++) {
		commentsById[comments[i]._id] = comments[i];
		templStr = _.template($("#commentsTemplate").html(), { comment: comments[i], token: window.accessToken });
		commentsContainer.prepend(templStr);
		$("#" + comments[i]._id).hide();
	}

	$("#createCommentButton").click(function() {
		var commentText = $("#commentInput").val();
		var startTime = $("#addCommentTime").attr("data-time");
		$.ajax({
			type: "GET",
			url: "../wsod/me",
			dataType: "json",
			headers: {
				"X-Authorization": "Access_Token access_token=" + window.accessToken
			},
			success: function(meData) {

				$.ajax({
					type: "POST",
					url: "../videos/" + videoId + "/comments",
					data: {
						commentText: commentText,
						startTime: startTime,
						userId: meData.me.id,
						videoId: videoId,
						userFullName: meData.me.firstName + " " + meData.me.lastName,
						avatarUrl: "../affinity/v1/avatar/" + meData.me.clientString + "_" + meData.me.userName
					},
					dataType: "json",
					success: function(data) {

					}
				});
			}
		});
		/**/

		//templStr = _.template($("#commentsTemplate").html(), comments[i]);
		//commentsContainer.prepend(templStr);
	});

	this.show = function(commentId) {
		lastDisplayedCommentId = commentId;
		$("#" + commentId).fadeIn();
	};

	this.hide = function(commentId) {
		$("#" + commentId).fadeOut();
	};
	
};
