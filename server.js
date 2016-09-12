var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = process.env.PORT || 3000,
    io = require('socket.io').listen(app.listen(port)),
    chokidar = require('chokidar'),
    watcher = chokidar.watch('videos', {ignored: /^\./, persistent: true});
app.use('/', express.static(__dirname));
io.sockets.on('connection', function(socket){
    io.sockets.emit('cameraConnect', 'cam1');
});
watcher.on('ready', function() { 
    watcher.on('add', function(path) {
        io.sockets.emit("newFile", path);
    });
});