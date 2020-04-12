//https://www.youtube.com/watch?v=bM9MfoKe9GU
//drawing sketh : https://www.openprocessing.org/sketch/446310
// understanding the basic : :https://www.unicornsfartpixels.com/posts/2017-10-25audio-fft/



//sliders
var headslider;
var wingslider;
var backColorslider;
var BGbrightnessSlider;

var inputRatio1;
var Ratio1;
var inputRatio2;
var Ratio2;

var inputWings;

var yourName;
var wingTslider;
var wingSatslider;

// Variables for the sound making

var showRays = false

var octaves = 3
var fftSmooth = 0.95
var frameSize = 512//512
var startMhz = 150
var endMhz = 12000//12000
var beatThreshold = 0.4
var bpm = 12 //

var headRadius = 1.0//4
var wingSize = .9//.9

var backColor;
var BGbrightness;

var wingTransparency = 0.035//0.035
var wingSaturationMultiplier = 0.6//0.8
var wingBrightness = bnorm(.6)//.6
var dotSize = 4

var strokeTransparency = 0.5//0.9
var strokeBaseBrightness = bnorm(.3)



var audio, fft, beat //, amplitude

var angle = 360, sign = 1
var prevMouseX = 0

//functions for the sound making
function bnorm(floatVal, low=0, high=255){return Math.round(floatVal*(high - low))}

function setup() {

  createCanvas(640,480) 

  colorMode(HSB)
	//background(74,100,100)
  background(0,0,0)
  audio = new p5.AudioIn()
  audio.start()

  fft = new p5.FFT(fftSmooth, frameSize)
  fft.setInput(audio)

  beat = new p5.PeakDetect(startMhz,endMhz, beatThreshold, 60/(bpm/60))

//input Name
paragraph=createP('Sabrina Recoules Quang ©Theatredu1k '+year());
inputName = createInput('enter your name');
inputName.changed(changeName)
function changeName(){
  paragraph.html(day() + 'D'+month()+'M Sonic Drawing by  '+inputName.value()+ ' ©Theatredu1k'+ year());
}
//inputName.position(80+width/2,120);

//button
button = createButton("newColor");
button.mousePressed(changeColor);

 stopButton = createButton("stop/go")
 stopButton.mousePressed(stopLoop);

neutralButton = createButton("neutral")
neutralButton.mousePressed(neutralBG)

//sliders
// let txt = createDiv(" Shapes");
// txt.position(20, 120);
headslider = createSlider(0.0,4.0,1.0);
headslider.position(80+width/2,140);
let txt1 = createDiv("stem");
//txt1.position(20, 180);
txt1.position(width/2, 140);

// wingslider = createSlider(.1,6.0,.1);
// wingslider.position(100,60);
// let txt2 = createDiv(" leave");
// txt2.position(20, 60);


inputWings = createInput('0.2');
inputWings.position(80+width/2,160);
let txt2 = createDiv(" leave");
txt2.position(width/2, 160);

inputRatio1 = createInput('90');
inputRatio1.position(80+width/2,180);
let txt3 = createDiv("ratio1");
txt3.position(width/2, 180);

inputRatio2 = createInput('120');
inputRatio2.position(80+width/2,200);
let txt4 = createDiv("ratio2");
txt4.position(width/2, 200);

// let txt7 = createDiv(" Background");
// txt7.position(20, 160);
  backColorslider = createSlider(0.0,360.0,240);
  backColorslider.position(80+width/2,220);
  let txt8 = createDiv(" color");
  txt8.position(width/2, 220);

  BGbrightnessSlider = createSlider(0,100,random(100));
  BGbrightnessSlider.position(80+width/2,240)
  let txt9 = createDiv("brigthness");
  txt9.position(width/2, 240);





// // wingTransparency;
// // wingSaturationMultiplier;
// wingTslider = createSlider(0,100,80);
// wingTslider.position(1100,120);
//
// wingSatslider = createSlider(0,100,80);
// wingSatslider.position(1100,140);
//




}



