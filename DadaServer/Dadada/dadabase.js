// https://shiffman.net/a2z/node-api/
// https://www.youtube.com/watch?v=6iZiqQZBQJY&feature=youtu.be
// 8.5: Saving Data to JSON File with Node.js - Programming with Text
// https://github.com/CodingTrain/website/blob/main/Courses/programming_with_text/session08/8-0506_SavingDataJSONnodeJS/website/sketch.js
// https://youtu.be/4zr8j-jeU_M
// 8.6: API Front End Client - Programming with Text
// Application programming interface (API)
//
//launched via server.js
//
let rSlider, gSlider, bSlider;


function setup(){
  createCanvas(300,200);

  createP('');
  console.log('running');

  rSlider = createSlider(-100, 100, 10);
  gSlider = createSlider(-100, 100, 8);
  bSlider = createSlider(-100, 100, 65);
  // let rgb = createDiv(rSlider.value()+ ","+gSlider.value()+","+bSlider.value());

  var button = select('#submit');
  button.mousePressed(submitWord);

  drawData();

}

function drawData(){
    background(65);
    loadJSON('/all',gotData);// loading the database

}

function submitWord(){
    var word= select ('#word').value();
    var r =rSlider.value();
    var g =gSlider.value();
    var b= bSlider.value();
    console.log(word,r,g,b);

    loadJSON ('add/' +word+'/'+couleur, finished);//  add new input in the database, send input to the server
    function finished (data){
      console.log(data);
      drawData();
    }
  }

function gotData(data) {
  console.log(data);
  var keys = Object.keys(data);
  for ( var i= 0; i<keys.length; i++){
    var word = keys[i];
    var couleur = data[word];
    var x= random(width);
    var y= random(height);
    fill (255);
    textSize(12);
    text(word, x,y);
    // fill (255-couleur,75+couleur,240+ 2*couleur,90);
    fill(255-couleur, 75+couleur,100);
    noStroke();
    ellipse(x,y,10);
  }
  console.log(keys);
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function sliderChanged(){
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  console.log(r,g,b);
  for (let span of colorSpans){
    let word = span.html();// key colour
    let v = vectors[word].copy();// take a copy of the values colours, so we do not change them
    v.add(r,g,b);// add the values from the sliders to the copy of the vector

  }
}
