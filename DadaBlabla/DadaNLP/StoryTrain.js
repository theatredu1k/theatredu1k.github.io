let myPythonScriptPath = 'StoryTrain.py';
//
// var PythonShell = require('python-shell');
// var pyshell = new PythonShell('script.py');

// Use python shell
const {PythonShell} = require("python-shell");
// let PythonShell = require('python-shell');
let pyshell = new PythonShell('StoryTrain.py');

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log("poem is written");
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
    if (err){
        throw err;
    };

    console.log('finished');
});
