// Sketch Timer


//---------------------------------------------------------------
var m = function( p ) { // p could be any variable name
var timeleft = 300;
var ding;
var interval = false;

// Convert seconds to min:sec
p.convertSeconds(s) = function() {
	var min = floor(s / 60);
	var sec = s % 60;
	return nf(min, 2) + ':' + nf(sec, 2);
};

p.preload() = function() {
	ding = p.loadSound("ding.mp3");
};

// Set value of the DOM element
p.timerText(text) = function() {
	var timer = p.select('#timer');
	timer.html(text);
};

// Stop the timer
p.stopTimer()= function()  {
	p.clearInterval(interval);
	interval = false;
};

p.setup()= function()  {
	//createCanvas(200,200);
	p.noCanvas();

	// Process URL ?minute=
	var params = p.getURLParams();
	if (params.minute) {
		var min = params.minute;
		timeleft = min * 60;
	}

	// Set initial value for DOM element
	// timerText(convertSeconds(timeleft) + ' (paused)');
	p.timerText(p.convertSeconds(timeleft));

	// Timer interval
	p.timeIt() = function(){
		timeleft--;
		p.timerText(p.convertSeconds(timeleft));

		// Time's up
		if (timeleft <= 0) {
			// Ding spam
			var dingcount = 0;
			var dinginterval = p.setInterval(function() {
				ding.play();
				dingcount++;
				if(dingcount == 10) p.clearInterval(dinginterval);
			}, 100);
			//ding.play();
			p.stopTimer();
		}
	};

	// Set timer button
	timerbtn = p.createButton('set timer');
	// p.timerbtn.mousePressed(setTimer);

	// Pause button
	pausebtn = p.createButton('pause/resume');
	// p.pausebtn.mousePressed(pause);

	// Function when set timer btn is pressed
	p.setTimer() = function(){
		var entered = prompt('Enter the amount of minutes');

		if(!p.isNaN(entered) && entered >= 1) {
			p.stopTimer();
			timeleft = entered * 60;
			//timerText(convertSeconds(timeleft) + ' (paused)');
			p.timerText(p.convertSeconds(timeleft));
		}
	};

	// When pause btn is pressed
	p.pause() = function() {
		if(!interval) {
			if(timeleft <= 0) return p.alert('No time set!');

			p.timerText(p.convertSeconds(timeleft));
			interval = p.setInterval(timeIt, 1000);
		}
		else
		{
			// timerText(convertSeconds(timeleft) + ' (paused)');
			p.timerText(p.convertSeconds(timeleft));
			p.stopTimer();
		}
	};
};// end p setup timer
}
var myp5 = new p5(m, 'c3');
//---------------------------------------------------------------



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