function draw() {
  dotSize = float(random(3));
  headRadius = headslider.value();
  //wingSize = wingslider.value();
  wingSize =  inputWings.value();

  BGbrightness = BGbrightnessSlider.value();
  Ratio1 = inputRatio1.value();
  Ratio2 = inputRatio2.value();

  yourName = inputName.value();
  //wingTransparency = wingTslider.value()/100;
  //wingSaturationMultiplier = wingSatslider.value()/100;

  wingTransparency = random(0.5,1)

  //background(0)
  let spectrum = fft.analyze()
  // scaledSpectrum is a new, smaller array of more meaningful values
  let scaledSpectrum = splitOctaves(spectrum, octaves)
  let volume = max(scaledSpectrum)
  beat.update(fft)

  sign = Math.sign(sign + prevMouseX - mouseX)
  angle -= sign
  prevMouseX = mouseX
  //translate(mouseX,mouseY)
  translate(random(windowWidth),mouseY)
  rotate(radians(angle))
  var dadaNode = [2,3,random(3)] // dada node characters drawing

  { beginShape() // butterfly

    /*hue function(frequency)
    stroke function(volume) */
  	let hue = map(fft.getCentroid(), startMhz,endMhz, 0,360)

  	fill(hue, volume*wingSaturationMultiplier, wingBrightness, wingTransparency)

  //	stroke(hue, volume, strokeBaseBrightness- volume, strokeTransparency)
    stroke(hue, volume*wingSaturationMultiplier, strokeBaseBrightness, strokeTransparency)
    strokeWeight(0.5)

    let N = scaledSpectrum.length
    let mirrorCopy = Array(N)


    for (let i=0; i < N; i++) { //N or dadaNode.length
      // let R = headRadius + wingSize * scaledSpectrum[i]
      let R = wingSize * scaledSpectrum[i]
        // let x = R * sin(radians(i*180/N +180))
      // let y = R * cos(radians(i*180/N +180))

      let x = R * sin(radians(i*Ratio1/dadaNode[1]+180))
      let y = R * cos(radians(i*Ratio2/dadaNode[1]+180))


      drawDot(x,y, i)
      mirrorCopy[N-1-i] = [Math.abs(x),y]
    }
    mirrorCopy.map(([x,y], i)=> drawDot(x,y, N-1-i))

    function drawDot(x,y, i){
      if( beat.isDetected ){

        fill(hue, volume*wingSaturationMultiplier, wingBrightness, bnorm(0.8))

      }

        if(showRays){
      //	strokeWeight(map(scaledSpectrum[i], 0,bnorm(1), 0,dotSize+4))
        strokeWeight(map(scaledSpectrum[i], 0,bnorm(1), 0,dotSize))

      	//line(0,0, x,y)
      	//strokeWeight(1)
      }
      push()
        fill(hue, volume*wingSaturationMultiplier, wingBrightness, 0.4)
        stroke(hue, volume, strokeBaseBrightness - volume, 0.4)
        ellipse(x,y, dotSize)
      pop()

	  curveVertex(x,y)
  }// end drawDot
    stroke(74,100,random(95))
    //  stroke(hue, volume, strokeBaseBrightness - volume/2, 0.8)
    //  stroke(hue, volume, strokeBaseBrightness - volume/2, 0.4)
    strokeWeight(1)
    endShape(CLOSE)
  } // end drawing butterfly




}// end draw

function changeColor(){
  // //background(random(74,90),100,random(95))
  // //background(330, 100, random(60))
  //   //background(backColor,51,50)//BHS
  //
    backColor= backColorslider.value()
    background(backColor,100,BGbrightness)

  noLoop()
  //
   play = !play
   if(play) loop(); else noLoop()
}

let play = true


function stopLoop(){
//  background(random(74,90),100,random(95))
//background(330, 100, random(60))

  play = !play
  if(play) noLoop(); else loop()

}

let oneLoop = true

function mouseClicked(){
//  background(random(74,90),100,random(95))
//background(330, 100, random(60))

  //
  oneLoop = !oneLoop
  if(oneLoop) noLoop(); else loop()

}


//
// function mouseClicked(){
// //  background(random(74,90),100,random(95))
// //background(330, 100, random(60))
//
//   fill(0)
//   play = !play
//   if(play) noLoop(); else loop()
// }

function neutralBG(){
  background(0,0,0)
}

//---------------------------------------------------------------------------
//***************************************************************************
/**
 *  Re-group the array of FFT bins into an
 *  array of more meaningful values
 *  using the splitOctaves method.
 */


/**
 *  Divides an fft array into octaves with each
 *  divided by three, or by a specified "slicesPerOctave".
 *
 *  There are 10 octaves in the range 20 - 20,000 Hz,
 *  so this will result in 10 * slicesPerOctave + 1
 *
 *  @method splitOctaves
 *  @param {Array} spectrum Array of fft.analyze() values
 *  @param {Number} [slicesPerOctave] defaults to thirds
 *  @return {Array} scaledSpectrum array of the spectrum reorganized by division
 *                                 of octaves
 */
function splitOctaves(spectrum, slicesPerOctave) {
  var scaledSpectrum = [];
  var len = spectrum.length;

  // default to thirds
  var n = slicesPerOctave|| 3;//3,6,12
  var nthRootOfTwo = Math.pow(2, 1/n);

  // the last N bins get their own
  var lowestBin = slicesPerOctave;

  var binIndex = len - 1;
  var i = binIndex;


  while (i > lowestBin) {
    var nextBinIndex = round( binIndex/nthRootOfTwo );

    if (nextBinIndex === 1) return;

    var total = 0;
    var numBins = 0;

    // add up all of the values for the frequencies
    for (i = binIndex; i > nextBinIndex; i--) {
      total += spectrum[i];
      numBins++;
    }

    // divide total sum by number of bins
    var energy = total/numBins;
    scaledSpectrum.push(energy);

    // keep the loop going
    binIndex = nextBinIndex;
  }

  // add the lowest bins at the end
  for (var j = i; j > 0; j--) {
    scaledSpectrum.push(spectrum[j]);
  }

  // reverse so that array has same order as original array (low to high frequencies)
  //scaledSpectrum.reverse();

  return scaledSpectrum;
}



// average a point in an array with its neighbors
function smoothPoint(spectrum, index, numberOfNeighbors) {

  // default to 2 neighbors on either side
  var neighbors = numberOfNeighbors || random(12);//2
  var len = spectrum.length;

  var val = 0;

  // start below the index
  var indexMinusNeighbors = index - neighbors;
  var smoothedPoints = 0;

  for (var i = indexMinusNeighbors; i < (index+neighbors) && i < len; i++) {
    // if there is a point at spectrum[i], tally it
    if (typeof(spectrum[i]) !== 'undefined') {
      val += spectrum[i];
      smoothedPoints++;
    }
  }

  val = val/smoothedPoints;

  return val;
}
