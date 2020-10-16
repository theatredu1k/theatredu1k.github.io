//javascript object
//scoring in regards of new materialist and ooo people from academia
//relationist / human/ system

//reading the puppets file
var fs = require('fs');
var data = fs.readFileSync('dataset/puppets.json'); // sync to stop other operations before it is finished
var puppets = JSON.parse(data);
console.log(puppets);


console.log('input parameters on my static website local "DadaTheory"');
var express = require('express');
var app = express();
var server = app.listen(3000,listening);
// call back function
function listening(){
  console.log("listening...");
}

app.use(express.static('DadaTheory'));// emulate locally website 'DadaTheory' on the local server 3000, go to the directory 'DadaTheory' and read DadaTheory/index.html

// in relation to the database we want to build:

app.get('/add/:word/:score?', addWord);// the user add a word with a score
//use an API to execute functions
function addWord(request,response){
  var data= request.params;
  var word= data.word;
  var score = Number(data.score);
  var reply;
  if (!score){
   var reply = { msg :"Score is required."
  }
  response.send(reply);
 }else{
    puppets[word] = score;// word is the key, score is the value
    var data = JSON.stringify(puppets, null, 2);
    fs.writeFile ('dataset/puppets.json',data, finished);

    function finished(err){
      console.log('all set');
      reply = {
        word: word,
        score: score,
        status: "success"
      }
        response.send(reply);
    }


  }




  // var num = data.num;
  // var reply = "";
  // for (var i = 0; i < num; i++){
  //   reply += "designing a diffractive device with "+data.academia+"!"
  // }

}

// entering localhost:3000/all and sending the object "puppets"on the webpage
app.get ('/all',sendAll);
function sendAll(request, response){
  response.send(puppets);
}
//searching for the author and the Score

app.get('/search/:word/',searchWord);

function searchWord(request, response){
  var word =request.params.word;
  var reply;
  if (puppets[word]){
    reply = {
    status: "found",
    word: word,
    score: puppets[word]
  }
}else{
  reply = {status: "not found",
  word: word,
  }
 }
 response.send(reply);
}
// keep persistence between server reloading
// when the user is adding to the database
