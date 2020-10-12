var myPythonScriptPath = 'DadaStory.py';
// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);


function setup(){

  createCanvas(400, 400);
  noLoop();

}
function draw() {
  background(50);
  noStroke();
  fill(255);
  text(message, 50, 200);
}

});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
    if (err){
        throw err;
    };

});
function setup() {
createCanvas(400, 400);
noLoop();
}
