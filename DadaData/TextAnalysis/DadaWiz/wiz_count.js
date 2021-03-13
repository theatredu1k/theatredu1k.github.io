// https://shiffman.net/a2z/text-analysis/
let txt;
let keys =[];// array
let counts = {}; // object
function preload (){
  txt = loadStrings('/DadaBlabla/dataset/Thesis/PostDigital Textile and Puppetry.txt');
  // txt = loadStrings('../dataset/dadaPoem.txt');
//txt= '/DadaBlabla/DadaNLP/dataset/dadaDay.txt';// this is working for DadaTextActuator.js

}

function setup(){
   noCanvas();
   let allwords = txt.join("\n");
   let tokens = allwords.split(/\W+/);
   //console.log(tokens);
   for (var i = 0; i<tokens.length; i++){
     let word = tokens[i].toLowerCase(); // key
     if (!/\d+/.test(word)){
     if (counts[word]=== undefined){
       counts[word] = 1;
       keys.push(word);
     }else{
       counts[word] +=1;
     }
    }
   }
   keys.sort(compare);// sort based on this function
   function compare(a,b){
     var countA = counts[a];
     var countB = counts[b];
     return countB - countA



   }
   for (var i = 0; i<keys.length; i++){
     var key = keys[i];
     createDiv(key+" "+counts[key]);

   }





}
