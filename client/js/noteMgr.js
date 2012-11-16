
var NoteMgr = function(notes, noteDivId, noteSelectedCallback, noteAddedCallback) {


	var loadNotes = function(notesDiv, notes) {
		for(var i=0; i<notes.length; i++) {
			//jQuery('<section/>', {text: contentFrames[i].contentHtml}).appendTo(notesDiv);
		}
	}

	this.show = function(noteId) {
		for(var i=0; i<notes.length; i++) {
			if(notes[i].id === noteId) {
				
			}
		}
	};




	var notesDiv = $("#" + noteDivId);
	loadNotes(notesDiv, notes);
	
};
