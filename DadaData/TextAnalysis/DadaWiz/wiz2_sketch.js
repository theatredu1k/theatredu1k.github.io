// shiffman word2vec : https://github.com/CodingTrain/website/blob/main/Courses/programming_with_text/session12
// data viz : create label- vectors relationships such as an animal to (cuteness, size)
// Allison Parrish https://gist.github.com/aparrish/2f562e3737544cf29aaf1af30362f469
// RGB has 3 components , like vectors have too

// create a 3 dimension space x,y,z, between 0 and 255 where colours are living inspect

// iniate global variables
let data;
let vectors;
let pos;
let lines;
let wizzi;

let colorSpans =[];
let keys =[];


let rSlider, gSlider, bSlider;

 function preload (){
   data = loadJSON('../dataset/xkcd.json');
   lines = loadStrings('../dataset/neruda.txt');

 }


function setup(){

  createCanvas(55,55);
  rSlider = createSlider(-100, 100, 0);
  gSlider = createSlider(-100, 100, 0);
  bSlider = createSlider(-100, 100, 0);
  createP('');
  rSlider.input(sliderChanged);
  gSlider.input(sliderChanged);
  bSlider.input(sliderChanged);


  noStroke();
  // blendMode(BLEND);
  background(65,8,10);
  paragraph=createP('©Theatredu1k '+day()+month()+year());

  //console.log(data);
  // noCanvas();
  vectors = processData(data);//process the data for the dataset we have loaded
  //console.log(vectors);
  wizzi = join(lines,' ');
  let words = wizzi.split(/\W+/);



  for(let word of words){ // use----(let word of words)---instead of ---for(let i = 0; i < words.length; i++)
    let span = createSpan(word);// create the span in html for this word
    if (vectors[word]){ // if there is a matching colour in the text to one key in vectors
      let c=  vectors[word];
      span.style('background-color', `rgb(${c.x},${c.y},${c.z})`);
      colorSpans.push(span); //put this span into the array
      keys.push(word);// keep this word into keys array
    }
    //createSpan(word);
    createSpan(' ');// put back a space between the words
  }
  //createP(wizzi);// output the text into html

  //console.log(keys); // show me the keys filled with word coloured from the text
  // create some math formulas with these words in keys[]
  let avg = createVector(0,0,0);
  for (let key of keys){
    let v = vectors[key]; // get the vector values for this keys
    avg.add(v); // add the vector one by one of all the keys in the array
  }
  avg.div(keys.length);// average is sum of the vectors /number of vectors in the keys[]
  let nearest = findNearest(avg);
  // console.log(nearest);
  background(avg.x,avg.y,avg.z); // background in avg vectors colour value x,y,z
}



function processData(data){// process the data for the dataset we have loaded
  let vectors= {};
  let colors = data.colors;// check the objects in the colors array xkcd.json
  for (let i= 0; i<colors.length; i++){
    let label= colors[i].color;// pull out the name of the color of every object into label
    let rgb = color(colors[i].hex);// pull out the hex value of the label into rgb object
    vectors[label] = createVector(red(rgb), green(rgb), blue(rgb));// pull out the r/g/b values to create vectors for each color labelled
  }
  return vectors; // output the array of vectors [label]
}



function findNearest(v){ // v is the vector I want to be the nearest to
  // list of all the colours
  // from "vectors" keys are the name of the colour paired with the value which is the vector
  //sort the vectors list to check which one is the nearest to my random pos (v)
  let keys = Object.keys(vectors);

  keys.sort((a,b) =>{// compare two arbitrary elements a and b to v , check which one is the closest
    let d1 = distance(v, vectors[a]);// distance between vectors v and a
    let d2 = distance(v, vectors[b]);// distance between vectors v and b
    return d1-d2; // negative number will put a before b
  });
  // console.log(v);
  // console.log(vectors[keys[0]]);
  //console.log(keys);
  return keys[0]; // return only the first value which is the nearest one after sorting out
}


function distance(v1,v2){// distance between 2 vectors
  return p5.Vector.dist(v1,v2);
}


function sliderChanged(){
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  //console.log(r,g,b);
  for (let span of colorSpans){
    let word = span.html();// key colour
    let v = vectors[word].copy();// take a copy of the values colours, so we do not change them
    v.add(r,g,b);// add the values from the sliders to the copy of the vector
    let nearest = findNearest(v);
    span.html(nearest); // render in html that word key so we change the word into this new one with
    span.style('background-color', `rgb(${v.x},${v.y},${v.z})`);

  }
}
