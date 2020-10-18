var txt;
// variables for draw230ct20

// end variables for draw230ct20

function loadFile() {
  txt= 'dadaPoem.txt';
  loadStrings(txt, fileLoaded);
}

function fileLoaded(data) {
//  txt = data;
  createP(join(data, '<br/>'));
}

function fileSelected(file) {//read data from the file object : name, size, type
  //createP(file.name + ' ' + file.size + ' ' + file.type);

  if (file.type == 'text') {
    createP(file.data);

  } else {
    createP('I need a text file.');
  }
  console.log(file);
}

function setup() {
  createCanvas(320,240);
  createFileInput(fileSelected);
  var button = select('#loadfile');
  button.mousePressed(loadFile);

  // console.log(txt);
}
function drawLiq(vNnum,nm,sm,fcm){//https://www.openprocessing.org/sketch/816453
  //drawLiq(radius,noise, sinus,rotation ) dividers for framecount
	push();
	rotate(frameCount/fcm);
	let dr = TWO_PI/vNnum;
	beginShape();
	for(let i = 0; i  < vNnum + 3; i++){
		let ind = i%vNnum; //radius coeff, noise and sinus function steps
		let rad = dr *ind; // radius
    // adjust the radius
    // let r = height*0.3 + noise(frameCount/nm + ind) * height*0.1 + sin(frameCount/sm + ind)*height*0.05;
    let r = height*0.3 + noise(frameCount/nm + ind) * height*0.1 + sin(frameCount/sm + ind)*height*0.05;
    // ellipse(60,60+rad,rad,rad);
    //curveVertex(cos(rad)*r, sin(rad)*r); //blob
    if(minute()%3==0) {
      curveVertex(cos(rad)*r, sin(rad)*r); //blob
    }else{
        curveVertex(cos(rad)*r, sin(rad));//lines
        // ellipse(rad,rad/2,r,r);
    }

    //curveVertex(cos(rad)*r, sin(rad)+r);//ribbons
    //lines + ribbons = bracelets
	}
	endShape();
	pop();
}
function drawDrop(vNnum,nm,sm,fcm){//https://www.openprocessing.org/sketch/816453
  //drawLiq(radius,noise, sinus,rotation ) dividers for framecount
	push();
	rotate(frameCount/fcm);
	let dr = TWO_PI/vNnum;
	beginShape();
	for(let i = 0; i  < vNnum + 3; i++){
		let ind = i%vNnum; //radius coeff, noise and sinus function steps
		let rad = dr *ind; // radius
    // adjust the radius
    let r = height*0.3 + noise(frameCount/nm + ind) * height*0.1 + sin(frameCount/sm + ind)*height*0.05;
    ellipse(60,60+rad,rad,rad);
    // console.log(rad);
    //curveVertex(cos(rad)*r, sin(rad)*r); //blob
    //curveVertex(cos(rad)*r, sin(rad));//lines
    // curveVertex(cos(rad)*r, sin(rad)+r);//ribbons
    //lines + ribbons = bracelets
	}
	endShape();
	pop();
}


  function draw150ct20(){ //based on https://www.openprocessing.org/sketch/816453
      background(8,10,65);

      // blendMode(BLEND);
      blendMode(DIFFERENCE);

      background(255);

    	//noStroke();
    	blendMode(MULTIPLY);
    	noStroke();
    	translate(width/2,height/2);
    	// fill(8,10,165);//blue
    	// //drawLiq(3,50,20,100);
      // drawDrop(9,50,20,160);

    	// fill(240,240,0);yellow
    	// drawLiq(15,60,25,120);
    	fill(205,8,100);//hibiscus

    	// drawLiq(12,45,15,150);
      drawLiq(13,60,20,220);
      // fill(165,0,240);// violet
      // drawLiq(3,50,10,120);

      fill(255,150,240);//pink
      drawDrop(60,60,20,150);
       fill(34,255,24);//green
      drawLiq(10,60,20,80);
    }// end draw150ct20

  function draw23Oct20() {//https://www.openprocessing.org/sketch/893896

    let margin = 10;
    let density = 1/2020;

      createCanvas(480, 240);
      colorMode(HSB, 1);
      rectMode(CENTER);

      // background(0.10, 0.8, 0.65);
      background(0, 0, 1)
      fill(0);
      noStroke();

      // let s = width - 2*margin;
      let s = width - 2*margin;
      translate(margin, margin)
      for (let incr = s; incr > 2; incr /= 3) {
        let z = incr/100;
        for (let x = 0; x <= s; x += incr) {
          for (let y = 0; y <= s; y += incr) {
            let noize = noise(x * density, y * density, z + frameCount/600);
            let digit = floor(noize * 60);
            if (digit % 2 === 0) {
              square(x, y, 4);
              // ellipse(x,y,4,4);
            }
          }
        }
      }


  }// end draw23Oct20


function draw(){

  // draw150ct20();
   draw23Oct20();

}
