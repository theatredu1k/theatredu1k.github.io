// coding animated shapes training

var txt;
// variables Draw everything into a pGraphics object.

let scaleOutput = 1;
let output;
let canvas;

// end variables for draw230ct20

function loadFile() {
  txt= '/DadaBlabla/DadaNLP/dadaPoem.txt';
  loadStrings(txt, fileLoaded);
}

function fileLoaded(data) {
//  txt = data;
  createP(join(data, '<br/>'));
}

function fileSelected(file) {//read data from the file object : name, size, type
  //createP(file.name + ' ' + file.size + ' ' + file.type);

  if (file.type == 'text') {
    createP(file.data);

  } else {
    createP('I need a text file.');
  }
  console.log(file);
}

function setup() {
  // createCanvas(320,240);
  noCanvas();
  createFileInput(fileSelected);
  // paragraph=createP('©Theatredu1k '+day()+month()+year());
 // var button = select('#loadfile');
  button = createButton('loadFile');
  button.mousePressed(loadFile);
  console.log(txt);

  //reload the html
  var resetButton = createButton("reset");
  resetButton.mousePressed(resetSketch);

  function resetSketch(){
  window.location.reload(false);
  }

}
