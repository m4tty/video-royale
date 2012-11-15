var express = require('express');
var videosRoutes = require('./lib/videos-routes');
var contentFramesRoutes = require('./lib/contentFrames-routes');
var notesRoutes = require('./lib/notes-routes');
var commentsRoutes = require('./lib/comments-routes');
var royaleRoutes = require('./lib/royale-routes');
var app = express();

app.get('/videos', videosRoutes.findAll);
app.get('/videos/:videoid',videosRoutes.findById);

app.get('/videos/:videoid/contentFrames',contentFramesRoutes.findAll);
app.get('/videos/:videoid/contentFrames/:',contentFramesRoutes.findById);

app.get('/videos/:videoid/notes', notesRoutes.findAll);
app.get('/videos/:videoid/notes/:noteid',notesRoutes.findById);

app.get('/videos/:videoid/comments', commentsRoutes.findAll);
app.get('/videos/:videoid/comments/:commentid',commentsRoutes.findById);

app.get('/videos/:videoid/royale',royaleRoutes.findById);



app.listen(3000);
console.log('Listening on port 3000...');