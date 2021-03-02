// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0Mq2CxspF5s



function loadFile() {
  loadStrings('../dataset/dadaPoem.txt ', fileLoaded);
}

function fileLoaded(data) {
  createP(join(data, '<br/>'));
}

function fileSelected(file) {
  createP(file.name + ' ' + file.size + ' ' + file.type);
// call back function
  if (file.type == 'text') {
    createP(file.data);
  } else {
    createP('I need a .txt file.');
  }

}

function setup() {
  noCanvas();

  createFileInput(fileSelected);

  
  var button = select('#loadfile');
  button.mousePressed(loadFile);

}
