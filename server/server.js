var express = require('express');
var videosRoutes = require('./lib/videos-routes');
var contentFramesRoutes = require('./lib/contentFrames-routes');
var notesRoutes = require('./lib/notes-routes');
var commentsRoutes = require('./lib/comments-routes');
var actionsRoutes = require('./lib/actions-routes');
var captionsRoutes = require('./lib/captions-routes');
var royaleRoutes = require('./lib/royale-routes');
var app = express();

app.use(express.bodyParser()); 
app.use(express.methodOverride());

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'dadgum!');
});

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

app.get('/videos/:videoid/actions', actionsRoutes.findByVideoId);
app.get('/videos/:videoid/actions/:actionid',actionsRoutes.findById);
app.post('/videos/:videoid/actions', actionsRoutes.addAction);
app.put('/videos/:videoid/actions/:actionid', actionsRoutes.updateAction);
app.delete('/videos/:videoid/actions/:actionid', actionsRoutes.deleteAction);

app.get('/videos/:videoid/captions', captionsRoutes.findByVideoId);
app.get('/videos/:videoid/captions/:captionid',captionsRoutes.findById);
app.post('/videos/:videoid/captions', captionsRoutes.addCaption);
app.put('/videos/:videoid/captions/:captionid', captionsRoutes.updateCaption);
app.delete('/videos/:videoid/captions/:captionid', captionsRoutes.deleteCaption);

app.get('/videos/:videoid/royale',royaleRoutes.findById);

app.listen(3000);
console.log('Listening on port 3000...');
