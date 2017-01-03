var http = require('http');
var spawn = require('child_process').spawn;
var app = spawn('node', ['app.js']);

app.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

app.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

app.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

http.createServer(function(req,res){
res.writeHead(200,{'Content-Type': 'text/plain'});
res.end('egosearch start!');
}).listen(80,'0.0.0.0');
