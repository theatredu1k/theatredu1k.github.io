

// Sketch One
var s = function( p ) { // p could be any variable name
  var x = 100;
  var y = 100;
  p.setup = function() {
    p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x,y,50,50);
  };
};
var myp5 = new p5(s, 'c1');


// Sketch Two
var t = function( p ) {
  var x = 100.0;
  var y = 100;
  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    x += speed;
    if(x > p.width){
      x = 0;
    }
    p.ellipse(x,y,50,50);

  };
};
var myp5 = new p5(t, 'c2');


// Sketch Three
// ----------------------------------------------------
var u = function( p ) {var timeleft = 300;
var ding;
var interval = false;

// Convert seconds to min:sec
function convertSeconds(s) {
	var min = floor(s / 60);
	var sec = s % 60;
	return nf(min, 2) + ':' + nf(sec, 2);
}

function preload() {
	ding = loadSound("ding.mp3");
}


  p.setup = function() {
    p.createCanvas(400, 200);
    // Process URL ?minute=
    var params = getURLParams();
    if (params.minute) {
      var min = params.minute;
      timeleft = min * 60;
    }

    // Set initial value for DOM element
    // timerText(convertSeconds(timeleft) + ' (paused)');
    timerText(convertSeconds(timeleft));

  };


};
var myp5 = new p5(u, 'c3');
