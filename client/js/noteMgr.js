
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
	for (var i =0; i < notes.length; i++) {
		
		notesById[notes[i]._id] = notes[i];
		var seconds = notes[i].startTime / 1000


		notes[i].timeStamp = getFormattedTime(seconds);

		templStr = _.template($("#notesTemplate").html(), notes[i]);
		notesContainer.prepend(templStr);
	}

	this.highlight = function(note) {
		$("#" + note._id).attr('class', 'note-bubble-highlighted');
	};

	this.unhighlight = function(note) {
		$("#" + note._id).attr('class', 'note-bubble');
	};



};
