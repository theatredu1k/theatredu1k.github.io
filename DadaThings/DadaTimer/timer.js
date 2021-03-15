var timeleft = 300;
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

// Set value of the DOM element
function timerText(text) {
	var timer = select('#timer');
	timer.html(text);
}

// Stop the timer
function stopTimer() {
	clearInterval(interval);
	interval = false;
}

function setup() {
	//createCanvas(200,200);
	noCanvas();

	// Process URL ?minute=
	var params = getURLParams();
	if (params.minute) {
		var min = params.minute;
		timeleft = min * 60;
	}

	// Set initial value for DOM element
	// timerText(convertSeconds(timeleft) + ' (paused)');
	timerText(convertSeconds(timeleft));

	// Timer interval
	function timeIt() {
		timeleft--;
		timerText(convertSeconds(timeleft));

		// Time's up
		if (timeleft <= 0) {
			// Ding spam
			var dingcount = 0;
			var dinginterval = setInterval(function() {
				ding.play();
				dingcount++;
				if(dingcount == 10) clearInterval(dinginterval);
			}, 100);
			//ding.play();
			stopTimer();
		}
	}

	// Set timer button
	timerbtn = createButton('set timer');
	timerbtn.mousePressed(setTimer);

	// Pause button
	pausebtn = createButton('pause/resume');
	pausebtn.mousePressed(pause);

	// Function when set timer btn is pressed
	function setTimer() {
		var entered = prompt('Enter the amount of minutes');

		if(!isNaN(entered) && entered >= 1) {
			stopTimer();
			timeleft = entered * 60;
			//timerText(convertSeconds(timeleft) + ' (paused)');
			timerText(convertSeconds(timeleft));
		}
	}

	// When pause btn is pressed
	function pause() {
		if(!interval) {
			if(timeleft <= 0) return alert('No time set!');

			timerText(convertSeconds(timeleft));
			interval = setInterval(timeIt, 1000);
		}
		else
		{
			// timerText(convertSeconds(timeleft) + ' (paused)');
			timerText(convertSeconds(timeleft));
			stopTimer();
		}
	}
}//set up end


// Sketch One
var s = function( p ) { // p could be any variable name


  let interval = false;
  var x = 100;
  var y = 100;
  var d = new Date();


  p.setup = function() {

    var symbol = 'metaphor';

    p.createCanvas(400, 200);
    p.background(160,255,220,90);
    p.createP('©Theatredu1k '+p.day()+p.month()+p.year());

    document.getElementById("myDIV").innerHTML= symbol;// this is working - and write here on myDIV inner element the date
    };

  p.draw = function() {

    p.fill(255);
    p.rect(x,y,50,50);
  };
};// end var s function(p)
var myp5 = new p5(s, 'c1');// first canvas c1 from the bottom

// Sketch Two
var t = function( p ) { // p could be any variable name
  var x = 100.0;// variables dans cette fonction
  var y = 100;
  var speed = 2.5;
  p.setup = function() {
    p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(100);// background de cette fonction
    p.fill(1);
    x += speed;
    if(x > p.width){
      x = 0;
    }
    p.ellipse(x,y,50,50);

  };
};
var myp5 = new p5(t, 'c2');
