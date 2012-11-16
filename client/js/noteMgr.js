
var NoteMgr = function(video, notes, noteDivId, noteSelectedCallback, noteAddedCallback) {
	
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

	var duration = video.duration;

	var notesById = {}, tempStr;
	var notesContainer = $("#" + noteDivId);
	

	notes.sort(function(a,b) { return b.startTime - a.startTime } );
	var currentlyActiveNote = notes[0];

	for (var i =0; i < notes.length; i++) {
		notesById[notes[i]._id] = notes[i];
		var seconds = notes[i].startTime / 1000
		notes[i].timeStamp = getFormattedTime(seconds);
		templStr = _.template($("#notesTemplate").html(), notes[i]);
		notesContainer.prepend(templStr);
	}

	$("#createNoteButton").click(function() {
		var noteText = $("#noteInput").val();
		var startTime = $("#addNoteTime").attr("data-time");
		$.ajax({
			type: "GET",
			url: "../wsod/me",
			dataType: "json",
			headers: {
				"X-Authorization": "Access_Token access_token=" + window.accessToken
			},
			success: function(meData) {
				var newNote = {
						noteText: noteText,
						startTime: startTime,
						userId: meData.me.id,
						videoId: videoId
					};
				$.ajax({
					type: "POST",
					url: "../videos/" + videoId + "/notes",
					data: newNote,
					dataType: "json",
					success: function(data) {
						newNote._id = data._id;
						templStr = _.template($("#notesTemplate").html(), newNote);
						if (currentlyActiveNote.startTime < newNote.startTime) {
							$("#" + currentlyActiveNote._id).after(templStr);
						} else {
							$("#" + currentlyActiveNote._id).before(templStr);
						}
						
						notesById[newNote._id] = newNote;
						noteAddedCallback(newNote, nextNote);
					}
				});
			}
		});
	});

	this.bindClick = function(note) {
		$("#" + note._id).click(function(){
			noteSelectedCallback(note);
		});
	};

	this.highlight = function(note) {
		currentlyActiveNote = note;
		$("#" + note._id).attr('class', 'note-bubble-highlighted');
	};

	this.unhighlight = function(note) {
		$("#" + note._id).attr('class', 'note-bubble');
	};

};
