window._isBadIE = false;

if (navigator.appName == 'Microsoft Internet Explorer') {
	var rv = -1;
	var osv = -1;
	var ua = navigator.userAgent;
	var re  = /MSIE ([0-9]{1,}[\.0-9]{0,})/;
	if (re.exec(ua) !== null) {
		rv = parseFloat( RegExp.$1 );
	}
		
	var os = /Windows NT ([0-9]{1,}[\.0-9]{0,})/;

	if (os.exec(ua) !== null) {
		osv = parseFloat( RegExp.$1 );
	}
	
	// if we're using IE7 or IE8 on WinXP
	window._isBadIE = ((rv > 0 && rv < 8) || (rv > 7 && rv < 9 && osv < 6));
}

window.usePostMessage = (("postMessage" in window) && !window._isBadIE) ? true : false;

window.postMessageHandler = function(p_event) {
	var message;
	try {

		// parse the data of the message into an object
		message = JSON.parse(p_event.data);
	}
	catch (p_error) {
		// if the parsing into JSON object failed, then we don't care about the message
		if ("console" in window) console.log("Error parsing message: " + message);
		message = {};
	}
	console.log(message);
	window.videoId = message.videoId;
	window.courseId = message.courseId;
	window.menuItemId = message.menuItemId;
	window.accessToken = message.accessToken;

	window.appIsReady();
	
};
/*
window.onload = function() {
	if (window.usePostMessage) {
		if (window.addEventListener) {
			window.addEventListener('message', window.postMessageHandler, false);
		}
		else if (window.attachEvent) {
			window.attachEvent('onmessage', window.postMessageHandler);
		}

		window.parent.postMessage({ready: true}, _getQuerystringParameterValue("origin"));
	}
	else {
		if ("console" in window) console.log("YOUR BROWSER SUXX");
		return;
	}	
};
*/
var _getOriginOfUrl = function(p_url) {
	// "http://" or "https://"
	var protocol = p_url.replace(/([a-zA-Z0-9]*?:\/\/).*?(\/.*|$)/, "$1").toLowerCase();
	var domain = p_url.replace(/[a-zA-Z0-9]*?:\/\/(.*?)(\/.*|$|:\d+.*)/, "$1").toLowerCase();
	var port = p_url.replace(/[a-zA-Z0-9]*?:\/\/.*?(:\d+)?($|\/.*)/, "$1").toLowerCase();
	return protocol + domain + port;
};

var _getQuerystringParameterValue = function(parameterName) {
	var querystring = window.location.search;
	if(querystring.substr(0,1) == "?")
	{
		querystring = querystring.substr(1);
	}
	var parameterArray = querystring.split("&");
	if (parameterArray)
	{
		for (var i = 0; i < parameterArray.length; i++)
		{           
			if (parameterArray[i].length > 0)
			{
				var nameValuePair = parameterArray[i].split("=");
				if (nameValuePair.length == 2 && nameValuePair[0] == parameterName)
				{
					return nameValuePair[1];
				}
			}
		}
	}
	return null;
};


window.appIsReady = function() {
	if ("console" in window) console.log("IMPLEMENT THIS PLEASE!");
};


