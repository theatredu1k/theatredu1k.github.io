
var myPythonScriptPath = 'DadaStory.py';
// Use python shell
// var PythonShell = require('python-shell');
import PythonShell from 'python-shell';
var pyshell = new PythonShell(myPythonScriptPath);

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);



    // import {PythonShell} from 'python-shell';
    // let pyshell = new PythonShell('my_script.py');
    //
    // // sends a message to the Python script via stdin
    // pyshell.send('hello');
    //
    // pyshell.on('message', function (message) {
    //   // received a message sent from the Python script (a simple "print" statement)
    //   console.log(message);
    // });
    //
    // // end the input stream and allow the process to exit
    // pyshell.end(function (err,code,signal) {
    //   if (err) throw err;
    //   console.log('The exit code was: ' + code);
    //   console.log('The exit signal was: ' + signal);
    //   console.log('finished');
    // });




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
