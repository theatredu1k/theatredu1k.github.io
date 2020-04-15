

let capture = null;
let tracker = null;
let positions = null;
let w = 0, h = 0;


function setup() {
  w = 640;
  h = 480;
  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  frameRate(10);
  colorMode(HSB);
  background(255);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

  irisColor = color(random(360), 80, 80, 0.4);
}
//=====================DRAW function=====================================
function draw() {
  // Flip the canvas so that we get a mirror image
  translate(w, 0);
  scale(-1.0, 1.0);
  // Uncomment the line below to see the webcam image (and no trail)
 // image(capture, 0, 0, w, h);
  positions = tracker.getCurrentPosition();

  if (positions.length > 0) {

    // Eye points from clmtrackr:
    // https://www.auduno.com/clmtrackr/docs/reference.html
    const eye1 = {
      outline: [23, 63, 24, 64, 25, 65, 26, 66].map(getPoint),
      onePoint: getPoint(23),
      twoPoint: getPoint(25),
      center: getPoint(27),
      top: getPoint(24),
      bottom: getPoint(26)
    };
    const eye2 = {
      outline: [28, 67, 29, 68, 30, 69, 31, 70].map(getPoint),
      onePoint: getPoint(28),
      twoPoint: getPoint(30),
      center: getPoint(32),
      top: getPoint(29),
      bottom: getPoint(31)
    }

    //const irisColor = color(random(360), 100, 45, 0.4);
    drawEye(eye1, irisColor);
  //  drawEye(eye2, irisColor);
  }
}//end draw

//==============other Functions===============================

function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}

function drawEye(eye, irisColor) {
  noFill();
  stroke(255, 0.4);
  drawEyeOutline(eye);

  const irisRadius = min(eye.center.dist(eye.top), eye.center.dist(eye.bottom));
  const irisSize = irisRadius*2;
  // noStroke();
  // fill(irisColor);
  // ellipse(eye.center.x, eye.center.y, irisSize, irisSize);
   stroke(irisColor);
   line(eye.onePoint.x,eye.onePoint.y,eye.center.x,eye.center.y);

  //point(eye.center.x,eye.center.y);
  const pupilSize = irisSize / 3;
//   fill(0, 0.6);// black pupil
//   ellipse(eye.center.x, eye.center.y, pupilSize, pupilSize);
}

function drawEyeOutline(eye) {
	beginShape();
  const firstPoint = eye.outline[0];


  eye.outline.forEach((p, i) => {
  //  curveVertex(p.x, p.y);

 //   if (random(80)<5) {
 //     // translate(0,20);
 //     // rotate(random(60)*i/180);
 //     //line(eye.onePoint.x,eye.onePoint.y,eye.twoPoint.x,eye.twoPoint.y);
 //   }else{
 //     point(eye.bottom.x,eye.bottom.y);
 //     point(eye.onePoint.x,eye.onePoint.y);
 // }
 //

    // if (i === 0) {
    //   // Duplicate the initial point (see curveVertex documentation)
    //   curveVertex(firstPoint.x, firstPoint.y);
    // }
    // if (i === eye.outline.length - 1) {
    //   // Close the curve and duplicate the closing point
    //   curveVertex(firstPoint.x, firstPoint.y);
    //   curveVertex(firstPoint.x, firstPoint.y);
    //
    // }
  });
  endShape();

}

function keyPressed() {
  // Clear background

	if (keyCode === 27) {
		background(255);
		colorPen = color(random(360), 100, 45, 0.4);
	}
	if (keyCode === 80) {
		const timestamp = timestampString();
  		saveCanvas("eyeTrail-" + timestamp, "png");
	}
  if (keyCode === 49) {

    irisColor = color(0,0, 0, 1);
   
	}
}

function mouseClicked() {

}

function timestampString() {
  return year() + nf(month(), 2) + nf(day(), 2) + "-" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
}

function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);
  background(0);
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
