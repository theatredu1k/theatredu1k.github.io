var tea;
function setup(){
  tea= {
    nom: "genmaicha",
    couleur: color(163,136,13)
    jour: "2021-03-22"
  }

}
function draw{
  background(0);
  fill(tea.couleur);
  text(tea.name,10,50);
}