var App = function() {
	var popcorn;

	this.initialize = function(videoId) {
		var data = {
			video: {
				name: "test2",
				duration: 113000,
				//url: "http://www.808.dk/pics/video/gizmo.mp4",
				url: "http://ec2-174-129-109-6.compute-1.amazonaws.com/av/blob_full.mp4",
				autoStart: false,
				_id: "50a5736b4af16cb849000004"
			},
			actions: [{
				startTime: 3000,
				endTime: 3100,
				action: "pause"
			},{
				startTime: 20000,
				endTime: 22000,
				action: "rate",
				rate: 0.2
			},{
				startTime: 25000,
				endTime: 38000,
				action: "skip",
				skipToTime: 38000
			}],
			captions: [{
				startTime: 13000,
				endTime: 16000,
				text: "This is a caption"
			}, {
				startTime: 16000,
				endTime: 19000,
				text: "Yet another caption"
			}],
			contentFrames: [{
				startTime: 50,
				contentHtml: "This is a bear."
			},{
				startTime: 3000,
				contentHtml: "Is he looking for food? <br/> <a href='javascript:videoroyale.navigate(6000);'>Yes</a> or <a href='javascript:videoroyale.navigate(9000);'>No</a>"
			},{
				startTime: 6000,
				contentHtml: "But since he is lazy,"
			},{
				startTime: 9000,
				contentHtml: "he is not catching much."
			},{
				startTime: 10000,
				contentHtml: "he is not catching much."
			},{
				startTime: 11000,
				contentHtml: "he is not catching much."
			},{
				startTime: 12000,
				contentHtml: "he is not catching much."
			},{
				startTime: 13000,
				contentHtml: "he is not catching much."
			},{
				startTime: 14000,
				contentHtml: "he is not catching much."
			},{
				startTime: 15000,
				contentHtml: "he is not catching much."
			},{
				startTime: 16000,
				contentHtml: "he is not catching much."
			}],
			notes: [ {
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 1000,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000001"
		    },
		    {
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 3000,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000002"
		    },
			{
		      "videoId": "50a5816390c1dc3126000002",
		      "startTime": 6521,
		      "noteText": "blah blah hooray",
		      "userId": 12345,
		      "_id": "50a5816390c1dc3126000004"
		    }
		    ],
			comments: [
				{
					startTime: 2000,
					commentText: "whoo hoo",
					userFullName: "Nikola Tesla",
					userId: 1234,
					_id: "1324fsdgsdfg",
					avatarUrl: "http://img1.jurko.net/avatar_14053.jpg"
				},
				{
					startTime: 7000,
					commentText: "whoo hoo again",
					userFullName: "Crazy Guy",
					userId: 12345,
					_id: "1324fsdgsdfg3faf",
					avatarUrl: "http://img1.jurko.net/avatar_12535.jpg"
				}
			]
		}



		var contentFrameSelectedCallback = function(contentFrame, index) {
			popcorn.currentTime(contentFrame.startTime / 1000);
		};

		var noteSelectedCallback = function(note) {
			popcorn.currentTime(note.startTime / 1000);
		};

		var commentsMgr;
		var commentAddedCallback = function(comment) {
			popcorn.code({
				start: (comment.startTime / 1000),
				end: (comment.startTime / 1000) + 10,
				onStart: function(options) {
					commentsMgr.show(comment._id);
				},
				onEnd: function(options) {
					commentsMgr.hide(comment._id);
				}
			});
		};

		var noteMgr;
		var noteAddedCallback = function(note, nextNote) {
			var endTime = null;
			if (nextNote) {
				endTime = (note.startTime / 1000) + (nextNote.startTime / 1000 - note.startTime / 1000);
			} else {
				endTime = (note.startTime / 1000) + 10;
			}
			popcorn.code({
				start: (note.startTime / 1000),
				end: endTime,
				onStart: function(options) {
					noteMgr.highlight(note);
				},
				onEnd: function(options) {
					noteMgr.unhighlight(note);
				}
			});
		};

		// var noteAddedCallback = function(note) {
		// 	popcorn.code({
		// 		start: (note.startTime / 1000),
		// 		end: (note.startTime / 1000) + 10,
		// 		onStart: function(options) {
		// 			noteMgr.highlight(note);
		// 		},
		// 		onEnd: function(options) {
		// 			noteMgr.unhighlight(note);
		// 		}
		// 	});
		// };

		var getFormattedTime = function(seconds) {
			var minutes = Math.floor(seconds/60);
			if (minutes < 10) {
				minutes = "0" + minutes;
			}

			var seconds = Math.floor(seconds%60);
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			return minutes + ":" + seconds;
		}



//			$.get("../videos/" + videoId + "/royale", function(data){
	
			//Set the video source
			$('<source/>', {src: data.video.url, type: "video/mp4"}).appendTo("#video");

			// Create a popcorn instance
			popcorn = Popcorn("#video");

			//// Actions

			//Load all of the actions into popcorn
			for(var i=0; i<data.actions.length; i++) {
				var action = data.actions[i];
				if(action.action === "pause") {
					popcorn.code({
						start: (action.startTime / 1000),
						end: (action.endTime / 1000),
						onStart: function(options) {
							popcorn.pause();
						}
					});
				}
				else if(action.action === "rate") {
					popcorn.code({
						start: (action.startTime / 1000),
						end: (action.endTime / 1000),
						onStart: function(options) {
							popcorn.playbackRate(action.rate);
						},
						onEnd: function(options) {
							popcorn.playbackRate(1);
						}
					});
				}
				else if(action.action === "skip") {
					popcorn.code({
						start: (action.startTime / 1000),
						end: (action.endTime / 1000),
						onStart: function(options) {
							popcorn.currentTime(action.skipToTime / 1000);
						}
					});
				}

			}

			//// Captions
			var captionMgr = new CaptionMgr("caption");

			//Load all of the actions into popcorn
			for(var i=0; i<data.captions.length; i++) {
				(function(caption) {
					popcorn.code({
						start: (caption.startTime / 1000),
						end: (caption.endTime / 1000),
						onStart: function(options) {
							captionMgr.show(caption);
						},
						onEnd: function(options) {
							captionMgr.hide();
						}
					});
				}(data.captions[i]));
			}


			//// Content Frames

			//Load all of the content frames into popcorn
			for(var i=0; i<data.contentFrames.length; i++) {
				var contentFrame = data.contentFrames[i];
				
				(function(index) {
					popcorn.code({
						start: (contentFrame.startTime / 1000),
						end: (contentFrame.startTime / 1000) + 1,
						onStart: function(options) {
							contentFrameMgr.show(index);
						}
					});
				}(i));
			}

			for(var i=0; i<data.comments.length; i++) {
				
				(function(index) {
					var comment = data.comments[index];
					popcorn.code({
						start: (comment.startTime / 1000),
						end: (comment.startTime / 1000) + 10,
						onStart: function(options) {
							commentsMgr.show(comment._id);
						},
						onEnd: function(options) {
							commentsMgr.hide(comment._id);
						}
					});
				}(i));
			}

			//Load the Content
			var contentFrameMgr = new ContentFrameMgr(data.contentFrames, "contentFrameReveal", "contentFrameThumbnailReveal", contentFrameSelectedCallback);
			contentFrameMgr.show(0);

			commentsMgr = new CommentsMgr(data.comments, "comments", videoId, commentAddedCallback);

			//// Notes
			data.notes.sort(function(a,b) { return a.startTime - b.startTime } );

			//Load the notes into the UI
			
			//Load all of the notes into popcorn
			for(var i=0; i<data.notes.length; i++) {
				var note = data.notes[i];
				var nextNote;

				if (i+1 < data.notes.length) {
					nextNote = data.notes[i+1];
				} else {
					nextNote = null;
				}

				(function(note, nextNote) {
					var endTime = null;
					if (nextNote) {
						endTime = (note.startTime / 1000) + (nextNote.startTime / 1000 - note.startTime / 1000);
					} else {
						endTime = (note.startTime / 1000) + 10;
					}
					popcorn.code({
						start: (note.startTime / 1000),
						end: endTime,
						onStart: function(options) {
							noteMgr.highlight(note);
						},
						onEnd: function(options) {
							noteMgr.unhighlight(note);
						}
					});

					

				})(note, nextNote);
			}

			noteMgr = new NoteMgr(data.video, data.notes, "notes", noteSelectedCallback, noteAddedCallback);

			for(var i=0; i<data.notes.length; i++) {

				var note = data.notes[i];
				(function(note)  {
					noteMgr.bindClick(note);
				})(note);
			}

			if(data.video.autoStart) {
				// play the video right away
				popcorn.play();
			}


			$("#addCommentButton").click(function() {
				$("#addCommentTime").html("@ " + getFormattedTime(popcorn.currentTime()));
				$("#addCommentTime").attr("data-time" + Math.floor(popcorn.currentTime()) * 1000);
				$("#addCommentForm").slideDown();
			});

			$("#addNoteButton").click(function() {
				$("#addNoteTime").html("@ " + getFormattedTime(popcorn.currentTime()));
				$("#addNoteTime").attr("data-time" + Math.floor(popcorn.currentTime()) * 1000);
				$("#addNoteForm").slideDown();
			});

//		});
	};

	this.navigate = function(milliseconds) {
		popcorn.currentTime(milliseconds / 1000).play();
	};
};
