

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

    document.getElementById("myDIV").innerHTML= symbol;// this is working - and write here on c3 inner element the date
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
