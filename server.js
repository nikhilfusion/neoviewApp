var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes')(app),
    port = process.env.PORT || 3000,
    host = process.env.HOST || "127.0.0.1",
    //io = require('socket.io').listen(),
    chokidar = require('chokidar'),
    fs = require('fs'),
    dir = 'videos/cam1/',
    watcher = chokidar.watch('videos', {ignored: /^\./, persistent: true});
app.use('/', express.static(__dirname));
app.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});
// io.sockets.on('connection', function(socket){
//     io.sockets.emit('cameraConnect', 'cam1');
// });
var files = fs.readdirSync(dir);
var sort = files.sort(function(a,b) {
    return fs.statSync(dir + b).mtime.getTime() - fs.statSync(dir + a).mtime.getTime();
});
app.listen(port, function() {
  console.log("app is running on port " + port);
});
// db.serialize(function() {
//   db.run("CREATE TABLE user (id INT, name TEXT)");
// })

// watcher.on('ready', function() {
//     watcher.on('add', function(path) {
//         console.log("added");
//         var files = fs.readdirSync(dir);
//         var sort = files.sort(function(a,b) {
//             return fs.statSync(dir + a).mtime.getTime() - fs.statSync(dir + b).mtime.getTime();
//         });
//         console.log("fs is", sort);
//         //io.sockets.emit("newFile", path);
//     });
// });
