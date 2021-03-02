// Shiffman : https://www.youtube.com/watch?v=uNQSVU0IKec
// plan a manipulation with text to manipulate a square pixel on screen
//create a textfield to enter a text 
//..... connect sentiment analysis 
// map sentiment analysis to a movement in a square

let textfield;
let output;
let submit;

function setup(){
  noCanvas();
  textfield = createInput(" sorting out stuff in a text");
  textfield = select('#mot');
  //textfield.changed(newText);// event entering the text in the field
  //textfield.input(newTyping);// event at every typing
  output = select('#output');
  submit = select('#submit');
  submit.mousePressed(newText);
}
function newTyping() {
  output.html(textfield.value());
  // createP(textfield.value());
  // console.log(input.value());
}
function newText() {
  createP(textfield.value());
  // console.log(input.value());
}
