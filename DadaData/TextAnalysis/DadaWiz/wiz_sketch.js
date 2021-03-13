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

 function preload (){
   data = loadJSON('../dataset/xkcd.json');
   lines = loadStrings('../dataset/alice.txt');

 }


function setup(){

  createCanvas(265*2,265);// 255+ radius ellipse
  noStroke();
  // blendMode(BLEND);
  background(65,8,10);
  paragraph=createP('©Theatredu1k '+day()+month()+year());

  //console.log(data);
  // noCanvas();
  vectors = processData(data);//process the data for the dataset we have loaded
  //console.log(vectors);
  pos = createVector(random(255),random(255),random(255));// random vector for the ellipse
  pos2 = createVector(random(255),random(255),random(255));// random vector for the rect

 //word2vec-2
  wizzi = join(lines,' ');
  let words = wizzi.split(/\W+/);
  for(let i =0; i<words.length;i++){
    createSpan(words[i]);
    createSpan(' ');
  }
  //createP(wizzi);

}

function draw(){
  let colorName = findNearest(pos); // this is the nearest color to the pos from the arrays
  let colorName2 = findNearest(pos2); // this is the nearest color to the pos from the arrays
  // noStroke();
  let v = vectors[colorName];
  let v2 = vectors[colorName2];
  //let div = createDiv(colorName);// output the name of the color on the screen
  //div.html(colorName);
  //div.style('color', `rgb(${v.x},${v.y},${v.z})`);// css syntax , just the text in color
   //or
   //div.style('background-color', `rgb(${v.x},${v.y},${v.z})`);// css syntax , the background in color

   fill(v.x, v.y, v.z); // output an ellipse with the color changing on the screen
   if (minute()%2==0)
   {
  // ellipse(pos.x,pos.y, 10+sin(minute()), 10+cos(minute())); //(x,y,w,h, detail)
   rect(pos.x,pos.y,width,2);
   //rect(width/3,0,height,width);
  }else{
   rect(pos.x,pos.y,2,height);
   // fill(v2.x, v2.y, v2.z); // output an ellipse with the color changing on the screen
   // rect(0,0,height/3,width);
  }

  let r = p5.Vector.random3D(); // a random vector for the step in the walk from pos
  r.mult(50); // scale the step
  pos.add(r); // now we have add a random vector to the previous pos
  // keep me out of negative position/ values :
  pos.x = constrain(pos.x, 0, 255);
  pos.y = constrain(pos.y, 0, 255);
  pos.z = constrain(pos.z, 0, 255);

  let r2 = p5.Vector.random3D(); // a random vector for the step in the walk from pos
  r2.mult(50); // scale the step
  pos2.add(r2); // now we have add a random vector to the previous pos
  // keep me out of negative position/ values :
  pos2.x = constrain(pos2.x, 0, 255);
  pos2.y = constrain(pos2.y, 0, 255);
  pos2.z = constrain(pos2.z, 0, 255);

  frameRate(2);

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
