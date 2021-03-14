

// Sketch One
var s = function( p ) { // p could be any variable name

  let ding;
  let interval = false;
  var x = 100;
  var y = 100;
  var d = new Date();

  p.preload = function() {
  	ding = p.loadSound("ding.mp3");
  };

  // Convert seconds to min:sec
  p.convertSeconds = function(s) {
    this.s = s;
    let min = p.floor(this.s / 60);
    let sec = this.s % 60;
    return p.nf(min, 2) + ':' + p.nf(sec, 2);
  };
  // Set value of the DOM element
  p.timerText= function(text) {
    this.text= text;
  	let timer = p.select('#timer');
  	timer.html(this.text);
  }

  // Stop the timer
  function stopTimer() {
  	clearInterval(interval);
  	interval = false;
  }
  p.setup = function() {

    var symbol = 'metaphor';

    p.createCanvas(400, 200);
    p.background(160,255,220,90);
    p.createP('©Theatredu1k '+p.day()+p.month()+p.year());

    ecrire= p.timerText(symbol);
    // result = p.convertSeconds(timeleft);// this is working with p.convertseconds and p. before all the functions inside convertseconds

    // document.getElementById("mytimer").innerHTML= timeleft; //this is working
    document.getElementById("timer").innerHTML= symbol;// ok
    // document.getElementById("timer").innerHTML= ecrire; // non
    document.getElementById("myDIV").innerHTML= d;// this is working - and write here on c3 inner element the date
    };

  p.draw = function() {
    var timeleft = 300;
    timeleft--;
    result = p.convertSeconds(timeleft);// this is working with p.convertseconds and p. before all the functions inside convertseconds
    document.getElementById("mytimer").innerHTML= result;



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


// Sketch Three
// ----------------------------------------------------

// var u = function( p ) {
// let timeleft = 300;
// let ding;
// let interval = false;
//
// // Convert seconds to min:sec
// function convertSeconds(s) {
// 	min = p.floor(this.s / 60);
// 	sec = this.s % 60;
// 	return p.nf(min, 2) + ':' + p.nf(sec, 2);
// };
//
// function preload() {
// 	ding = p.loadSound("ding.mp3");
// };
// // Set value of the DOM element
// function timerText(text) {
// 	timer = p.select('#timer');
// 	timer.html(this.text);
// };
//
// // Stop the timer
// function stopTimer() {
// 	p.clearInterval(interval);
// 	interval = false;
// };
//
//
//   p.setup = function() {
//     p.createCanvas(400, 200);
//     // Process URL ?minute=
//     var params = p.getURLParams();
//     if (params.minute) {
//       var min = params.minute;
//       timeleft = min * 60;
//     }
//
//     // Set initial value for DOM element
//     // timerText(convertSeconds(timeleft) + ' (paused)');
//     timerText(convertSeconds(timeleft));
//
//     // Timer interval
//     function timeIt() {
//       timeleft--;
//       timerText(convertSeconds(timeleft));
//
//       // Time's up
//       if (timeleft <= 0) {
//         // Ding spam
//         var dingcount = 0;
//         var dinginterval = p.setInterval(function() {
//           ding.play();
//           dingcount++;
//           if(dingcount == 10) p.clearInterval(dinginterval);
//         }, 100);
//         //ding.play();
//         stopTimer();
//       }
//     }
//
//     	// Set timer button
//     	timerbtn = p.createButton('set timer');
//     	timerbtn.mousePressed(setTimer);
//
//     	// Pause button
//     	pausebtn = p.createButton('pause/resume');
//     	pausebtn.mousePressed(pause);
//
//     	// Function when set timer btn is pressed
//     	function setTimer() {
//     		var entered = p.prompt('Enter the amount of minutes');
//
//     		if(!isNaN(entered) && entered >= 1) {
//     			stopTimer();
//     			timeleft = entered * 60;
//     			//timerText(convertSeconds(timeleft) + ' (paused)');
//     			timerText(convertSeconds(timeleft));
//     		}
//     	}
//
//     	// When pause btn is pressed
//     	function pause() {
//     		if(!interval) {
//     			if(timeleft <= 0) return alert('No time set!');
//
//     			timerText(convertSeconds(timeleft));
//     			interval = p.setInterval(timeIt, 1000);
//     		}
//     		else
//     		{
//     			// timerText(convertSeconds(timeleft) + ' (paused)');
//     			timerText(convertSeconds(timeleft));
//     			stopTimer();
//     		}
//     	}
//
//
//
//   };// setup
//
//
// };
// var myp5 = new p5(u, 'c3');
