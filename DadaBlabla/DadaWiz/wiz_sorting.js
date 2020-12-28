//https://www.youtube.com/watch?v=uNQSVU0IKec&list=PLRqwX-V7Uu6YrbSJBg32eTzUU50E2B8Ch&index=3

let textfield;
let output;
let submit;

function setup(){
  noCanvas();
  //textfield = createInput(" sorting out stuff in a text");
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
