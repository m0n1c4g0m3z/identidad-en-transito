let datos;
let index = 0;

function preload() {
  datos = loadJSON("data.json");
}

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(255);
  let artista = datos[index];

  fill(artista.color);
  let t = frameCount * artista.velocidad;

  if (artista.forma === "círculo") {
    ellipse(width/2, height/2, 100 + sin(t*0.05)*50);
  } else if (artista.forma === "cuadrado") {
    rectMode(CENTER);
    rect(width/2, height/2, 100 + sin(t*0.05)*50, 100 + sin(t*0.05)*50);
  } else if (artista.forma === "línea") {
    stroke(artista.color);
    strokeWeight(4);
    line(width/2, 0, width/2, height);
  }
}

function keyPressed() {
  if (key === '1') index = 0;
  else if (key === '2') index = 1;
  else if (key === '3') index = 2;
}
