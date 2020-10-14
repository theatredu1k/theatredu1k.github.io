let http = require('http');
var myPythonScriptPath = 'test.py';
// Use python shell
let PythonShell = require('python-shell');
let pyshell = new PythonShell(myPythonScriptPath);
pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log("poem is written");
});
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end();
}).listen(8080, '127.0.0.1');

console.log('server running');
