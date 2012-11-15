var express = require('express');
var videosRoutes = require('./lib/videos-routes');
var contentFramesRoutes = require('./lib/contentFrames-routes');
var notesRoutes = require('./lib/notes-routes');
var commentsRoutes = require('./lib/comments-routes');
var royaleRoutes = require('./lib/royale-routes');
var app = express();

app.get('/videos', videosRoutes.findAll);
app.get('/videos/:videoid',videosRoutes.findById);
app.post('/videos', videosRoutes.addVideo);
app.put('/videos/:videoid', commentsRoutes.updateVideo);
app.delete('/videos/:videoid', commentsRoutes.deleteVideo);

app.get('/videos/:videoid/contentFrames',contentFramesRoutes.findByVideoId);
app.get('/videos/:videoid/contentFrames/:contentFrameId',contentFramesRoutes.findById);
app.post('/videos/:videoid/contentFrames', contentFramesRoutes.addContentFrame);
app.put('/videos/:videoid/contentFrames/:contentFrameId', commentsRoutes.updateContentFrame);
app.delete('/videos/:videoid/contentFrames/:contentFrameId', commentsRoutes.deleteContentFrame);


app.get('/videos/:videoid/notes', notesRoutes.findByVideoId);
app.get('/videos/:videoid/notes/:noteid',notesRoutes.findById);
app.post('/videos/:videoid/notes', notesRoutes.addNote);
app.put('/videos/:videoid/notes/:noteid', notesRoutes.updateNote);
app.delete('/videos/:videoid/notes/:noteid', notesRoutes.deleteNote);

app.get('/videos/:videoid/comments', commentsRoutes.findByVideoId);
app.get('/videos/:videoid/comments/:commentid',commentsRoutes.findById);
app.post('/videos/:videoid/comments', commentsRoutes.addComment);
app.put('/videos/:videoid/comments/:commentid', commentsRoutes.updateComment);
app.delete('/videos/:videoid/comments/:commentid', commentsRoutes.deleteComment);

app.get('/videos/:videoid/royale',royaleRoutes.findById);

app.listen(3000);
console.log('Listening on port 3000...');