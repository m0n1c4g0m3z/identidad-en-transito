let datos;
let artistaActual = 0;

function preload() {
  datos = loadJSON('data.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(30);
  fill(255);
  if (datos && datos.artistas && datos.artistas.length > 0) {
    text(datos.artistas[artistaActual].nombre, width / 2, height / 2);
  }
}

function keyPressed() {
  artistaActual = (artistaActual + 1) % datos.artistas.length;
}
